import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);

restoreForm();
function storageFormData(event) {
    
    formData[event.target.name] = event.target.value;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  
  console.log(formData);
  
    event.currentTarget.reset();
    
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
}
function restoreForm() {
    
    if (formData) {
      let { email, message } = form.elements;
      email.value = formData.email || '';
      message.value = formData.message || '';
    }
}