const contact_form = document.querySelector('#contact-form');

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

contact_form.addEventListener('submit', (event) => {
  event.preventDefault();
    
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const message = document.querySelector('#message');
  
  let isValid = validateForm([firstName, lastName, email, phone, message]);

  if (isValid) {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      message: message.value
    };

    sendFormData(formData);
  }
});
  
function validateForm(fields) {
  let isValid = true;
  
  fields.forEach(field => {
    const errorField = document.querySelector(`#${field.id}-error`);
    if (!field.value.trim()) {
      errorField.textContent = `Поле ${field.previousElementSibling.textContent} обязательно`;
      errorField.style.display = 'block';
      isValid = false;
    } else {
      errorField.style.display = 'none';
    }

    if (field.type === 'email' && !isValidEmail(field.value)) {
      errorField.textContent = 'Введите корректный email';
      errorField.style.display = 'block';
      isValid = false;
    }
  });

  return isValid;
};

function sendFormData(formData) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      document.getElementById('response-message').textContent = 'Форма успешно отправлена!';
      document.getElementById('response-message').style.color = 'green';
    } else {
      document.getElementById('response-message').textContent = 'Ошибка отправки формы. Попробуйте позже.';
      document.getElementById('response-message').style.color = 'red';
    }
  };

  xhr.onerror = function () {
    document.getElementById('response-message').textContent = 'Ошибка сети. Попробуйте позже.';
    document.getElementById('response-message').style.color = 'red';
  };

  xhr.send(JSON.stringify(formData));
}