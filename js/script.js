// Toggle Service Details
function toggleService(button) {
    const card = button.closest('.service-card');
    const details = card.querySelector('.service-details');
    const icon = button.querySelector('i');
    
    // Close all other open cards
    document.querySelectorAll('.service-details').forEach(detail => {
        if (detail !== details) {
            detail.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.view-more-btn i').forEach(i => {
        if (i !== icon) {
            i.classList.remove('fa-chevron-up');
            i.classList.add('fa-chevron-down');
        }
    });
    
    document.querySelectorAll('.view-more-btn').forEach(btn => {
        if (btn !== button) {
            btn.innerHTML = btn.innerHTML.replace('Show Less', 'View More');
        }
    });
    
    // Toggle current card
    details.classList.toggle('active');
    
    if (details.classList.contains('active')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        button.innerHTML = button.innerHTML.replace('View More', 'Show Less');
    } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        button.innerHTML = button.innerHTML.replace('Show Less', 'View More');
    }
}

// Mobile Menu Toggle (to be implemented)
document.querySelector('.mobile-menu-toggle')?.addEventListener('click', function() {
    // Will implement in next prompt
    console.log('Mobile menu clicked');
});

// Smooth Scroll
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

// Back to Top Button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Back to Top Button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile Menu Toggle
let isMobileMenuOpen = false;

document.querySelector('.mobile-menu-toggle')?.addEventListener('click', function() {
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    
    if (!mobileMenu) {
        // Create mobile menu if it doesn't exist
        createMobileMenu();
    }
    
    toggleMobileMenu();
    
    // Toggle hamburger animation
    this.classList.toggle('open');
});

function createMobileMenu() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.style.display = 'none';
    
    // Create menu panel
    const menuPanel = document.createElement('div');
    menuPanel.className = 'mobile-menu-panel';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'mobile-menu-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.setAttribute('aria-label', 'Close menu');
    
    // Create menu content
    const menuContent = document.createElement('div');
    menuContent.className = 'mobile-menu-content';
    
    // Add logo
    const logoContainer = document.querySelector('.logo-container').cloneNode(true);
    logoContainer.classList.add('mobile-menu-logo');
    menuContent.appendChild(logoContainer);
    
    // Add navigation links
    const navList = document.createElement('div');
    navList.className = 'mobile-nav-list';
    
    const navItems = [
        {text: 'Home', href: '#home'},
        {text: 'About', href: '#about'},
        {text: 'Our Plans', href: '#services'},
        {text: 'Services', href: '#services'},
        {text: 'Blog', href: '#blog'},
        {text: 'Shop', href: '#shop'},
        {text: 'Contact', href: '#contact'}
    ];
    
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        link.className = 'mobile-nav-link';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
            // Scroll to section
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        navList.appendChild(link);
    });
    
    menuContent.appendChild(navList);
    
    // Add buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'mobile-menu-buttons';
    
    const loginBtn = document.createElement('a');
    loginBtn.href = 'login.html';
    loginBtn.className = 'btn btn-secondary';
    loginBtn.textContent = 'Login';
    
    const registerBtn = document.createElement('a');
    registerBtn.href = '#contact';
    registerBtn.className = 'btn btn-primary';
    registerBtn.textContent = 'Register';
    
    buttonsDiv.appendChild(loginBtn);
    buttonsDiv.appendChild(registerBtn);
    menuContent.appendChild(buttonsDiv);
    
    // Add social links
    const socialDiv = document.createElement('div');
    socialDiv.className = 'mobile-social-links';
    
    const socialLinks = [
        {icon: 'fab fa-facebook', label: 'Facebook'},
        {icon: 'fab fa-twitter', label: 'Twitter'},
        {icon: 'fab fa-instagram', label: 'Instagram'},
        {icon: 'fab fa-linkedin', label: 'LinkedIn'},
        {icon: 'fab fa-youtube', label: 'YouTube'}
    ];
    
    socialLinks.forEach(social => {
        const link = document.createElement('a');
        link.href = '#';
        link.setAttribute('aria-label', social.label);
        link.innerHTML = `<i class="${social.icon}"></i>`;
        socialDiv.appendChild(link);
    });
    
    menuContent.appendChild(socialDiv);
    
    // Add contact info
    const contactDiv = document.createElement('div');
    contactDiv.className = 'mobile-contact-info';
    contactDiv.innerHTML = '<i class="fas fa-phone"></i> +91 96112 32569';
    menuContent.appendChild(contactDiv);
    
    // Assemble menu
    menuPanel.appendChild(closeButton);
    menuPanel.appendChild(menuContent);
    overlay.appendChild(menuPanel);
    document.body.appendChild(overlay);
    
    // Add event listener to close button
    closeButton.addEventListener('click', toggleMobileMenu);
    
    // Add event listener to overlay
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const overlay = document.querySelector('.mobile-menu-overlay');
    const hamburger = document.querySelector('.mobile-menu-toggle');
    
    if (isMobileMenuOpen) {
        // Close menu
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        hamburger.classList.remove('open');
    } else {
        // Open menu
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        hamburger.classList.add('open');
    }
    
    isMobileMenuOpen = !isMobileMenuOpen;
}

