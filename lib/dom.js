
// refs https://github.com/marpple/FxJS-DOM/blob/master/fxjs-dom.js

const $ = function (el, parent = document) {
  return parent.querySelector(el);
}

$.all = function (el, parent = document) {
  return parent.querySelectorAll(el);
}

$.el = function (dom) {
  const divEl = document.createElement('div');
  divEl.innerHTML = dom;
  return divEl.childNodes[0];
}

$.append = curry2(function (parent, el) {
  return (parent.appendChild(el), el);
})

$.remove = function (el) {
  return el.parentNode.removeChild(el);
}

$.setCss = curry2(function (kv, els) {
  if (els instanceof NodeList) {
    els.forEach(el => $.setCss(kv, el));
  } else {
    els.style[kv[0]] = kv[1];
  }
  return els;
})
