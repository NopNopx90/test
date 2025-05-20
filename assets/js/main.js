document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme or default to light
    if (currentTheme) {
        body.classList.replace('theme-light', `theme-${currentTheme}`);
    } else {
        // Check system preference if no theme is saved
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.replace('theme-light', 'theme-dark');
            localStorage.setItem('theme', 'dark');
        } else {
             body.classList.add('theme-light'); // Ensure default if nothing else
        }
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            if (body.classList.contains('theme-light')) {
                body.classList.replace('theme-light', 'theme-dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.replace('theme-dark', 'theme-light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Copy code button functionality
    const codeBlocks = document.querySelectorAll('div.highlight, figure.highlight');
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.textContent = 'Copy';

        const pre = block.querySelector('pre');
        if (pre) { // Ensure there's a <pre> tag
            block.appendChild(copyButton);

            copyButton.addEventListener('click', async () => {
                const codeToCopy = pre.innerText;
                try {
                    await navigator.clipboard.writeText(codeToCopy);
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                    copyButton.textContent = 'Error';
                     setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                }
            });
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const siteNavLinks = document.querySelector('.site-nav .nav-links');

    if (mobileMenuToggle && siteNavLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            siteNavLinks.classList.toggle('active');
            // Optional: Change toggle icon (e.g., hamburger to X)
            if (siteNavLinks.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '&times;'; // X icon
                 mobileMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenuToggle.innerHTML = '☰'; // Hamburger icon
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // Cool animations (example: fade in elements on scroll with Intersection Observer)
    const animatedElements = document.querySelectorAll('.post-preview, .page-header, .post-content > *'); // Add more selectors
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in'); // Assumes you have a .fade-in CSS class
                    observerInstance.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: just show elements immediately
        animatedElements.forEach(el => el.classList.add('fade-in'));
    }


    // --- Tag Filtering (Conceptual - Requires a Tags Page) ---
    // This is a simplified example. A full tag filtering system is more complex.
    // You would typically have a dedicated /tags/ page that lists all tags,
    // and clicking a tag filters posts on that page.
    // For filtering on the archives page, you might do something like this:

    const archivePosts = document.querySelectorAll('.archive-list .post-preview'); // Assuming archives page has this structure
    const tagFiltersContainer = document.querySelector('.tag-filters'); // A div where you list your tags as buttons

    if (archivePosts.length > 0 && tagFiltersContainer) {
        const uniqueTags = new Set();
        archivePosts.forEach(post => {
            const tags = post.dataset.tags; // Expect data-tags="tag1,tag2,tag3" on each post preview in archives
            if (tags) {
                tags.split(',').forEach(tag => uniqueTags.add(tag.trim()));
            }
        });

        uniqueTags.forEach(tag => {
            const button = document.createElement('button');
            button.className = 'tag-filter-button';
            button.textContent = tag;
            button.dataset.tag = tag;
            tagFiltersContainer.appendChild(button);

            button.addEventListener('click', () => {
                const selectedTag = button.dataset.tag;
                document.querySelectorAll('.tag-filter-button.active').forEach(b => b.classList.remove('active'));
                button.classList.add('active');

                archivePosts.forEach(post => {
                    const postTags = post.dataset.tags ? post.dataset.tags.split(',') : [];
                    if (postTags.includes(selectedTag)) {
                        post.style.display = 'block'; // Or your preferred display style
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });

        // Add a "Show All" button
        const showAllButton = document.createElement('button');
        showAllButton.className = 'tag-filter-button active'; // Active by default
        showAllButton.textContent = 'All Posts';
        tagFiltersContainer.insertBefore(showAllButton, tagFiltersContainer.firstChild);
        showAllButton.addEventListener('click', () => {
             document.querySelectorAll('.tag-filter-button.active').forEach(b => b.classList.remove('active'));
            showAllButton.classList.add('active');
            archivePosts.forEach(post => post.style.display = 'block');
        });
    }

});