// Stats Counter Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (target) {
                    animateCounter(stat, 0, target, 2000);
                }
            });
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        if (end >= 1000) {
            element.textContent = currentValue.toLocaleString();
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (end >= 1000) {
                element.textContent = end.toLocaleString();
            } else {
                element.textContent = end;
            }
        }
    };
    window.requestAnimationFrame(step);
}

// Start observing the stats section when it comes into view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Announcement Bar Functionality
function closeAnnouncement() {
    const announcementBar = document.getElementById('announcementBar');
    announcementBar.classList.add('hidden');
    
    // Save the preference in sessionStorage
    sessionStorage.setItem('announcementClosed', 'true');
}

// Check if announcement was previously closed when page loads
document.addEventListener('DOMContentLoaded', function() {
    const wasClosed = sessionStorage.getItem('announcementClosed');
    if (wasClosed === 'true') {
        const announcementBar = document.getElementById('announcementBar');
        if (announcementBar) {
            announcementBar.classList.add('hidden');
        }
    }
});

// Footer Current Year (Optional)
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} AssistHealth. All rights reserved.`;
    }
});

// Login Page Functionality
if (document.querySelector('.login-container')) {
    // Password Toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Registration Password Toggle
    const regPasswordToggle = document.getElementById('regPasswordToggle');
    const regPasswordInput = document.getElementById('regPassword');
    
    if (regPasswordToggle && regPasswordInput) {
        regPasswordToggle.addEventListener('click', function() {
            const type = regPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            regPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Confirm Password Toggle
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (confirmPasswordToggle && confirmPasswordInput) {
        confirmPasswordToggle.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Password Strength Indicator
    const passwordStrength = document.getElementById('passwordStrength');
    
    if (regPasswordInput && passwordStrength) {
        regPasswordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            passwordStrength.textContent = strength.text;
            passwordStrength.className = 'password-strength ' + strength.level;
        });
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength <= 2) return { level: 'weak', text: 'Weak' };
        if (strength <= 3) return { level: 'medium', text: 'Medium' };
        return { level: 'strong', text: 'Strong' };
    }
    
    // Registration Modal
    const signupTrigger = document.getElementById('signupTrigger');
    const registrationModal = document.getElementById('registrationModal');
    const modalClose = document.getElementById('modalClose');
    const loginFromModal = document.getElementById('loginFromModal');
    
    if (signupTrigger && registrationModal) {
        signupTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            registrationModal.style.display = 'block';
            setTimeout(() => {
                registrationModal.classList.add('active');
            }, 10);
        });
    }
    
    if (modalClose && registrationModal) {
        modalClose.addEventListener('click', function() {
            registrationModal.classList.remove('active');
            setTimeout(() => {
                registrationModal.style.display = 'none';
            }, 300);
        });
    }
    
    if (loginFromModal && registrationModal) {
        loginFromModal.addEventListener('click', function(e) {
            e.preventDefault();
            registrationModal.classList.remove('active');
            setTimeout(() => {
                registrationModal.style.display = 'none';
            }, 300);
        });
    }
    
    // Close modal when clicking outside
    if (registrationModal) {
        registrationModal.addEventListener('click', function(e) {
            if (e.target === registrationModal) {
                registrationModal.classList.remove('active');
                setTimeout(() => {
                    registrationModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Forgot Password Flow
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    const successEmail = document.getElementById('successEmail');
    const forgotPasswordSuccess = document.getElementById('forgotPasswordSuccess');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginForm) loginForm.style.display = 'none';
            if (forgotPasswordForm) forgotPasswordForm.style.display = 'block';
        });
    }
    
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (forgotPasswordForm) forgotPasswordForm.style.display = 'none';
            if (forgotPasswordSuccess) forgotPasswordSuccess.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
        });
    }
    
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (forgotPasswordForm) forgotPasswordForm.style.display = 'none';
            if (forgotPasswordSuccess) forgotPasswordSuccess.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
        });
    }
    
    // Login Form Submission
    const loginFormElement = document.getElementById('loginForm');
    
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const loginBtn = this.querySelector('.login-btn');
            const originalText = loginBtn.innerHTML;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide login form
                loginForm.style.display = 'none';
                
                // Show 2FA modal
                const twoFactorModal = document.getElementById('twoFactorModal');
                if (twoFactorModal) {
                    twoFactorModal.style.display = 'block';
                    setTimeout(() => {
                        twoFactorModal.classList.add('active');
                    }, 10);
                }
                
                // Reset button
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Forgot Password Form Submission
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');
    
    if (forgotPasswordFormElement) {
        forgotPasswordFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail').value;
            
            // Show success state
            if (successEmail) successEmail.textContent = email;
            if (forgotPasswordForm) forgotPasswordForm.style.display = 'none';
            if (forgotPasswordSuccess) forgotPasswordSuccess.style.display = 'block';
        });
    }
    
    // Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const registerBtn = this.querySelector('.register-btn');
            const originalText = registerBtn.innerHTML;
            registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            registerBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Close modal
                registrationModal.classList.remove('active');
                setTimeout(() => {
                    registrationModal.style.display = 'none';
                }, 300);
                
                // Reset button
                registerBtn.innerHTML = originalText;
                registerBtn.disabled = false;
                
                // Show success message
                alert('Registration successful! You can now log in.');
            }, 1500);
        });
    }
    
    // 2FA Modal
    const twoFactorClose = document.getElementById('twoFactorClose');
    const twoFactorModal = document.getElementById('twoFactorModal');
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyBtn = document.getElementById('verifyBtn');
    const otpError = document.getElementById('otpError');
    
    if (twoFactorClose && twoFactorModal) {
        twoFactorClose.addEventListener('click', function() {
            twoFactorModal.classList.remove('active');
            setTimeout(() => {
                twoFactorModal.style.display = 'none';
            }, 300);
        });
        
        // Close modal when clicking outside
        twoFactorModal.addEventListener('click', function(e) {
            if (e.target === twoFactorModal) {
                twoFactorModal.classList.remove('active');
                setTimeout(() => {
                    twoFactorModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // OTP Input Handling
    if (otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                // Move to next input if value is entered
                if (this.value && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
                
                // Update verify button state
                updateVerifyButton();
            });
            
            input.addEventListener('keydown', function(e) {
                // Move to previous input if backspace is pressed on empty field
                if (e.key === 'Backspace' && !this.value && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }
    
    function updateVerifyButton() {
        const allFilled = Array.from(otpInputs).every(input => input.value);
        if (verifyBtn) {
            verifyBtn.disabled = !allFilled;
        }
    }
    
    // Verify Button
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Close 2FA modal
                twoFactorModal.classList.remove('active');
                setTimeout(() => {
                    twoFactorModal.style.display = 'none';
                }, 300);
                
                // Show success overlay
                const successOverlay = document.getElementById('successOverlay');
                if (successOverlay) {
                    successOverlay.style.display = 'block';
                    setTimeout(() => {
                        successOverlay.classList.add('active');
                    }, 10);
                    
                    // Start countdown
                    let count = 3;
                    const countdownElement = document.getElementById('countdown');
                    if (countdownElement) {
                        const countdownInterval = setInterval(() => {
                            if (countdownElement) countdownElement.textContent = count;
                            count--;
                            if (count < 0) {
                                clearInterval(countdownInterval);
                                // Redirect to dashboard
                                window.location.href = 'index.html';
                            }
                        }, 1000);
                    }
                }
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    }
    
    // OTP Error Handling
    if (otpError) {
        // Simulate error for demonstration
        // In a real app, this would be triggered by API response
    }
    
    // Resend Code Functionality
    const resendCode = document.getElementById('resendCode');
    if (resendCode) {
        let resendTimer = 30;
        let timerInterval;
        
        function startResendTimer() {
            resendCode.textContent = `Resend in 0:${resendTimer.toString().padStart(2, '0')}`;
            resendCode.style.color = '#ccc';
            resendCode.style.textDecoration = 'none';
            resendCode.style.cursor = 'not-allowed';
            
            timerInterval = setInterval(() => {
                resendTimer--;
                resendCode.textContent = `Resend in 0:${resendTimer.toString().padStart(2, '0')}`;
                
                if (resendTimer <= 0) {
                    clearInterval(timerInterval);
                    resendCode.textContent = 'Didn\'t receive code? Resend';
                    resendCode.style.color = '#008080';
                    resendCode.style.textDecoration = 'underline';
                    resendCode.style.cursor = 'pointer';
                }
            }, 1000);
        }
        
        resendCode.addEventListener('click', function() {
            if (resendTimer > 0) return; // Prevent clicking during cooldown
            
            // Simulate resend API call
            alert('Verification code has been resent to your phone');
            
            // Start timer
            resendTimer = 30;
            startResendTimer();
        });
        
        // Start initial timer
        startResendTimer();
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'This field is required');
                } else {
                    hideError(field);
                }
            });
            
            // Check email format
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                isValid = false;
                showError(emailField, 'Please enter a valid email address');
            }
            
            // Check password match
            const passwordField = form.querySelector('#regPassword');
            const confirmPasswordField = form.querySelector('#confirmPassword');
            if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
                isValid = false;
                showError(confirmPasswordField, 'Passwords do not match');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    function showError(field, message) {
        field.parentElement.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }
    
    function hideError(field) {
        field.parentElement.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}

// Minimal Login Page Functionality
if (document.querySelector('.minimal-login-page')) {
    // Password Show/Hide Toggle
    const showPassword = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    
    if (showPassword && passwordInput) {
        showPassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'SHOW' : 'HIDE';
        });
    }
    
    // Registration Password Show/Hide Toggle
    const showRegPassword = document.getElementById('showRegPassword');
    const regPasswordInput = document.getElementById('regPasswordMinimal');
    
    if (showRegPassword && regPasswordInput) {
        showRegPassword.addEventListener('click', function() {
            const type = regPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            regPasswordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'SHOW' : 'HIDE';
        });
    }
    
    // Confirm Password Show/Hide Toggle
    const showConfirmPassword = document.getElementById('showConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPasswordMinimal');
    
    if (showConfirmPassword && confirmPasswordInput) {
        showConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'SHOW' : 'HIDE';
        });
    }
    
    // Register Button Click Handler
    const registerTrigger = document.getElementById('registerTrigger');
    const registrationModalMinimal = document.getElementById('registrationModalMinimal');
    
    if (registerTrigger && registrationModalMinimal) {
        registerTrigger.addEventListener('click', function() {
            registrationModalMinimal.style.display = 'block';
            setTimeout(() => {
                registrationModalMinimal.classList.add('active');
            }, 10);
        });
    }
    
    // Modal Close Button Handlers
    const modalCloseMinimal = document.getElementById('modalCloseMinimal');
    const forgotPasswordClose = document.getElementById('forgotPasswordClose');
    
    if (modalCloseMinimal && registrationModalMinimal) {
        modalCloseMinimal.addEventListener('click', function() {
            registrationModalMinimal.classList.remove('active');
            setTimeout(() => {
                registrationModalMinimal.style.display = 'none';
            }, 300);
        });
    }
    
    if (forgotPasswordClose) {
        forgotPasswordClose.addEventListener('click', function() {
            const forgotPasswordModal = document.getElementById('forgotPasswordModal');
            if (forgotPasswordModal) {
                forgotPasswordModal.classList.remove('active');
                setTimeout(() => {
                    forgotPasswordModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Close modals when clicking outside
    if (registrationModalMinimal) {
        registrationModalMinimal.addEventListener('click', function(e) {
            if (e.target === registrationModalMinimal) {
                registrationModalMinimal.classList.remove('active');
                setTimeout(() => {
                    registrationModalMinimal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    if (forgotPasswordModal) {
        forgotPasswordModal.addEventListener('click', function(e) {
            if (e.target === forgotPasswordModal) {
                forgotPasswordModal.classList.remove('active');
                setTimeout(() => {
                    forgotPasswordModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Login Form Submission
    const loginFormMinimal = document.getElementById('loginFormMinimal');
    
    if (loginFormMinimal) {
        loginFormMinimal.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!username || !password) {
                showErrorMinimal('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const loginBtn = this.querySelector('.login-btn');
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            
            // Simulate API call with fake validation
            setTimeout(() => {
                // For demo purposes, accept any credentials
                // In real app, this would be actual API validation
                
                // Reset button
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
                
                // For demo, let's check for specific invalid credentials
                if (username === 'invalid' && password === 'invalid') {
                    // Show error message
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid username or password. Please try again.';
                    loginForm.appendChild(errorElement);
                    
                    // Remove error after 3 seconds
                    setTimeout(() => {
                        errorElement.remove();
                    }, 3000);
                } else {
                    // Show success overlay
                    const successOverlay = document.getElementById('successOverlayMinimal');
                    if (successOverlay) {
                        successOverlay.style.display = 'block';
                        setTimeout(() => {
                            successOverlay.classList.add('active');
                        }, 10);
                        
                        // Redirect after delay
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 2000);
                    }
                }
            }, 1500);
        });
    }
    
    // Forgot Password Link Handler
    const forgotPasswordMinimal = document.getElementById('forgotPasswordMinimal');
    
    if (forgotPasswordMinimal) {
        forgotPasswordMinimal.addEventListener('click', function(e) {
            e.preventDefault();
            
            const forgotPasswordModal = document.getElementById('forgotPasswordModal');
            if (forgotPasswordModal) {
                forgotPasswordModal.style.display = 'block';
                setTimeout(() => {
                    forgotPasswordModal.classList.add('active');
                }, 10);
            }
        });
    }
    
    // Forgot Password Form Submission
    const forgotPasswordFormMinimal = document.getElementById('forgotPasswordFormMinimal');
    
    if (forgotPasswordFormMinimal) {
        forgotPasswordFormMinimal.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmailMinimal').value;
            
            // Simple validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // In real app, this would send reset email
            alert(`Password reset link sent to ${email}`);
            
            // Close modal and return to login
            const forgotPasswordModal = document.getElementById('forgotPasswordModal');
            if (forgotPasswordModal) {
                forgotPasswordModal.classList.remove('active');
                setTimeout(() => {
                    forgotPasswordModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Back to Login Link in Forgot Password Modal
    const backToLoginMinimal = document.getElementById('backToLoginMinimal');
    
    if (backToLoginMinimal) {
        backToLoginMinimal.addEventListener('click', function(e) {
            e.preventDefault();
            
            const forgotPasswordModal = document.getElementById('forgotPasswordModal');
            if (forgotPasswordModal) {
                forgotPasswordModal.classList.remove('active');
                setTimeout(() => {
                    forgotPasswordModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Login from Modal Link
    const loginFromModalMinimal = document.getElementById('loginFromModalMinimal');
    
    if (loginFromModalMinimal && registrationModalMinimal) {
        loginFromModalMinimal.addEventListener('click', function(e) {
            e.preventDefault();
            
            registrationModalMinimal.classList.remove('active');
            setTimeout(() => {
                registrationModalMinimal.style.display = 'none';
            }, 300);
        });
    }
    
    // Registration Form Submission
    const registrationFormMinimal = document.getElementById('registrationFormMinimal');
    
    if (registrationFormMinimal) {
        registrationFormMinimal.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstNameMinimal').value;
            const lastName = document.getElementById('lastNameMinimal').value;
            const email = document.getElementById('regEmailMinimal').value;
            const password = document.getElementById('regPasswordMinimal').value;
            const confirmPassword = document.getElementById('confirmPasswordMinimal').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            const registerBtn = this.querySelector('.register-btn-modal');
            registerBtn.classList.add('loading');
            registerBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Close modal
                registrationModalMinimal.classList.remove('active');
                setTimeout(() => {
                    registrationModalMinimal.style.display = 'none';
                }, 300);
                
                // Reset button
                registerBtn.classList.remove('loading');
                registerBtn.disabled = false;
                
                // Show success message
                alert('Registration successful! You can now log in.');
            }, 1500);
        });
    }
    
    function showErrorMinimal(message) {
        // Remove existing error message
        const existingError = document.getElementById('errorMessage');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error message
        const errorElement = document.createElement('div');
        errorElement.id = 'errorMessage';
        errorElement.className = 'error-message';
        errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
        errorElement.style.display = 'block';
        
        // Add to page
        const loginForm = document.getElementById('loginFormMinimal');
        loginForm.appendChild(errorElement);
        
        // Remove after delay
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 3000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}

// Services Infinite Carousel Functionality
(function() {
    const servicesGrid = document.querySelector('.services-grid');
    
    if (servicesGrid) {
        // Duplicate the cards to create an infinite loop effect
        const originalCards = Array.from(servicesGrid.children);
        
        // Clone each card and append to the grid
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            servicesGrid.appendChild(clone);
        });
        
        // Set up the animation
        function setupAnimation() {
            // Reset animation
            servicesGrid.style.animation = 'none';
            
            // Force reflow to reset animation
            void servicesGrid.offsetWidth;
            
            // Restart animation with a gentle, calm speed appropriate for healthcare UI
            servicesGrid.style.animation = 'scroll 60s linear infinite';
        }
        
        // Initialize the animation
        setupAnimation();
        
        // Reinitialize on window resize to adjust for any layout changes
        window.addEventListener('resize', () => {
            setupAnimation();
        });
    }
})();


