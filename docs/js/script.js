const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuOverlay = document.querySelector('.menu__overlay');
const promo = document.querySelector('.promo');
const languages = document.querySelectorAll('.select_lang__item');
const accordionButton = document.querySelector('.skills__more');

window.addEventListener('DOMContentLoaded', () => {
    changeLanguage()
})

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

// Accordion
const skills_items = document.querySelector('.skills__items')
let heightFirstRow
let heightSecondRow
let rowGap

function returnSizes() {
    const section = document.querySelector('.skills__items')
    const gridTemplateRows = getComputedStyle(section).getPropertyValue('grid-template-rows')
    const rows = gridTemplateRows.split(' ');
    heightFirstRow = Number(rows[0].slice(0, -2))
    heightSecondRow = Number(rows[1].slice(0, -2))
    rowGap = Number(getComputedStyle(section).rowGap.slice(0, -2))
}

function changeStateAccordion() {
    if (skills_items.offsetHeight >= skills_items.scrollHeight) {
        skills_items.style.height = heightFirstRow + heightSecondRow + rowGap +'px'
        accordionButton.innerText = 'More...'
    } else {
        skills_items.style.height = skills_items.scrollHeight + 2 + 'px'
        accordionButton.innerText = 'less...'
    }
}

const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        returnSizes()
      }
    }
});
  
// Looking changes
observer.observe(skills_items);

accordionButton.addEventListener('click', changeStateAccordion)

// Job for languages
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

languages.forEach(item => item.addEventListener('click', e => changeUrlHash(e.target)))
window.addEventListener('hashchange', changeLanguage)

function loadLanguage(lang) {
    const url = '/languages/' + lang + '/' + 'content.json';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const texts = JSON.parse(xhr.responseText);
            for (let key in texts) {
                let elem = document.querySelectorAll(`[data-lang-${key}`);
                if (elem) {
                    elem.forEach(el => {
                        el.innerText = texts[key];
                    })
                }
            }
            const skills_items = document.querySelector('.skills__items')
            returnSizes()
            changeStateAccordion()
        }    
    };
    xhr.send();
}



// SendMessage
const sendMessage = document.querySelector('.contacts__btn');
const form = document.querySelector('.contacts__form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const token = document.querySelector('meta[name="token"]').getAttribute('content');
    const chatId = document.querySelector('meta[name="id"]').getAttribute('content');
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const email = formData.get("email")
    const text = formData.get("text")
  
    const message = `Name: ${name} \nEmail: ${email} \nMessage: ${text}`;

    // const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send(`chat_id=${chatId}&text=${message}`);
    form.reset()
})
