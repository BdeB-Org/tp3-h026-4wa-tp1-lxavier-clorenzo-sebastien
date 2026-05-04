requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerTechnologie() {
    try {
        const res = await apiFetch('/api/Technologies/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('nom_technologies').value = data.Nom;
        document.getElementById('description_technologies').value = data.Description;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Nom = document.getElementById('nom_technologies').value.trim();
    const Description = document.getElementById('description_technologies').value.trim();
    const Id_Projet = document.getElementById('id_projets').value.trim();

    try {
        const res = await apiFetch('/api/Technologies/' + id, {
            method: 'PUT',
            body: JSON.stringify({ Nom, Description, Id_Projet })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeTechnologies.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID technologie manquant', true);
} else {
    chargerTechnologie();
}
