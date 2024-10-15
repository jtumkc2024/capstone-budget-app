        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Clear previous error messages
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Validate username
            if (!username) {
                document.getElementById('usernameError').textContent = 'Username is required';
                return;
            }

            // Validate password
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                return;
            }

            // If validation passes, submit the form
            this.submit();
        });