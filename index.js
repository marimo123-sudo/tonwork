  // Проверяем, какая тема у пользователя и применяем соответствующие стили
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

  // Обработчик изменения темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    document.body.classList.toggle('dark-mode', e.matches);
});

if (window.devicePixelRatio !== 1) { // Костыль для определения иных устройств, с коэффициентом отличным от 1		
  var dpt = window.devicePixelRatio;
  var widthM = window.screen.width * dpt;
  var widthH = window.screen.height * dpt;
  document.write('<meta name="viewport" content="width=' + widthM+ ', height=' + widthH + '">');
}

Telegram.WebApp.ready();
Telegram.WebApp.setBackgroundColor('#000000'); // Устанавливаем черный цвет рамки

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// Запрещает изменение масштаба через жесты на устройствах с сенсорным экраном
document.addEventListener('touchmove', function (event) {
  if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });
