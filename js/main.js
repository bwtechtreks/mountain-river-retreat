// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===== Booking Form Handling =====
const bookingForm = document.getElementById('booking-form');
const formSuccess = document.getElementById('form-success');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(bookingForm);

        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                bookingForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // If Formspree isn't set up yet, show success anyway for demo
            // Remove this fallback once you have a real Formspree endpoint
            bookingForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ===== Suggestion Form Handling =====
const suggestionForm = document.getElementById('suggestion-form');
const suggestionSuccess = document.getElementById('suggestion-success');

if (suggestionForm) {
    suggestionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = suggestionForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(suggestionForm);

        try {
            const response = await fetch(suggestionForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                suggestionForm.classList.add('hidden');
                suggestionSuccess.classList.remove('hidden');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            suggestionForm.classList.add('hidden');
            suggestionSuccess.classList.remove('hidden');
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ===== Set minimum dates for check-in/out =====
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput && checkoutInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);

    // When check-in date changes, update checkout minimum
    checkinInput.addEventListener('change', () => {
        const checkinDate = new Date(checkinInput.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        const minCheckout = checkinDate.toISOString().split('T')[0];
        checkoutInput.setAttribute('min', minCheckout);

        // If checkout is before new minimum, clear it
        if (checkoutInput.value && checkoutInput.value < minCheckout) {
            checkoutInput.value = '';
        }
    });
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Simple scroll animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.feature-card, .activity-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
