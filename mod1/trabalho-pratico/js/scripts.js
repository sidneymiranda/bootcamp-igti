window.addEventListener('load', start);

function start() {
  const red = document.querySelector('#red');
  const green = document.querySelector('#green');
  const blue = document.querySelector('#blue');

  const inputValueRed = document.querySelector('#r');
  const inputValueGreen = document.querySelector('#g');
  const inputValueBlue = document.querySelector('#b');

  inputValueRed.addEventListener('input', () => updateColor());
  inputValueGreen.addEventListener('input', () => updateColor());
  inputValueBlue.addEventListener('input', () => updateColor());

  function updateColor() {
    let r = (red.value = inputValueRed.value);
    let g = (green.value = inputValueGreen.value);
    let b = (blue.value = inputValueBlue.value);

    let colors = document.querySelector('#colors');
    colors.style.backgroundColor = `rgb(${r},${g}, ${b})`;
  }
}
