/* ============================================
   EQUITY FIRE SOLUTIONS - MAIN JAVASCRIPT
   Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initParallax();
    initActionHub();
    initValueCards();
    initSmoothScroll();
    initCounterAnimation();
});

/* ---------- NAVIGATION ---------- */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/* ---------- PARALLAX EFFECT ---------- */
function initParallax() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    if (parallaxBgs.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxBgs.forEach(bg => {
            const speed = 0.5;
            const yPos = scrolled * speed;
            bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

/* ---------- ACTION HUB ---------- */
function initActionHub() {
    const actionHub = document.querySelector('.action-hub');
    if (!actionHub) return;
    
    // Show/hide based on scroll position
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
        const footerOffset = document.querySelector('.footer')?.offsetTop || document.body.scrollHeight;
        
        // Show after hero section
        if (currentScrollY > heroHeight * 0.5) {
            actionHub.style.opacity = '1';
            actionHub.style.pointerEvents = 'auto';
            actionHub.style.transform = 'translateX(-50%) translateY(0)';
        } else {
            actionHub.style.opacity = '0';
            actionHub.style.pointerEvents = 'none';
            actionHub.style.transform = 'translateX(-50%) translateY(20px)';
        }
        
        // Hide near footer
        if (currentScrollY + window.innerHeight > footerOffset - 100) {
            actionHub.style.opacity = '0';
            actionHub.style.pointerEvents = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Initial state
    actionHub.style.opacity = '0';
    actionHub.style.pointerEvents = 'none';
    actionHub.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
}

/* ---------- VALUE CARDS INTERACTION ---------- */
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Add glow effect
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.boxShadow = '0 10px 40px rgba(220, 20, 60, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.boxShadow = 'none';
            }
        });
    });
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- COUNTER ANIMATION ---------- */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.hero-stat .number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

/* ---------- TECH CARD GLOW EFFECT ---------- */
document.addEventListener('mousemove', (e) => {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ---------- MOBILE MENU ANIMATION ---------- */
function toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const spans = navToggle.querySelectorAll('span');
    
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

/* ---------- FORM HANDLING ---------- */
function handleFormSubmit(form, type) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Sent Successfully!';
            submitBtn.style.background = '#10B981';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

/* ---------- LAZY LOADING IMAGES ---------- */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ---------- SCROLL PROGRESS INDICATOR ---------- */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #DC143C, #FF1F4D);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Initialize scroll progress
initScrollProgress();
