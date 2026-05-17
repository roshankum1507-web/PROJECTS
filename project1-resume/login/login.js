document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  var err = document.getElementById('loginError');
  var darkModeBtn = document.getElementById('darkModeBtn');
  var lightModeBtn = document.getElementById('lightModeBtn');
  var themeKey = 'theme';

  function updateThemeButtons() {
    if (localStorage.getItem(themeKey) === 'dark') {
      darkModeBtn.classList.add('hidden');
      lightModeBtn.classList.remove('hidden');
    } else {
      darkModeBtn.classList.remove('hidden');
      lightModeBtn.classList.add('hidden');
    }
  }

  function applyTheme() {
    if (localStorage.getItem(themeKey) === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    updateThemeButtons();
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.add('dark-theme');
      localStorage.setItem(themeKey, 'dark');
      updateThemeButtons();
    });
  }

  if (lightModeBtn) {
    lightModeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.remove('dark-theme');
      localStorage.setItem(themeKey, 'light');
      updateThemeButtons();
    });
  }

  applyTheme();

  var userInputEl = document.getElementById('loginUser');
  var passInputEl = document.getElementById('loginPass');
  if (userInputEl) userInputEl.addEventListener('input', function () { err.textContent = ''; });
  if (passInputEl) passInputEl.addEventListener('input', function () { err.textContent = ''; });
  
  var pwdToggle = document.getElementById('pwdToggle');
  if (pwdToggle && passInputEl) {
    pwdToggle.addEventListener('click', function () {
      var isShown = pwdToggle.getAttribute('aria-pressed') === 'true';
      if (isShown) {
        passInputEl.type = 'password';
        pwdToggle.setAttribute('aria-pressed', 'false');
        pwdToggle.textContent = 'Show';
        pwdToggle.setAttribute('aria-label', 'Show password');
      } else {
        passInputEl.type = 'text';
        pwdToggle.setAttribute('aria-pressed', 'true');
        pwdToggle.textContent = 'Hide';
        pwdToggle.setAttribute('aria-label', 'Hide password');
      }
      passInputEl.focus();
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var u = document.getElementById('loginUser').value.trim();
    var p = document.getElementById('loginPass').value.trim();
    if (!u || !p) {
      err.textContent = 'Please enter username and password.';
      return;
    }
    var EXPECTED_USER = 'ROSHAN';
    var EXPECTED_PASS = 'Roshan@15';
    if (u !== EXPECTED_USER) {
      var msg = 'Username is incorrect.';
      err.textContent = msg;
      document.getElementById('loginUser').focus();
      return;
    }
    if (p !== EXPECTED_PASS) {
      var msg = 'Password is incorrect.';
      err.textContent = msg;
      document.getElementById('loginPass').focus();
      return;
    }
    
    err.textContent = '';
    localStorage.setItem('loggedIn', 'true');
    window.location.href = '../portfolio/portfolio.html';
  });
});
