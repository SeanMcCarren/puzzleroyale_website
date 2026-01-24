/**
 * Legal Page Tab Functionality
 * Handles switching between Privacy Policy and Terms & Conditions
 */

(function () {
    const tabs = Array.from(document.querySelectorAll('.tablist button'));
    const panels = Array.from(document.querySelectorAll('.tab-panel'));

    function activateTabByHash() {
        const hash = window.location.hash.substring(1); // Remove the #
        // Remove 'active' from all panels first
        panels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('tabindex', '-1');
        });
        tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));

        if (hash) {
            const targetTab = tabs.find(tab => tab.getAttribute('data-target') === hash);
            const targetPanel = panels.find(panel => panel.id === hash);
            if (targetTab && targetPanel) {
                targetTab.setAttribute('aria-selected', 'true');
                targetPanel.classList.add('active');
                targetPanel.removeAttribute('tabindex');
                return;
            }
        }
        // Default to first tab if no hash or invalid hash
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].classList.add('active');
        panels[0].removeAttribute('tabindex');
    }

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

    // Handle hash navigation (e.g., /privacy/#terms) on load and hashchange
    window.addEventListener('load', activateTabByHash);
    window.addEventListener('hashchange', activateTabByHash);
})();
