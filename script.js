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
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })

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
const callbackForm = document.querySelector('.callback__contact')
const footerForm = document.querySelector('.footer__form')

const token = '6249351739:AAG3N1abXODBH8O3UEDN9MqnIBbx-XzwSo8'

const chatId = -1001825316171
const url = "https://api.telegram.org/bot" + token + "/sendMessage"


headerForm.onsubmit = () => {
  (function () {
    let name = document.querySelector(".popup-header__name").value;
    let number = document.querySelector(".popup-header__number").value;
    
    message = "Name: " + name + "\nnumber: " + number;
  }())

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
  (function () {
    let number = document.querySelector(".callback__number").value;
    
    message = "number: " + number;
  }())

  callbackForm.reset()

  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}

footerForm.onsubmit = () => {
  (function () {
    let name = document.querySelector(".footer__name-form").value;
    let number = document.querySelector(".footer__number-form").value;

    message = "Name: " + name + "\nnumber: " + number;
  }())
  
  footerForm.reset()

  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}





