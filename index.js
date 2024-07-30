  // Проверяем, какая тема у пользователя и применяем соответствующие стили
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

  // Обработчик изменения темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    document.body.classList.toggle('dark-mode', e.matches);
});


