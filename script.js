// Vortex Motors Web App JavaScript

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Model card animations
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

// Observe model cards for animation
document.querySelectorAll('.model-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeBtn = newsletterForm.querySelector('.btn');
    
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simulate subscription
            subscribeBtn.textContent = 'Subscribed!';
            subscribeBtn.style.background = '#28a745';
            emailInput.value = '';
            
            setTimeout(() => {
                subscribeBtn.textContent = 'Subscribe';
                subscribeBtn.style.background = '';
            }, 3000);
        } else {
            emailInput.style.borderColor = '#dc3545';
            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 3000);
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Model card hover effects
document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Button click animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/\d/g, '');
            
            statNumber.dataset.suffix = suffix;
            animateCounter(statNumber, 0, number, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Preload images for better performance
const imageUrls = [
    'https://via.placeholder.com/800x450/1a1a1a/FFFFFF?text=VORTEX+APEX+EV',
    'https://via.placeholder.com/400x250/2D3748/FFFFFF?text=APEX+SEDAN',
    'https://via.placeholder.com/400x250/4A5568/FFFFFF?text=SURGE+SUV',
    'https://via.placeholder.com/400x250/718096/FFFFFF?text=PULSE+COMPACT',
    'https://via.placeholder.com/500x400/0066CC/FFFFFF?text=Innovation+Lab'
];

imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Performance optimization: Lazy loading for non-critical images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading states for buttons (excluding Schedule Test Drive)
document.querySelectorAll('.btn').forEach(btn => {
    if ((btn.textContent.includes('Build') || btn.textContent.includes('Learn More')) && !btn.textContent.includes('Schedule Test Drive')) {
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                e.preventDefault();
                this.classList.add('loading');
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                    // Here you would typically redirect or show a modal
                    console.log(`Action: ${originalText}`);
                }, 2000);
            }
        });
    }
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.background = '#f0f0f0';
        this.style.color = '#999';
        this.alt = 'Image not available';
    });
});

// Test Drive Modal Functionality - Global functions for better reliability
function openTestDriveModal(e) {
    e.preventDefault();
    console.log('Opening test drive modal...');
    const testDriveModal = document.getElementById('testDriveModal');
    if (!testDriveModal) {
        console.error('Test drive modal not found!');
        return;
    }
    
    testDriveModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset to first step
    resetMultiStepForm();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const preferredDate = document.getElementById('preferredDate');
    const alternateDate = document.getElementById('alternateDate');
    if (preferredDate) preferredDate.min = today;
    if (alternateDate) alternateDate.min = today;
    
    // Focus on first input of first step
    setTimeout(() => {
        const zipCode = document.getElementById('zipCode');
        if (zipCode) zipCode.focus();
    }, 100);
}

function closeTestDriveModal() {
    console.log('Closing test drive modal...');
    const testDriveModal = document.getElementById('testDriveModal');
    const testDriveForm = document.getElementById('testDriveForm');
    
    if (testDriveModal) testDriveModal.style.display = 'none';
    document.body.style.overflow = '';
    if (testDriveForm) testDriveForm.reset();
    
    // Reset multi-step form
    resetMultiStepForm();
}

