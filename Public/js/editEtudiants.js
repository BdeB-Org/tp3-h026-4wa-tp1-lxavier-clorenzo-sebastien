requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerEtudiant() {
    try {
        const res = await apiFetch('/api/Etudiants/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('Nom').value = data.Nom;
        document.getElementById('Prenom').value = data.Prenom;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Nom = document.getElementById('Nom').value.trim();
    const Prenom = document.getElementById('Prenom').value.trim();

    try {
        const res = await apiFetch('/api/Etudiants/' + id, {
            method: 'PUT',
            body: JSON.stringify({ Nom, Prenom })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeEtudiants.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID étudiant manquant', true);
} else {
    chargerEtudiant();
}
