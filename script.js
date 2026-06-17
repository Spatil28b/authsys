// Utility function to show messages
function showMessage(elementId, text, type = 'error') {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = text ? 'block' : 'none';
    }
}

// Utility function to enable/disable button
function setButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Loading...' : (button.id === 'login-button' ? 'Login' : 'Register');
    }
}

// Validate login form
function validateLogin(username, password) {
    if (!username) {
        showMessage('message', 'Username is required.');
        return false;
    }
    if (!password) {
        showMessage('message', 'Password is required.');
        return false;
    }
    return true;
}

// Validate register form
function validateRegister(username, password, passwordConfirm) {
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
    return true;
}

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!validateLogin(username, password)) {
        return;
    }

    setButtonLoading('login-button', true);

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);
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
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    if (!validateRegister(username, password, passwordConfirm)) {
        return;
    }

    setButtonLoading('register-button', true);

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('message', 'Registration successful! Redirecting to login...', 'success');
            document.getElementById("register-form").reset();
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

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Enable submit button only when form is valid
        const inputs = loginForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const isValid = Array.from(inputs).every(inp => inp.value.trim() !== '');
                document.getElementById('login-button').disabled = !isValid;
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Enable submit button only when form is valid
        const inputs = registerForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const isValid = Array.from(inputs).every(inp => inp.value.trim() !== '');
                document.getElementById('register-button').disabled = !isValid;
            });
        });
    }
});
