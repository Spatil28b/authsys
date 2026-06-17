# Authentication System

A modern, responsive login and registration web application with client-side validation and smooth user experience.

## Features

- 🎨 **Modern UI Design** - Gradient background with smooth animations and transitions
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Form Validation** - Real-time validation with helpful error messages and email format checking
- 🔒 **Security First** - Password confirmation, minimum length requirements, email validation
- 👁 **Show/Hide Password** - Toggle password visibility with intuitive button
- 💪 **Password Strength Meter** - Real-time visual feedback on password strength (Very Weak to Strong)
- 🔑 **Remember Me** - Optional checkbox to save email for next login
- 📋 **Terms & Conditions** - Checkbox to accept terms before registration
- ♿ **Accessible** - WCAG compliant with proper focus states and semantic HTML
- ⚡ **Performance** - Optimized script loading and minimal dependencies
- 💬 **User Feedback** - Clear success and error messages with loading states
- 🎯 **Auto-Clear Errors** - Error messages clear when user focuses on input field

## Project Structure

```
├── index.html          # Login page
├── register.html       # Registration page
├── script.js           # Form handling and validation logic
├── style.css           # Responsive styling
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox and animations
- **JavaScript (ES6+)** - Async/await, event listeners, form validation
- **Fetch API** - HTTP requests to backend

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API server running (for authentication endpoints)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Spatil28b/authsys.git
cd web
```

2. Open in your browser:
   - Simply open `index.html` in a web browser, or
   - Serve with a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

## Usage

### Login
1. Enter your email or username
2. Enter your password
3. (Optional) Check "Remember me" to save your email for next time
4. Click "Login"
5. On success, you'll be redirected to the dashboard
6. Authentication token is stored in localStorage

**Tips:**
- Click the 👁 icon to show/hide your password
- Errors will clear automatically when you focus on an input field
- Your email will be remembered if you check the "Remember me" box

### Register
1. Enter your email address
2. Enter a username (minimum 3 characters)
3. Enter a password (minimum 6 characters)
   - Watch the **strength meter** for real-time feedback
   - Stronger passwords include uppercase, numbers, and symbols
4. Confirm your password (must match exactly)
5. Check the "I agree to Terms & Conditions" checkbox
6. Click "Register"
7. On success, you'll be redirected to the login page

**Tips:**
- Click the 👁 icon to show/hide your password while typing
- The password strength meter provides real-time guidance
- Make sure both password fields match before submitting

## API Endpoints

### POST `/api/login`
Authenticate user credentials.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```
*Note: Send either `email` or `username`, but not both*

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (Error):**
```json
{
  "error": "Invalid credentials"
}
```

---

### POST `/api/register`
Create a new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "username": "newusername",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully"
}
```

**Response (Error):**
```json
{
  "error": "Email or username already exists"
}
```

## Form Validation

### Login Form
- ✓ Email or username is required
- ✓ Password is required
- ✓ Valid email format (if email is used)
- ✓ Optional "Remember me" checkbox

### Registration Form
- ✓ Email is required and must be valid format
- ✓ Username is required (minimum 3 characters)
- ✓ Password is required (minimum 6 characters)
- ✓ Password strength meter shows: Very Weak → Weak → Fair → Good → Strong
  - Length: +1 point per 6+ chars, +1 for 10+ chars
  - Case variety: +1 for uppercase + lowercase
  - Numbers: +1 for numeric characters
  - Symbols: +1 for special characters
- ✓ Password confirmation must match exactly
- ✓ Terms & Conditions checkbox is required

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Requires polyfills for async/await

## Accessibility Features

- Semantic HTML5 structure
- ARIA-compliant form inputs
- Keyboard navigable
- Clear focus indicators
- Color contrast meets WCAG AA standards
- Proper heading hierarchy

## Performance Optimizations

- Scripts loaded at end of body for faster page load
- CSS is inline for critical rendering path
- Smooth animations use CSS transforms
- Debounced form validation
- Efficient event delegation

## Security Considerations

⚠️ **Note:** This is a frontend application. For production use:

- Implement HTTPS only
- Add CSRF tokens
- Use secure HTTP-only cookies for tokens
- Implement rate limiting on backend
- Use password hashing on backend (bcrypt, Argon2)
- Add input sanitization on backend
- Implement proper session management
- Use Content Security Policy headers

## Future Improvements

- [ ] Add "Forgot Password" functionality
- [x] Show/hide password toggle
- [x] Remember me checkbox
- [x] Password strength meter
- [x] Email field and validation
- [ ] Implement 2FA (Two-Factor Authentication)
- [ ] Add email verification
- [ ] Social login integration (Google, GitHub)
- [ ] Account settings page
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Error boundary for better error handling

## License

This project is open source and available under the MIT License.

## Author

Spatil28b

## Support

For issues and questions, please open an issue on GitHub: [authsys/issues](https://github.com/Spatil28b/authsys/issues)
