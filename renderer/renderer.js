const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const usernameValue = username.value;
  ipcRenderer.send('add:username', usernameValue);
})