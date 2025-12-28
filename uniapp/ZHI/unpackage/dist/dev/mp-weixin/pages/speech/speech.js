(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/speech/speech"],{

/***/ 49:
/*!****************************************************************************************************!*\
  !*** C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/main.js?{"page":"pages%2Fspeech%2Fspeech"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _speech = _interopRequireDefault(__webpack_require__(/*! ./pages/speech/speech.vue */ 50));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_speech.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 50:
/*!*********************************************************************************!*\
  !*** C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speech.vue?vue&type=template&id=3c212b86&scoped=true& */ 51);
/* harmony import */ var _speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./speech.vue?vue&type=script&lang=js& */ 53);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./speech.vue?vue&type=style&index=0&id=3c212b86&scoped=true&lang=css& */ 58);
/* harmony import */ var _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3c212b86",
  null,
  false,
  _speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/speech/speech.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 51:
/*!****************************************************************************************************************************!*\
  !*** C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue?vue&type=template&id=3c212b86&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./speech.vue?vue&type=template&id=3c212b86&scoped=true& */ 52);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_template_id_3c212b86_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 52:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue?vue&type=template&id=3c212b86&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.inputText.length
  var g1 = _vm.translating || !_vm.inputText.trim()
  var g2 =
    _vm.translatedText && _vm.showExampleSection
      ? _vm.examples && Object.keys(_vm.examples).length > 0
      : null
  var g3 = _vm.history.length
  var l0 =
    g3 > 0
      ? _vm.__map(_vm.history, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m0 = _vm.formatTime(item.timestamp)
          return {
            $orig: $orig,
            m0: m0,
          }
        })
      : null
  var g4 = _vm.history.length === 0 && !_vm.translatedText
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        l0: l0,
        g4: g4,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 53:
/*!**********************************************************************************************************!*\
  !*** C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./speech.vue?vue&type=script&lang=js& */ 54);
