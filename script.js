async function handleLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Username and password are required!");
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("authToken", data.token);
            alert("Login successful!");
        } else {
            alert(data.error || "Login failed!");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
    }
}

async function handleRegister() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            alert("Registration successful! You can now log in.");
        } else {
            alert(data.error || "Registration failed!");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
    }
}
