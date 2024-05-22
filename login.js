const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');

let usuario = '';
let contraseña = '';

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  usuario = document.getElementById('usuario').value;
  contraseña = document.getElementById('contraseña').value;

  // si el usuario y contraseña son correctos
  if (usuario === 'admin' && contraseña === 'chikito') {
    loginStatus.textContent = 'Login Exitoso!';
    loginStatus.style.color = 'green';
    location.href = 'AccionesAdmin.html';


  } else {
    loginStatus.textContent = 'Usuario o contraseña incorrecto';
    loginStatus.style.color = 'ed';
  }
});