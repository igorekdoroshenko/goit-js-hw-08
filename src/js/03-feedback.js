import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  
    const formDataJson = JSON.stringify(formData);
      try {
    localStorage.setItem(STORAGE_KEY, formDataJson);
    } catch (e) {
    console.error('LocalStorage not supported');
     }
};

function restoreFormState() {
  const formDataJson = localStorage.getItem(STORAGE_KEY);

  if (formDataJson) {
    const formData = JSON.parse(formDataJson);
    const formElements = form.elements;
    
    formElements.email.value = formData.mail;
    formElements.message.value = formData.message;
  }
}

document.addEventListener('DOMContentLoaded', restoreFormState);

function onFormSubmit(event) {
  event.preventDefault();

  const formDataJson = localStorage.getItem(STORAGE_KEY);
  const formData = JSON.parse(formDataJson);

  console.log('Email:', formData.mail);
  console.log('Message:', formData.message);

  localStorage.removeItem(STORAGE_KEY);

  event.currentTarget.reset();
}