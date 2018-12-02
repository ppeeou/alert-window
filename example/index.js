


const alertBtn = document.querySelector('.alert');
const confirmBtn = document.querySelector('.confirm');
const resultDom = document.querySelector('.result');

alertBtn.onclick = alertClick;
confirmBtn.onclick = confirmClick;

function alertClick() {
  AlertWindow
    .alert('alert message')
    .then((isOk) => {
      resultDom.innerHTML = `alert ${isOk}`;
    })
}

async function confirmClick() {
  const isOk = await AlertWindow.confirm('confirm message');
  if (isOk) {
    resultDom.innerHTML = 'confirm True!';
  } else {
    resultDom.innerHTML = 'confirm False!';
  }
}