var l_r = 0;
var isAnimating = false;
const textarea = document.querySelector("textarea");
const aboutYouText = document.querySelector(".about_you_text");
const exampleText = document.getElementById("output");

function moveObject() {
  if (isAnimating) return;

  var object = document.querySelector('.blue_rec');
  var buyerText = document.getElementById('buyer_text');
  var freelancerText = document.getElementById('freelancer_text');
  var currentLeft = parseInt(getComputedStyle(object).left);

  if (l_r == 0) {
    animateObject(object, currentLeft + 165, buyerText, freelancerText);
    aboutYouText.classList.remove("fade-out");
    aboutYouText.classList.add("fade-in");
    l_r = 1;
  } else {
    animateObject(object, currentLeft - 165, freelancerText, buyerText);
    aboutYouText.classList.remove("fade-in");
    aboutYouText.classList.add("fade-out");
    l_r = 0;
  }
}

function animateObject(object, newLeft, activeText, inactiveText) {
  isAnimating = true;

  object.style.left = newLeft + 'px';

  activeText.style.color = "#797979"; // Изменяем цвет активного текста
  inactiveText.style.color = "white"; // Восстанавливаем цвет неактивного текста

  setTimeout(function() {
    isAnimating = false;
  }, 500);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newColorScheme = e.matches ? "dark" : "light";
  document.body.classList.toggle('dark-mode', e.matches);
});

textarea.addEventListener("input", e => {
  
  let scHeight = e.target.scrollHeight;
  if (scHeight < 110) {
    textarea.style.height = `${scHeight}px`; // Устанавливаем высоту только если она не превышает максимум
  } else {
    textarea.style.height = '110px';
  }
  if (textarea.textLength == '0') {
    textarea.style.height = '20px'
    console.log(scHeight)
  }
  console.log(textarea.style.height)
  textarea.style.height = "auto";
  exampleText.style.top = `${textarea.offsetHeight + 10}px`; // Обновляем позицию примера
  
});

textarea.addEventListener('keydown', function(event) {
  // Проверяем код клавиши
  if (event.keyCode === 13) {
      // Отменяем действие по умолчанию (ввод Enter)
      event.preventDefault();
  }
});
