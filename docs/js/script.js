const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu')
const closeElem = document.querySelector('.menu__close');
const menuOverlay = document.querySelector('.menu__overlay')

function closeMenu() {
    menu.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

document.addEventListener('click', (e) => {
    if ((e.target) == menuOverlay) {
        closeMenu();
    }
});


closeElem.addEventListener('click', () => {
    // menu.classList.remove('active');

    closeMenu();
});


const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});


// Add scroll to anchors

const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(anchor.href)

        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })

        closeMenu();
    })
});

// for (let anchor in anchors) {

//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();

//         const blockID = anchor.getAttribute('href').substr(1);
//         console.log(blockID)
//         document.getElementById(blockID).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     })

// }