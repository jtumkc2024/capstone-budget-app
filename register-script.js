document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmpassword').value;

            // Clear previous error messages
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Validate username
            if (!username) {
                document.getElementById('usernameError').textContent = 'Username is required';
                return;
            }

            // Validate email
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                return;
            }

            // Validate password
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                return;
            }

            // Check password criteria
            if (password.length < 8) {
                document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
                return;
            }
            if (!/\d/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must contain a number';
                return;
            }
            if (!/[!@#$%^&*]/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must contain a special character';
                return;
            }
            if (!/[A-Z]/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must contain an uppercase letter';
                return;
            }

            // Validate confirm password
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                return;
            }

            // Hash password before sending to server
            /**bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return;
                }
                document.getElementById('password').value = hashedPassword;
                document.getElementById('confirmpassword').value = hashedPassword;
                this.submit();
            });*/
        });