function handleTestDriveSubmission(e) {
    e.preventDefault();
    console.log('Handling test drive form submission...');
    
    const testDriveForm = document.getElementById('testDriveForm');
    if (!testDriveForm) {
        console.error('Test drive form not found!');
        return;
    }
    
    const formData = new FormData(testDriveForm);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'vehicleModel', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Validate zip code
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(data.zipCode)) {
        alert('Please enter a valid 5-digit zip code.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = testDriveForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showSuccessMessage(data);
        closeTestDriveModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Multi-step form state
let currentStep = 1;
const totalSteps = 4;

// Initialize modal functionality - with multi-step support
function initializeTestDriveModal() {
    console.log('Initializing test drive modal...');
    
    // Modal elements
    const modalClose = document.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancelTestDrive');
    const testDriveForm = document.getElementById('testDriveForm');
    const testDriveModal = document.getElementById('testDriveModal');
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const submitBtn = document.getElementById('submitForm');
    
    // Modal close events
    if (modalClose) {
        modalClose.addEventListener('click', closeTestDriveModal);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeTestDriveModal);
    }
    
    // Close modal when clicking outside
    if (testDriveModal) {
        testDriveModal.addEventListener('click', (e) => {
            if (e.target === testDriveModal) {
                closeTestDriveModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && testDriveModal && testDriveModal.style.display === 'block') {
            closeTestDriveModal();
        }
    });
    
    // Step navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                goToStep(currentStep + 1);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToStep(currentStep + 1);
        });
    }
    
    // Form submission handling
    if (testDriveForm) {
        testDriveForm.addEventListener('submit', handleTestDriveSubmission);
    }
    
    console.log('Test drive modal initialization complete');
}

function validateCurrentStep() {
    const step = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!step) return false;
    
    const requiredFields = step.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
            
            // Reset border color after 3 seconds
            setTimeout(() => {
                field.style.borderColor = '';
            }, 3000);
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Additional validation for specific steps
    if (currentStep === 1) {
        const zipCode = document.getElementById('zipCode');
        if (zipCode && zipCode.value && !/^\d{5}$/.test(zipCode.value)) {
            zipCode.style.borderColor = '#dc3545';
            isValid = false;
        }
    }
    
    if (currentStep === 3) {
        const email = document.getElementById('email');
        if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.style.borderColor = '#dc3545';
            isValid = false;
        }
    }
    
    if (!isValid) {
        const firstInvalidField = step.querySelector('input[style*="border-color: rgb(220, 53, 69)"], select[style*="border-color: rgb(220, 53, 69)"]');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
    
    return isValid;
}

function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;
    
    // Hide current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const currentProgressEl = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }
    if (currentProgressEl) {
        currentProgressEl.classList.remove('active');
        if (stepNumber > currentStep) {
            currentProgressEl.classList.add('completed');
        }
    }
    
    // Show new step
    currentStep = stepNumber;
    const newStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const newProgressEl = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    
    if (newStepEl) {
        newStepEl.classList.add('active');
    }
    if (newProgressEl) {
        newProgressEl.classList.add('active');
        if (stepNumber < currentStep) {
            newProgressEl.classList.remove('completed');
        }
    }
    
    // Update navigation buttons
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const submitBtn = document.getElementById('submitForm');
    
    if (prevBtn) {
        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
    }
    
    if (nextBtn && submitBtn) {
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }
    
    // Focus on first input of new step
    setTimeout(() => {
        const firstInput = newStepEl?.querySelector('input, select, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

function resetMultiStepForm() {
    currentStep = 1;
    
    // Reset all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Show first step
    const firstStep = document.querySelector('.form-step[data-step="1"]');
    const firstProgress = document.querySelector('.progress-step[data-step="1"]');
    
    if (firstStep) firstStep.classList.add('active');
    if (firstProgress) firstProgress.classList.add('active');
    
    // Reset navigation buttons
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const submitBtn = document.getElementById('submitForm');
    
    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (prevBtn) prevBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';
}

function showSuccessMessage(data) {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'modal';
    successModal.style.display = 'block';
    successModal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; text-align: center;">
            <div class="modal-header">
                <h2>Test Drive Scheduled!</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div style="padding: 2rem;">
                <div style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;">✅</div>
                <h3>Thank you, ${data.firstName}!</h3>
                <p>Your test drive for the <strong>${getVehicleName(data.vehicleModel)}</strong> has been scheduled.</p>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <p><strong>Date:</strong> ${formatDate(data.preferredDate)}</p>
                    <p><strong>Time:</strong> ${data.preferredTime}</p>
                    <p><strong>Location:</strong> ${data.dealership || 'We\'ll contact you with the nearest location'}</p>
                </div>
                <p style="color: #666; font-size: 0.9rem;">
                    A Vortex Motors representative will contact you at ${data.phone} within 24 hours to confirm your appointment.
                </p>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Close success modal events
    const successClose = successModal.querySelector('.modal-close');
    successClose.addEventListener('click', () => {
        successModal.remove();
    });
    
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.remove();
        }
    });
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(successModal)) {
            successModal.remove();
        }
    }, 10000);
}

