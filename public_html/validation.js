function validatePassword() {
    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    
    // Get requirement elements
    const lengthReq = document.getElementById('length');
    const uppercaseReq = document.getElementById('uppercase');
    const lowercaseReq = document.getElementById('lowercase');
    const numberReq = document.getElementById('number');
    const specialReq = document.getElementById('special');
    
    // Check each requirement
    const hasLength = password.value.length >= 8;
    const hasUppercase = /[A-Z]/.test(password.value);
    const hasLowercase = /[a-z]/.test(password.value);
    const hasNumber = /[0-9]/.test(password.value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password.value);
    
    // Update requirement status
    // Change the class name and text content based on whether the validation result is true or false.
    lengthReq.className = `requirement ${hasLength ? 'valid' : 'invalid'}`;
    lengthReq.textContent = hasLength ? '✓ At least 8 characters' : 'At least 8 characters';
    
    uppercaseReq.className = `requirement ${hasUppercase ? 'valid' : 'invalid'}`;
    uppercaseReq.textContent = hasUppercase ? '✓ Contains uppercase letter' : 'Contains uppercase letter';
    
    lowercaseReq.className = `requirement ${hasLowercase ? 'valid' : 'invalid'}`;
    lowercaseReq.textContent = hasLowercase ? '✓ Contains lowercase letter' : 'Contains lowercase letter';
    
    numberReq.className = `requirement ${hasNumber ? 'valid' : 'invalid'}`;
    numberReq.textContent = hasNumber ? '✓ Contains number' : 'Contains number';
    
    specialReq.className = `requirement ${hasSpecial ? 'valid' : 'invalid'}`;
    specialReq.textContent = hasSpecial ? '✓ Contains special character' : 'Contains special character';
    
    // Check if all requirements are met
    const isValid = hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
    
    if (!isValid) {
        password.classList.add('is-invalid');
        passwordError.style.display = 'block';
        return false;
    } else {
        password.classList.remove('is-invalid');
        passwordError.style.display = 'none';
        return true;
    }
}

function validateConfirmPassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        confirmPasswordError.style.display = 'block';
        confirmPasswordError.textContent = 'Passwords do not match!';
        return false;
    } else {
        confirmPassword.classList.remove('is-invalid');
        confirmPasswordError.style.display = 'none';
        return true;
    }
}

function validateUsername(input) {
    const usernameError = document.getElementById('usernameError');
    const isValid = /^[a-z0-9]+$/.test(input.value);
    
    if (!isValid) {
        input.classList.add('is-invalid');
        usernameError.style.display = 'block';
        return false;
    } else {
        input.classList.remove('is-invalid');
        usernameError.style.display = 'none';
        return true;
    }
}

function validateForm(event) {
    event.preventDefault();
    
    const isUsernameValid = validateUsername(document.getElementById('username'));
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
        const form = document.getElementById('registrationForm');
        const formData = new FormData(form);
        
        fetch('/submitregister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert(data.message);
                form.reset();
                // Reset all validation indicators
                document.querySelectorAll('.requirement').forEach(req => {
                    req.className = 'requirement invalid';
                    req.textContent = req.textContent.replace('✓ ', '');
                });
            }
        })
        .catch(error => {
            alert('An error occurred during registration. Please try again.');
        });
    }
    
    return false;
} 