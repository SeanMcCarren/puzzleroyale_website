/**
 * Theme Toggle Functionality
 * Handles light/dark mode switching with system preference detection
 */

(function () {
    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');

    if (!toggle) return; // Exit if toggle button doesn't exist

    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

    /**
     * Apply theme to the page
     * @param {boolean} isLight - Whether to apply light theme
     */
    const applyTheme = (isLight) => {
        body.classList.toggle('light', isLight);
        toggle.setAttribute('aria-pressed', String(isLight));
    };

    // Apply initial theme based on system preference
    applyTheme(prefersLight.matches);

    // Listen for system theme changes
    prefersLight.addEventListener('change', (event) => applyTheme(event.matches));

    // Toggle theme on button click
    toggle.addEventListener('click', () => {
        const isLight = !body.classList.contains('light');
        applyTheme(isLight);
    });
})();
