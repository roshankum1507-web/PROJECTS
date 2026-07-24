const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const logoutBtn = document.getElementById('logoutBtn');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (darkModeBtn && lightModeBtn) {
            darkModeBtn.classList.add('active');
            lightModeBtn.classList.remove('active');
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (lightModeBtn && darkModeBtn) {
            lightModeBtn.classList.add('active');
            darkModeBtn.classList.remove('active');
        }
    }
}

if (lightModeBtn) {
    lightModeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
    });
}

if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        darkModeBtn.classList.add('active');
        lightModeBtn.classList.remove('active');
    });
}

applyTheme();

function getToastElements() {
    return {
        toast: document.getElementById('logoutToast'),
        message: document.getElementById('toastMessage'),
        confirmBtn: document.getElementById('toastLogoutBtn'),
        cancelBtn: document.getElementById('toastCancelBtn')
    };
}

function resetToast() {
    const { toast, message, confirmBtn, cancelBtn } = getToastElements();
    if (toast) {
        toast.classList.add('hidden');
        if (toast.dismissTimer) {
            clearTimeout(toast.dismissTimer);
            toast.dismissTimer = null;
        }
    }
    if (message) message.textContent = 'Are you sure you want to logout?';
    if (confirmBtn) confirmBtn.textContent = 'Logout';
    if (confirmBtn) confirmBtn.onclick = null;
    if (cancelBtn) cancelBtn.onclick = null;
}

function showToast(messageText, confirmText, onConfirm) {
    const { toast, message, confirmBtn, cancelBtn } = getToastElements();
    if (!toast || !message || !confirmBtn || !cancelBtn) return;

    message.textContent = messageText;
    confirmBtn.textContent = confirmText;
    toast.classList.remove('hidden');

    confirmBtn.onclick = function(e) {
        e.preventDefault();
        if (typeof onConfirm === 'function') onConfirm();
        resetToast();
    };

    cancelBtn.onclick = function(e) {
        e.preventDefault();
        resetToast();
    };

    cancelBtn.focus();
    toast.dismissTimer = setTimeout(resetToast, 10000);
}

function showLogoutToast() {
    showToast('Are you sure you want to logout?', 'Logout', function() {
        localStorage.removeItem('loggedIn');
        window.location.href = '../login/login.html';
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showLogoutToast();
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.id === 'logoutBtn') {
            return;
        }
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const ctaButtons = document.querySelectorAll('a[href^="#"]');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.closest('.hero') || this.closest('.footer')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 4000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name) {
            showFormMessage('Please enter your name', 'error');
            return;
        }
        
        if (!email) {
            showFormMessage('Please enter your email', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!subject) {
            showFormMessage('Please enter a subject', 'error');
            return;
        }
        
        if (!message) {
            showFormMessage('Please enter a message', 'error');
            return;
        }

        const messageData = {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };

        const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        existingMessages.push(messageData);
        localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .stat, .skill-category').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.src.includes('placeholder')) {
            img.classList.add('lazy-image');
        }
    });
}

function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

if (contactForm) {
    const labels = contactForm.querySelectorAll('label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            const input = document.getElementById(this.getAttribute('for'));
            if (input) {
                input.focus();
            }
        });
    });
}

window.addEventListener('load', () => {
    if (contactForm) {
        contactForm.reset();
        formMessage.className = 'form-message';
    }
});

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

function debounce(func, wait) {
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

function smoothScrollSupported() {
    const div = document.createElement('div');
    return ('scrollBehavior' in div.style);
}

const adminForm = document.getElementById('adminForm');
const adminLoginView = document.getElementById('adminLoginView');
const adminDashboardView = document.getElementById('adminDashboardView');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const messagesContainer = document.getElementById('messagesContainer');
const messageCount = document.getElementById('messageCount');
const adminError = document.getElementById('adminError');
const adminPwdToggle = document.getElementById('adminPwdToggle');
const adminPasswordInput = document.getElementById('adminPassword');

if (adminPwdToggle && adminPasswordInput) {
    adminPwdToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isShown = adminPwdToggle.getAttribute('aria-pressed') === 'true';
        if (isShown) {
            adminPasswordInput.type = 'password';
            adminPwdToggle.setAttribute('aria-pressed', 'false');
            adminPwdToggle.textContent = 'Show';
            adminPwdToggle.setAttribute('aria-label', 'Show password');
        } else {
            adminPasswordInput.type = 'text';
            adminPwdToggle.setAttribute('aria-pressed', 'true');
            adminPwdToggle.textContent = 'Hide';
            adminPwdToggle.setAttribute('aria-label', 'Hide password');
        }
    });
}

adminForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (username === 'admin' && password === 'admin123') {
        adminError.textContent = '';
        localStorage.setItem('adminLoggedIn', 'true');
        adminLoginView.style.display = 'none';
        adminDashboardView.style.display = 'block';
        loadMessages();
        adminForm.reset();
    } else {
        adminError.textContent = 'Invalid credentials';
    }
});

adminLogoutBtn.addEventListener('click', function() {
    localStorage.removeItem('adminLoggedIn');
    adminLoginView.style.display = 'block';
    adminDashboardView.style.display = 'none';
    adminForm.reset();
});

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messageCount.textContent = messages.length;

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="no-messages">No messages yet</div>';
        return;
    }

    messagesContainer.innerHTML = '';
    messages.forEach((msg, index) => {
        const messageBox = document.createElement('div');
        messageBox.className = 'message-box';
        messageBox.innerHTML = `
            <h4>${msg.name}</h4>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Subject:</strong> ${msg.subject}</p>
            <p><strong>Date:</strong> ${new Date(msg.timestamp).toLocaleString()}</p>
            <div class="message-content">${msg.message}</div>
            <button class="message-delete" onclick="deleteMessage(${index})">Delete Message</button>
        `;
        messagesContainer.appendChild(messageBox);
    });
}

window.deleteMessage = function(index) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    showToast('Delete this message?', 'Delete', function() {
        messages.splice(index, 1);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        loadMessages();
    });
};

if (localStorage.getItem('adminLoggedIn')) {
    adminLoginView.style.display = 'none';
    adminDashboardView.style.display = 'block';
    loadMessages();
}

if (!smoothScrollSupported()) {
    console.log('Smooth scroll not supported, using polyfill');
}
console.log('%c🚀 Welcome to My Portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cPowered by HTML5, CSS3, and Vanilla JavaScript', 'font-size: 14px; color: #764ba2;');
