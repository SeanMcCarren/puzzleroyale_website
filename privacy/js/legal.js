/**
 * Legal Page Tab Functionality
 * Handles switching between Privacy Policy and Terms & Conditions
 */

(function () {
    const tabs = Array.from(document.querySelectorAll('.tablist button'));
    const panels = Array.from(document.querySelectorAll('.tab-panel'));

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // Update tab states
            tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));

            // Update panel visibility
            panels.forEach((panel) => {
                if (panel.id === targetId) {
                    panel.classList.add('active');
                    panel.removeAttribute('tabindex');
                } else {
                    panel.classList.remove('active');
                    panel.setAttribute('tabindex', '-1');
                }
            });
        });
    });

    // Handle hash navigation (e.g., /privacy/#terms)
    window.addEventListener('load', () => {
        const hash = window.location.hash.substring(1); // Remove the #
        if (hash) {
            const targetTab = tabs.find(tab => tab.getAttribute('data-target') === hash);
            if (targetTab) {
                targetTab.click();
            }
        }
    });
})();
