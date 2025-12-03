document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header-wrapper');
    const scrollObserver = new IntersectionObserver((entries) => {
        // Only toggle class if NOT at top
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Simple scroll listener is smoother for header bg than IO in this specific case
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });


    // --- 2. Mobile Navigation Toggle (The Interview Winner) ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
            
            // Toggle State
            primaryNav.setAttribute('data-visible', !isVisible);
            navToggle.setAttribute('aria-expanded', !isVisible);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isVisible ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
                document.body.style.overflow = 'auto';
            });
        });
    }


    // --- 3. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.15, // Trigger a bit later for better effect
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop watching after reveal
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for no-motion preference
        revealElements.forEach(el => el.style.opacity = 1);
    }
    
    // --- 4. Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight if we are 1/3 down the section
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
});