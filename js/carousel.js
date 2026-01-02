// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.image-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to update carousel
    function updateCarousel(slideIndex) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }

    // Auto-advance slides every 3 seconds
    const carouselInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(nextSlide);
    }, 3000);

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(carouselInterval);
            updateCarousel(index);
            
            // Resume auto-advance after manual selection
            setTimeout(() => {
                const newInterval = setInterval(() => {
                    const nextSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel(nextSlide);
                }, 3000);
            }, 3000);
        });
    });

    // Pause carousel on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    // Resume carousel on mouse leave
    carousel.addEventListener('mouseleave', () => {
        const newInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % totalSlides;
            updateCarousel(nextSlide);
        }, 3000);
    });

    // Pause carousel when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(carouselInterval);
        } else {
            // Resume carousel when page becomes visible
            const resumeInterval = setInterval(() => {
                const nextSlide = (currentSlide + 1) % totalSlides;
                updateCarousel(nextSlide);
            }, 3000);
        }
    });
});