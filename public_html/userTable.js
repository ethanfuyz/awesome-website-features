// Function to load user data into the table
function loadUserData() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('userDataTable');
            tableBody.innerHTML = ''; // Clear existing rows
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error loading user data:', error);
            alert('Failed to load user data');
        });
}

// Function to clear all user data
function clearAllData() {
    fetch('/users', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            loadUserData(); // Reload the table
        }
    })
    .catch(error => {
        console.error('Error clearing user data:', error);
        alert('Failed to clear user data');
    });
}

// Load user data when the page loads
document.addEventListener('DOMContentLoaded', loadUserData); 