document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;

            if (!username) {
                document.getElementById('usernameError').textContent = 'This field is required';
                return;
            }

            // Clear any previous error messages
            document.getElementById('usernameError').textContent = '';

	    alert('A reset link has been sent to your email!');
	    window.location.href = 'login.html';
            // Submit the form to the server
            //this.submit();
        });