'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

!function (window) {
  var KEYS = { ENTER: 13, ESC: 27, SPACE: 32 };

  var WINDOW_EL = 'alert-window';
  var WINDOW_TITLE = 'alert-window-title';
  var WINDOW_TEXT = 'alert-window-text';
  var WINDOW_BODY = 'alert-window-body';
  var WINDOW_HEADER = 'alert-window-header';
  var WINDOW_FOOTER = 'alert-window-footer';
  var WINDOW_CONTAINER = 'alert-window-container';

  var WINDOW_BTN = 'alert-window-btn';
  var WINDOW_BTN_OK = 'alert-window-btn-ok';
  var WINDOW_BTN_CANCEL = 'alert-window-btn-cancel';
  var WINDOW_BTN_SUBMIT = 'alert-window-btn-submit';

  var AlertWindow = function () {
    function AlertWindow() {
      classCallCheck(this, AlertWindow);

      this.labels = {
        ok: "OK",
        cancel: "Cancel"
      };

      this.elements = {
        body: '<div class=' + WINDOW_EL + '></div>',
        buttons: {
          submit: '<button type="submit" class="' + WINDOW_BTN + ' ' + WINDOW_BTN_SUBMIT + '">{{ok}}</button>',
          ok: '<button class="' + WINDOW_BTN + ' ' + WINDOW_BTN_OK + '">{{ok}}</button>',
          cancel: '<button class="' + WINDOW_BTN + ' ' + WINDOW_BTN_CANCEL + '">{{cancel}}</button>'
        },

        title: '<p class="' + WINDOW_TITLE + '">{{title}}</p>',
        text: '<p class="' + WINDOW_TEXT + '">{{text}}</p>'
      };

      this.init = this.init.bind(this);
      this.setup = this.setup.bind(this);
      this.dialog = this.dialog.bind(this);
      this.alertSet = this.alertSet.bind(this);
      this.addListeners = this.addListeners.bind(this);

      this.alert = this.alertSet('alert');
      this.confirm = this.alertSet('confirm');
    }

    createClass(AlertWindow, [{
      key: 'init',
      value: function init() {
        this.elWindow = $.el(this.elements.body);
        return pipe(
        // css
        $.setCss(['position', 'fixed']), $.setCss(['top', 0]), $.setCss(['left', 0]), $.setCss(['right', 0]), $.setCss(['bottom', 0]), $.setCss(['background', 'rgba(0, 0, 0, 0.2)']), $.setCss(['z-index', 1000]),
        // append
        $.append($('body')))(this.elWindow);
      }
    }, {
      key: 'setup',
      value: function setup(item) {
        this.elWindow = $('.' + WINDOW_EL);
        this.elWindow.innerHTML = this.build(item);

        pipe($.setCss(['position', 'relative']), $.setCss(['top', '25%']), $.setCss(['left', '50%']), $.setCss(['transform', 'translate(-50%,-50%)']), $.setCss(['background', '#fff']), $.setCss(['width', '200px']), $.setCss(['height', '100px']), $.setCss(['border-radius', '4px']))($('.' + WINDOW_CONTAINER));

        this.btnOk = $('.' + WINDOW_BTN_OK);
        this.btnCancel = $('.' + WINDOW_BTN_CANCEL);

        this.addListeners(item.callback);
      }
    }, {
      key: 'build',
      value: function build(item) {
        var type = item.type,
            message = item.message;


        var title = typeof message === 'string' ? message : message.title;
        var text = (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object' ? message.text : '';

        var html = '';
        var header = void 0,
            body = void 0,
            footer = void 0;

        // header
        header = '\n        <header class=' + WINDOW_HEADER + '>\n          <div>\n            ' + this.elements.title.replace('{{title}}', title) + '\n          </div>\n        </header>\n      ';
        // body
        body = '\n      <section class=' + WINDOW_BODY + '>\n        ' + this.elements.text.replace('{{text}}', text) + '\n      </section>';

        switch (type) {
          case 'confirm':
            footer = '\n            <footer class=' + WINDOW_FOOTER + '>\n              ' + this.elements.buttons.ok.replace('{{ok}}', this.labels.ok) + '\n              ' + this.elements.buttons.cancel.replace('{{cancel}}', this.labels.cancel) + '\n            </footer>\n          ';
            break;

          case 'alert':
            footer = '<footer class=' + WINDOW_FOOTER + '>\n              ' + this.elements.buttons.ok.replace('{{ok}}', this.labels.ok) + '\n            </footer>';
            break;
        }

        html += '<div class=' + WINDOW_CONTAINER + '>';
        html += header;
        html += body;
        html += footer;
        html += '</div>';
        return html;
      }
    }, {
      key: 'addListeners',
      value: function addListeners(fn) {
        var _this = this;

        var hasOK = !!this.btnOk;
        var hasCancel = !!this.btnCancel;

        var key = void 0,
            common = void 0,
            ok = void 0,
            cancel = void 0;

        key = function key(event) {
          var keyCode = event.keyCode;
          if (keyCode === KEYS.ENTER || keyCode === KEYS.SPACE) return ok(event);
          if (keyCode === KEYS.ESC) return cancel(event);
        };

        common = function common() {
          _this.eventUnBind(document.body, 'keyup', key);
          if (hasOK) {
            _this.eventUnBind(_this.btnOk, 'click', ok);
          }

          if (hasCancel) {
            _this.eventUnBind(_this.btnCancel, 'click', cancel);
          }

          _this.close();
        };

        ok = function ok(event) {
          if (event.preventDefault) event.preventDefault();
          common();
          fn(null, true);
        };

        cancel = function cancel(event) {
          if (event.preventDefault) event.preventDefault();
          common();
          fn(null, false);
        };

        if (hasOK) this.eventBind(this.btnOk, 'click', ok);
        if (hasCancel) this.eventBind(this.btnCancel, 'click', cancel);
        this.eventBind(document.body, 'keyup', key);
      }
    }, {
      key: 'eventBind',
      value: function eventBind(el, event, fn) {
        if (typeof el.addEventListener === 'function') {
          el.addEventListener(event, fn);
        } else if (el.attachEvent) {
          el.attachEvent("on" + event, fn);
        }
      }
    }, {
      key: 'eventUnBind',
      value: function eventUnBind(el, event, fn) {
        if (typeof el.removeEventListener === "function") {
          el.removeEventListener(event, fn);
        } else if (el.detachEvent) {
          el.detachEvent("on" + event, fn);
        }
      }
    }, {
      key: 'close',
      value: function close() {
        if (this.elWindow) {
          $.remove(this.elWindow);
        }
      }
    }, {
      key: 'dialog',
      value: function dialog(type, message, callback) {
        function validation(message) {
          if (typeof message === 'string') return true;
          if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object' && typeof message.title === 'string') return;
          return false;
        }

        if (!validation(message)) throw new Error('message must be a string or object!');
        if ($('.' + WINDOW_EL)) return;

        var item = { type: type, message: message, callback: callback };
        this.init();
        this.setup(item);
      }
    }, {
      key: 'alertSet',
      value: function alertSet(type) {
        var _this2 = this;

        return function (message) {
          return toPromise(_this2.dialog)(type, message);
        };
      }
    }]);
    return AlertWindow;
  }();

  window.AlertWindow = new AlertWindow();
}(window);
//# sourceMappingURL=alert.js.map
