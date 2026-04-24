// Verifică dacă e deja logat
const session = localStorage.getItem('salvamont_session');
if (session) {
    window.location.href = 'dashboard.html';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('error-msg');

    btn.textContent = '⏳ Se verifică...';
    btn.disabled = true;
    errorMsg.style.display = 'none';

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Salvează sesiunea
        localStorage.setItem('salvamont_session', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            token: data.session.access_token
        }));

        window.location.href = 'dashboard.html';

    } catch (err) {
        errorMsg.textContent = '❌ Email sau parolă incorectă!';
        errorMsg.style.display = 'block';
        btn.textContent = '🔐 Autentificare';
        btn.disabled = false;
    }
});