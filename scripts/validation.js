document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  if (!form) {
    return;
  }

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    topic: document.getElementById('topic'),
    message: document.getElementById('message'),
    agreement: document.getElementById('agreement'),
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors(form);

    let isValid = true;

    const nameValue = fields.name.value.trim();
    const nameWords = nameValue.split(' ').filter((word) => word.length > 0);
    if (nameValue === '') {
      showError(fields.name, 'Введите имя и фамилию.');
      isValid = false;
    } else if (nameWords.length < 2) {
      showError(fields.name, 'Укажите минимум два слова.');
      isValid = false;
    }

    const emailValue = fields.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
      showError(fields.email, 'Введите email.');
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(fields.email, 'Введите корректный email.');
      isValid = false;
    }

    const topicValue = fields.topic.value.trim();
    if (!topicValue) {
      showError(fields.topic, 'Выберите тему обращения.');
      isValid = false;
    }

    const messageValue = fields.message.value.trim();
    if (messageValue === '') {
      showError(fields.message, 'Введите сообщение.');
      isValid = false;
    }

    if (!fields.agreement.checked) {
      showError(fields.agreement, 'Подтвердите согласие на обработку данных.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const formData = {
      name: nameValue,
      email: emailValue,
      topic: topicValue,
      message: messageValue,
      agreement: fields.agreement.checked,
      timestamp: new Date().toLocaleString(),
    };

    const validEvent = new CustomEvent('formValid', { detail: formData });
    document.dispatchEvent(validEvent);

    alert('Форма отправлена. Данные выведены в консоль.');
    form.reset();
  });

  form.querySelectorAll('.form-control, .form-select, .form-check-input').forEach((input) => {
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });
});

function showError(input, message) {
  input.classList.add('is-invalid');
  const container = input.closest('.mb-3, .form-check, .form-floating, .input-group');
  if (!container) {
    return;
  }

  let feedback = container.querySelector('.invalid-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.classList.add('invalid-feedback');
    container.appendChild(feedback);
  }

  feedback.textContent = message;
  if (container.classList.contains('form-check')) {
    feedback.classList.add('d-block');
  }
}

function clearErrors(form) {
  form.querySelectorAll('.is-invalid').forEach((input) => input.classList.remove('is-invalid'));
  form.querySelectorAll('.invalid-feedback').forEach((feedback) => feedback.remove());
}

function clearFieldError(input) {
  input.classList.remove('is-invalid');
  const container = input.closest('.mb-3, .form-check, .form-floating, .input-group');
  if (!container) {
    return;
  }

  const feedback = container.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.remove();
  }
}
