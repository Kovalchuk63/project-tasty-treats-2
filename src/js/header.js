// (() => {
//   const mobileMenu = document.querySelector('.js-menu-container');
//   const openMenuBtn = document.querySelector('.js-open-menu');
//   const closeMenuBtn = document.querySelector('.js-close-menu');

//   const toggleMenu = () => {
//     const isOpenMenu =
//       openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//     openMenuBtn.setAttribute('aria-expanded', !isOpenMenu);
//     mobileMenu.classList.toggle('is-open');
//     document.body.classList.toggle('no-scroll');
//   };
  
//   openMenuBtn.addEventListener('click', toggleMenu);
//   closeMenuBtn.addEventListener('click', toggleMenu);

//   window.matchMedia('(min-width: 768px)').addEventListener('change', evt => {
//     if (!evt.matches) return;
//     mobileMenu.classList.remove('is-open');
//     openMenuBtn.setAttribute('aria-expanded', false);
//     enableBodyScroll(document.body);
//   });
// })();

