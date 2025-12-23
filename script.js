// Enhanced Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('show');
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu items
        if (isHidden) {
            const menuItems = mobileMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            // Special handling for home section - scroll to top
            if (href === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // For other sections, account for fixed navbar height
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Enhanced scroll animations for sections
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in-section class to all sections and elements
document.querySelectorAll('.fade-in-section').forEach((element, index) => {
    observer.observe(element);
});

// Stagger animation for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-box, .blog-card, .paper-card, .video-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    cardObserver.observe(card);
});

// Feature box interactions
const featureBoxes = document.querySelectorAll('.feature-box');
featureBoxes.forEach(box => {
    const button = box.querySelector('.feature-btn');
    if (button) {
        const buttonText = button.textContent.trim();
        
        // Handle "Try Exercise" button specifically
        if (buttonText === 'Try Exercise') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showExerciseSelectionModal();
            });
        } else if (buttonText === 'Watch Videos') {
            // Handle "Watch Videos" button - navigate to videos page
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'videos.html';
            });
        } else if (buttonText === 'Read Research') {
            // Handle "Read Research" button - navigate to research papers page
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'research-papers.html';
            });
        } else {
            // Other buttons remain disabled
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
});

// Exercise Selection Modal
function showExerciseSelectionModal() {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    const modal = document.createElement('div');
    modal.id = 'exercise-selection-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
    
    modal.innerHTML = `
        <div class="modal-content bg-dark-card rounded-2xl p-8 max-w-4xl w-full border border-purple-500/30 transform scale-95 transition-transform duration-300 relative">
            <button id="close-exercise-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-500/20 transition-colors">
                ✕
            </button>
            <h2 class="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                Choose Your Exercise
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Emotional Awareness Card -->
                <div class="exercise-card bg-dark-bg p-6 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer" data-exercise="emotional-awareness">
                    <div class="text-4xl mb-4 text-center">🧘</div>
                    <h3 class="text-xl font-bold mb-3 text-neon-pink text-center">Emotional Awareness</h3>
                    <p class="text-gray-300 text-sm text-center">Develop your ability to recognize and understand your own emotions through self-reflection.</p>
                </div>
                
                <!-- Empathy Practice Card -->
                <div class="exercise-card bg-dark-bg p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer" data-exercise="empathy-practice">
                    <div class="text-4xl mb-4 text-center">❤️</div>
                    <h3 class="text-xl font-bold mb-3 text-neon-cyan text-center">Empathy Practice</h3>
                    <p class="text-gray-300 text-sm text-center">Enhance your capacity to understand and share the feelings of others.</p>
                </div>
                
                <!-- Stress Management Card -->
                <div class="exercise-card bg-dark-bg p-6 rounded-xl border border-pink-500/30 hover:border-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer" data-exercise="stress-management">
                    <div class="text-4xl mb-4 text-center">🌊</div>
                    <h3 class="text-xl font-bold mb-3 text-neon-pink text-center">Stress Management</h3>
                    <p class="text-gray-300 text-sm text-center">Learn effective strategies to manage stress and maintain emotional balance.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fade in animation
    setTimeout(() => {
        modal.style.opacity = '1';
        const content = modal.querySelector('.modal-content');
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close button handler
    const closeBtn = modal.querySelector('#close-exercise-modal');
    closeBtn.addEventListener('click', () => {
        closeExerciseModal(modal);
    });
    
    // ESC key handler
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeExerciseModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // Exercise card click handlers
    const exerciseCards = modal.querySelectorAll('.exercise-card');
    exerciseCards.forEach(card => {
        card.addEventListener('click', () => {
            const exerciseName = card.getAttribute('data-exercise');
            closeExerciseModal(modal);
            setTimeout(() => {
                window.location.href = `${exerciseName}.html`;
            }, 300);
        });
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeExerciseModal(modal);
        }
    });
}

function closeExerciseModal(modal) {
    modal.style.opacity = '0';
    const content = modal.querySelector('.modal-content');
    content.style.transform = 'scale(0.95)';
    document.body.style.overflow = '';
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Blog card interactions
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    const readMoreBtn = card.querySelector('.read-more-btn');
    readMoreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const title = card.querySelector('h3').textContent;
        showBlogModal(title);
    });
});

// Modal functions
function showExerciseModal() {
    const modal = createModal(
        'Interactive Exercise',
        'This exercise will help you assess your emotional intelligence. Answer the following questions honestly to get personalized insights.',
        'Start Exercise'
    );
    document.body.appendChild(modal);
    showModal(modal);
}

function showVideoModal() {
    const modal = createModal(
        'Informative Videos',
        'Our video library contains expert-led content on emotional intelligence and goal achievement. Videos will be available soon!',
        'Explore Videos'
    );
    document.body.appendChild(modal);
    showModal(modal);
}

function showResearchModal() {
    const modal = createModal(
        'Research Papers',
        'Access our curated collection of research papers and studies on emotional intelligence and goal achievement. Content coming soon!',
        'Browse Research'
    );
    document.body.appendChild(modal);
    showModal(modal);
}

function showBlogModal(title) {
    const modal = createModal(
        title,
        'This is a preview of the blog post. Full content will be available soon. Stay tuned for more insights on emotional intelligence and goal achievement!',
        'Read Full Article'
    );
    document.body.appendChild(modal);
    showModal(modal);
}

function createModal(title, content, buttonText) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
    
    modal.innerHTML = `
        <div class="modal-content bg-dark-card rounded-2xl p-8 max-w-md w-full border border-purple-500/30 transform scale-95 transition-transform duration-300">
            <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">${title}</h3>
            <p class="text-gray-300 mb-6">${content}</p>
            <div class="flex gap-4">
                <button class="modal-close flex-1 bg-gradient-to-r from-neon-purple to-neon-pink py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                    ${buttonText}
                </button>
                <button class="modal-close flex-1 bg-dark-bg border border-purple-500/30 py-3 rounded-lg font-semibold hover:border-purple-500 transition-colors">
                    Close
                </button>
            </div>
        </div>
    `;
    
    return modal;
}

function showModal(modal) {
    setTimeout(() => {
        modal.style.opacity = '1';
        const content = modal.querySelector('.modal-content');
        content.style.transform = 'scale(1)';
    }, 10);
    
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.opacity = '0';
            const content = modal.querySelector('.modal-content');
            content.style.transform = 'scale(0.95)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            const content = modal.querySelector('.modal-content');
            content.style.transform = 'scale(0.95)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

// Enhanced CTA Button interaction with ripple effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Scroll to about section
        setTimeout(() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 200);
    });
}

// Contact form handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            const successModal = createModal(
                'Message Sent!',
                'Thank you for your message. We will get back to you soon!',
                'OK'
            );
            document.body.appendChild(successModal);
            showModal(successModal);
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced parallax and scroll effects
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero section only - ensure it doesn't affect other sections
            const hero = document.querySelector('#home');
            const aboutSection = document.querySelector('#about');
            
            if (hero && scrolled < window.innerHeight * 0.8) {
                // Only apply parallax when hero is mostly visible
                const parallaxSpeed = 0.2; // Reduced speed to prevent overlap
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            } else if (hero) {
                // Reset hero transform when scrolled past it
                hero.style.transform = 'translateY(0)';
            }
            
            // Ensure about section and other sections stay in place and above hero
            if (aboutSection) {
                aboutSection.style.transform = 'translateY(0)';
                aboutSection.style.position = 'relative';
                aboutSection.style.top = '0';
                aboutSection.style.zIndex = '2';
            }
            
            // Navbar background on scroll
            const navbar = document.querySelector('nav');
            if (navbar) {
                if (scrolled > 50) {
                    navbar.style.background = 'rgba(26, 26, 46, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    navbar.style.background = 'rgba(26, 26, 46, 0.6)';
                    navbar.style.backdropFilter = 'blur(30px)';
                }
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// Add interactive exercise functionality
function createInteractiveExercise() {
    const questions = [
        {
            question: "When you feel stressed, how do you typically respond?",
            options: ["Take deep breaths and assess the situation", "React immediately", "Ignore the feeling", "Talk to someone"]
        },
        {
            question: "How do you handle setbacks when working toward a goal?",
            options: ["Analyze what went wrong and adjust", "Give up easily", "Blame external factors", "Take a break and refocus"]
        },
        {
            question: "When someone shares their emotions with you, you:",
            options: ["Listen actively and show empathy", "Offer quick solutions", "Feel uncomfortable", "Share similar experiences"]
        }
    ];
    
    // This would be implemented in the exercise modal
    return questions;
}

// Console log for debugging
console.log('Emotional Intelligence & Goal Achievement website loaded successfully!');

