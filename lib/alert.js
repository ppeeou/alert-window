
(!function (window) {
  const KEYS = { ENTER: 13, ESC: 27, SPACE: 32 };

  const WINDOW_EL = 'alert-window';
  const WINDOW_TITLE = 'alert-window-title';
  const WINDOW_TEXT = 'alert-window-text';
  const WINDOW_BODY = 'alert-window-body';
  const WINDOW_HEADER = 'alert-window-header';
  const WINDOW_FOOTER = 'alert-window-footer';
  const WINDOW_CONTAINER = 'alert-window-container';

  const WINDOW_BTN = 'alert-window-btn';
  const WINDOW_BTN_OK = 'alert-window-btn-ok';
  const WINDOW_BTN_CANCEL = 'alert-window-btn-cancel';
  const WINDOW_BTN_SUBMIT = 'alert-window-btn-submit';

  class AlertWindow {
    constructor() {
      this.labels = {
        ok: "OK",
        cancel: "Cancel"
      }

      this.elements = {
        body: `<div class=${WINDOW_EL}></div>`,
        buttons: {
          submit: `<button type="submit" class="${WINDOW_BTN} ${WINDOW_BTN_SUBMIT}">{{ok}}</button>`,
          ok: `<button class="${WINDOW_BTN} ${WINDOW_BTN_OK}">{{ok}}</button>`,
          cancel: `<button class="${WINDOW_BTN} ${WINDOW_BTN_CANCEL}">{{cancel}}</button>`
        },

        title: `<p class="${WINDOW_TITLE}">{{title}}</p>`,
        text: `<p class="${WINDOW_TEXT}">{{text}}</p>`,
      }

      this.init = this.init.bind(this);
      this.setup = this.setup.bind(this);
      this.dialog = this.dialog.bind(this);
      this.alertSet = this.alertSet.bind(this);
      this.addListeners = this.addListeners.bind(this);

      this.alert = this.alertSet('alert');
      this.confirm = this.alertSet('confirm');
    }

    init() {
      this.elWindow = $.el(this.elements.body);
      return pipe(
        // css
        $.setCss(['position', 'fixed']),
        $.setCss(['top', 0]),
        $.setCss(['left', 0]),
        $.setCss(['right', 0]),
        $.setCss(['bottom', 0]),
        $.setCss(['background', 'rgba(0, 0, 0, 0.2)']),
        $.setCss(['z-index', 1000]),
        // append
        $.append($('body')),
      )(this.elWindow);
    }

    setup(item) {
      this.elWindow = $(`.${WINDOW_EL}`);
      this.elWindow.innerHTML = this.build(item);

      pipe(
        $.setCss(['position', 'relative']),
        $.setCss(['top', '25%']),
        $.setCss(['left', '50%']),
        $.setCss(['transform', 'translate(-50%,-50%)']),
        $.setCss(['background', '#fff']),
        $.setCss(['width', '200px']),
        $.setCss(['height', '100px']),
        $.setCss(['border-radius', '4px']),
      )($(`.${WINDOW_CONTAINER}`));

      this.btnOk = $(`.${WINDOW_BTN_OK}`);
      this.btnCancel = $(`.${WINDOW_BTN_CANCEL}`);

      this.addListeners(item.callback);
    }

    build(item) {
      const {
        type,
        message,
      } = item;

      let title = typeof message === 'string' ? message : message.title;
      let text = typeof message === 'object' ? message.text : '';

      let html = '';
      let header, body, footer;

      // header
      header = `
        <header class=${WINDOW_HEADER}>
          <div>
            ${this.elements.title.replace('{{title}}', title)}
          </div>
        </header>
      `;
      // body
      body = `
      <section class=${WINDOW_BODY}>
        ${this.elements.text.replace('{{text}}', text)}
      </section>`;

      switch (type) {
        case 'confirm':
          footer = `
            <footer class=${WINDOW_FOOTER}>
              ${this.elements.buttons.ok.replace('{{ok}}', this.labels.ok)}
              ${this.elements.buttons.cancel.replace('{{cancel}}', this.labels.cancel)}
            </footer>
          `;
          break;

        case 'alert':
          footer =
            `<footer class=${WINDOW_FOOTER}>
              ${this.elements.buttons.ok.replace('{{ok}}', this.labels.ok)}
            </footer>`;
          break;
      }

      html += `<div class=${WINDOW_CONTAINER}>`
      html += header;
      html += body;
      html += footer;
      html += '</div>';
      return html;
    }

    addListeners(fn) {
      const hasOK = !!this.btnOk;
      const hasCancel = !!this.btnCancel;

      let key, common, ok, cancel;

      key = (event) => {
        const keyCode = event.keyCode;
        if ((keyCode === KEYS.ENTER || keyCode === KEYS.SPACE)) return ok(event);
        if (keyCode === KEYS.ESC) return cancel(event);
      }

      common = () => {
        this.eventUnBind(document.body, 'keyup', key);
        if (hasOK) {
          this.eventUnBind(this.btnOk, 'click', ok);
        }

        if (hasCancel) {
          this.eventUnBind(this.btnCancel, 'click', cancel);
        }

        this.close();
      }

      ok = (event) => {
        if (event.preventDefault) event.preventDefault();
        common();
        fn(null, true);
      }

      cancel = (event) => {
        if (event.preventDefault) event.preventDefault();
        common();
        fn(null, false);
      }

      if (hasOK) this.eventBind(this.btnOk, 'click', ok);
      if (hasCancel) this.eventBind(this.btnCancel, 'click', cancel);
      this.eventBind(document.body, 'keyup', key);
    }

    eventBind(el, event, fn) {
      if (typeof el.addEventListener === 'function') {
        el.addEventListener(event, fn);
      } else if (el.attachEvent) {
        el.attachEvent("on" + event, fn);
      }
    }

    eventUnBind(el, event, fn) {
      if (typeof el.removeEventListener === "function") {
        el.removeEventListener(event, fn);
      } else if (el.detachEvent) {
        el.detachEvent("on" + event, fn);
      }
    }

    close() {
      if (this.elWindow) {
        $.remove(this.elWindow);
      }
    }

    dialog(type, message, callback) {
      function validation(message) {
        if (typeof message === 'string') return true;
        if (typeof message === 'object' && typeof message.title === 'string') return;
        return false;
      }

      if (!validation(message)) throw new Error('message must be a string or object!');
      if ($(`.${WINDOW_EL}`)) return;

      const item = { type, message, callback };
      this.init();
      this.setup(item);
    }

    alertSet(type) {
      return (message) => toPromise(this.dialog)(type, message);
    }
  }

  window.AlertWindow = new AlertWindow();
}(window));

