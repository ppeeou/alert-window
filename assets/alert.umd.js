var t,e;t=this,e=function(t){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var s=13,o=27,l=32,r="alert-window",a="alert-window-title",c="alert-window-text",d="alert-window-btn",u="alert-window-btn-ok",f="alert-window-btn-cancel",b="alert-window-btn-submit",h=function(){function t(){n(this,t),this.labels={ok:"OK",cancel:"Cancel"},this.elements={body:"<div class="+r+"></div>",buttons:{submit:'<button type="submit" class="'+d+" "+b+'">{{ok}}</button>',ok:'<button class="'+d+" "+u+'">{{ok}}</button>',cancel:'<button class="'+d+" "+f+'">{{cancel}}</button>'},title:'<p class="'+a+'">{{title}}</p>',text:'<p class="'+c+'">{{text}}</p>'},this.init=this.init.bind(this),this.setup=this.setup.bind(this),this.dialog=this.dialog.bind(this),this.alertSet=this.alertSet.bind(this),this.addListeners=this.addListeners.bind(this),this.alert=this.alertSet("alert"),this.confirm=this.alertSet("confirm")}return i(t,[{key:"init",value:function(){return this.elWindow=$.el(this.elements.body),pipe($.setCss(["position","fixed"]),$.setCss(["top",0]),$.setCss(["left",0]),$.setCss(["right",0]),$.setCss(["bottom",0]),$.setCss(["background","rgba(0, 0, 0, 0.2)"]),$.setCss(["z-index",1e3]),$.append($("body")))(this.elWindow)}},{key:"setup",value:function(t){this.elWindow=$("."+r),this.elWindow.innerHTML=this.build(t),pipe($.setCss(["position","relative"]),$.setCss(["top","25%"]),$.setCss(["left","50%"]),$.setCss(["transform","translate(-50%,-50%)"]),$.setCss(["background","#fff"]),$.setCss(["width","200px"]),$.setCss(["height","100px"]),$.setCss(["border-radius","4px"]))($(".alert-window-container")),this.btnOk=$("."+u),this.btnCancel=$("."+f),this.addListeners(t.callback)}},{key:"build",value:function(t){var n,i,s=t.type,o=t.message,l="string"==typeof o?o:o.title,r="object"===(void 0===o?"undefined":e(o))?o.text:"",a="",c=void 0;switch(n="\n        <header class=alert-window-header>\n          <div>\n            "+this.elements.title.replace("{{title}}",l)+"\n          </div>\n        </header>\n      ",i="\n      <section class=alert-window-body>\n        "+this.elements.text.replace("{{text}}",r)+"\n      </section>",s){case"confirm":c="\n            <footer class=alert-window-footer>\n              "+this.elements.buttons.ok.replace("{{ok}}",this.labels.ok)+"\n              "+this.elements.buttons.cancel.replace("{{cancel}}",this.labels.cancel)+"\n            </footer>\n          ";break;case"alert":c="<footer class=alert-window-footer>\n              "+this.elements.buttons.ok.replace("{{ok}}",this.labels.ok)+"\n            </footer>"}return a+="<div class=alert-window-container>",a+=n,a+=i,a+=c,a+="</div>"}},{key:"addListeners",value:function(t){var e,n,i=this,r=!!this.btnOk,a=!!this.btnCancel,c=void 0,d=void 0;e=function(t){var e=t.keyCode;return e===s||e===l?c(t):e===o?d(t):void 0},n=function(){i.eventUnBind(document.body,"keyup",e),r&&i.eventUnBind(i.btnOk,"click",c),a&&i.eventUnBind(i.btnCancel,"click",d),i.close()},c=function(e){e.preventDefault&&e.preventDefault(),n(),t(null,!0)},d=function(e){e.preventDefault&&e.preventDefault(),n(),t(null,!1)},r&&this.eventBind(this.btnOk,"click",c),a&&this.eventBind(this.btnCancel,"click",d),this.eventBind(document.body,"keyup",e)}},{key:"eventBind",value:function(t,e,n){"function"==typeof t.addEventListener?t.addEventListener(e,n):t.attachEvent&&t.attachEvent("on"+e,n)}},{key:"eventUnBind",value:function(t,e,n){"function"==typeof t.removeEventListener?t.removeEventListener(e,n):t.detachEvent&&t.detachEvent("on"+e,n)}},{key:"close",value:function(){this.elWindow&&$.remove(this.elWindow)}},{key:"dialog",value:function(t,n,i){if(!function(t){return"string"==typeof t||"object"===(void 0===t?"undefined":e(t))&&"string"==typeof t.title&&void 0}(n))throw new Error("message must be a string or object!");if(!$("."+r)){var s={type:t,message:n,callback:i};this.init(),this.setup(s)}}},{key:"alertSet",value:function(t){var e=this;return function(n){return toPromise(e.dialog)(t,n)}}}]),t}();t.AlertWindow=new h}(window),Object.defineProperty(t,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.alert={});
//# sourceMappingURL=alert.umd.js.map
