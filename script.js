document.addEventListener('DOMContentLoaded', function() {
    (function() {
        emailjs.init("RF_MG9n5RCWmhFAsd"); // Replace with your EmailJS user ID
    })();
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
    // Contact form
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const subjectInput = document.getElementById('subject');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    successMessage.style.display = 'none';
    hideError(emailInput, 'emailError');
    hideError(messageInput, 'messageError');
    hideError(nameInput, 'nameError');

    // Validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'nameError', 'Name is required');
            return false;
        }
        hideError(nameInput, 'nameError');
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(emailInput, 'emailError', 'Email is required');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'emailError', 'Please enter a valid email');
            return false;
        }
        hideError(emailInput, 'emailError');
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'messageError', 'Message is required');
            return false;
        }
        hideError(messageInput, 'messageError');
        return true;
    }

    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.parentElement.classList.add('invalid');
    }

    function hideError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = 'none';
        input.parentElement.classList.remove('invalid');
    }

    // Event listeners for validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    async function sendEmail(formData) {
        try {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const response = await emailjs.send(
                'service_n4e5lzt',
                'template_nuk3i22', // Replace with your EmailJS template ID
                formData
            );

            if (response.status === 200) {
                successMessage.style.display = 'block';
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Email sending error:', error);
            alert('Failed to send your message. Please try again later.');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            const formData = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                subject: subjectInput.value.trim() || 'Message from Photography Website',
                message: messageInput.value.trim()
            };
            await sendEmail(formData);
        }
    });
});