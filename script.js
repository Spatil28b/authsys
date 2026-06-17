// Utility function to show messages
function showMessage(elementId, text, type = 'error') {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = text ? 'block' : 'none';
    }
}

// Clear message on input focus
function clearMessageOnFocus() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const messageDiv = document.getElementById('message');
            if (messageDiv && messageDiv.classList.contains('error')) {
                messageDiv.textContent = '';
                messageDiv.style.display = 'none';
            }
        });
    });
}

// Utility function to enable/disable button
function setButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Loading...' : (button.id === 'login-button' ? 'Login' : 'Register');
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return Math.min(strength, 4); // 0-4 scale
}

function updatePasswordStrength(password) {
    const strengthDiv = document.getElementById('password-strength');
    if (!strengthDiv) return;
    
    const strength = checkPasswordStrength(password);
    const fill = strengthDiv.querySelector('.strength-fill');
    const text = strengthDiv.querySelector('.strength-text');
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ff6b6b', '#ffa500', '#ffd700', '#90ee90', '#228b22'];
    
    fill.style.width = `${(strength + 1) * 20}%`;
    fill.style.backgroundColor = colors[strength];
    text.textContent = `Password strength: ${labels[strength]}`;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate login form
function validateLogin(email, password) {
    if (!email) {
        showMessage('message', 'Email or username is required.');
        return false;
    }
    if (!password) {
        showMessage('message', 'Password is required.');
        return false;
    }
    return true;
}

// Validate register form
function validateRegister(email, username, password, passwordConfirm, termsAccepted) {
    if (!email) {
        showMessage('message', 'Email is required.');
        return false;
    }
    if (!validateEmail(email)) {
        showMessage('message', 'Please enter a valid email address.');
        return false;
    }
    if (!username) {
        showMessage('message', 'Username is required.');
        return false;
    }
    if (username.length < 3) {
        showMessage('message', 'Username must be at least 3 characters long.');
        return false;
    }
    if (!password) {
        showMessage('message', 'Password is required.');
        return false;
    }
    if (password.length < 6) {
        showMessage('message', 'Password must be at least 6 characters long.');
        return false;
    }
    if (password !== passwordConfirm) {
        showMessage('message', 'Passwords do not match.');
        return false;
    }
    if (!termsAccepted) {
        showMessage('message', 'You must agree to the Terms & Conditions.');
        return false;
    }
    return true;
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me")?.checked || false;

    if (!validateLogin(email, password)) {
        return;
    }

    setButtonLoading('login-button', true);

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: validateEmail(email) ? email : '', username: !validateEmail(email) ? email : '', password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);
            if (rememberMe) {
                localStorage.setItem("rememberMe", email);
            }
            showMessage('message', 'Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = "/dashboard.html";
            }, 1000);
        } else {
            showMessage('message', data.error || "Login failed. Please try again.");
        }
    } catch (err) {
        console.error(err);
        showMessage('message', 'Network error. Please check your connection and try again.');
    } finally {
        setButtonLoading('login-button', false);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    const termsAccepted = document.getElementById("terms")?.checked || false;

    if (!validateRegister(email, username, password, passwordConfirm, termsAccepted)) {
        return;
    }

    setButtonLoading('register-button', true);

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('message', 'Registration successful! Redirecting to login...', 'success');
            document.getElementById("register-form").reset();
            updatePasswordStrength('');
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);
        } else {
            showMessage('message', data.error || "Registration failed. Please try again.");
        }
    } catch (err) {
        console.error(err);
        showMessage('message', 'Network error. Please check your connection and try again.');
    } finally {
        setButtonLoading('register-button', false);
    }
}

// Toggle password visibility
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            if (input) {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                this.textContent = isPassword ? '🔒' : '👁';
            }
        });
    });
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    clearMessageOnFocus();
    setupPasswordToggles();
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Check for remembered email
    const rememberedEmail = localStorage.getItem("rememberMe");
    if (loginForm && rememberedEmail) {
        const emailInput = loginForm.querySelector('#email');
        if (emailInput) {
            emailInput.value = rememberedEmail;
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Enable submit button only when form is valid
        const inputs = loginForm.querySelectorAll('input[required]');
        function updateLoginButton() {
            const isValid = Array.from(inputs).every(inp => {
                if (inp.type === 'email') {
                    return validateEmail(inp.value.trim()) || inp.value.trim() !== '';
                }
                return inp.value.trim() !== '';
            });
            document.getElementById('login-button').disabled = !isValid;
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', updateLoginButton);
        });
        updateLoginButton();
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Password strength meter
        const passwordInput = registerForm.querySelector('#password');
        const passwordStrengthDiv = document.getElementById('password-strength');
        
        if (passwordInput && passwordStrengthDiv) {
            passwordInput.addEventListener('input', function() {
                if (this.value.length > 0) {
                    passwordStrengthDiv.classList.add('active');
                    updatePasswordStrength(this.value);
                } else {
                    passwordStrengthDiv.classList.remove('active');
                }
            });
        }
        
        // Enable submit button only when form is valid
        const inputs = registerForm.querySelectorAll('input[required]');
        const checkboxes = registerForm.querySelectorAll('input[type="checkbox"][required]');
        
        function updateRegisterButton() {
            const inputsValid = Array.from(inputs).every(inp => {
                if (inp.type === 'email') {
                    return validateEmail(inp.value.trim());
                } else if (inp.type === 'password') {
                    return inp.value.trim() !== '';
                }
                return inp.value.trim() !== '';
            });
            
            const checkboxesValid = Array.from(checkboxes).every(cb => cb.checked);
            const passwordsMatch = registerForm.querySelector('#password').value === registerForm.querySelector('#password-confirm').value;
            
            document.getElementById('register-button').disabled = !(inputsValid && checkboxesValid && passwordsMatch);
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', updateRegisterButton);
        });
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateRegisterButton);
        });
        updateRegisterButton();
    }
});
