'use strict';
// const slides = document.querySelectorAll('.slide');
// const dot = document.querySelector('.dots');

// let max = slides.length,
//   currSlide = 0;

// // Deal with dots
// const createDots = function () {
//   slides.forEach(function (_, i) {
//     dot.insertAdjacentHTML(
//       'beforeend',
//       `<button class="dots__dot" data-slide='${i}'></button>`
//     );
//   });
// };
// createDots();

// const activeDot = function (slide) {
//   document
//     .querySelectorAll('.dots__dot')
//     .forEach(dot => dot.classList.remove('dots__dot--active'));

//   document
//     .querySelector(`.dots__dot[data-slide="${slide}"]`)
//     .classList.add('dots__dot--active');
// };

// //
// const prevSlide = function () {
//   if (max - 1 === currSlide) {
//     currSlide = 0;
//   } else currSlide++;

//   GotoSlide(currSlide);
//   activeDot(currSlide);
// };

// //
// const nextSlide = function () {
//   if (0 === currSlide) {
//     currSlide = max - 1;
//   } else currSlide--;

//   GotoSlide(currSlide);
//   activeDot(currSlide);
// };

// GotoSlide(0);
// activeDot(0);
// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click', prevSlide);

// // Deal with Arrow key
// document.addEventListener('keydown', function (e) {
//   e.key === 'ArrowLeft' && nextSlide();
//   e.key === 'ArrowRight' && prevSlide();
// });

// // dots

// dot.addEventListener('click', function (e) {
//   if (e.target.classList.contains('dots__dot')) {
//     const { slide } = e.target.dataset;
//     GotoSlide(slide);
//     activeDot(slide);
//   }
// });

/////////////////////
// Names /////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Names smoth scroll
// 1 - Learn More
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

// 2 - header
const navLinks = document.querySelectorAll('.nav__link');

// Names opacity header
const nav = document.querySelector('.nav');

// Pin header
// const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const headerObj = {
  root: null,
  thershold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};

// Sections HIDDINE
const sections = document.querySelectorAll('.section');
const secObj = {
  root: null,
  thershold: 0,
  rootMargin: `-150px`,
};

// Lazy imgs
const imgs = document.querySelectorAll('img[data-src]');
const imgObj = { root: null, thershold: 0, rootMargin: '-90px' };

// Dots
const btnRight = document.querySelector('.slider__btn--left');
const btnLeft = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dot = document.querySelector('.dots');

let max = slides.length,
  curr = 0;

///////////////////////////////
// Functions /////////////////////////////////////////
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Opacity header
const addOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const parentOfClicked = link.closest('.nav').querySelectorAll('.nav__link');

    parentOfClicked.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    // opacity the img
    link.closest('.nav').querySelector('.nav__logo').style.opacity = this;
  }
};

// Pin header
const headerFun = function (entries, _) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

// Section HiDDiEN
const secFun = function (entries, observes) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observes.unobserve(entry.target);
};

// Lazy imgs
const imgFun = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observe.observe(entry.target);
};

// Dots
const goToslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToslide(0);

const prevSlide = function () {
  if (curr === max - 1) curr = 0;
  else curr++;

  goToslide(curr);
};

const nextSlide = function () {
  if (curr === 0) curr = max - 1;
  else curr--;

  goToslide(curr);
};

////////////////////////
// btns //////////////////////////////////////////////////
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 1 - Smoth Scrolling btns
learnMoreBtn.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 2
navLinks.forEach(link =>
  link.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('nav__link') &&
      !e.target.classList.contains('nav__link--btn')
    ) {
      const id = e.target.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  })
);

// opacity header
nav.addEventListener('mouseover', addOpacity.bind(0.5));
nav.addEventListener('mouseout', addOpacity.bind(1));

// Pin header
const headerObserve = new IntersectionObserver(headerFun, headerObj);
headerObserve.observe(header);

// Section Hiddien
const sectionsObserve = new IntersectionObserver(secFun, secObj);
sections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionsObserve.observe(section);
});

// LazyImg
const imgObserve = new IntersectionObserver(imgFun, imgObj);
imgs.forEach(img => {
  imgObserve.observe(img);
});

// Dots
slides.forEach((_, i) =>
  dot.insertAdjacentHTML(
    'beforeend',
    `<div class='dots__dot' data-slide='${i}'></div>`
  )
);

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
//////////////////////////////////////////////////////////////////////////////////////////
///LECTURE

