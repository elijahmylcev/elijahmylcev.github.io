const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuOverlay = document.querySelector('.menu__overlay');
const promo = document.querySelector('.promo');
const languages = document.querySelectorAll('.select_lang__item');

function closeMenu() {
    menu.classList.remove('active');
    document.body.style.overflowY = "auto"
}

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.overflowY = "hidden"
});

document.addEventListener('click', (e) => {
    if ((e.target) == menuOverlay) {
        closeMenu();
    }
});

closeElem.addEventListener('click', () => {
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

//scroll

document.addEventListener('scroll', function () {
    // let scrolling = document.scrollTop;
    const hamSpan = hamburger.querySelectorAll('span');

    if (pageYOffset > promo.offsetHeight) {
        hamSpan.forEach(element => {
            element.style.background = 'black';
        });
    } else {
        hamSpan.forEach(element => {
            element.style.background = 'white';
        });

    }
})

// Work with languages
const existsLanguages = ['en', 'ru']
const changeUrlHash = (e) => {
    console.log(e.dataset.value);
    location.href = window.location.pathname + '#' + e.dataset.value;
    // location.reload();
}

const changeLanguage = () => {
    const hash = window.location.hash.substring(1)
    console.log(hash);
    if (!existsLanguages.includes(hash)) {
        location.href = window.location.pathname + '#en'
        location.reload()
    }
}

changeLanguage()

languages.forEach(item => item.addEventListener('click', e => changeUrlHash(e.target)))