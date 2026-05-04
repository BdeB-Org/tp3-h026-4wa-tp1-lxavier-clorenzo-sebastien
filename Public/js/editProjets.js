requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerProjets() {
    try {
        const res = await apiFetch('/api/Projets/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('Nom_Projet').value = data.Nom_Projet;
        document.getElementById('description_projet').value = data.description_projet;
        document.getElementById('date_creation').value = data.date_creation;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Nom_Projet = document.getElementById('Nom_Projet').value.trim();
    const description_projet = document.getElementById('description_projet').value.trim();
    const date_creation = document.getElementById('date_creation').value.trim();

    try {
        const res = await apiFetch('/api/Projets/' + id, {
            method: 'PUT',
            body: JSON.stringify({ Nom_Projet, description_projet, date_creation })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeProjets.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID projet manquant', true);
} else {
    chargerProjets();
}