// ///
// /// Passing Arguments to Event
// const nav = document.querySelector('.nav');

// /// A
// // STICKY && efficent && API

// // fun
// const obsFun = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) nav.classList.add('sticky'); // IMPORTNAT
//   else nav.classList.remove('sticky');
// };

// // obj
// const theHight = nav.getBoundingClientRect().height;
// const obsObj = {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${theHight}px`,
// };
// const header = document.querySelector('.header');
// const headerObserve = new IntersectionObserver(obsFun, obsObj);
// headerObserve.observe(header);

// // B
// // // STICKY && NOT efficent
// // const get = section1.getBoundingClientRect();

// // window.addEventListener('scroll', function (e) {
// //   if (window.scrollY > get.top) nav.classList.add('sticky');
// //   else nav.classList.remove('sticky');
// // });

// ////

// // // Smoth Scrolling
// const ScrollTo = document.querySelector('btn--scroll-to'); // .
// const section = document.querySelector('section--1'); // #

// ScrollTo.addEventListener('click', function (e) {
//   const DUA = section.getBoundingClientRect();

//   // 1- Old way
//   window.scrollTo(DUA.left + window.pageXOffset, DUA.top + window.pageYOffset); // 1
//   window.scrollTo({
//     left: DUA.left + window.pageXOffset,
//     top: DUA.top + window.pageYOffset,
//     behavior: 'smooth',
//   }); // 2

//   // 2
//   section.scrollIntoView({ behavior: 'smooth' });
// });

// /// Atributes
// const logo = document.querySelector('.nav__logo');

// console.log(logo.getAttribute('src')); //relative
// console.log(logo.src); // absloute

// logo.alt = 'Farouk && DUA'; // First way
// logo.setAttribute('desinger', 'ROKA');

// //////////////////////////////////////////

// // A- Creating and Inserting elements
// // insertAdjacentHTML // 1
// const messege = document.createElement('div');
// messege.classList.add('cookie-message');
// messege.innerHTML =
//   'we\'re using cookies. <button class="btn btn--close-cookie">Got it!</button"';

// const header = document.querySelector('.header');
// // header.prepend(messege); // to be in one place

// header.append(messege); // to be in one place

// // header.before(messege); // before the header ele
// // header.after(messege); // after the header ele

// // to make a copy of it in onther place
// // header.append(messege.cloneNode(true));

// // D- Deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     messege.remove();
//   });

// /*
// // C- Seclecting elements
// console.log(document.documentElement); //
// console.log(document.head);
// console.log(document.body);

// // Get update when the dom changed
// document.getElementsByTagName(); // 1
// document.getElementsByClassName(); // 2

// // Not UPdated
// document.getElementById();
// document.querySelector();
// document.querySelectorAll();
// */

// /// Styling
// messege.style.backgroundColor = '#37383d';
// messege.style.width = '1519px';

// // to get the style
// console.log(getComputedStyle(messege).color);
// console.log(Number.parseFloat(getComputedStyle(messege).height));

// messege.style.height =
//   Number.parseFloat(getComputedStyle(messege).height, 10) + 20 + 'px';

// // Set property
// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Dom traversing

// // 1- GO down: children
// const h1 = document.querySelector('h1');
// // h1.firstElementChild.style.color = 'orangered';
// // h1.lastElementChild.style.color = 'orangered';

// h1.querySelectorAll('.highlight').forEach(el => (el.style.color = 'white'));

// // 2- Go uP: parents
// h1.closest('.header').style.background = 'var(--gradient-primary)';

// // 3- sibiling
// // h1.nextElementSibling;
// // h1.previousElementSibling;

// // REMOVE EVENT LISINER
// // var
// const removeEvent = document.querySelector('.header__img');
// //fun
// const addRemoveEvent = function () {
//   alert("That's now Equals 50EG");

//   setTimeout(
//     () => removeEvent.removeEventListener('mouseenter', addRemoveEvent),
//     1000
//   );
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////

// // Modal window

// // Building a tabbed component
// const tabs = document.querySelector('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContant = document.querySelector('.operations__content');

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');

//   // Check if the click is on tabs
//   if (!clicked) return;

//   // Remove Active
//   // i dont know why it doesnot work // tabs.forEach(c => c.classList.remove('operations__tab--active'));
//   // tabsContant.forEach(e => e.classList.remove('operations__content--active'));

//   // ADD active
//   clicked.classList.add('operations__tab--active');

//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });
