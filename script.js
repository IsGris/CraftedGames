document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for hero button
    const heroCtaButton = document.getElementById('hero-cta-button');
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Update footer year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll Reveal
    const scrollRevealElements = document.querySelectorAll('.js-scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.scrollDelay) || 0;
                // The original React component had delay * 0.2 for transition
                // Here, we'll apply the data-scroll-delay directly as transition-delay
                entry.target.style.transitionDelay = `${delay * 0.2}s`; // Match Framer Motion logic: delay * 0.2
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, {
        threshold: 0.1, // Same as react-intersection-observer threshold
        rootMargin: "-50px 0px" // Same as react-intersection-observer rootMargin
    });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });

    const buttons = document.querySelectorAll('.button'); // Или более специфичный селектор для кнопок с анимацией

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Удаляем предыдущие волны, если они еще есть (на всякий случай)
            const oldRipple = this.querySelector('.ripple');
            if (oldRipple) {
                oldRipple.remove();
            }

            // Получаем координаты клика относительно кнопки
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Создаем элемент волны
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Добавляем волну в кнопку
            this.appendChild(ripple);

            // Удаляем элемент волны после завершения анимации
            // Длительность должна совпадать с animation-duration в CSS
            setTimeout(() => {
                ripple.remove();
            }, 700); // 0.7s = 700ms
        });
    });
});