/* harmony import */ var _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 54:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 55));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      inputText: '',
      translatedText: '',
      fromLanguage: '中文',
      toLanguage: '英文',
      translating: false,
      error: '',
      history: [],
      // 历史记录数组
      isInHistory: false,
      // 当前结果是否已在历史记录中

      // 新增例句相关数据
      generatingExamples: false,
      examples: {},
      exampleError: ''
    };
  },
  computed: {
    // 判断是否显示例句区域（仅在中英互译时显示）
    showExampleSection: function showExampleSection() {
      var isChineseToEnglish = this.fromLanguage === '中文' && this.toLanguage === '英文';
      var isEnglishToChinese = this.fromLanguage === '英文' && this.toLanguage === '中文';
      return (isChineseToEnglish || isEnglishToChinese) && this.translatedText;
    }
  },
  onLoad: function onLoad() {
    this.loadHistoryFromStorage();
  },
  methods: {
    translateText: function translateText() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res, responseData, _res$, _responseData$data, _responseData$data$re, _responseData$data$re2;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.inputText.trim()) {
                  _context.next = 3;
                  break;
                }
                _this.error = '请输入要翻译的文本';
                return _context.abrupt("return");
              case 3:
                _this.translating = true;
                _this.error = '';
                _this.translatedText = '';
                _this.isInHistory = false;
                // 清空例句数据
                _this.examples = {};
                _this.exampleError = '';
                _context.prev = 9;
                console.log('开始翻译请求...');

                // 使用更健壮的请求方式
                _context.next = 13;
                return uni.request({
                  url: 'http://localhost:3000/translate',
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  data: {
                    text: _this.inputText.trim(),
                    from: _this.getLangCode(_this.fromLanguage),
                    to: _this.getLangCode(_this.toLanguage)
                  },
                  timeout: 10000
                });
              case 13:
                res = _context.sent;
                console.log('API响应:', res);

                // 安全地处理响应
                responseData = null; // Uniapp 响应格式判断
                if (!Array.isArray(res)) {
                  _context.next = 22;
                  break;
                }
                if (!res[0]) {
                  _context.next = 19;
                  break;
                }
                throw new Error("\u8BF7\u6C42\u5931\u8D25: ".concat(res[0].errMsg || '未知错误'));
              case 19:
                responseData = (_res$ = res[1]) === null || _res$ === void 0 ? void 0 : _res$.data;
                _context.next = 29;
                break;
              case 22:
                if (!(res && res.statusCode)) {
                  _context.next = 28;
                  break;
                }
                if (!(res.statusCode !== 200)) {
                  _context.next = 25;
                  break;
                }
                throw new Error("HTTP\u9519\u8BEF: ".concat(res.statusCode));
              case 25:
                responseData = res.data;
                _context.next = 29;
                break;
              case 28:
                throw new Error('未知的响应格式');
              case 29:
                if (responseData) {
                  _context.next = 31;
                  break;
                }
                throw new Error('响应数据为空');
              case 31:
                console.log('响应数据:', responseData);

                // 处理翻译结果
                if (!(responseData.code === 0)) {
                  _context.next = 41;
                  break;
                }
                if (!((_responseData$data = responseData.data) !== null && _responseData$data !== void 0 && (_responseData$data$re = _responseData$data.result) !== null && _responseData$data$re !== void 0 && (_responseData$data$re2 = _responseData$data$re.trans_result) !== null && _responseData$data$re2 !== void 0 && _responseData$data$re2.dst)) {
                  _context.next = 38;
                  break;
                }
                _this.translatedText = responseData.data.result.trans_result.dst;
                // 翻译成功后自动保存到历史记录
                _this.saveToHistory();
                _context.next = 39;
                break;
              case 38:
                throw new Error('翻译结果格式错误');
              case 39:
                _context.next = 42;
                break;
              case 41:
                throw new Error(responseData.message || "\u7FFB\u8BD1\u9519\u8BEF: ".concat(responseData.code));
              case 42:
                _context.next = 49;
                break;
              case 44:
                _context.prev = 44;
                _context.t0 = _context["catch"](9);
                console.error('翻译错误详情:', _context.t0);
                _this.error = _context.t0.message || '翻译失败，请重试';

                // 提供更友好的错误提示
                if (_context.t0.errMsg) {
                  if (_context.t0.errMsg.includes('timeout')) {
                    _this.error = '请求超时，请检查网络连接';
                  } else if (_context.t0.errMsg.includes('fail')) {
                    _this.error = '网络请求失败，请检查后端服务';
                  }
                }
              case 49:
                _context.prev = 49;
                _this.translating = false;
                return _context.finish(49);
              case 52:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[9, 44, 49, 52]]);
      }))();
    },
    // 新增：生成例句方法
    generateExamples: function generateExamples() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var englishText, chineseText, res, responseData, _res$2;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.translatedText) {
                  _context2.next = 3;
                  break;
                }
                _this2.exampleError = '请先完成翻译';
                return _context2.abrupt("return");
              case 3:
                _this2.generatingExamples = true;
                _this2.exampleError = '';
                _this2.examples = {};
                _context2.prev = 6;
                // 确定英文和中文文本
                englishText = '';
                chineseText = '';
                if (!(_this2.fromLanguage === '中文' && _this2.toLanguage === '英文')) {
                  _context2.next = 14;
                  break;
                }
                // 中译英：原文是中文，翻译结果是英文
                chineseText = _this2.inputText.trim();
                englishText = _this2.translatedText;
                _context2.next = 21;
                break;
              case 14:
                if (!(_this2.fromLanguage === '英文' && _this2.toLanguage === '中文')) {
                  _context2.next = 19;
                  break;
                }
                // 英译中：原文是英文，翻译结果是中文
                englishText = _this2.inputText.trim();
                chineseText = _this2.translatedText;
                _context2.next = 21;
                break;
              case 19:
                _this2.exampleError = '例句生成仅支持中英文互译';
                return _context2.abrupt("return");
              case 21:
                _context2.next = 23;
                return uni.request({
                  url: 'http://localhost:3001/generate-examples',
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  data: {
                    english_text: englishText,
                    chinese_text: chineseText
                  },
                  timeout: 45000
                });
              case 23:
                res = _context2.sent;
                console.log('例句生成响应:', res);

                // 处理响应
                responseData = null;
                if (!Array.isArray(res)) {
                  _context2.next = 32;
                  break;
                }
                if (!res[0]) {
                  _context2.next = 29;
                  break;
                }
                throw new Error("\u8BF7\u6C42\u5931\u8D25: ".concat(res[0].errMsg || '未知错误'));
              case 29:
                responseData = (_res$2 = res[1]) === null || _res$2 === void 0 ? void 0 : _res$2.data;
                _context2.next = 39;
                break;
              case 32:
                if (!(res && res.statusCode)) {
                  _context2.next = 38;
                  break;
                }
                if (!(res.statusCode !== 200)) {
                  _context2.next = 35;
                  break;
                }
                throw new Error("HTTP\u9519\u8BEF: ".concat(res.statusCode));
              case 35:
                responseData = res.data;
                _context2.next = 39;
                break;
              case 38:
                throw new Error('未知的响应格式');
              case 39:
                if (responseData) {
                  _context2.next = 41;
                  break;
                }
                throw new Error('响应数据为空');
              case 41:
                if (!(responseData.code === 0)) {
                  _context2.next = 46;
                  break;
                }
                _this2.examples = responseData.data.examples || {};
                if (Object.keys(_this2.examples).length === 0) {
                  _this2.exampleError = '未生成例句，请重试';
                }
                _context2.next = 47;
                break;
              case 46:
                throw new Error(responseData.message || '例句生成失败');
              case 47:
                _context2.next = 53;
                break;
              case 49:
                _context2.prev = 49;
                _context2.t0 = _context2["catch"](6);
                console.error('例句生成错误:', _context2.t0);
                _this2.exampleError = _context2.t0.message || '例句生成失败，请重试';
              case 53:
                _context2.prev = 53;
                _this2.generatingExamples = false;
                return _context2.finish(53);
              case 56:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 49, 53, 56]]);
      }))();
    },
    // 保存到历史记录
    saveToHistory: function saveToHistory() {
      var _this3 = this;
      if (!this.inputText.trim() || !this.translatedText) {
        return;
      }

      // 检查是否已存在相同记录
      var existingIndex = this.history.findIndex(function (item) {
        return item.source === _this3.inputText.trim() && item.target === _this3.translatedText && item.fromLang === _this3.fromLanguage && item.toLang === _this3.toLanguage;
      });
      if (existingIndex !== -1) {
        // 如果已存在，更新时间为当前时间
        this.history[existingIndex].timestamp = Date.now();
        // 将该项移到最前面
        var existingItem = this.history.splice(existingIndex, 1)[0];
        this.history.unshift(existingItem);
        this.isInHistory = true;
      } else {
        // 添加新记录
        var newItem = {
          source: this.inputText.trim(),
          target: this.translatedText,
          fromLang: this.fromLanguage,
          toLang: this.toLanguage,
          timestamp: Date.now()
        };
        this.history.unshift(newItem);
        this.isInHistory = true;

        // 限制历史记录数量（最多50条）
        if (this.history.length > 50) {
          this.history = this.history.slice(0, 50);
        }
      }

      // 保存到本地存储
      this.saveHistoryToStorage();
    },
    // 从本地存储加载历史记录
    loadHistoryFromStorage: function loadHistoryFromStorage() {
      try {
        var historyData = uni.getStorageSync('translationHistory');
        if (historyData) {
          this.history = JSON.parse(historyData);
        }
      } catch (err) {
        console.error('加载历史记录失败:', err);
        this.history = [];
      }
    },
    // 保存历史记录到本地存储
    saveHistoryToStorage: function saveHistoryToStorage() {
      try {
        uni.setStorageSync('translationHistory', JSON.stringify(this.history));
      } catch (err) {
        console.error('保存历史记录失败:', err);
      }
    },
    // 加载历史记录项
    loadHistoryItem: function loadHistoryItem(item) {
      this.inputText = item.source;
      this.translatedText = item.target;
      this.fromLanguage = item.fromLang;
      this.toLanguage = item.toLang;
      this.isInHistory = true;
      // 清空例句数据
      this.examples = {};
      this.exampleError = '';

      // 滚动到顶部
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    // 删除单条历史记录
    deleteHistoryItem: function deleteHistoryItem(index) {
      var _this4 = this;
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这条翻译记录吗？',
        success: function success(res) {
          if (res.confirm) {
            _this4.history.splice(index, 1);
            _this4.saveHistoryToStorage();
            uni.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    // 清空所有历史记录
    clearHistory: function clearHistory() {
      var _this5 = this;
      if (this.history.length === 0) return;
      uni.showModal({
        title: '确认清空',
        content: '确定要清空所有翻译记录吗？此操作不可撤销。',
        success: function success(res) {
          if (res.confirm) {
            _this5.history = [];
            _this5.saveHistoryToStorage();
            uni.showToast({
              title: '已清空',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    // 格式化时间显示
    formatTime: function formatTime(timestamp) {
      var now = new Date();
      var date = new Date(timestamp);
      var diff = now - date;

      // 如果是今天
      if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
        return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
      }

      // 如果是昨天
      if (diff < 48 * 60 * 60 * 1000 && date.getDate() === now.getDate() - 1) {
        return '昨天 ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
      }

      // 其他情况显示完整日期
      return date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0');
    },
    getLangCode: function getLangCode(langName) {
      var langMap = {
        '中文': 'cn',
        '英文': 'en',
        '日语': 'ja',
        '韩语': 'ko'
      };
      return langMap[langName] || 'cn';
    },
    swapLanguage: function swapLanguage() {
      // 交换语言
      var temp = this.fromLanguage;
      this.fromLanguage = this.toLanguage;
      this.toLanguage = temp;

      // 如果已经有翻译结果，交换输入和输出
      if (this.translatedText) {
        var tempText = this.inputText;
        this.inputText = this.translatedText;
        this.translatedText = tempText;
        this.isInHistory = false;
        // 清空例句数据
        this.examples = {};
        this.exampleError = '';
      }
    },
    onInput: function onInput(e) {
      var _e$detail, _e$target;
      this.inputText = ((_e$detail = e.detail) === null || _e$detail === void 0 ? void 0 : _e$detail.value) || ((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value) || this.inputText;
      this.error = ''; // 输入时清空错误
      this.isInHistory = false;
      // 清空例句数据
      this.examples = {};
      this.exampleError = '';
    },
    copyText: function copyText() {
      if (this.translatedText) {
        uni.setClipboardData({
          data: this.translatedText,
          success: function success() {
            uni.showToast({
              title: '复制成功',
              icon: 'success'
            });
          }
        });
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 58:
/*!******************************************************************************************************************************************!*\
  !*** C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue?vue&type=style&index=0&id=3c212b86&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./speech.vue?vue&type=style&index=0&id=3c212b86&scoped=true&lang=css& */ 59);
/* harmony import */ var _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_speech_vue_vue_type_style_index_0_id_3c212b86_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 59:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/陈佳敏/Desktop/智启未来(2)/智启未来/hbuilder里面的/ZHI/pages/speech/speech.vue?vue&type=style&index=0&id=3c212b86&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[49,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/speech/speech.js.map