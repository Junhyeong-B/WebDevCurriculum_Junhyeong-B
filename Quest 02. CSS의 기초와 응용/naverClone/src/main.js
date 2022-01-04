const nowPlayContainer = document.querySelector('.nowPlay');
const indicatorsContainer = document.querySelector('.indicatorsContainer');
const nowPlayBox = document.querySelector('.nowPlay__flexbox');
const indicatorBox = document.querySelector('.indicators__flexBox');

const { width: nowPlayContainerWidth } = nowPlayContainer.getBoundingClientRect();
const { width: indicatorsContainerWidth } = indicatorsContainer.getBoundingClientRect();
const { width: nowPlayBoxWidth } = nowPlayBox.getBoundingClientRect();
const { width: indicatorBoxWidth } = indicatorBox.getBoundingClientRect();

let nowPlayIsDragging = null;
let indicatorIsDragging = null;
let originLeft = null;
let originX = null;

// PC 웹
nowPlayBox.addEventListener('mousedown', e => {
  e.preventDefault();
  nowPlayIsDragging = true;
  originX = e.clientX;
  originLeft = nowPlayBox.offsetLeft;
});

indicatorBox.addEventListener('mousedown', e => {
  e.preventDefault();
  indicatorIsDragging = true;
  originX = e.clientX;
  originLeft = indicatorBox.offsetLeft;
});

document.addEventListener('mouseup', () => {
  nowPlayIsDragging = false;
  indicatorIsDragging = false;
});

document.addEventListener('mousemove', e => {
  if (nowPlayIsDragging) {
    const diffX = e.clientX - originX;
    const endPointOfX = nowPlayContainerWidth - nowPlayBoxWidth;
    nowPlayBox.style.left = `${Math.max(
      endPointOfX - 30,
      Math.min(0, originLeft + diffX),
    )}px`;
  } else if (indicatorIsDragging) {
    const endPointOfX = indicatorsContainerWidth - indicatorBoxWidth;
    const diffX = e.clientX - originX;
    indicatorBox.style.left = `${Math.max(
      endPointOfX - 30,
      Math.min(0, originLeft + diffX),
    )}px`;
  }
});

// 모바일
nowPlayBox.addEventListener('touchstart', () => {
  e.preventDefault();
  nowPlayIsDragging = true;
  originX = e.touches[0].clientX;
  originLeft = nowPlayBox.offsetLeft;
});

indicatorBox.addEventListener('touchstart', e => {
  e.preventDefault();
  indicatorIsDragging = true;
  originX = e.touches[0].clientX;
  originLeft = indicatorBox.offsetLeft;
});

document.addEventListener('touchend', () => {
  nowPlayIsDragging = false;
  indicatorIsDragging = false;
});

document.addEventListener('touchmove', e => {
  if (nowPlayIsDragging) {
    const diffX = e.touches[0].clientX - originX;
    const endPointOfX = nowPlayContainerWidth - nowPlayBoxWidth;
    nowPlayBox.style.left = `${Math.max(
      endPointOfX - 30,
      Math.min(0, originLeft + diffX),
    )}px`;
  } else if (indicatorIsDragging) {
    const endPointOfX = indicatorsContainerWidth - indicatorBoxWidth;
    const diffX = e.touches[0].clientX - originX;
    indicatorBox.style.left = `${Math.max(
      endPointOfX - 30,
      Math.min(0, originLeft + diffX),
    )}px`;
  }
});
