// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Nav toggle functionality for mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Burger menu toggle
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Toggle body scroll
            if (nav.classList.contains('nav-active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);
        
        if (nav.classList.contains('nav-active') && !isClickInsideNav && !isClickOnBurger) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            body.style.overflow = 'auto';
            
            navLinks.forEach((link) => {
                link.style.animation = '';
            });
        }
    });

    // Smooth scrolling for navigation links
    const navLinksList = document.querySelectorAll('a[href^="#"]');
    
    navLinksList.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                body.style.overflow = 'auto';
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar appearance change on scroll
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add animation to elements when they come into view
    const fadeInElements = document.querySelectorAll('.attraction-card, .beach-card, .tip-card, .gallery-item');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, fadeInObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transform = 'translateY(20px)';
        fadeInObserver.observe(element);
    });
    
    // Add the CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.append(style);

    // Plan Your Trip button action
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            alert('Thank you for your interest in Santorini! This would typically open a travel planning form or redirect to a booking page.');
        });
    }

    // Image error handling
    const imageContainers = document.querySelectorAll('.image-placeholder');
    
    imageContainers.forEach(container => {
        // This is where you would normally handle image loading
        // For now, we'll just style the placeholders properly
        container.style.backgroundColor = '#e0e8ff';
        
        // Apply a blue gradient to some placeholders to simulate Santorini images
        if (container.getAttribute('data-alt').includes('Santorini') || 
            container.getAttribute('data-alt').includes('Blue dome') || 
            container.getAttribute('data-alt').includes('sea')) {
            container.style.background = 'linear-gradient(to bottom, #3b5998, #87ceeb)';
        }
        
        // Apply a sunset gradient to sunset images
        if (container.getAttribute('data-alt').includes('sunset')) {
            container.style.background = 'linear-gradient(to bottom, #ff7e5f, #feb47b)';
        }
        
        // Apply a beach gradient to beach images
        if (container.getAttribute('data-alt').includes('Beach')) {
            if (container.getAttribute('data-alt').includes('Red')) {
                container.style.background = 'linear-gradient(to bottom, #8e0000, #bc8f8f)';
            } else if (container.getAttribute('data-alt').includes('Black')) {
                container.style.background = 'linear-gradient(to bottom, #333333, #777777)';
            } else if (container.getAttribute('data-alt').includes('White')) {
                container.style.background = 'linear-gradient(to bottom, #ffffff, #dddddd)';
                container.style.color = '#333';
            } else {
                container.style.background = 'linear-gradient(to bottom, #1e3c72, #87ceeb)';
            }
        }
    });

    // Add a simple lightbox for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const alt = this.querySelector('.image-placeholder').getAttribute('data-alt');
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1001';
            lightbox.style.cursor = 'pointer';
            
            const content = document.createElement('div');
            content.className = 'lightbox-content';
            content.style.maxWidth = '80%';
            content.style.maxHeight = '80%';
            content.style.position = 'relative';
            
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.width = '600px';
            placeholder.style.height = '400px';
            placeholder.style.backgroundColor = '#e0e8ff';
            placeholder.style.position = 'relative';
            placeholder.setAttribute('data-alt', alt);
            
            // Apply the same background styling as the thumbnail
            if (alt.includes('Santorini') || alt.includes('Blue dome') || alt.includes('sea')) {
                placeholder.style.background = 'linear-gradient(to bottom, #3b5998, #87ceeb)';
            }
            if (alt.includes('sunset')) {
                placeholder.style.background = 'linear-gradient(to bottom, #ff7e5f, #feb47b)';
            }
            if (alt.includes('Beach')) {
                if (alt.includes('Red')) {
                    placeholder.style.background = 'linear-gradient(to bottom, #8e0000, #bc8f8f)';
                } else if (alt.includes('Black')) {
                    placeholder.style.background = 'linear-gradient(to bottom, #333333, #777777)';
                } else if (alt.includes('White')) {
                    placeholder.style.background = 'linear-gradient(to bottom, #ffffff, #dddddd)';
                    placeholder.style.color = '#333';
                } else {
                    placeholder.style.background = 'linear-gradient(to bottom, #1e3c72, #87ceeb)';
                }
            }
            
            const caption = document.createElement('div');
            caption.textContent = alt;
            caption.style.color = '#fff';
            caption.style.textAlign = 'center';
            caption.style.marginTop = '10px';
            caption.style.fontSize = '1.2rem';
            
            content.appendChild(placeholder);
            content.appendChild(caption);
            lightbox.appendChild(content);
            document.body.appendChild(lightbox);
            
            // Prevent body scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Close lightbox when clicked
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
        });
    });

    // Add a simple back-to-top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.textContent = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = 'var(--santorini-blue)';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.fontSize = '20px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.zIndex = '999';
    backToTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});