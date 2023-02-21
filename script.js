//popup-header
const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('.body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}



function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } /* else {
			bodyLock()
		} */
    curentPopup.classList.add('open')
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    /* if (doUnlock) {
      bodyUnLock()
    } */
  }
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive)
  }
})

//menu-burger
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.header__nav')
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
  })
}

const buttons = document.querySelectorAll('.nav__item')

buttons.forEach(button => button.addEventListener('click', closeMenuBurger))

function closeMenuBurger() {
  iconMenu.classList.remove('_active')
  menuBody.classList.remove('_active')
}

//scroll on click
const menuLinks = document.querySelectorAll('.nav__link[data-goto]')
const heroBtn = document.querySelector('.hero__btn[data-goto]')
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })

  heroBtn.addEventListener('click', onMenuLinkClick)


  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      // const gotoBlockValue = gotoBlock.getBoundingClientRect().top + offsetTop - document.querySelector('header').offsetHeight

      window.scrollTo({
        top: gotoBlock.offsetTop,
        behavior: "smooth"
      })
      e.preventDefault()
    }
  }
}


//slider
new Swiper('.slider-why-we__body', {
  observer: true,
  observerParents: true,
  slidesPerView: 'auto',
  spaceBetween: 10,
  speed: 800,
  loop: true,
  watchOverflow: true,
  loopAdditionalSlides: 5,
  preloadImages: false,
  parallax: true,
  navigation: {
    nextEl: '.slider-why-we .slider-arrow_next',
    prevEl: '.slider-why-we .slider-arrow_prev',
  },
  pagination: {
    el: '.slider-why-we .slider-why-we__dots',
    clickable: true,
  },
  breakpoints: {
    479: {
      spaceBetween: 24,
    },
  }

});

//telegram
const headerForm = document.querySelector('.popup-header__form')
const quizForm = document.querySelector('.quiz__form')
const callbackForm = document.querySelector('.callback__contact')
const footerForm = document.querySelector('.footer__form')

const token = '6249351739:AAG3N1abXODBH8O3UEDN9MqnIBbx-XzwSo8'

const chatId = -1001825316171
const url = "https://api.telegram.org/bot" + token + "/sendMessage"



headerForm.onsubmit = () => {
  const name = document.querySelector(".popup-header__name").value;
  const number = document.querySelector(".popup-header__number").value;

  const message = "ім'я: " + name + "\nномер: " + number;

  headerForm.reset()
  popupClose(headerForm.closest('.popup'))

  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}

callbackForm.onsubmit = () => {
    const number = document.querySelector(".callback__number").value;

    const message = "номер: " + number;
  
  callbackForm.reset()

  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}

footerForm.onsubmit = () => {
    const name = document.querySelector(".footer__name-form").value;
    const number = document.querySelector(".footer__number-form").value;

    const message = "ім'я: " + name + "\nномер: " + number;

  footerForm.reset()

  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}


// quiz
const quizButtons = document.querySelectorAll('.quiz-option__button')
const quizItems = quizForm.querySelectorAll('.quiz__items')
const quizThank = quizForm.querySelectorAll('.quiz-thank')


showDefaultFirst()

quizForm.addEventListener('change', enableButton)
quizForm.addEventListener('submit', submitQuizForm)

quizButtons.forEach(btn => btn.addEventListener('click', showNextSlide))

function showDefaultFirst() {
  quizForm.querySelector('form > fieldset').classList.add('_active')
}

function enableButton(e) {
  e.target.closest('.quiz__items').querySelector('[disabled]')?.removeAttribute('disabled')
}

function submitQuizForm() {
  const formData = new FormData(quizForm)
  const data = Object.fromEntries(formData)
  const message = `об'єкт: ${data.object}, \nплоща: ${data.area}, \nзадача: ${data.task}, \nпроект: ${data.project}, \nтермін: ${data.term}, \nномер: ${data.number}, \nім'я: ${data.name}`
  // `Об'єкт: Дім, площа: від 30 до 50, задача: Ремонт дизайн-проекту, проект: Ні, і не буде, термін: Протягом місяця (не так уже і терміново), номер: 0988383828, ім'я: Микола`
  const obj = { chat_id: chatId, text: message }

  fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) })

  quizForm.querySelector('[hidden]').click()
}

function showNextSlide() {
  const current = quizForm.querySelector('._active')

  current.classList.remove('_active')
  current.nextElementSibling.classList.add('_active')

}

//open thank page 
const thanksContainer = document.querySelector('.thanks-container')
const thanksClose = document.querySelector('.thanks__close')

const popupHeaderForm = document.querySelector('.popup-header__form')
const callbackContact = document.querySelector('.callback__contact')

popupHeaderForm.addEventListener('submit', openThankPage)
callbackContact.addEventListener('submit', openThankPage)
footerForm.addEventListener('submit', openThankPage)

thanksClose.addEventListener('click', closeThankPage)

function openThankPage() {
  thanksContainer.classList.add('_open')
}

function closeThankPage() {
  thanksContainer.classList.remove('_open')
}