function getVehicleName(modelCode) {
    const models = {
        'apex': 'Vortex Apex',
        'surge': 'Vortex Surge',
        'pulse': 'Vortex Pulse'
    };
    return models[modelCode] || 'Vortex Vehicle';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Auto-populate dealership based on zip code (simplified example)
document.getElementById('zipCode').addEventListener('blur', function() {
    const zipCode = this.value;
    if (zipCode.length === 5) {
        const dealershipSelect = document.getElementById('dealership');
        
        // Simple zip code to dealership mapping (in real app, this would be an API call)
        const zipMappings = {
            '90210': 'west',
            '10001': 'downtown',
            '60601': 'downtown',
            '30301': 'south',
            '94102': 'west'
        };
        
        const suggestedDealer = zipMappings[zipCode];
        if (suggestedDealer && dealershipSelect.value === '') {
            dealershipSelect.value = suggestedDealer;
            
            // Show a brief notification
            const notification = document.createElement('div');
            notification.textContent = 'We\'ve suggested the nearest dealership based on your zip code.';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem;
                border-radius: 6px;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
});

// Phone number formatting
document.getElementById('phone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d+)/, '($1) $2');
    }
    this.value = value;
});

// Initialize test drive modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use setTimeout to ensure it runs after other event listeners
    setTimeout(initializeTestDriveModal, 0);
});

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeTestDriveModal, 0);
    });
} else {
    setTimeout(initializeTestDriveModal, 0);
}

// Testimonial Carousel Functionality
let currentTestimonial = 0;
let testimonialSlides;
let testimonialDots;
let nextTestimonialBtn;
let prevTestimonialBtn;
let testimonialInterval;

function showTestimonial(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
    }
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(nextIndex);
}

function prevTestimonial() {
    const prevIndex = currentTestimonial === 0 ? testimonialSlides.length - 1 : currentTestimonial - 1;
    showTestimonial(prevIndex);
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 6000); // Change every 6 seconds
}

function stopTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
}

// Initialize testimonial carousel
function initializeTestimonialCarousel() {
    // Get DOM elements
    testimonialSlides = document.querySelectorAll('.testimonial-slide');
    testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    nextTestimonialBtn = document.getElementById('nextTestimonial');
    prevTestimonialBtn = document.getElementById('prevTestimonial');
    
    if (testimonialSlides.length === 0) {
        console.log('No testimonial slides found');
        return;
    }
    
    // Set up navigation buttons
    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', () => {
            nextTestimonial();
            stopTestimonialAutoplay();
            startTestimonialAutoplay(); // Restart autoplay
        });
    }
    
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', () => {
            prevTestimonial();
            stopTestimonialAutoplay();
            startTestimonialAutoplay(); // Restart autoplay
        });
    }
    
    // Set up dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            stopTestimonialAutoplay();
            startTestimonialAutoplay(); // Restart autoplay
        });
    });
    
    // Start autoplay
    startTestimonialAutoplay();
    
    // Pause autoplay when user hovers over carousel
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopTestimonialAutoplay);
        carousel.addEventListener('mouseleave', startTestimonialAutoplay);
    }
    
    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopTestimonialAutoplay();
        } else {
            startTestimonialAutoplay();
        }
    });
    
    console.log('✨ Testimonial carousel initialized');
}

// Initialize testimonial carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTestimonialCarousel);

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTestimonialCarousel);
} else {
    initializeTestimonialCarousel();
}

console.log('🚗 Vortex Motors Web App Loaded Successfully!');
