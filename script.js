document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
   
    // Show only the about page initially
    document.getElementById('about').style.display = 'block';
   
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
           
            // Get target page ID
            const targetId = this.getAttribute('href').substring(1);
           
            // Hide all pages
            pages.forEach(page => {
                page.style.display = 'none';
            });
           
            // Show target page
            document.getElementById(targetId).style.display = 'block';
           
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
           
            // Close mobile menu if open
            navMenu.classList.remove('active');
           
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
   
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
   
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
           
            // Simple validation
            if (name && email) {
                alert(`Thank you ${name}! Your message has been sent. I'll respond to ${email} soon.`);
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
   
    // Gallery image modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '2000';
           
            const modalImg = document.createElement('img');
            modalImg.src = imgSrc;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';
           
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
           
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
});