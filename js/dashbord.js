// Verifică sesiunea
const sessionData = localStorage.getItem('salvamont_user');

if (!sessionData) {
    window.location.href = 'index.html';
} else {
    const user = JSON.parse(sessionData);
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-username').textContent = user.username;
}

// Logout
function logout() {
    localStorage.removeItem('salvamont_user');
    window.location.href = 'index.html';
}