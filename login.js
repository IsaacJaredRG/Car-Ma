const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');

let username = '';
let password = '';

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  username = document.getElementById('username').value;
  password = document.getElementById('password').value;

  // Check if username and password are correct
  if (username === 'admin' && password === 'chikito') {
    loginStatus.textContent = 'Login successful!';
    loginStatus.style.color = 'green';
  } else {
    loginStatus.textContent = 'Invalid username or password';
    loginStatus.style.color = 'ed';
  }
});