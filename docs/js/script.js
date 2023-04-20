const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuOverlay = document.querySelector('.menu__overlay');
const promo = document.querySelector('.promo');
const languages = document.querySelectorAll('.select_lang__item');
const accordionButton = document.querySelector('.skills__more');

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
const paddingTop = Number(getComputedStyle(skills_items).paddingTop.slice(0, -2))
const gridTemplateRows = getComputedStyle(skills_items).getPropertyValue('grid-template-rows')
const rows = gridTemplateRows.split(' ');
const heightFirstRow = Number(rows[0].slice(0, -2))
const heightSecondRow = Number(rows[1].slice(0, -2))
const rowGap = Number(getComputedStyle(skills_items).rowGap.slice(0, -2))

skills_items.style.height = paddingTop > 5 ? heightFirstRow + heightSecondRow + rowGap +'px' : heightFirstRow + heightSecondRow + rowGap *2 +'px'

accordionButton.addEventListener('click', () => {
    if (skills_items.offsetHeight >= skills_items.scrollHeight) {
        skills_items.style.height = paddingTop > 5 ? heightFirstRow + heightSecondRow + rowGap +'px' : heightFirstRow + heightSecondRow + rowGap*2 +'px'
        accordionButton.innerText = 'More...'
    } else {
        skills_items.style.height = skills_items.scrollHeight + 2 + 'px'
        accordionButton.innerText = 'less...'
    }
})


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
    // URL-адрес JSON-файла для выбранного языка
    const url = '/languages/' + lang + '/' + 'content.json';
    // AJAX, загрузка JSON-файла
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
        }    
    };
    xhr.send();
}

changeLanguage(window.location.hash.substring(1))

// SendMessage
const sendMessage = document.querySelector('.contacts__btn');
const form = document.querySelector('.contacts__form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const token = TELEGRAM_TOKEN;
    const chatId = CHAT_ID;
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const email = formData.get("email")
    const text = formData.get("text")
  
    const message = `Name: ${name} \nEmail: ${email} \nMessage: ${text}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`chat_id=${chatId}&text=${message}`);
    form.reset()
})

token = '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'
fetch('https://api.github.com/repos/elijahmylcev/elijahmylcev.github.io/actions/secrets/TELEGRAM_TOKEN', {
  headers: {
    Authorization: 'Bearer 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'
  }
})
.then(response => response.json())
.then(data => {
  const secretValue = data.value;
  console.log(secretValue);
  // Дальнейшие действия с полученным значением переменной
})
.catch(error => {
  console.error('Ошибка получения значения переменной: ', error);
});

// const octokit = new Octokit({
//     auth: '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'
//   })
  
//   await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
//     owner: 'OWNER',
//     repo: 'REPO',
//     secret_name: 'SECRET_NAME',
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })