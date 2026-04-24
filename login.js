// Verifică dacă userul e deja logat
const session = localStorage.getItem('salvamont_user');
if (session) {
    window.location.href = 'dashboard.html';
}

// Login form handler
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('error-msg');

    // Loading state
    btn.textContent = '⏳ Se verifică...';
    btn.disabled = true;
    errorMsg.style.display = 'none';

    try {
        // Caută userul în Supabase
        const { data, error } = await supabaseClient
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !data) {
            throw new Error('Username sau parolă incorectă!');
        }

        // ✅ Fix compatibilitate $2y$ (PHP) → $2b$ (bcryptjs)
        let hashFromDB = data.password;
        if (hashFromDB.startsWith('$2y$')) {
            hashFromDB = hashFromDB.replace('$2y$', '$2b$');
        }

        // ✅ CORECT - bcrypt nu dcrypt!
        const isValid = await bcrypt.compare(password, hashFromDB);

        if (!isValid) {
            throw new Error('Username sau parolă incorectă!');
        }

        // Salvează sesiunea în localStorage
        localStorage.setItem('salvamont_user', JSON.stringify({
            id: data.id,
            name: data.name,
            username: data.username
        }));

        // Redirect la dashboard
        window.location.href = 'dashboard.html';

    } catch (err) {
        errorMsg.textContent = '❌ ' + err.message;
        errorMsg.style.display = 'block';
        btn.textContent = '🔐 Autentificare';
        btn.disabled = false;
    }
});