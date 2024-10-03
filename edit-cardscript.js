/* Get the form element by ID */
const editCardForm = document.getElementById('editCardForm');

/* Listen to editCardform submission event */
editCardForm.addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission
    let isValid = validateForm();  // Validate the form

    if (isValid) {
        // Simulate the SQL form submission and redirection to the dashboard
        alert('Card added successfully!');
        window.location.href = 'dashboard.html';  // Redirect to dashboard
    }
});



/* Form validation function */
function validateForm() {
    let isValid = true;

    // Get input field values
    const cardName = document.getElementById('cardName');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const securityCode = document.getElementById('securityCode');

    // Clear all previous error messages
    clearErrors();

    // Validate Name on Card (First and Last Name required)
    const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/; 
    if (!cardName.value) {
        showError(cardName, 'This is a necessary field');
        isValid = false;
    } else if (!namePattern.test(cardName.value)) {
        showError(cardName, 'Must have a First and Last name');
        isValid = false;
    }

    // Validate Card Number (Must be 4 sets of 4 digits)
    const cardNumberPattern = /^(\d{4} \d{4} \d{4} \d{4})$/;  
    if (!cardNumber.value) {
        showError(cardNumber, 'This is a necessary field');
        isValid = false;
    } else if (!cardNumberPattern.test(cardNumber.value)) {
        showError(cardNumber, 'Must have all Card Number Digits');
        isValid = false;
    }

    // Validate Expiration Date (Format MM/YY)
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;  
    if (!expiryDate.value) {
        showError(expiryDate, 'This is a necessary field');
        isValid = false;
    } else if (!expiryPattern.test(expiryDate.value)) {
        showError(expiryDate, 'Invalid date');
        isValid = false;
    }

    // Validate Security Code (Must be 3 digits)
    const securityCodePattern = /^\d{3}$/;  
    if (!securityCode.value) {
        showError(securityCode, 'This is a necessary field');
        isValid = false;
    } else if (!securityCodePattern.test(securityCode.value)) {
        showError(securityCode, 'Invalid CCV Number');
        isValid = false;
    }

    return isValid;
}

/* Function to show error messages */
function showError(inputElement, errorMessage) {
    const errorElement = document.getElementById(inputElement.id + 'Error');  
    errorElement.textContent = errorMessage;  
    inputElement.classList.add('error-input');  
}

/* Function to clear all previous error messages */
function clearErrors() {
    document.querySelectorAll('.error').forEach(function (error) {
        error.textContent = '';
    });
    document.querySelectorAll('input').forEach(function (input) {
        input.classList.remove('error-input');
    });
}

/* Function to simulate cancellation and redirection to the dashboard
function cancelOperation() {
    window.location.href = 'dashboard.html';
}*/