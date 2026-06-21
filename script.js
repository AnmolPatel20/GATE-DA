document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════
    //  SUBJECT DATA (all PDFs & topics)
    // ═══════════════════════════════════════
    const subjectData = {
        'aptitude': {
            name: 'General Aptitude',
            topics: [
                {
                    name: 'Quantitative Aptitude',
                    pdfs: [
                        { name: 'Calendar', file: 'pdfs/General_Aptitude/CALENDAR_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Clock', file: 'pdfs/General_Aptitude/CLOCK_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Average', file: 'pdfs/General_Aptitude/AVERAGE_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Percentage', file: 'pdfs/General_Aptitude/PERCENTAGE_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Profit & Loss', file: 'pdfs/General_Aptitude/PROFIT_&_LOSS_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Mixtures & Alligation', file: 'pdfs/General_Aptitude/MIXTURES_&_ALLIGATION_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Number System & Counting Theory', file: 'pdfs/General_Aptitude/NUMBER_SYSTEM_&_COUNTING_THEORY_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Time & Work', file: 'pdfs/General_Aptitude/TIME_&_WORK_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Pipes & Cistern', file: 'pdfs/General_Aptitude/PIPES_&_CISTERN_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Time & Distance', file: 'pdfs/General_Aptitude/TIME_&_DISTANCE_Prepared_by_Anmol_Patel.pdf' },
                        { name: 'Data Interpretation', file: 'pdfs/General_Aptitude/DATA_INTERPRETATION_Preapred_by_Anmol_Patel.pdf' }
                    ]
                },
                { name: 'Verbal Aptitude', pdfs: [] },
                { name: 'Reasoning', pdfs: [] },
                { name: 'Special Aptitude', pdfs: [] }
            ]
        },
        'python': {
            name: 'Python for DA',
            topics: []
        },
        'dsa': {
            name: 'Algorithms & Data Structures',
            topics: [
                { name: 'Data Structures', pdfs: [] },
                { name: 'Algorithms', pdfs: [] }
            ]
        },
        'dbms': {
            name: 'DBMS',
            topics: [
                { name: 'Database Management (DBMS)', pdfs: [] }
            ]
        },
        'warehousing': {
            name: 'Warehousing',
            topics: [
                { name: 'Database Warehousing', pdfs: [] }
            ]
        },
        'linear-algebra': {
            name: 'Linear Algebra',
            topics: []
        },
        'calculus': {
            name: 'Calculus & Optimization',
            topics: []
        },
        'probability': {
            name: 'Probability & Statistics',
            topics: []
        },
        'ml': {
            name: 'Machine Learning',
            topics: []
        },
        'ai': {
            name: 'Artificial Intelligence',
            topics: []
        }
    };


    // ═══════════════════════════════════════
    //  1. COUNTDOWN TIMER
    // ═══════════════════════════════════════
    const targetDate = new Date('2027-02-08T09:00:00+05:30').getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '00';
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-minutes').textContent = '00';
            document.getElementById('cd-seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);



    // ═══════════════════════════════════════
    //  3. NAVBAR SCROLL & ACTIVE LINK
    // ═══════════════════════════════════════
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainElement = document.querySelector('main');

    function parseColor(colorStr) {
        if (!colorStr) return null;
        colorStr = colorStr.trim();
        if (colorStr.startsWith('rgb')) {
            const matches = colorStr.match(/\d+/g);
            if (matches && matches.length >= 3) {
                return {
                    r: parseInt(matches[0], 10),
                    g: parseInt(matches[1], 10),
                    b: parseInt(matches[2], 10)
                };
            }
        }
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const hex = colorStr.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const primaryColor = parseColor(getComputedStyle(document.documentElement).getPropertyValue('--primary')) || { r: 59, g: 130, b: 246 };
    const primaryDarkColor = parseColor(getComputedStyle(document.documentElement).getPropertyValue('--primary-dark')) || { r: 30, g: 58, b: 138 };

    function updateNavbarBorderColor() {
        if (!mainElement || !navbar) return;
        const mainHeight = mainElement.offsetHeight;
        if (mainHeight <= 0) return;
        
        const scrollY = window.scrollY;
        const ratio = Math.min(1, Math.max(0, scrollY / mainHeight));
        
        let r, g, b;
        if (ratio <= 0.5) {
            const t = ratio * 2;
            r = Math.round(primaryDarkColor.r + (primaryColor.r - primaryDarkColor.r) * t);
            g = Math.round(primaryDarkColor.g + (primaryColor.g - primaryDarkColor.g) * t);
            b = Math.round(primaryDarkColor.b + (primaryDarkColor.b - primaryDarkColor.b) * t);
        } else {
            const t = (ratio - 0.5) * 2;
            r = Math.round(primaryColor.r + (primaryDarkColor.r - primaryColor.r) * t);
            g = Math.round(primaryColor.g + (primaryDarkColor.g - primaryColor.g) * t);
            b = Math.round(primaryColor.b + (primaryDarkColor.b - primaryColor.b) * t);
        }
        
        navbar.style.setProperty('--navbar-border-color', `rgb(${r}, ${g}, ${b})`);
    }

    window.addEventListener('scroll', () => {
        // Add shadow on scroll
        navbar.classList.toggle('scrolled', window.scrollY > 10);

        // Update navbar border color based on scroll position
        updateNavbarBorderColor();

        // Highlight active section
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 100) {
                current = sec.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // Run initially and on resize
    updateNavbarBorderColor();
    window.addEventListener('resize', updateNavbarBorderColor);


    // ═══════════════════════════════════════
    //  4. MOBILE MENU
    // ═══════════════════════════════════════
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });


    // ═══════════════════════════════════════
    //  5. NOTES MODAL (Subject Detail Panel)
    // ═══════════════════════════════════════
    const notesModal = document.getElementById('notes-modal');
    const notesTitle = document.getElementById('notes-title');
    const notesBody = document.getElementById('notes-body');
    const notesClose = document.querySelector('.notes-close');
    const notesOverlay = document.querySelector('.notes-overlay');

    function openNotesModal(subjectKey) {
        const data = subjectData[subjectKey];
        if (!data) return;

        notesTitle.textContent = data.name;

        // Build content
        let html = '';

        if (data.topics.length === 0) {
            html = `
                <div class="notes-empty">
                    <i class="fas fa-hourglass-half"></i>
                    Coming Soon
                </div>
            `;
        } else {
            let hasAnyPdf = false;

            data.topics.forEach(topic => {
                html += `<div class="notes-topic">`;
                html += `<div class="notes-topic-head">${topic.name}</div>`;

                if (topic.pdfs.length === 0) {
                    html += `
                        <div class="notes-empty" style="padding: 20px 24px;">
                            <i class="fas fa-hourglass-half" style="font-size:1.2rem; margin-bottom:6px;"></i>
                            Coming Soon
                        </div>
                    `;
                } else {
                    hasAnyPdf = true;
                    topic.pdfs.forEach(pdf => {
                        html += `
                            <div class="notes-pdf-item" data-pdf="${pdf.file}" data-name="${pdf.name}">
                                <div class="pdf-icon"><i class="fas fa-file-pdf"></i></div>
                                <span>${pdf.name}</span>
                                <i class="fas fa-arrow-right arrow"></i>
                            </div>
                        `;
                    });
                }

                html += `</div>`;
            });
        }

        notesBody.innerHTML = html;

        // Attach PDF click handlers
        notesBody.querySelectorAll('.notes-pdf-item').forEach(item => {
            item.addEventListener('click', () => {
                const pdfFile = item.getAttribute('data-pdf');
                const pdfName = item.getAttribute('data-name');
                if (pdfFile) {
                    openPdfViewer(pdfFile, pdfName);
                }
            });
        });

        notesModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeNotesModal() {
        notesModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Click handlers for View Notes links
    document.querySelectorAll('.view-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subjectKey = link.getAttribute('data-subject');
            openNotesModal(subjectKey);
        });
    });

    // Also open on entire card click
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't double-trigger if clicking the link itself
            if (e.target.closest('.view-link')) return;
            const subjectKey = card.getAttribute('data-subject');
            openNotesModal(subjectKey);
        });
    });

    notesClose.addEventListener('click', closeNotesModal);
    notesOverlay.addEventListener('click', closeNotesModal);


    // ═══════════════════════════════════════
    //  6. PDF VIEWER MODAL
    // ═══════════════════════════════════════
    const pdfModal = document.getElementById('pdf-modal');
    const pdfTitle = document.getElementById('pdf-title');
    const pdfFrame = document.getElementById('pdf-frame');
    const pdfClose = document.querySelector('.pdf-close');
    const pdfDownloadLink = document.getElementById('pdf-download-link');

    function openPdfViewer(fileUrl, name) {
        pdfTitle.textContent = name || 'Document Viewer';
        pdfFrame.src = fileUrl;
        pdfDownloadLink.href = fileUrl;
        pdfModal.classList.add('show');
    }

    function closePdfViewer() {
        pdfModal.classList.remove('show');
        pdfFrame.src = '';
    }

    pdfClose.addEventListener('click', closePdfViewer);

    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfViewer();
        }
    });

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (pdfModal.classList.contains('show')) {
                closePdfViewer();
            } else if (notesModal.classList.contains('open')) {
                closeNotesModal();
            }
        }
    });


});
