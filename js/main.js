/**
 * FAFALI Group - Modern Corporate Website JavaScript
 * Handles mobile menu, animations, form validation, and interactive features
 */

class FafaliGroupWebsite {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all functionality
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupSmoothScroll();
        this.setupFormValidation();
        this.setupAccessibility();
        this.setupVideoControls();
        this.setupImageCarousel();
        this.setupSearchBookingTools();
        this.setupServiceCards();
        this.setupPackageCarousel();
        this.setupGallerySlideshow();
        this.setupMediaStorytelling();
        this.setupVisaSupport();
        this.setupHeroImageSlider();
        this.updateVlogSection();
        
        // Set up event listeners
        this.bindEvents();
        
        console.log('FAFALI Group website initialized successfully');
    }

    // Mobile Menu Functionality
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Toggle ARIA attributes for accessibility
                hamburger.setAttribute('aria-expanded', 
                    hamburger.classList.contains('active')
                );
            });

            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Scroll Effects for Navigation
    setupScrollEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        if (navbar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add/remove scrolled class for navbar styling
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Keep navbar always fixed - only change visual state
                // Removed hide/show functionality to maintain fixed positioning

                lastScrollTop = scrollTop;
            });
        }
    }

    // Animation Setup with Intersection Observer
    setupAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // If user prefers reduced motion, show all elements immediately
            const animatedElements = document.querySelectorAll('.fade-in-up');
            animatedElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            });
            return;
        }

        // Setup intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in-up class
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Stagger animation for grid items
        this.setupStaggeredAnimations();
    }

    // Staggered animations for grid items
    setupStaggeredAnimations() {
        const grids = document.querySelectorAll('.services-grid, .features-grid, .stats-grid');
        
        grids.forEach(grid => {
            const items = grid.querySelectorAll('.service-card, .feature-item, .stat-item');
            
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    // Account for fixed navbar (~195px) + promotional banner (75px) height
                    const navbarHeight = 270;
                    const offsetTop = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Form Validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }

    // Validate individual form
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(field)} is required`;
            isValid = false;
        }
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        // Phone validation
        else if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }
        // Number validation
        else if (fieldType === 'number' && value) {
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            
            if (min && parseFloat(value) < parseFloat(min)) {
                errorMessage = `Value must be at least ${min}`;
                isValid = false;
            }
            
            if (max && parseFloat(value) > parseFloat(max)) {
                errorMessage = `Value must be at most ${max}`;
                isValid = false;
            }
        }

        // Display error or success
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }

        return isValid;
    }

    // Show field error
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorElement);
    }

    // Show field success
    showFieldSuccess(field) {
        this.clearFieldError(field);
        
        field.classList.add('success');
        field.setAttribute('aria-invalid', 'false');
    }

    // Clear field error
    clearFieldError(field) {
        field.classList.remove('error', 'success');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Get field label for error messages
    getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent : field.name || field.placeholder || 'This field';
    }

    // Accessibility Features
    setupAccessibility() {
        // Keyboard navigation for custom elements
        this.setupKeyboardNavigation();
        
        // Focus management
        this.setupFocusManagement();
        
        // ARIA live regions for dynamic content
        this.setupLiveRegions();
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        // Custom dropdown navigation
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (trigger && menu) {
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    }
                });
            }
        });

        // Escape key to close modals/menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
                
                // Close lightbox (will be implemented in gallery page)
                const lightbox = document.querySelector('.lightbox.active');
                if (lightbox) {
                    this.closeLightbox();
                }
            }
        });
    }

    // Focus management
    setupFocusManagement() {
        // Trap focus in modals (for future use)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal.active');
                if (modal) {
                    this.trapFocus(e, modal);
                }
            }
        });
    }

    // Trap focus within container
    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    // ARIA live regions
    setupLiveRegions() {
        // Create live region for dynamic announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    // Announce to screen readers
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Video Controls
    setupVideoControls() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Pause other videos when one starts playing
            video.addEventListener('play', () => {
                videos.forEach(otherVideo => {
                    if (otherVideo !== video && !otherVideo.paused) {
                        otherVideo.pause();
                    }
                });
            });

            // Add keyboard controls
            video.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case ' ':
                    case 'k':
                        e.preventDefault();
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                        break;
                    case 'f':
                        e.preventDefault();
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                        } else {
                            video.requestFullscreen();
                        }
                        break;
                }
            });
        });
    }

    // Event Binding
    bindEvents() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Page visibility API for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause videos and animations when page is hidden
                this.pauseAnimations();
            } else {
                // Resume when page becomes visible
                this.resumeAnimations();
            }
        });
    }

    // Handle window resize
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    }

    // Pause animations (for performance)
    pauseAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }

    // Resume animations
    resumeAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }

    // Utility: Debounce function
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

    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Search and Booking Tools Functionality
    setupSearchBookingTools() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const searchForms = document.querySelectorAll('.search-form');
        
        if (tabButtons.length === 0) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all tabs and forms
                tabButtons.forEach(btn => btn.classList.remove('active'));
                searchForms.forEach(form => form.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding form
                button.classList.add('active');
                const targetForm = document.getElementById(`${targetTab}-form`);
                if (targetForm) {
                    targetForm.classList.add('active');
                }
            });
        });
        
        // Price range display
        const priceRange = document.getElementById('price-range');
        const priceValue = document.getElementById('price-value');
        
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', (e) => {
                const value = parseInt(e.target.value).toLocaleString();
                priceValue.textContent = value;
            });
        }
        
        // Visa processing time and fee display
        const destination = document.getElementById('destination');
        const visaType = document.getElementById('visa-type');
        const processingTime = document.getElementById('processing-time');
        const visaFee = document.getElementById('visa-fee');
        
        if (destination && visaType) {
            const updateVisaInfo = () => {
                const dest = destination.value;
                const type = visaType.value;
                
                if (dest && type) {
                    // Simulate visa information based on destination and type
                    const processingTimes = {
                        'usa': { 'tourist': '10-15 business days', 'business': '7-10 business days', 'student': '15-20 business days' },
                        'uk': { 'tourist': '3-5 business days', 'business': '5-7 business days', 'student': '10-15 business days' },
                        'canada': { 'tourist': '2-4 weeks', 'business': '2-3 weeks', 'student': '4-8 weeks' },
                        'australia': { 'tourist': '15-30 days', 'business': '10-20 days', 'student': '1-3 months' },
                        'germany': { 'tourist': '5-10 business days', 'business': '3-7 business days', 'student': '10-15 business days' },
                        'france': { 'tourist': '5-10 business days', 'business': '3-7 business days', 'student': '10-15 business days' },
                        'uae': { 'tourist': '3-5 business days', 'business': '2-3 business days', 'student': '5-7 business days' },
                        'south-africa': { 'tourist': '5-10 business days', 'business': '3-7 business days', 'student': '10-15 business days' }
                    };
                    
                    const fees = {
                        'usa': { 'tourist': 'GHS 2,500', 'business': 'GHS 3,200', 'student': 'GHS 2,800' },
                        'uk': { 'tourist': 'GHS 1,800', 'business': 'GHS 2,200', 'student': 'GHS 2,000' },
                        'canada': { 'tourist': 'GHS 2,200', 'business': 'GHS 2,800', 'student': 'GHS 2,400' },
                        'australia': { 'tourist': 'GHS 2,800', 'business': 'GHS 3,500', 'student': 'GHS 3,000' },
                        'germany': { 'tourist': 'GHS 1,600', 'business': 'GHS 2,000', 'student': 'GHS 1,800' },
                        'france': { 'tourist': 'GHS 1,600', 'business': 'GHS 2,000', 'student': 'GHS 1,800' },
                        'uae': { 'tourist': 'GHS 1,200', 'business': 'GHS 1,500', 'student': 'GHS 1,300' },
                        'south-africa': { 'tourist': 'GHS 1,400', 'business': 'GHS 1,800', 'student': 'GHS 1,600' }
                    };
                    
                    if (processingTimes[dest] && processingTimes[dest][type]) {
                        processingTime.textContent = processingTimes[dest][type];
                        visaFee.textContent = fees[dest][type];
                    }
                } else {
                    processingTime.textContent = 'Select destination to see estimated time';
                    visaFee.textContent = 'Select options to see fee estimate';
                }
            };
            
            destination.addEventListener('change', updateVisaInfo);
            visaType.addEventListener('change', updateVisaInfo);
        }
    }
    
    // Service Cards Functionality
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const serviceBtn = card.querySelector('.service-btn');
            const serviceForm = card.querySelector('.service-form');
            
            if (serviceBtn && serviceForm) {
                serviceBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const service = serviceBtn.getAttribute('data-service');
                    
                    // Toggle form visibility
                    if (serviceForm.style.display === 'none' || !serviceForm.style.display) {
                        serviceForm.style.display = 'block';
                        serviceBtn.textContent = 'Hide Form';
                        serviceBtn.classList.remove('btn-primary');
                        serviceBtn.classList.add('btn-outline');
                    } else {
                        serviceForm.style.display = 'none';
                        serviceBtn.textContent = serviceBtn.textContent.includes('Learn More') ? 'Learn More' : 'Apply Now';
                        serviceBtn.classList.remove('btn-outline');
                        serviceBtn.classList.add('btn-primary');
                    }
                    
                    // Scroll to form if just opened
                    if (serviceForm.style.display === 'block') {
                        setTimeout(() => {
                            serviceForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                    }
                });
            }
        });
    }
    
    // Package Carousel Functionality
    setupPackageCarousel() {
        const packageCards = document.querySelectorAll('.package-card');
        const carouselPrev = document.querySelector('.carousel-prev');
        const carouselNext = document.querySelector('.carousel-next');
        const indicators = document.querySelectorAll('.packages-carousel-container .indicator');
        
        if (packageCards.length === 0) return;
        
        let currentSlide = 0;
        
        const showSlide = (index) => {
            packageCards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        };
        
        // Initialize
        showSlide(0);
        
        // Previous button
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                const prevIndex = currentSlide === 0 ? packageCards.length - 1 : currentSlide - 1;
                showSlide(prevIndex);
            });
        }
        
        // Next button
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                const nextIndex = currentSlide === packageCards.length - 1 ? 0 : currentSlide + 1;
                showSlide(nextIndex);
            });
        }
        
        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Package booking buttons
        const packageBtns = document.querySelectorAll('.package-btn');
        packageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const package = btn.getAttribute('data-package');
                this.showNotification(`Redirecting to booking page for ${package} package...`, 'info');
                // In a real application, this would redirect to a booking page
            });
        });
    }
    
    // Gallery Slideshow Functionality
    setupGallerySlideshow() {
        const gallerySlides = document.querySelectorAll('.gallery-slide');
        const galleryPrev = document.querySelector('.gallery-prev');
        const galleryNext = document.querySelector('.gallery-next');
        const galleryIndicators = document.querySelectorAll('.gallery-container .indicator');
        
        if (gallerySlides.length === 0) return;
        
        let currentGallerySlide = 0;
        let galleryInterval;
        
        const showGallerySlide = (index) => {
            gallerySlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            galleryIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentGallerySlide = index;
        };
        
        // Initialize
        showGallerySlide(0);
        
        // Auto-advance slides
        const startAutoAdvance = () => {
            galleryInterval = setInterval(() => {
                const nextIndex = currentGallerySlide === gallerySlides.length - 1 ? 0 : currentGallerySlide + 1;
                showGallerySlide(nextIndex);
            }, 5000);
        };
        
        const stopAutoAdvance = () => {
            clearInterval(galleryInterval);
        };
        
        // Start auto-advance
        startAutoAdvance();
        
        // Previous button
        if (galleryPrev) {
            galleryPrev.addEventListener('click', () => {
                stopAutoAdvance();
                const prevIndex = currentGallerySlide === 0 ? gallerySlides.length - 1 : currentGallerySlide - 1;
                showGallerySlide(prevIndex);
                startAutoAdvance();
            });
        }
        
        // Next button
        if (galleryNext) {
            galleryNext.addEventListener('click', () => {
                stopAutoAdvance();
                const nextIndex = currentGallerySlide === gallerySlides.length - 1 ? 0 : currentGallerySlide + 1;
                showGallerySlide(nextIndex);
                startAutoAdvance();
            });
        }
        
        // Indicators
        galleryIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoAdvance();
                showGallerySlide(index);
                startAutoAdvance();
            });
        });
        
        // Pause on hover
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', stopAutoAdvance);
            galleryContainer.addEventListener('mouseleave', startAutoAdvance);
        }
    }
    
    // Media Storytelling Functionality
    setupMediaStorytelling() {
        const playButtons = document.querySelectorAll('.play-btn');
        const experienceCards = document.querySelectorAll('.experience-card');
        
        // Play button functionality
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const videoContainer = button.closest('.video-container');
                const video = videoContainer.querySelector('video');
                
                if (video) {
                    video.play();
                    button.style.display = 'none';
                }
            });
        });
        
        // Experience card hover effects
        experienceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const overlay = card.querySelector('.experience-overlay');
                if (overlay) {
                    // In a real application, this would open a gallery or navigate to a page
                    this.showNotification('Opening gallery...', 'info');
                }
            });
        });
    }
    
    // Hero Image Slider Functionality
    setupHeroImageSlider() {
        const heroImages = document.querySelectorAll('.hero-image');
        
        if (heroImages.length === 0) return;
        
        let currentHeroSlide = 0;
        
        const showHeroSlide = (index) => {
            heroImages.forEach((image, i) => {
                image.classList.toggle('active', i === index);
            });
            
            currentHeroSlide = index;
        };
        
        // Initialize with first image
        showHeroSlide(0);
        
        // Auto-advance slides
        setInterval(() => {
            const nextIndex = currentHeroSlide === heroImages.length - 1 ? 0 : currentHeroSlide + 1;
            showHeroSlide(nextIndex);
        }, 5000); // Change image every 5 seconds
    }
    
    // Visa Support Interactive Features
    setupVisaSupport() {
        const startVisaSupportBtn = document.getElementById('start-visa-support');
        
        if (startVisaSupportBtn) {
            startVisaSupportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = document.getElementById('destination').value;
                const visaType = document.getElementById('visa-type').value;
                
                if (destination && visaType) {
                    this.showNotification('Redirecting to visa application...', 'success');
                    // In a real application, this would redirect to a visa application page
                } else {
                    this.showNotification('Please select destination and visa type', 'error');
                }
            });
        }
    }

    // Gallery Lightbox (will be extended in gallery page)
    openLightbox(imageSrc, imageAlt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="${imageAlt}">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        lightbox.classList.add('active');
        
        // Focus management
        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.focus();
        
        // Close functionality
        closeButton.addEventListener('click', () => this.closeLightbox());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        this.announce('Image opened in lightbox');
    }

    closeLightbox() {
        const lightbox = document.querySelector('.lightbox.active');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
            this.announce('Lightbox closed');
        }
    }

    // Form submission handler
    handleFormSubmission(form, data) {
        // This would typically send data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        this.showNotification('Form submitted successfully! We will contact you soon.', 'success');
        
        // Reset form
        form.reset();
        
        this.announce('Form submitted successfully');
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Update Vlog Section with YouTube Videos
    updateVlogSection() {
        // Find the vlog section
        const vlogSection = document.querySelector('.fafali-vlog');
        if (!vlogSection) return;

        // Create the new vlog content with YouTube videos
        const newVlogContent = `
            <div class="container">
                <h2 class="section-title fade-in-up">Fafali Group Vlog</h2>
                <p class="section-subtitle fade-in-up delay-1">Watch our latest travel adventures and customer stories</p>
                <div class="vlog-grid">
                    <div class="vlog-card fade-in-up delay-2">
                        <div class="vlog-video">
                            <iframe 
                                src="https://www.youtube.com/embed/Ng4AaA-QldE" 
                                title="Fafali Group Travel Video 1"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="vlog-content">
                            <h3>Fafali Group Travel Experience</h3>
                            <p>Discover amazing travel destinations and customer experiences with Fafali Group's professional services.</p>
                            <div class="vlog-meta">
                                <span class="vlog-date">Latest Upload</span>
                                <a href="https://youtu.be/Ng4AaA-QldE?si=8kKj7wiDLWnSCflj" target="_blank" class="youtube-link">
                                    <i class="fab fa-youtube"></i> Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="vlog-card fade-in-up delay-3">
                        <div class="vlog-video">
                            <iframe 
                                src="https://www.youtube.com/embed/9xhqCaIi4dU" 
                                title="Fafali Group Travel Video 2"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="vlog-content">
                            <h3>Customer Success Stories</h3>
                            <p>Hear from our satisfied customers about their incredible travel experiences organized by Fafali Group.</p>
                            <div class="vlog-meta">
                                <span class="vlog-date">Popular Video</span>
                                <a href="https://youtu.be/9xhqCaIi4dU?si=wYIuXOSop-SaMkej" target="_blank" class="youtube-link">
                                    <i class="fab fa-youtube"></i> Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="vlog-card fade-in-up delay-4">
                        <div class="vlog-video">
                            <iframe 
                                src="https://www.youtube.com/embed/5Gx60O4M8M8" 
                                title="Fafali Group Travel Video 3"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="vlog-content">
                            <h3>Travel Tips & Guides</h3>
                            <p>Learn valuable travel tips and destination guides from Fafali Group's expert travel consultants.</p>
                            <div class="vlog-meta">
                                <span class="vlog-date">Travel Guide</span>
                                <a href="https://youtu.be/5Gx60O4M8M8?si=THmg6G14dr0vshGk" target="_blank" class="youtube-link">
                                    <i class="fab fa-youtube"></i> Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vlog-cta">
                    <a href="https://www.youtube.com/@FafaliGroup" target="_blank" class="btn btn-outline">Subscribe to Our Channel</a>
                    <a href="https://www.youtube.com/@FafaliGroup" target="_blank" class="btn btn-primary">Watch More Videos</a>
                </div>
            </div>
        `;

        // Replace the container content
        const container = vlogSection.querySelector('.container');
        if (container) {
            container.innerHTML = newVlogContent;
            console.log('Vlog section updated with YouTube videos');
        }
    }
}

// Additional CSS for JavaScript functionality
const additionalStyles = `
<style>
/* Field Error Styles */
.field-error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

input.error,
textarea.error,
select.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

input.success,
textarea.success,
select.success {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

/* Notification Styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px 20px;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 10000;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #28a745;
    color: #155724;
}

.notification-error {
    border-left: 4px solid #dc3545;
    color: #721c24;
}

.notification-info {
    border-left: 4px solid #17a2b8;
    color: #0c5460;
}

/* Lightbox Styles */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
}

.lightbox.active {
    opacity: 1;
    visibility: visible;
}

.lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: -40px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
    
    .lightbox-close {
        top: 10px;
        right: 10px;
        position: fixed;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FafaliGroupWebsite();
});

// Export for potential use in other scripts
window.FafaliGroupWebsite = FafaliGroupWebsite;