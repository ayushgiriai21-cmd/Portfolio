/*
 * Portfolio interactions and micro-animations.
 * This script initializes the hero typewriter effect and the mobile navigation toggle.
 */

const heroPhrases = [
  'Building Secure Backends...',
  'Optimizing Web Performance...',
  'Crafting Open-Source Solutions...'
];

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let typingTimerId = null;

const typeTarget = document.getElementById('typewriter-text');
const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const copyEmailButton = document.querySelector('[data-copy-email]');

/**
 * Advances the typewriter effect one frame at a time.
 * It alternates between typing and deleting the current phrase.
 */
function runTypewriter() {
  if (!typeTarget) {
    return;
  }

  const currentPhrase = heroPhrases[phraseIndex];
  const isComplete = !isDeleting && characterIndex === currentPhrase.length;
  const isEmpty = isDeleting && characterIndex === 0;

  if (isDeleting) {
    typeTarget.textContent = currentPhrase.substring(0, characterIndex - 1);
    characterIndex -= 1;
  } else {
    typeTarget.textContent = currentPhrase.substring(0, characterIndex + 1);
    characterIndex += 1;
  }

  let delay = isDeleting ? 50 : 100;

  if (isComplete) {
    delay = 2000;
    isDeleting = true;
  } else if (isEmpty) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % heroPhrases.length;
    delay = 500;
  }

  typingTimerId = window.setTimeout(runTypewriter, delay);
}

/**
 * Toggles the mobile navigation menu for small screens.
 */
function toggleMobileNav() {
  if (!mobileNav || !mobileMenuButton) {
    return;
  }

  const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
  mobileNav.classList.toggle('mobile-nav-open', !isExpanded);
}

/**
 * Initializes the page interactions after the DOM is ready.
 */
function copyEmailAddress() {
  if (!copyEmailButton) {
    return;
  }

  const emailAddress = 'ayushgiri.ai.21@gmail.com';

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(emailAddress).catch(() => {
      window.alert('Unable to copy email automatically.');
    });
  } else {
    window.alert('Clipboard access is unavailable in this browser.');
  }
}

function initializePortfolio() {
  runTypewriter();

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener('click', toggleMobileNav);
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener('click', copyEmailAddress);
  }
}

document.addEventListener('DOMContentLoaded', initializePortfolio);
