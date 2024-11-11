// server.js (Node.js with Express)
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for reset tokens (in production, use a database)
const resetTokens = new Map();

// Generate a unique reset token
function generateResetToken() {
  return crypto.randomBytes(20).toString('hex');
}

// Send reset email
async function sendResetEmail(username, email, resetToken) {
  let transporter = nodemailer.createTransport({
    // Configure your email service here
  });

  let resetLink = `http://yourdomain.com/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: '"Your App" <noreply@yourdomain.com>',
    to: email,
    subject: "Password Reset Request",
    text: `Hello ${username}, click the following link to reset your password: ${resetLink}`,
    html: `<p>Hello ${username}, click <a href="${resetLink}">here</a> to reset your password.</p>`
  });
}

// Serve the forgot password page
app.get('/forgot-password', (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Forgot Password</h2>
        <form id="forgotPasswordForm" action="/request-reset" method="POST">
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <span id="usernameError" style="color: red;"></span>
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <script>
          document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;

            if (!username) {
              document.getElementById('usernameError').textContent = 'This field is required';
              return;
            }

            // Clear any previous error messages
            document.getElementById('usernameError').textContent = '';

            // Submit the form to the server
            fetch('/request-reset', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                document.getElementById('usernameError').textContent = data.error;
              } else {
                alert(data.message);
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('An error occurred. Please try again.');
            });
          });
        </script>
      </body>
    </html>
  `);
});

// Request password reset
app.post('/request-reset', async (req, res) => {
  const { username } = req.body;
  // TODO: Verify if username exists in your user database and get the associated email
  // For this example, we'll assume the email is username@example.com
  const email = `${username}@example.com`;

  const resetToken = generateResetToken();
  resetTokens.set(resetToken, { username, email });

  try {
    await sendResetEmail(username, email, resetToken);
    res.json({ message: "Password reset email sent. Please check your inbox." });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: "Failed to send reset email. Please try again later." });
  }
});

// Reset password page
app.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  if (resetTokens.has(token)) {
    // Serve the password reset HTML page
    res.send(`
      <html>
        <body>
          <h2>Reset Your Password</h2>
          <form id="resetForm">
            <div>
              <label for="newPassword">New Password:</label>
              <input type="password" id="newPassword" required>
              <span id="passwordError" style="color: red;"></span>
            </div>
            <button type="submit">Reset Password</button>
          </form>
          <script>
            document.getElementById('resetForm').onsubmit = async (e) => {
              e.preventDefault();
              const newPassword = document.getElementById('newPassword').value;
              
              if (!newPassword) {
                document.getElementById('passwordError').textContent = 'This field is required';
                return;
              }

              document.getElementById('passwordError').textContent = '';

              const response = await fetch('/reset-password/${token}', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ newPassword })
              });
              const result = await response.json();
              if (result.error) {
                document.getElementById('passwordError').textContent = result.error;
              } else {
                alert(result.message);
                window.location.href = '/login'; // Redirect to login page
              }
            };
          </script>
        </body>
      </html>
    `);
  } else {
    res.status(400).send('Invalid or expired reset token');
  }
});

// Process password reset
app.post('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (resetTokens.has(token)) {
    const { username, email } = resetTokens.get(token);
    // TODO: Update password in your user database for this username/email
    resetTokens.delete(token);
    res.json({ message: "Password successfully reset. You can now log in with your new password." });
  } else {
    res.status(400).json({ error: "Invalid or expired reset token" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});