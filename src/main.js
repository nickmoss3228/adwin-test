let isMenuOpen = false;

function toggleMenu() {
const dropdownMenu = document.getElementById('dropdown-menu');
const overlay = document.getElementById('overlay');
const cartIcon = document.querySelector('.cart-icon');
const menuIcon = document.querySelector('.menu-icon');

const isMenuOpen = dropdownMenu.classList.contains('active');

if (isMenuOpen) {
    // Close menu
    dropdownMenu.classList.remove('active');
    overlay.classList.remove('active');
    cartIcon.style.display = 'flex';
    menuIcon.innerHTML = '☰';
} else {
    // Open menu
    dropdownMenu.classList.add('active');
    overlay.classList.add('active');
    cartIcon.style.display = 'none';
    menuIcon.innerHTML = '&times;';
}
}
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('.menu-icon');
    
    // Add click handler to menu icon
    menuIcon.addEventListener('click', toggleMenu);
    
    // Close dropdown when clicking overlay
    overlay.addEventListener('click', toggleMenu);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });
    
    // Add click handlers to menu items
    const menuItems = document.querySelectorAll('.dropdown-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu(); // Close dropdown after selection
        });
    });
});

// Function to handle duck list item clicks
function handleDuckListClick() {
  const duckListItems = document.querySelectorAll('.duck-list__item');
  
  duckListItems.forEach(item => {
    item.addEventListener('click', function() {
      duckListItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
    });
  });
}

// Initialize the duck list functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
  handleDuckListClick();
}); 

// Popup functionality
function openPopup() {
  const overlay = document.getElementById('popup-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
  const overlay = document.getElementById('popup-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    // Make sure popup is hidden on page load
    const overlay = document.getElementById('popup-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
  
    // Close popup when clicking overlay
    overlay.addEventListener('click', function (e) {
        if (e.target === this) {
            closePopup();
        }
    });
  
    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePopup();
        }
});

// Event listeners to CTA buttons
const desktopCTA = document.querySelector('.CTA-button-call.desktop-cta');
if (desktopCTA) {
    desktopCTA.addEventListener('click', function (e) {
        e.preventDefault();
        openPopup();
    });
}

const mobileCTA = document.querySelector('.dropdown-menu-button .CTA-button-call');
if (mobileCTA) {
    mobileCTA.addEventListener('click', function (e) {
        e.preventDefault();
        toggleMenu();
        openPopup();
    });
}

// close button
const closeButton = document.querySelector('.popup-close');
closeButton.addEventListener('click', function (e) {
    e.preventDefault();
    closePopup();
    console.log()
});

const phoneInput = document.getElementById('popup-phone');
const nameInput = document.getElementById('popup-name');
// Phone validation
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            // Different starting digits
            if (value.startsWith('7')) {
                value = value.substring(1);
            } else if (value.startsWith('8')) {
                value = value.substring(1);
            }
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            // Format the remaining digits
            if (value.length === 0) {
                value = '+7 ';
            } else if (value.length <= 3) {
                value = `+7 ${value}`;
            } else if (value.length <= 6) {
                value = `+7 ${value.slice(0, 3)} ${value.slice(3)}`;
            } else if (value.length <= 8) {
                value = `+7 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
            } else {
                value = `+7 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;
            }
  
            // Visual feedback for incomplete numbers
            if (value.replace(/\D/g, '').length < 11) {
                e.target.style.borderColor = '#ff6b6b';
                e.target.setAttribute('data-incomplete', 'true');
            } else {
                e.target.style.borderColor = '#4CAF50';
                e.target.removeAttribute('data-incomplete');
            }
        } else {
            value = '';
            e.target.style.borderColor = '';
            e.target.removeAttribute('data-incomplete');
        }

        e.target.value = value;
    });

    phoneInput.addEventListener('blur', function (e) {
        const digits = e.target.value.replace(/\D/g, '');

        if (digits.length > 0 && digits.length < 11) {
            e.target.classList.add('error');
  
            let errorMsg = e.target.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginTop = '5px';
                e.target.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Пожалуйста, введите полный номер телефона';
        } else {
            e.target.classList.remove('error');
            const errorMsg = e.target.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });

    phoneInput.addEventListener('focus', function (e) {
        e.target.classList.remove('error');
        const errorMsg = e.target.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}
// Name validation
if (nameInput) {
    nameInput.addEventListener('input', function (e) {
        const value = e.target.value.trim();

        if (value.length > 0) {
            // Check if name has at least 2 characters and contains only letters and spaces
            if (value.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
                e.target.style.borderColor = '#4CAF50'; // Green border for valid
                e.target.removeAttribute('data-incomplete');
            } else {
                e.target.style.borderColor = '#ff6b6b'; // Red border for invalid
                e.target.setAttribute('data-incomplete', 'true');
            }
        } else {
            // Empty input
            e.target.style.borderColor = ''; // Reset to default
            e.target.removeAttribute('data-incomplete');
        }
    });

    nameInput.addEventListener('blur', function (e) {
        const value = e.target.value.trim();

        if (value.length === 0) {
            // Empty field
            e.target.classList.add('error');
  
            let errorMsg = e.target.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginTop = '5px';
                e.target.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Пожалуйста, введите ваше имя';
        } else if (value.length < 2) {
            // Too short
            e.target.classList.add('error');
  
            let errorMsg = e.target.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginTop = '5px';
                e.target.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Имя должно содержать минимум 2 символа';
        } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
            // Invalid characters
            e.target.classList.add('error');
  
            let errorMsg = e.target.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginTop = '5px';
                e.target.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Имя может содержать только буквы и пробелы';
        } else {
            // Valid name
            e.target.classList.remove('error');
            const errorMsg = e.target.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });

    nameInput.addEventListener('focus', function (e) {
        e.target.classList.remove('error');
        const errorMsg = e.target.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

function submitForm() {
    const name = document.getElementById('popup-name').value.trim();
    const phone = document.getElementById('popup-phone').value;
    const phoneDigits = phone.replace(/\D/g, '');

    let isValid = true;

    // Name validation
    if (!name) {
        // Trigger blur event to show error message
        nameInput.dispatchEvent(new Event('blur'));
        isValid = false;
    } else if (name.length < 2 || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
        nameInput.dispatchEvent(new Event('blur'));
        isValid = false;
    }

    // Phone validation
    if (!phone.trim()) {
        phoneInput.dispatchEvent(new Event('blur'));
        isValid = false;
    } else if (phoneDigits.length < 11) {
        phoneInput.dispatchEvent(new Event('blur'));
        isValid = false;
    }

    // If validation fails, don't submit
    if (!isValid) {
        return;
    }

    // Mock-up data
    console.log('Form submitted:', { name, phone });
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');

    // Clear form and close popup
    document.getElementById('popup-name').value = '';
    document.getElementById('popup-phone').value = '';

    // Reset styling
    nameInput.style.borderColor = '';
    phoneInput.style.borderColor = '';
    nameInput.removeAttribute('data-incomplete');
    phoneInput.removeAttribute('data-incomplete');  
    closePopup();
}
    
const submitButton = document.querySelector('.popup-button');
    if (submitButton) {
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        submitForm();
        });
    }
})

document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.desktop-nav .nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      
      // Remove active class from all nav items
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-menu-item')

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault()

            dropdownItems.forEach(dropItem => {
                dropItem.classList.remove('active')
            })
            this.classList.add('active')
        })
    })
})