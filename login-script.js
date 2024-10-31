        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();

	    let isValid = validateFunction();

	    if(isValid) {
		alert('Login successful!');
		window.location.href = 'dashboard.html';
	    }
});

function validateFunction() {
	    let isValid = true;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Clear previous error messages
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Validate username
            if (!username) {
                document.getElementById('usernameError').textContent = 'Username is required';
                isValid = false;
            }

            // Validate password
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                isValid = false;
            }

	    return isValid;

            // If validation passes, submit the form
            // this.submit();
	    //import {loginUser} from 'SQLStatements.js';
	    //loginUser(this.username, this.password);
        };