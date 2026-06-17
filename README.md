# Authentication System

A modern, responsive login and registration web application with client-side validation and smooth user experience.

## Features

- 🎨 **Modern UI Design** - Gradient background with smooth animations and transitions
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Form Validation** - Real-time validation with helpful error messages
- 🔒 **Security First** - Password confirmation, minimum length requirements
- ♿ **Accessible** - WCAG compliant with proper focus states and semantic HTML
- ⚡ **Performance** - Optimized script loading and minimal dependencies
- 💬 **User Feedback** - Clear success and error messages with loading states

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
1. Enter your username
2. Enter your password
3. Click "Login"
4. On success, you'll be redirected to the dashboard
5. Authentication token is stored in localStorage

### Register
1. Enter a username (minimum 3 characters)
2. Enter a password (minimum 6 characters)
3. Confirm your password
4. Click "Register"
5. On success, you'll be redirected to the login page

## API Endpoints

### POST `/api/login`
Authenticate user credentials.

**Request:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

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
  "username": "newuser@example.com",
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
  "error": "Username already exists"
}
```

## Form Validation

### Login Form
- ✓ Username is required
- ✓ Password is required

### Registration Form
- ✓ Username is required (minimum 3 characters)
- ✓ Password is required (minimum 6 characters)
- ✓ Password confirmation must match
- ✓ Real-time validation feedback

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
- [ ] Implement 2FA (Two-Factor Authentication)
- [ ] Add email verification
- [ ] Social login integration (Google, GitHub)
- [ ] Password strength meter
- [ ] Remember me checkbox
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
