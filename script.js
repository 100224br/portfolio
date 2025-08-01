// Smooth Click Animation Effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
});

// Burger menu functionaliteit
const burger = document.querySelector('.burger');
const nav = document.getElementById('main-nav');
burger.addEventListener('click', function() {
  const expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('nav-open');
  document.body.classList.toggle('no-scroll', !expanded);
});
