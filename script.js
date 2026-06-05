// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    
    // Check if elements exist (avoid errors)
    if (mobileMenuBtn && navbar) {
        
        // Function to toggle menu
        function toggleMenu() {
            navbar.classList.toggle('active');
            
            // Change icon when menu open/close
            const icon = mobileMenuBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Add click event to hamburger button
        mobileMenuBtn.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on a link (optional, better UX)
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close menu when clicking outside (optional - good UX)
        document.addEventListener('click', function(event) {
            const isClickInside = navbar.contains(event.target) || mobileMenuBtn.contains(event.target);
            if (!isClickInside && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Handle window resize - reset menu if screen becomes larger than mobile
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navbar.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Optional: Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Chat bubble click effect
    const chatBubble = document.querySelector('.chat-bubble');
    if (chatBubble) {
        chatBubble.addEventListener('click', function() {
            // Example: alert or open chat window
            alert('Halo! Customer service akan segera merespon.');
            // You can replace this with actual chat integration
        });
    }
    
    // Search icon click effect
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('Fitur pencarian akan segera hadir!');
        });
    }
    
    // Wishlist, Chat, Share action buttons
    const actionIcons = document.querySelectorAll('.icons span');
    actionIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const action = this.innerText.trim();
            alert(`Fitur ${action} akan segera tersedia!`);
        });
    });
});