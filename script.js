// Mobile navigation toggle

const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    });
});

// Navbar scroll effect

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(10, 77, 104, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection observer for animations

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.skill-category, .experience-card, .personal-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to current nav link

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNav() {
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Loading animation

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent animation on resize

let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Disable transitions during resize
const style = document.createElement('style');
style.innerHTML = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(style);

// Projects filtering

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filter projects by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide cards
            projectCards.forEach((card, index) => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease ${index * 0.05}s both`;
                        }, 10);
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Scroll to projects section
            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const filterHeight = document.querySelector('.filter-section').offsetHeight;
                const targetPosition = projectsSection.offsetTop - navHeight - filterHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update project counts
    function updateCounts() {
        const counts = {
            all: projectCards.length,
            datasci: 0,
            software: 0,
            uiux: 0
        };
        
        projectCards.forEach(card => {
            const category = card.dataset.category;
            if (counts[category] !== undefined) {
                counts[category]++;
            }
        });
        
        filterButtons.forEach(button => {
            const category = button.dataset.category;
            const countElement = button.querySelector('.count');
            if (countElement && counts[category] !== undefined) {
                countElement.textContent = counts[category];
            }
        });
    }
    
    updateCounts();
    
    // Hover effect for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Scroll animation for project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Filter bar scroll effect

let lastScrollTop = 0;
const filterSection = document.querySelector('.filter-section');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (filterSection) {
        if (scrollTop > 100) {
            filterSection.style.boxShadow = '0 4px 12px rgba(10, 77, 104, 0.08)';
        } else {
            filterSection.style.boxShadow = 'none';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Keyboard navigation for filters

document.addEventListener('keydown', (e) => {
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    const activeButton = document.querySelector('.filter-btn.active');
    const currentIndex = filterButtons.indexOf(activeButton);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        filterButtons[currentIndex - 1].click();
        filterButtons[currentIndex - 1].focus();
    } else if (e.key === 'ArrowRight' && currentIndex < filterButtons.length - 1) {
        e.preventDefault();
        filterButtons[currentIndex + 1].click();
        filterButtons[currentIndex + 1].focus();
    }
});