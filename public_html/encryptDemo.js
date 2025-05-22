function encryptDemo() {
    const bcryptTest = document.getElementById('bcryptTest').value;
    const costFactor = document.getElementById('costFactor').value;
    const bcryptResult = document.getElementById('bcryptResult');

    if (!bcryptTest) {
        return;
    }

    fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: bcryptTest,
            costFactor: costFactor
        })
    })

        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                bcryptResult.value = data.result;
            }
        })
        .catch(error => {
            alert('An error occurred during encryption. Please try again.');
        });
} 