/* ==========================================
   FORMS MODULE
   Form validation and submission handling
   ========================================== */

// ========== Contact Form Handler ==========
export function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      fullName: document.getElementById("fullName")?.value.trim(),
      email: document.getElementById("email")?.value.trim(),
      company: document.getElementById("company")?.value.trim(),
      phone: document.getElementById("phone")?.value.trim(),
      service: document.getElementById("service")?.value,
      message: document.getElementById("message")?.value.trim()
    };

    // Validate
    if (!validateForm(formData)) {
      return;
    }

    // Submit
    await submitForm(formData, contactForm);
  });

  // Real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea, select");
  inputs.forEach(input => {
    input.addEventListener("blur", () => validateInput(input));
    input.addEventListener("input", () => clearError(input));
  });
}

// ========== Form Validation ==========
function validateForm(data) {
  let isValid = true;

  // Validate full name
  if (!data.fullName || data.fullName.length < 2) {
    showError("fullName", "Please enter your full name");
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (!data.message || data.message.length < 10) {
    showError("message", "Please provide a message (at least 10 characters)");
    isValid = false;
  }

  return isValid;
}

// ========== Validate Single Input ==========
function validateInput(input) {
  const value = input.value.trim();
  const id = input.id;

  switch (id) {
    case "fullName":
      if (!value || value.length < 2) {
        showError(id, "Please enter your full name");
        return false;
      }
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        showError(id, "Please enter a valid email address");
        return false;
      }
      break;
    case "message":
      if (!value || value.length < 10) {
        showError(id, "Please provide a message (at least 10 characters)");
        return false;
      }
      break;
  }

  clearError(id);
  return true;
}

// ========== Show Error ==========
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;

  clearError(inputId);

  input.classList.add("error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "#EF4444";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";
  
  input.parentElement.appendChild(errorDiv);
}

// ========== Clear Error ==========
function clearError(inputId) {
  const input = typeof inputId === "string" ? document.getElementById(inputId) : inputId;
  if (!input) return;

  input.classList.remove("error");
  const errorMsg = input.parentElement.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

// ========== Submit Form ==========
async function submitForm(data, form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  const formMessage = document.getElementById("formMessage");

  // Show loading state
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    // Simulate API call (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, replace with:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to send message');

    // Success
    showFormMessage(formMessage, "Thank you! Your message has been sent. We'll respond within 24 hours.", "success");
    form.reset();
    
  } catch (error) {
    // Error
    showFormMessage(formMessage, "Sorry, something went wrong. Please try again or email us directly.", "error");
    console.error("Form submission error:", error);
  } finally {
    // Reset button
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  }
}

// ========== Show Form Message ==========
function showFormMessage(element, text, type) {
  if (!element) return;

  element.textContent = text;
  element.style.display = "block";
  element.style.backgroundColor = type === "success" ? "#D1FAE5" : "#FEE2E2";
  element.style.color = type === "success" ? "#065F46" : "#991B1B";
  element.style.border = `1px solid ${type === "success" ? "#10B981" : "#EF4444"}`;
  element.style.padding = "1rem";
  element.style.borderRadius = "8px";
  element.style.marginTop = "1rem";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

// ========== Newsletter Form ==========
export function initializeNewsletterForm() {
  const newsletterForms = document.querySelectorAll(".newsletter-form");
  
  newsletterForms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector(".newsletter-input");
      const email = emailInput.value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
      
      const submitBtn = form.querySelector(".newsletter-submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;
      
      // Simulate subscription
      setTimeout(() => {
        alert("Thank you for subscribing!");
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  });
}

// ========== Form Input Animations ==========
export function initializeFormAnimations() {
  const formInputs = document.querySelectorAll(".form-input, .form-textarea, .form-select, input, textarea, select");
  
  formInputs.forEach(input => {
    input.addEventListener("focus", () => {
      if (input.parentElement) {
        input.parentElement.style.transform = "translateY(-2px)";
        input.parentElement.style.transition = "transform 0.3s ease";
      }
    });

    input.addEventListener("blur", () => {
      if (input.parentElement) {
        input.parentElement.style.transform = "translateY(0)";
      }
    });
  });
}
