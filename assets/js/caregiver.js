/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () =>{
   const header = document.getElementById('header')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 50
   window.scrollY >= 50 ? header.classList.add('scroll-header')
                        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
// Initialize header state on load
scrollHeader()

/*=============== FAQ DROPDOWN ===============*/
const caregiverFaqToggles = document.querySelectorAll('.cg-faq__toggle')

caregiverFaqToggles.forEach(toggle => {
   toggle.addEventListener('click', () => {
      const item = toggle.closest('.cg-faq__item')
      const isOpen = item.classList.contains('cg-faq__item--open')

      // Close all other open items
      document.querySelectorAll('.cg-faq__item--open').forEach(openItem => {
         if (openItem !== item) {
            openItem.classList.remove('cg-faq__item--open')
            openItem.querySelector('.cg-faq__toggle').setAttribute('aria-expanded', 'false')
         }
      })

      // Toggle current item
      if (!isOpen) {
         item.classList.add('cg-faq__item--open')
         toggle.setAttribute('aria-expanded', 'true')
      } else {
         item.classList.remove('cg-faq__item--open')
         toggle.setAttribute('aria-expanded', 'false')
      }
   })
})

/*=============== KNOWLEDGE CENTRE CAROUSEL ===============*/
const kcCards = [...document.querySelectorAll('.kctr__card')]
const kcTrack = document.getElementById('kctr-track')
const kcDotsWrap = document.getElementById('kctr-dots')
const kcEtag = document.getElementById('kctr-etag')
const kcEh = document.getElementById('kctr-eh')
const kcEp = document.getElementById('kctr-ep')
const kcExpand = document.getElementById('kctr-expand')

if (kcCards.length && kcTrack) {
   const kcDetails = [
      { tag: 'Foundation', h: 'What is a caregiver?', p: 'A caregiver is someone who is compassionate, reliable, knowledgeable, and most importantly — trustworthy. At Sallies Warm Care, our professional caregivers provide seniors with dedicated assistance at home, giving families comfort, safety, and genuine peace of mind. We carefully match every caregiver to their client based on personality, care needs, and daily routines.' },
      { tag: 'Home Care', h: 'Benefits of home nursing', p: 'Remaining in a familiar environment has profound effects on a senior\'s mental and physical health. In-home nursing eliminates the disruption of institutional care, reduces hospital readmission rates, and allows families to remain actively involved in their loved one\'s recovery and daily life.' },
      { tag: 'Safety', h: 'Medication management', p: 'Medication errors are one of the most preventable causes of senior hospitalisation. Our caregivers provide scheduled reminders, track compliance, and flag any concerns to families promptly — creating a reliable safety net around one of the most important aspects of senior health.' },
      { tag: 'Wellness', h: 'Mental health for seniors', p: 'Isolation and loneliness can be as damaging to seniors as physical illness. Companion care, shared hobbies, social outings, and consistent human connection provided by a trusted caregiver are clinically proven to slow cognitive decline and lift mood.' },
      { tag: 'Planning', h: 'Personalised care plans', p: 'No two clients are the same. We build individualised care plans covering morning routines, dietary preferences, mobility assistance needs, medication schedules, social activities, and family communication — reviewed regularly as needs evolve.' }
   ]

   let kcCurrent = 0
   let currentOffset = 0

   kcCards.forEach((_, i) => {
      const d = document.createElement('div')
      d.className = 'kctr__dot' + (i === 0 ? ' is-active' : '')
      kcDotsWrap.appendChild(d)
   })

   function kcGetDots() { return [...kcDotsWrap.querySelectorAll('.kctr__dot')] }

   function kcGoTo(idx) {
      kcCards[kcCurrent].classList.remove('is-active')
      kcGetDots()[kcCurrent].classList.remove('is-active')
      kcCurrent = ((idx % kcCards.length) + kcCards.length) % kcCards.length
      kcCards[kcCurrent].classList.add('is-active')
      kcGetDots()[kcCurrent].classList.add('is-active')

      const containerW = kcTrack.parentElement.offsetWidth
      const cardW = kcCards[0].offsetWidth
      const gap = 20
      const totalCardW = cardW + gap

      currentOffset = (kcCurrent * totalCardW + cardW / 2 + 120) - (containerW / 2)
      const maxOffset = kcTrack.scrollWidth - containerW
      currentOffset = Math.max(0, Math.min(currentOffset, maxOffset))

      kcTrack.style.transition = 'transform .7s cubic-bezier(.45, 0, .55, 1)'
      kcTrack.style.transform = `translateX(-${currentOffset}px)`

      const d = kcDetails[kcCurrent]
      kcEtag.textContent = d.tag
      kcEh.textContent = d.h
      kcEp.textContent = d.p

      kcExpand.style.animation = 'none'
      kcExpand.offsetHeight
      kcExpand.style.animation = 'kctrFadeUp .4s ease both'
   }

   document.getElementById('kctr-next').addEventListener('click', () => kcGoTo(kcCurrent + 1))
   document.getElementById('kctr-prev').addEventListener('click', () => kcGoTo(kcCurrent - 1))
   kcCards.forEach((c, i) => c.addEventListener('click', () => kcGoTo(i)))

   let kcAuto = setInterval(() => { kcGoTo(kcCurrent + 1) }, 4000)
   
   // Pause on hover or touch
   const pauseAuto = () => clearInterval(kcAuto)
   const resumeAuto = () => {
      clearInterval(kcAuto)
      kcAuto = setInterval(() => { kcGoTo(kcCurrent + 1) }, 4000)
   }

   kcTrack.parentElement.addEventListener('mouseenter', pauseAuto)
   kcTrack.parentElement.addEventListener('mouseleave', resumeAuto)
   kcTrack.parentElement.addEventListener('touchstart', pauseAuto, { passive: true })
   kcTrack.parentElement.addEventListener('touchend', resumeAuto)
}

/*=============== CAREGIVER GSAP ANIMATIONS ===============*/
if (typeof gsap !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger)

   const cgReveal = (selector, options = {}) => {
      if (!document.querySelector(selector)) return
      gsap.from(selector, {
         scrollTrigger: selector,
         opacity: 0,
         duration: 1,
         y: 60,
         delay: .2,
         ease: 'power2.out',
         ...options
      })
   }

   cgReveal('.cg-hero__data > *', { stagger: .15, y: 30 })
   
   // Reveal Brown Card
   cgReveal('.cg-hero__card', { y: 50, duration: 1, delay: 0.2 })
   
   // Reveal Image (clearProps so hover works after)
   if (document.querySelector('.cg-hero__img')) {
      gsap.from('.cg-hero__img', {
         scrollTrigger: '.cg-hero__card',
         opacity: 0,
         y: 100,
         duration: 1.2,
         delay: 0.4,
         ease: 'power2.out',
         onComplete: () => gsap.set('.cg-hero__img', { clearProps: 'all' })
      })
   }

   cgReveal('.cg-hero__card-name', { delay: .5 })
   cgReveal('.cg-hero__card-role', { delay: .65 })
   cgReveal('.cg-hero__stats', { delay: .8 })
   cgReveal('.cg-hero__card-icons', { delay: .95 })

   // Count stats animation
   const stats = document.querySelectorAll('.cg-hero__stat-num')
   stats.forEach(stat => {
      const text = stat.innerText
      const match = text.match(/(\d+)(.*)/)
      if (match) {
         const target = parseInt(match[1])
         const suffix = match[2] || ''
         let obj = { val: 0 }
         
         gsap.to(obj, {
            val: target,
            duration: 2,
            delay: 1, // Start after stats reveal
            scrollTrigger: {
               trigger: '.cg-hero__stats',
               start: "top 90%"
            },
            onUpdate: function() {
               stat.innerText = Math.floor(obj.val) + suffix
            }
         })
      }
   })

   // Knowledge Centre
   cgReveal('.kctr__header', {})
   cgReveal('.kctr__track-wrap', { delay: 0.2 }) // Reveal the carousel
   cgReveal('.kctr__expand', { delay: .4 })
   
   // Qualities
   cgReveal('.cg-qualities__header', {})
   cgReveal('.cg-qualities__card', { stagger: .1, delay: .3 })
   
   // FAQ
   cgReveal('.cg-faq__left', {})
   cgReveal('.cg-faq__item', { stagger: .12, delay: .3 }) // Fixed from .cg-faq__row
   
   // How to start
   cgReveal('.cg-start__data > *', { stagger: .15 })
   cgReveal('.cg-start__images', { delay: .5 })
}