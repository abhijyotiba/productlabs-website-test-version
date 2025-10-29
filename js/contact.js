// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceID: 'service_edj3h45',
  templateID: 'template_rnytlx5',
  publicKey: 'pW9FzN_zDVFWs8lUP'
};

// Initialize EmailJS
(function() {
  emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
      };

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Validate message length
      if (formData.message.length < 10) {
        showMessage('Please provide a more detailed message (at least 10 characters).', 'error');
        return;
      }

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      // Send email via EmailJS
      try {
        // Prepare template parameters
        const templateParams = {
          from_name: formData.fullName,
          from_email: formData.email,
          company: formData.company || 'Not provided',
          phone: formData.phone || 'Not provided',
          service: formData.service || 'Not specified',
          message: formData.message,
          to_email: 'connect@productlabs.us' // Your receiving email
        };

        // Send email using EmailJS
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceID,
          EMAILJS_CONFIG.templateID,
          templateParams
        );

        console.log('Email sent successfully:', response);
        
        // Success
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        
      } catch (error) {
        console.error('EmailJS Error:', error);
        // Error
        showMessage('Sorry, something went wrong. Please try again or email us directly at connect@productlabs.us', 'error');
      } finally {
        // Reset button
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        }, 1000);
      }
    });
  }

  // Show form message
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    formMessage.style.backgroundColor = type === 'success' ? '#D1FAE5' : '#FEE2E2';
    formMessage.style.color = type === 'success' ? '#065F46' : '#991B1B';
    formMessage.style.border = `1px solid ${type === 'success' ? '#10B981' : '#EF4444'}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }

  // Add focus animations to form inputs
  const formInputs = contactForm.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-2px)';
      input.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateY(0)';
    });
  });

  // Add hover effects to contact info links
  const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.color = 'var(--color-text-dark)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.color = 'var(--color-text-muted)';
    });
  });

  // Add hover effects to social links
  const socialLinks = document.querySelectorAll('a[style*="background: var(--color-bg-light-gray)"]');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.backgroundColor = 'var(--color-text-dark)';
      link.style.color = 'var(--color-bg-white)';
      link.querySelector('span').style.color = 'var(--color-bg-white)';
      link.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.backgroundColor = 'var(--color-bg-light-gray)';
      link.style.color = 'initial';
      link.querySelector('span').style.color = 'initial';
      link.style.transform = 'translateY(0)';
    });
  });
});
