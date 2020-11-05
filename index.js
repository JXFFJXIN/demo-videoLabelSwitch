var index = 0;
var timer = null;
var maxIndex = list.length - 1;
var oMain = document.getElementsByClassName('main')[0];
var oList = document.getElementsByClassName('list')[0];

function init () {
  render();
  autoMove(++ index);
  handle();
}

function render () {
  var template = '';

  for(var i = 0; i < list.length; i ++) {
    var item = list[i];
    template += `
      <li 
        class="item ${i === index ? 'active' : ''}" 
        title="${item.title}：${item.desc}"
        data-index=${i}
      >
        <span class="title">${item.title}</span>
        ${item.desc}
      </li>
    `;
  }

  oList.innerHTML = template;
}

function autoMove (i) {
  timer = setTimeout(function () {
    changePic(i);
    autoMove(getIndex(++ i));
  }, 3000)
}

function changePic (i) {
  var oItem = oList.getElementsByClassName('item')[i];
  var oActive = oList.getElementsByClassName('active')[0];

  if(oItem === oActive) { return };

  oItem.classList.add('active');
  oActive.classList.remove('active');

  oMain.style.backgroundImage = `url(${list[i].poster})`;
  oMain.style.backgroundColor = list[i].color;
}

function getIndex (index) {
  return index > maxIndex ? 0 : index;
}

function handle () {
  handleEnter();
  handleLeave();
}

function handleEnter () {
  var oItemMap = oList.getElementsByClassName('item');
  for(var i = 0; i < oItemMap.length; i ++) {
    (function (j) {
      oItemMap[j].onmouseenter = function () {
        clearTimeout(timer);
        changePic(j);
        index = j;
      }
    })(i)
  }
};

function handleLeave () {
  oList.onmouseleave = function () {
    autoMove(getIndex(++ index));
  };
}

init();