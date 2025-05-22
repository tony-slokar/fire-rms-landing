// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const waitlistForm = document.getElementById('waitlist-form');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            // Formspree will handle the actual submission
            // This is just for UI feedback
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Reset button after submission (Formspree will handle the redirect)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
