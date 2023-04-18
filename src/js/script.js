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
    location.href = window.location.pathname + '#' + e.dataset.value;
}

const changeLanguage = () => {
    const hash = window.location.hash.substring(1)
    if (!existsLanguages.includes(hash)) {
        location.href = window.location.pathname + '#en'
    }
    loadLanguage(hash)
}

// changeLanguage()

languages.forEach(item => item.addEventListener('click', e => changeUrlHash(e.target)))

window.addEventListener('hashchange', changeLanguage)

function loadLanguage(lang) {
    // URL-адрес JSON-файла для выбранного языка
    const url = '/languages/' + lang + '/' + 'content.json';
    // AJAX, чтобы загрузить JSON-файл
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const texts = JSON.parse(xhr.responseText);
            console.log(texts);

            for (let key in texts) {
                let elem = document.querySelectorAll(`[data-lang-${key}`);
                if (elem) {
                    elem.forEach(el => {
                        el.innerText = texts[key];
                    })
                }
            }
        }    
    };
    xhr.send();
}

changeLanguage(window.location.hash.substring(1))