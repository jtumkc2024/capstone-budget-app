document.getElementById('registerForm').addEventListener('submit', function(e) {

            e.preventDefault();

	    let isValid = validateForm();

	    if(isValid) {
		alert('Registration successful!');
		window.location.href = 'login.html';
	    }
});

function validateForm() {
	    let isValid = true;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmpassword').value;

            // Clear previous error messages
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Validate username
            if (!username) {
                document.getElementById('usernameError').textContent = 'Username is required';
                isValid = false;
            }

            // Validate email
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            }

            // Validate password
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                isValid = false;
            }

            // Check password criteria
            if (password.length < 8) {
                document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
                isValid = false;
            }
            if (!/\d/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must contain a number';
                isValid = false;
            }
            if (!/[!@#$%^&*]/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must contain a special character';
                isValid = false;
            }
            if (!/[A-Z]/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must contain an uppercase letter';
                isValid = false;
            }

            // Validate confirm password
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                isValid = false;
            }

		return isValid;

            // Hash password before sending to server
            //bcrypt.hash(password, 10, (err, hashedPassword) => {
            //    if (err) {
            //        console.error('Error hashing password:', err);
            //        return;
            //    }
            //    password.value = hashedPassword;
            //    confirmPassword.value = hashedPassword;


                //import {registerUser} from 'SQLStatements.js';
		//registerUser(this.username, this.password, this.email);
            //});
 };