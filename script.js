// Download APK Function
function downloadAPK(event) {
    const button = event.target.closest('.btn-download');
    const originalText = button.querySelector('.btn-text').textContent;
    const icon = button.querySelector('.btn-icon');
    
    // Create ripple effect
    createRipple(button, event);
    
    // Animate button
    button.style.transform = 'scale(0.95)';
    button.querySelector('.btn-text').textContent = 'Downloading...';
    icon.className = 'fas fa-spinner fa-spin btn-icon';
    
    // Download local APK file
    const link = document.createElement('a');
    link.href = 'res/taaza-khabar.apk';
    link.download = 'taaza-khabar.apk';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success animation
    setTimeout(() => {
        button.querySelector('.btn-text').textContent = 'Downloaded!';
        icon.className = 'fas fa-check btn-icon';
        button.style.background = '#10b981';
        button.style.transform = 'scale(1.05)';
        
        showNotification('Download started! Check your downloads folder.', 'success');
        
        // Reset button
        setTimeout(() => {
            button.querySelector('.btn-text').textContent = originalText;
            icon.className = 'fas fa-download btn-icon';
            button.style.background = '';
            button.style.transform = 'scale(1)';
        }, 3000);
    }, 1500);
}
function createRipple(element, event) {
    const ripple = element.querySelector('.btn-ripple') || document.createElement('div');
    ripple.className = 'btn-ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    if (!element.querySelector('.btn-ripple')) {
        element.appendChild(ripple);
    }
    
    element.classList.add('ripple');
    
    setTimeout(() => {
        element.classList.remove('ripple');
    }, 600);
}

// Enhanced APK Download Function
function downloadAPK() {
    const button = document.getElementById('downloadBtn');
    
    // Prevent multiple clicks
    if (button.disabled) return;
    
    const originalText = button.querySelector('.btn-text').textContent;
    
    try {
        // Show loading state
        button.disabled = true;
        button.querySelector('.btn-text').textContent = 'Downloading...';
        button.style.opacity = '0.7';
        button.style.pointerEvents = 'none';
        
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = 'taaza-khabar.apk';
        link.download = 'taaza-khabar.apk';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
        
        // Show success notification
        showNotification('✓ Download started! Check your downloads folder.', 'success');
        
        // Reset button after delay
        setTimeout(() => {
            button.disabled = false;
            button.querySelector('.btn-text').textContent = originalText;
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        }, 2000);
        
    } catch (error) {
        console.error('Download error:', error);
        showNotification('Error: Could not start download. Please try again.', 'error');
        
        // Reset button on error
        button.disabled = false;
        button.querySelector('.btn-text').textContent = originalText;
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
    }
}

// Enhanced Notification Function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : 'var(--primary-red)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animate-in');
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Parallax scrolling effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg, .floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('hero-bg') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
}

// Add scroll listeners
window.addEventListener('scroll', () => {
    handleParallax();
    handleNavbarScroll();
}, { passive: true });

// Enhanced button interactions
function addButtonEffects() {
    document.querySelectorAll('.btn-download, .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.onclick || this.onclick.toString().indexOf('downloadAPK') === -1) {
                createRipple(this, e);
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
        
        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Attach download button listener
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadAPK);
    }
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .download-card, .step, .screenshot-placeholder, .section-title'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(element);
    });
    
    // Add button effects
    addButtonEffects();
    
    // Animate hero content on load
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-up').forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
    
    // Add loading screen fade out
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    handleParallax();
    handleNavbarScroll();
}, 16), { passive: true }); // 60fps