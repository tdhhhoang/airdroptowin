var mdown = new MouseEvent("pointerdown", { view: null, bubbles: true, cancelable: true });
var autoclick = function () {
  var clickableArea = document.getElementsByClassName("clickableArea");
  if (clickableArea) {
    clickableArea[0]?.dispatchEvent(mdown);
    clickableArea[0]?.click();
  }
};
var autoclickBtn = function () {
  var ele = document.querySelector('button[class*="_button_"][class*="_purple_"][class*="_textUppercase_"]');
  if (ele) {
    console.log(".");
    ele?.dispatchEvent(mdown);
    ele?.click();
  }
};

function start() {
  if (window.auto) clearInterval(window.auto);
  if (window.click) clearInterval(window.click);
  window.auto = setInterval(autoclick, 90);
  window.click = setInterval(autoclickBtn, 200);
}

function stop() {
  if (window.click) clearInterval(window.click);
}

start()
