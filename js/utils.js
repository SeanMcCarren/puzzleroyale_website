/**
 * Utility Functions
 * Common functionality used across the site
 */

(function () {
    // Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
