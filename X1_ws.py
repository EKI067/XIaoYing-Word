import _thread as thread
import base64
import datetime
import hashlib
import hmac
import json
from urllib.parse import urlparse
import ssl
from datetime import datetime
from time import mktime
from urllib.parse import urlencode
from wsgiref.handlers import format_date_time
import websocket
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import re

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 全局变量
ws_connection = None
completion_event = None
answer = ""

class Ws_Param(object):
    def __init__(self, APPID, APIKey, APISecret, Spark_url):
        self.APPID = APPID
        self.APIKey = APIKey
        self.APISecret = APISecret
        self.host = urlparse(Spark_url).netloc
        self.path = urlparse(Spark_url).path
        self.Spark_url = Spark_url

    def create_url(self):
        now = datetime.now()
        date = format_date_time(mktime(now.timetuple()))

        signature_origin = "host: " + self.host + "\n"
        signature_origin += "date: " + date + "\n"
        signature_origin += "GET " + self.path + " HTTP/1.1"

        signature_sha = hmac.new(self.APISecret.encode('utf-8'), 
                               signature_origin.encode('utf-8'),
                               digestmod=hashlib.sha256).digest()

        signature_sha_base64 = base64.b64encode(signature_sha).decode(encoding='utf-8')

        authorization_origin = f'api_key="{self.APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="{signature_sha_base64}"'
        authorization = base64.b64encode(authorization_origin.encode('utf-8')).decode(encoding='utf-8')

        v = {
            "authorization": authorization,
            "date": date,
            "host": self.host
        }
        url = self.Spark_url + '?' + urlencode(v)
        return url

def on_message(ws, message):
    """处理WebSocket消息"""
    global answer
    try:
        data = json.loads(message)
        code = data['header']['code']
        
        if code != 0:
            print(f'API错误: {code}, 消息: {data}')
            ws.close()
        else:
            choices = data["payload"]["choices"]
            status = choices["status"]
            text = choices['text'][0]
            
            if 'content' in text and text['content']:
                content = text["content"]
                print(f"收到AI回复: {content[:100]}...")
                answer += content
            
            if status == 2:
                ws.close()
                if hasattr(ws, 'completion_event'):
                    ws.completion_event.set()
                    
    except Exception as e:
        print(f"处理消息异常: {e}")
        ws.close()

def on_error(ws, error):
    print(f"WebSocket错误: {error}")

def on_close(ws, one, two):
    print("WebSocket连接关闭")

def on_open(ws):
    """WebSocket连接打开时发送数据"""
    print("WebSocket连接已建立，发送请求...")
    ws.send(json.dumps(ws.request_data))

def gen_params(appid, domain, question):
    """生成请求参数 - 已修正为正确的数组格式"""
    data = {
        "header": {
            "app_id": appid,
            "uid": "1234",
        },
        "parameter": {
            "chat": {
                "domain": domain,
                "temperature": 0.7,
                "max_tokens": 2000
            }
        },
        "payload": {
            "message": {
                "text": [  # ✅ 修正为数组格式
                    {
                        "role": "user",  # 添加role字段
                        "content": question
                    }
                ]
            }
        }
    }
    return data

def query_spark_model(question, appid, api_key, api_secret, spark_url, domain):
    """同步查询星火模型"""
    global answer
    answer = ""  # 重置答案
    
    # 创建事件用于等待完成
    completion_event = threading.Event()
    
    # 生成请求参数
    request_data = gen_params(appid, domain, question)
    
    # 创建WebSocket参数
    ws_param = Ws_Param(appid, api_key, api_secret, spark_url)
    websocket.enableTrace(True)  # 开启跟踪以便调试
    ws_url = ws_param.create_url()
    
    print(f"连接到URL: {ws_url}")
    
    # 创建WebSocket连接
    ws = websocket.WebSocketApp(ws_url, 
                               on_message=on_message, 
                               on_error=on_error, 
                               on_close=on_close, 
                               on_open=on_open)
    
    # 附加数据和事件到WebSocket对象
    ws.request_data = request_data
    ws.completion_event = completion_event
    
    # 在新线程中运行WebSocket
    def run_ws():
        print("启动WebSocket连接...")
        ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})
    
    ws_thread = threading.Thread(target=run_ws)
    ws_thread.daemon = True
    ws_thread.start()
    
    # 等待完成，设置超时
    if not completion_event.wait(timeout=30):  # 30秒超时
        print("请求超时")
        ws.close()
        return "Error: Timeout"
    
    return answer

