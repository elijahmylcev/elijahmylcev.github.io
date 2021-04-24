const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

      hamburger.addEventListener('click', () => {
          menu.classList.add('active');
      });

      

      closeElem.addEventListener('click', () => {
          menu.classList.remove('active');
      });


const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

// const sidePanel = document.querySelector('.sidepanel'),
//         sidePanelLink = document.querySelector('.sidepanel__link'),
//         sidePanelDivider = document.querySelector('.sidepanel__divider'),
//         sidePanelText = document.querySelector('.sidepanel__text'),
//         promo = document.querySelector('.promo'),

//         promoHeight = promo.getBoundingClientRect().height;

//     document.addEventListener('scroll', (e) => {
//         if (window.scrollY < promoHeight) {
//             sidePanel.style.background = 'transparent';
//         }

//         if (window.scrollY >= promoHeight) {
//             sidePanelLink.fill = '#000';
//             sidePanelDivider.style.background = '#000';
//             sidePanelText.style.color = '#000';
//         }
//     });
