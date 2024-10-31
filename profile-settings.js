document.getElementById('passwordChange').addEventListener('submit', function(event) {
	event.preventDefault();
	let isValid = validate();

	if(confirm("Are you sure you want to change your password?"))
	{
		if(isValid)
		{
			alert('Password changed!');
		}
	}
});

function validate() {
	let isValid = true;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmPassword').value;
	document.querySelectorAll('.error').forEach(el => el.textContent = '');

	if(!password)
	{
		document.getElementById('passwordError').textContent = 'New password is required.';
		isValid = false;
	}
	else if(!confirmPassword)
	{
		document.getElementById('confirmPasswordError').textContent = 'Confirm password is required.';
		isValid = false;
	}
	else if(password != confirmPassword)
	{
		document.getElementById('confirmPasswordError').textContent = 'Passwords do not match!';
		isValid = false;
	}
	else {
	if(password.length < 8)
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
	}
	return isValid;
}