def extract_words_from_text(english_text, chinese_text):
    """从英文文本中提取关键词/单词 - 改进版本"""
    if not english_text or not english_text.strip():
        return []
    
    # 简单的单词提取逻辑
    words = []
    
    # 去除标点符号，分割单词
    clean_text = re.sub(r'[^\w\s]', ' ', english_text)
    potential_words = clean_text.lower().split()
    
    # 过滤掉常见虚词和短单词
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
                  'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
                  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 
                  'should', 'may', 'might', 'must', 'can', 'could', 'shall', 'should'}
    
    for word in potential_words:
        if (len(word) >= 2 and  # 降低长度要求
            word not in stop_words and 
            word.isalpha() and
            word not in words):
            words.append(word)
    
    # 如果没找到足够单词，返回所有非停用词
    if not words and potential_words:
        for word in potential_words:
            if len(word) >= 2 and word.isalpha() and word not in stop_words:
                words.append(word)
    
    # 限制返回的单词数量（最多5个）
    return words[:5]

def generate_examples_prompt(words, chinese_text):
    """生成请求星火模型的提示词 - 改进版本"""
    if not words:
        # 如果没有提取到单词，让模型从整个上下文中生成例句
        return f"""请基于以下中文文本生成3个实用的英文例句，每个例句包含中文翻译。

中文文本：{chinese_text}

要求：
1. 生成3个实用的英文例句
2. 每个例句包含中文翻译
3. 例句要实用、地道、适合英语学习
4. 返回格式为：
英文例句1（中文翻译1）
英文例句2（中文翻译2）
英文例句3（中文翻译3）

请直接返回例句，不要有其他解释。"""
    
    words_str = "、".join(words)
    prompt = f"""请为以下英文单词生成实用的例句：{words_str}

要求：
1. 为每个单词生成1-2个例句
2. 每个例句包含英文句子和中文翻译
3. 例句要实用、地道、适合英语学习
4. 返回格式如下：
{words[0]}的例句：
英文例句1（中文翻译1）
英文例句2（中文翻译2）

{words[1] if len(words) > 1 else words[0]}的例句：
英文例句1（中文翻译1）

请直接返回例句，不要有其他解释。"""
    
    return prompt

def parse_examples_response(response, words):
    """解析星火模型的响应，提取例句数据"""
    if not response or "Error:" in response:
        return {}
    
    examples = {}
    
    # 如果没有指定单词，尝试从响应中提取
    if not words:
        # 简单的提取逻辑：从响应中找出可能的单词
        lines = response.split('\n')
        for line in lines:
            if '的例句：' in line:
                word = line.split('的例句：')[0].strip()
                if word and word not in examples:
                    examples[word] = []
    
    # 如果还是没找到单词，创建一个默认单词
    if not examples and not words:
        words = ['example']
    
    # 解析例句
    lines = response.split('\n')
    current_word = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # 检测单词标题行
        if '的例句：' in line:
            current_word = line.split('的例句：')[0].strip()
            if current_word and current_word not in examples:
                examples[current_word] = []
        # 检测例句行（包含括号）
        elif '（' in line and '）' in line and current_word:
            # 分割英文和中文
            parts = line.split('（', 1)
            if len(parts) == 2:
                english = parts[0].strip()
                chinese = parts[1].replace('）', '').strip()
                if current_word not in examples:
                    examples[current_word] = []
                examples[current_word].append({
                    "english": english,
                    "chinese": chinese
                })
        # 其他格式的例句
        elif ':' in line and current_word:
            parts = line.split(':', 1)
            if len(parts) == 2:
                english = parts[1].strip()
                if english and current_word not in examples:
                    examples[current_word] = []
                examples[current_word].append({
                    "english": english,
                    "chinese": "自动翻译"
                })
    
    # 如果解析失败，生成默认例句
    if not examples and words:
        for word in words[:3]:  # 最多3个单词
            examples[word] = [
                {"english": f"This is an example sentence with {word}.", "chinese": f"这是一个包含{word}的例句。"},
                {"english": f"I like to use {word} in my writing.", "chinese": f"我喜欢在写作中使用{word}。"},
                {"english": f"Can you show me how to use {word}?", "chinese": f"你能告诉我如何使用{word}吗？"}
            ]
    
    return examples

