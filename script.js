
/* Accessible interactivity */
const menuToggle = document.getElementById('menuToggle');
const primaryMenu = document.getElementById('primaryMenu');
const toggleTheme = document.getElementById('toggleTheme');
const toggleContrast = document.getElementById('toggleContrast');
const contactForm = document.getElementById('contactForm');

function setAriaExpanded(el, state){
  el.setAttribute('aria-expanded', String(state));
}

menuToggle.addEventListener('click', () => {
  const isOpen = primaryMenu.hasAttribute('hidden') ? false : true;
  if(isOpen){
    primaryMenu.setAttribute('hidden','');
    setAriaExpanded(menuToggle,false);
  } else {
    primaryMenu.removeAttribute('hidden');
    setAriaExpanded(menuToggle,true);
    primaryMenu.querySelector('a')?.focus();
  }
});

/* Theme handling */
function applyTheme(theme){
  document.documentElement.classList.remove('dark');
  if(theme === 'dark') document.documentElement.classList.add('dark');
  toggleTheme.setAttribute('aria-pressed', String(theme === 'dark'));
  localStorage.setItem('pf_theme', theme);
}

function applyContrast(state){
  document.documentElement.classList.toggle('high-contrast', state);
  toggleContrast.setAttribute('aria-pressed', String(state));
  localStorage.setItem('pf_high_contrast', state ? '1' : '0');
}

toggleTheme.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});

toggleContrast.addEventListener('click', () => {
  const isHigh = document.documentElement.classList.contains('high-contrast');
  applyContrast(!isHigh);
});

/* Persist preferences */
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('pf_theme') || 'light';
  const savedContrast = localStorage.getItem('pf_high_contrast') === '1';
  applyTheme(savedTheme);
  applyContrast(savedContrast);
});

/* Keyboard: close menu with Escape */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    if(!primaryMenu.hasAttribute('hidden')){
      primaryMenu.setAttribute('hidden','');
      setAriaExpanded(menuToggle,false);
      menuToggle.focus();
    }
  }
});

/* Simple form handler (non-blocking, accessible) */
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const msg = contactForm.message.value.trim();
  if(!name || !email || !msg){ alert('Por favor preencha todos os campos.'); return; }
  // Simulate sending
  alert('Obrigado! Sua mensagem foi recebida.');
  contactForm.reset();
});

/* Improve keyboard focus for cards' order buttons */
document.querySelectorAll('.order').forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click();
    }
  });
});
