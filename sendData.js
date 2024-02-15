function updateSavedText() {
  fetch('/getAllData')
    .then(response => response.json())
    .then(data => {
      const savedTextElement = document.getElementById('savedText');
      if (data.length > 0) {
        savedTextElement.innerHTML = '<strong>Сохраненные данные:</strong><br>';
        data.forEach(item => {
          // Создаем новый элемент с уникальным id для каждого сохраненного текста
          const newTextElement = document.createElement('div');
          newTextElement.id = `newtext_${item.id}`;
          newTextElement.innerHTML = item.data;
          // тут я добавляю элемент в savedText
          savedTextElement.appendChild(newTextElement);
        });
      } else {
        savedTextElement.innerHTML = '';
      }
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}

document.addEventListener('DOMContentLoaded',function (){
    updateSavedText();
})
// Функция для обновления js-textarea с сохраненными стилями
function updateTextareaWithStyles(htmlContent) {
    document.getElementById('js-textarea').innerHTML = htmlContent;
}

document.getElementById('savedText').addEventListener('click', function (event) {
  // При клике на сохраненный текст, обновляем js-textarea
  if (event.target.tagName === 'DIV') {
      const htmlContent = event.target.innerHTML;
      updateTextareaWithStyles(htmlContent);
  }
});

document.getElementById('save').addEventListener('click', function () {
  const data = document.getElementById('js-textarea').innerHTML;
  fetch('/saveData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
  })
  .then(response => response.json())
  .then(result => {
      console.log(result);
      updateSavedText();
  })
  .catch(error => {
      console.error('Ошибка при отправке данных:', error);
  });
});