# Flask路由
@app.route('/generate-examples', methods=['POST'])
def generate_examples():
    """生成单词例句的接口"""
    try:
        data = request.get_json()
        english_text = data.get('english_text', '')
        chinese_text = data.get('chinese_text', '')
        
        print(f"收到请求 - 英文: {english_text[:50]}...")
        print(f"收到请求 - 中文: {chinese_text[:50]}...")
        
        if not english_text and not chinese_text:
            return jsonify({
                'code': 1,
                'message': '文本不能为空'
            })
        
        # 讯飞星火配置
        appid = "712b7555"
        api_secret = "ZDQ4ZmU0OTA4ODdjMDVjNzYyNjVjYmUy"
        api_key = "1b2e3e61a7fb387f9f214c0b9edec991"
        domain = "spark-x"
        spark_url = "wss://spark-api.xf-yun.com/v1/x1"
        
        # 提取关键词
        words = extract_words_from_text(english_text, chinese_text)
        print(f"提取的单词: {words}")
        
        # 生成提示词
        prompt = generate_examples_prompt(words, chinese_text)
        print(f"生成的提示词: {prompt[:100]}...")
        
        # 调用星火模型
        response = query_spark_model(prompt, appid, api_key, api_secret, spark_url, domain)
        print(f"星火模型响应长度: {len(response)}")
        
        # 解析响应
        examples = parse_examples_response(response, words)
        
        return jsonify({
            'code': 0,
            'message': '成功',
            'data': {
                'examples': examples,
                'words': list(examples.keys()) if examples else words
            }
        })
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"生成例句时出错: {str(e)}")
        print(f"错误详情: {error_details}")
        
        return jsonify({
            'code': 1,
            'message': f'生成例句失败: {str(e)}',
            'details': error_details[-500:] if len(error_details) > 500 else error_details
        })

@app.route('/health', methods=['GET'])
def health_check():
    """健康检查接口"""
    return jsonify({
        'code': 0,
        'status': 'healthy', 
        'service': 'spark-examples-generator',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/test', methods=['GET'])
def test_api():
    """测试接口"""
    try:
        # 简单的测试请求
        test_data = {
            'english_text': 'Hello world, this is a test for learning English.',
            'chinese_text': '你好世界，这是一个英语学习测试。'
        }
        
        # 模拟处理
        words = extract_words_from_text(test_data['english_text'], test_data['chinese_text'])
        
        return jsonify({
            'code': 0,
            'message': '测试接口正常',
            'data': {
                'test_words': words,
                'service': 'running'
            }
        })
    except Exception as e:
        return jsonify({
            'code': 1,
            'message': f'测试失败: {str(e)}'
        })

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 讯飞星火大模型例句生成服务启动中...")
    print(f"🌐 服务地址: http://localhost:3001")
    print("📡 可用接口:")
    print("  POST /generate-examples - 生成单词例句")
    print("  GET  /health - 健康检查")
    print("  GET  /test - 测试接口")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=3001, debug=True)