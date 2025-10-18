// Modern JavaScript with TypeScript-style patterns
// Using language features instead of external libraries

class SimpleWebApp {
  constructor() {
    this.clickCount = 0;
    this.currentBgIndex = 0;
    this.backgroundClasses = [
      'bg-purple',
      'bg-blue',
      'bg-green',
      'bg-orange',
      'bg-pink',
    ];

    this.initializeApp();
  }

  initializeApp() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        this.setupEventListeners()
      );
    } else {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    // Get DOM elements with null checks
    const colorButton = document.getElementById('colorButton');
    const sampleForm = document.getElementById('sampleForm');
    const counter = document.getElementById('counter');
    const output = document.getElementById('output');

    if (!colorButton || !sampleForm || !counter || !output) {
      console.error('Required DOM elements not found');
      return;
    }

    // Color button click handler
    colorButton.addEventListener('click', () => this.handleColorChange());

    // Form submission handler
    sampleForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // Input validation on keyup
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => this.validateInput(e));
    }

    // Add initial animation to cards
    this.animateCards();

    console.log('SimpleWebApp initialized successfully');
  }

  handleColorChange() {
    const body = document.body;
    const counter = document.getElementById('counter');

    if (!body || !counter) return;

    // Remove all background classes
    this.backgroundClasses.forEach((bgClass) => {
      body.classList.remove(bgClass);
    });

    // Add new background class
    this.currentBgIndex =
      (this.currentBgIndex + 1) % this.backgroundClasses.length;
    body.classList.add(this.backgroundClasses[this.currentBgIndex]);

    // Update click counter
    this.clickCount++;
    counter.textContent = `Clicks: ${this.clickCount}`;

    // Add shake animation to button
    const colorButton = document.getElementById('colorButton');
    if (colorButton) {
      colorButton.classList.add('shake');
      setTimeout(() => colorButton.classList.remove('shake'), 500);
    }

    console.log(
      `Background changed to: ${this.backgroundClasses[this.currentBgIndex]}`
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const output = document.getElementById('output');

    if (!nameInput || !output) return;

    const name = nameInput.value.trim();

    if (this.isValidName(name)) {
      const message = this.generateWelcomeMessage(name);
      this.displayOutput(output, message, 'success');
      nameInput.value = ''; // Clear input
    } else {
      this.displayOutput(
        output,
        'Please enter a valid name (at least 2 characters)',
        'error'
      );
      nameInput.classList.add('shake');
      setTimeout(() => nameInput.classList.remove('shake'), 500);
    }
  }

  validateInput(e) {
    const input = e.target;
    const value = input.value.trim();

    // Real-time validation feedback
    if (value.length > 0 && value.length < 2) {
      input.style.borderColor = '#e53e3e';
    } else if (value.length >= 2) {
      input.style.borderColor = '#38a169';
    } else {
      input.style.borderColor = '#e2e8f0';
    }
  }

  isValidName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  }

  generateWelcomeMessage(name) {
    const messages = [
      `Hello, ${name}! Welcome to our simple web app! 👋`,
      `Nice to meet you, ${name}! Thanks for trying out our demo! 🎉`,
      `Greetings, ${name}! Hope you're enjoying the interactive features! ✨`,
      `Hi there, ${name}! Your form submission was successful! 🚀`,
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  displayOutput(outputElement, message, type = 'info') {
    outputElement.innerHTML = '';

    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;

    // Add styling based on type
    switch (type) {
      case 'success':
        messageElement.style.color = '#38a169';
        messageElement.style.backgroundColor = '#f0fff4';
        break;
      case 'error':
        messageElement.style.color = '#e53e3e';
        messageElement.style.backgroundColor = '#fed7d7';
        break;
      default:
        messageElement.style.color = '#4a5568';
        messageElement.style.backgroundColor = '#f7fafc';
    }

    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '6px';
    messageElement.style.border = '1px solid';
    messageElement.style.borderColor = messageElement.style.color;

    outputElement.appendChild(messageElement);
    messageElement.classList.add('fade-in');

    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.style.opacity = '0';
          setTimeout(() => {
            if (messageElement.parentNode) {
              messageElement.remove();
            }
          }, 300);
        }
      }, 3000);
    }
  }

  animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-in');
      }, index * 200);
    });
  }

  // Utility method for debouncing (if needed for input events)
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Method to get current app state (useful for debugging)
  getState() {
    return {
      clickCount: this.clickCount,
      currentBackground: this.backgroundClasses[this.currentBgIndex],
      timestamp: new Date().toISOString(),
    };
  }
}

// Additional utility functions using modern JS features

// Function to safely query DOM elements
const safeQuerySelector = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.error(`Error querying selector "${selector}":`, error);
    return null;
  }
};

// Function to create elements with attributes
const createElement = (tag, attributes = {}, textContent = '') => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

// Initialize the application
const app = new SimpleWebApp();

// Expose app instance to global scope for debugging (optional)
if (typeof window !== 'undefined') {
  window.app = app;
}

// Additional event listeners for keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Space bar to change background color
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    app.handleColorChange();
  }

  // Escape key to clear form
  if (e.code === 'Escape') {
    const form = document.getElementById('sampleForm');
    const output = document.getElementById('output');
    if (form) form.reset();
    if (output) output.innerHTML = '';
  }
});

// Add active class to current page navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav .btn');

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === 'index.html' && href === './')) {
    link.classList.add('active');
  }
});

// Log app initialization
console.log('Main.js loaded successfully - SimpleWebApp ready!');
