// js/script.js

// 1. Component Loader
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Setup year in footer
        if (filePath.includes('footer.html')) {
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// 2. Mobile Menu Toggle
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileOverlay');
    const btn = document.querySelector('.mobile-menu-btn');

    if (overlay) {
        overlay.classList.toggle('active');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
    }
}

// 3. Scroll Animations (Intersection Observer)
function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Find all elements with fade-up class
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// 4. Floating WhatsApp Initialization
function setupFloatingWhatsApp() {
    const defaultPhone = "5491100000000";
    const waHtml = `
    <a href="https://wa.me/${defaultPhone}?text=Hola,%20quisiera%20más%20información!" 
       class="floating-wa" 
       target="_blank" 
       rel="noopener"
       aria-label="Chatéanos en WhatsApp"
       style="position:fixed; bottom:20px; right:20px; background:#25D366; color:#fff; width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(37,211,102,0.3); z-index:999; transition:transform 0.3s;">
        <svg viewBox="0 0 24 24" style="width:35px; height:35px; fill:currentColor;">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
    </a>`;
    document.body.insertAdjacentHTML('beforeend', waHtml);
}

// 6. FAQ Accordion Logic
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');

            // Close all other opened FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
                if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = null;
            });

            // If it wasn't open, open it
            if (!isOpen) {
                question.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// 5. Initialize Globals on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Load components safely handling async
    Promise.all([
        loadComponent('header-placeholder', 'components/header.html'),
        loadComponent('footer-placeholder', 'components/footer.html')
    ]).then(() => {
        initScrollObserver();
    });

    setupFloatingWhatsApp();
    initFAQ();
});
