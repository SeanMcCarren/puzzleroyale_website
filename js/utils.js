/**
 * Utility Functions
 * Common functionality used across the site
 */

(function () {
    const body = document.body;

    window.addEventListener('load', () => {
        body.classList.add('page-ready');
    });

    // Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const header = document.querySelector('[data-site-header]');
    if (!header) return;

    let previousScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > previousScrollY && currentScrollY > 180;
        header.classList.toggle('is-hidden', scrollingDown);
        previousScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
})();
