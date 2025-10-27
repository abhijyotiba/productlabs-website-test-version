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

      // Simulate form submission (replace with actual API call)
      try {
        await simulateFormSubmission(formData);
        
        // Success
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        
      } catch (error) {
        // Error
        showMessage('Sorry, something went wrong. Please try again or email us directly.', 'error');
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

  // Simulate form submission (replace with actual API endpoint)
  function simulateFormSubmission(data) {
    return new Promise((resolve) => {
      // In production, replace this with:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      console.log('Form data:', data);
      setTimeout(resolve, 1500);
    });
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
