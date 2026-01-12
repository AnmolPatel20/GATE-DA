document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Default is Dark. Enable Light if saved or preferred.
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        html.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        // Ensure Dark Mode (Default)
        html.removeAttribute('data-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');

        if (currentTheme === 'light') {
            // Switch to Dark
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            // Switch to Light
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active'); // Optional: Add animation to hamburger
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Collapsible Sections ---
    const headers = document.querySelectorAll('.subject-header, .topic-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.toggle-icon');

            // Toggle open class
            content.classList.toggle('open');
            if (icon) icon.classList.toggle('rotate');

            // Optional: Close other siblings (Accordion style) - User didn't explicitly ask, but it's cleaner.
            // Keeping it simple as per "Collapsible sections" request, allowing multiple open.
        });
    });

    // --- PDF Modal ---
    const pdfItems = document.querySelectorAll('.pdf-item');
    const modal = document.getElementById('pdf-modal');
    const modalTitle = document.getElementById('modal-title');
    const pdfFrame = document.getElementById('pdf-frame');
    const closeModal = document.querySelector('.close-modal');
    const downloadLink = document.getElementById('pdf-download-link');
    const pdfFallback = document.querySelector('.pdf-fallback');

    pdfItems.forEach(item => {
        item.addEventListener('click', () => {
            const pdfUrl = item.getAttribute('data-pdf');
            const title = item.querySelector('span').textContent;

            modalTitle.textContent = title;
            pdfFrame.src = pdfUrl;
            downloadLink.href = pdfUrl;

            // Check if file exists (simulated) or just show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        pdfFrame.src = ''; // Stop loading
        document.body.style.overflow = '';
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            pdfFrame.src = '';
            document.body.style.overflow = '';
        }
    });

    // --- YouTube Carousel (Infinite Loop) ---
    const track = document.querySelector('.carousel-track');
    const originalSlides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    // Clone first and last slides for infinite effect
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    // Assign IDs to clones for easier debugging/tracking (optional but good practice)
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    // Add clones to the track
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    // Update slides list to include clones
    const allSlides = Array.from(track.children);

    let counter = 1; // Start at 1 (the first real slide)

    // Initial position: show the first real slide
    track.style.transform = `translateX(-${counter * 100}%)`;

    // Function to update dots
    const updateDots = (index) => {
        // Calculate real index (0 to N-1)
        // If index is 0 (last clone), real index is last slide
        // If index is N+1 (first clone), real index is first slide
        let realIndex = index - 1;
        if (realIndex < 0) realIndex = originalSlides.length - 1;
        if (realIndex >= originalSlides.length) realIndex = 0;

        dots.forEach(d => d.classList.remove('current-slide'));
        dots[realIndex].classList.add('current-slide');
    };

    // Function to move slide
    const moveToSlide = (index) => {
        if (index < 0 || index >= allSlides.length) return;
        track.style.transition = 'transform 0.5s ease-in-out';
        counter = index;
        track.style.transform = `translateX(-${counter * 100}%)`;
        updateDots(counter);
    };

    // Next Button
    nextButton.addEventListener('click', () => {
        if (counter >= allSlides.length - 1) return;
        moveToSlide(counter + 1);
    });

    // Prev Button
    prevButton.addEventListener('click', () => {
        if (counter <= 0) return;
        moveToSlide(counter - 1);
    });

    // Handle Transition End (The Loop Magic)
    track.addEventListener('transitionend', () => {
        if (allSlides[counter].id === 'last-clone') {
            track.style.transition = 'none'; // Disable transition for instant jump
            counter = originalSlides.length; // Jump to real last slide
            track.style.transform = `translateX(-${counter * 100}%)`;
        }
        if (allSlides[counter].id === 'first-clone') {
            track.style.transition = 'none'; // Disable transition for instant jump
            counter = 1; // Jump to real first slide
            track.style.transform = `translateX(-${counter * 100}%)`;
        }
    });

    // Dots Click Event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Index 0 in dots corresponds to counter 1 in slides
            moveToSlide(index + 1);
        });
    });

    // Auto slide
    let slideInterval = setInterval(() => {
        moveToSlide(counter + 1);
    }, 5000);

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            moveToSlide(counter + 1);
        }, 5000);
    });

    // --- About Background Slider ---
    const bgSlides = document.querySelectorAll('.about-bg');
    let currentBgIndex = 0;

    setInterval(() => {
        bgSlides[currentBgIndex].classList.remove('active');
        currentBgIndex = (currentBgIndex + 1) % bgSlides.length;
        bgSlides[currentBgIndex].classList.add('active');
    }, 5000);

    // --- Hero Background Slider ---
    const heroBgSlides = document.querySelectorAll('.hero-bg');
    let currentHeroBgIndex = 0;

    if (heroBgSlides.length > 0) {
        setInterval(() => {
            heroBgSlides[currentHeroBgIndex].classList.remove('active');
            currentHeroBgIndex = (currentHeroBgIndex + 1) % heroBgSlides.length;
            heroBgSlides[currentHeroBgIndex].classList.add('active');
        }, 5000);
    }

});
