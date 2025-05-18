document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const sunIcon = themeSwitcher.querySelector('.sun-icon');
    const moonIcon = themeSwitcher.querySelector('.moon-icon');

    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'theme-light') {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Default to dark theme if no preference or system preference is dark
        // You could also check for prefers-color-scheme here
        applyTheme('theme-dark');
    }

    // Event listener for theme switcher button
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            if (body.classList.contains('theme-dark')) {
                applyTheme('theme-light');
                localStorage.setItem('theme', 'theme-light');
            } else {
                applyTheme('theme-dark');
                localStorage.setItem('theme', 'theme-dark');
            }
        });
    }
});
