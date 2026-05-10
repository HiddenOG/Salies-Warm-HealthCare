/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/* Show menu */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if (navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () => {
   const header = document.getElementById('header')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 50
   this.scrollY >= 50 ? header.classList.add('scroll-header')
      : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER WORKS ===============*/
const workServiceLabels = [
   'Personal Care & Hygiene',
   'Morning Routine',
   'Mobility & Safety Support',
   'Meals & Nutritional Support',
   'Specialized Memory Care',
   'Medications & Health',
   'Homemaker Services',
   'Companionship & Socials',
   'Evening & Sleep Routine',
   'Transportation & Errands'
]

const workServiceTexts = [
   'We provide dignified bathing, grooming, hair care, dressing, and shaving assistance, keeping your loved one feeling confident.',
   'We assist with a structured morning routine: gentle wake-up, personal hygiene, medication reminders, and a healthy morning breakfast.',
   'We offer gentle help with walking, bed-to-chair transfers, and light stretching exercises to maintain balance and reduce the risk of falls.',
   'We prepare meals tailored to dietary needs, low-sodium, diabetic-friendly and handle grocery shopping and hydration monitoring.',
   'We deliver compassionate care for Alzheimer\'s and dementia clients, including safe redirection and calming engagement.',
   'We provide timely medication reminders and assist with range-of-motion exercises to support your loved one\'s health and daily wellness.',
   'We keep the home clean, organized, and safe through light housekeeping, laundry, and tidying of common living spaces.',
   'We reduce loneliness through conversation, favorite hobbies, video calls, and accompanying clients on community outings.',
   'We support a calming evening: dinner preparation, nighttime hygiene, medication reminders, and comfortable sleep preparation.',
   'We provide safe, reliable escort to medical appointments, errands, and social events, keeping your loved one active and connected.'
]

const workLabelEl = document.getElementById('work-service-label')
const workTextEl = document.getElementById('work-service-text')

function updateWorkServiceText(realIndex) {
   const i = ((realIndex % 10) + 10) % 10  // safety for loop mode

   // Fade out
   workLabelEl.classList.add('work__text--fade')
   workTextEl.classList.add('work__text--fade')

   setTimeout(() => {
      workLabelEl.textContent = workServiceLabels[i]
      workTextEl.textContent = workServiceTexts[i]

      // Fade back in
      workLabelEl.classList.remove('work__text--fade')
      workTextEl.classList.remove('work__text--fade')
   }, 220)
}

const swiperWork = new Swiper('.work__swiper', {
   loop: true,
   slidesPerView: 'auto',
   spaceBetween: 24,
   grabCursor: true,

   pagination: {
      el: '.work__data .swiper-pagination',
      type: 'fraction',
   },

   navigation: {
      nextEl: '.work__data .swiper-button-next',
      prevEl: '.work__data .swiper-button-prev',
   },

   on: {
      slideChange: function () {
         updateWorkServiceText(this.realIndex)
      }
   }
})

/*=============== SWIPER TESTIMONIAL ===============*/
const swiperTestimonial = new Swiper('.service__swiper', {
   loop: true,
   slidesPerView: 'auto',
   spaceBetween: 56,
   grabCursor: true,

   pagination: {
      el: '.service__swiper .swiper-pagination',
   },

   navigation: {
      nextEl: '.service__swiper .swiper-button-next',
      prevEl: '.service__swiper .swiper-button-prev',
   },
})

/*=============== SERVICE FAQ DROPDOWN ===============*/
const serviceToggles = document.querySelectorAll('.service__toggle')

serviceToggles.forEach(toggle => {
   toggle.addEventListener('click', () => {
      const plan = toggle.closest('.service__plan')
      const isOpen = plan.classList.contains('service__plan--open')

      // Close all open items first
      document.querySelectorAll('.service__plan--open').forEach(openPlan => {
         openPlan.classList.remove('service__plan--open')
         openPlan.querySelector('.service__toggle').setAttribute('aria-expanded', 'false')
      })

      // If it was closed, open it
      if (!isOpen) {
         plan.classList.add('service__plan--open')
         toggle.setAttribute('aria-expanded', 'true')
      }
   })
})

/*=============== FAQ DROPDOWN ===============*/
const faqToggles = document.querySelectorAll('.faq__toggle')

faqToggles.forEach(toggle => {
   toggle.addEventListener('click', () => {
      const item = toggle.closest('.faq__item')
      const isOpen = item.classList.contains('faq__item--open')

      document.querySelectorAll('.faq__item--open').forEach(openItem => {
         openItem.classList.remove('faq__item--open')
         openItem.querySelector('.faq__toggle').setAttribute('aria-expanded', 'false')
      })

      if (!isOpen) {
         item.classList.add('faq__item--open')
         toggle.setAttribute('aria-expanded', 'true')
      }
   })
})

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
   this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
      : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

// Link the ID of each section (section id="home") to each link (a href="#home") 
// and activate the link with the class .active-link
const scrollActive = () => {
   // We get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section => {
      const id = section.id, // id of each section
         top = section.offsetTop - 50, // Distance from the top edge
         height = section.offsetHeight, // Element height
         link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

      if (!link) return

      link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== GSAP ANIMATION ===============*/
const reveal = (selector, options = {}) => {
   gsap.from(selector, {
      scrollTrigger: selector,
      opacity: 0,
      duration: 1,
      y: 100,
      delay: .3,
      ease: 'power2.out',
      ...options
   })
}

/* Home animation */
const tl = gsap.timeline({})
tl.fromTo(
   '.home__bg, .home__shadow',
   {
      y: -800,
      scale: .3,
      opacity: 0
   },
   {
      y: 0,
      scale: .3,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
   }
)
tl.to(
   '.home__bg, .home__shadow',
   {
      scale: 1,
      duration: 1,
      ease: 'back.out(0.5)'
   }
)

/* Home background animation */
tl.to(
   '.home__bg',
   {
      scale: 1.08,
      duration: 8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'center center'
   }
)

reveal('.home__logo', { y: 0, scale: .3, delay: 1.9, ease: 'elastic.out(0.8,0.5)' })
reveal('.home__title', { delay: 2.2 })
reveal('.home__description', { delay: 2.5 })
reveal('.home__data .button', { delay: 2.8 })

/* The nav animation only works in the home section */
if (window.scrollY < 100) {
   reveal('.nav > *', { delay: 1.6, y: -30 })
} else {
   gsap.set('.nav > *', { opacity: 1, y: 0 })
}

/* About animation */
reveal('.about__data > *', { stagger: .2 })
reveal('.about__img', { delay: .9 })

const aboutCounter = document.querySelectorAll('.about__counter')
aboutCounter.forEach(el => {
   gsap.from(el, {
      textContent: 0,
      duration: 3,
      ease: 'power1.out',
      snap: { textContent: 1 },
      scrollTrigger: { trigger: el, once: true }
   })
})

/* Founder animation */
reveal('.founder__visual', {})
reveal('.founder__tag', { delay: .3 })
reveal('.founder__title', { delay: .6 })
reveal('.founder__text p', { delay: .9, stagger: .2 })
reveal('.founder__cta', { delay: 1.2 })

/* Work animation */
reveal('.work__data .section__title', {})
reveal('.work__service-label', { delay: .3 })
reveal('.work__description', { delay: .6 })
reveal('.work__data .swiper-pagination', { delay: .9 })
reveal('.work__data :is(.swiper-button-prev, .swiper-button-next)', { delay: 1.2 })
reveal('.work__swiper', { delay: .9 })

/* Service animation */
reveal('.service__data .section__title', {})
reveal('.service__plan', { delay: .6, stagger: .2 })
reveal('.service__swiper', { delay: .9, stagger: .2 })

/* Expert animation */
reveal('.faq__tag', { delay: .1 })
reveal('.faq .faq__title', { delay: .3 })
reveal('.faq__subtitle', { delay: .6 })
reveal('.faq__card', { delay: .9, stagger: .2 })

/* Contact animation */
reveal('.contact__data .section__title', {})
reveal('.contact__description', { delay: .6 })
reveal('.contact__data .button', { delay: .9, y: 0, scale: 0 })
reveal('.contact__map', { delay: .9 })
reveal('.contact__card', { delay: 1.2, stagger: .2 })

/* Care Request animation */
reveal('.cform__tag', {})
reveal('.cform__title', { delay: .3 })
reveal('.cform__form', { delay: .6 })
reveal('.cform__right', { delay: .9 })


/* Footer animation */
reveal('.footer__container', {})

