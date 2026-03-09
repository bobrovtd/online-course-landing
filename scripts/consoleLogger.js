document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('formValid', (event) => {
    const data = event.detail;
    if (!data) {
      return;
    }

    console.clear();
    console.log('Имя и фамилия:', data.name);
    console.log('Email:', data.email);
    console.log('Тема:', data.topic);
    console.log('Сообщение:', data.message);
    console.log('Согласие:', data.agreement ? 'Да' : 'Нет');
    console.log('Время отправки:', data.timestamp);
  });
});
