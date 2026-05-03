requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyProjets');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerProjets() {
    try {
        const res = await apiFetch('/api/Projets');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Projets => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Projets.id_projets}</td>
                <td>${escapeHtml(Projets.Nom_projet)}</td>
                <td>${escapeHtml(Projets.description_projet)}</td>
                <td>${escapeHtml(Projets.date_creation)}</td>
                <td>
                    <a class="btn-link" href="/editProjets.html?id=${Projets.id_projets}">Modifier</a>
                    <button class="danger" onclick="supprimerProjets(${Projets.id_projets})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Nom_projet = document.getElementById('Nom_Projet').value.trim();
    const description_projet = document.getElementById('description_projet').value.trim();
    const date_creation = document.getElementById('date_creation').value.trim();

    try {
        const res = await apiFetch('/api/Projets', {
            method: 'POST',
            body: JSON.stringify({ Nom_projet, description_projet, date_creation })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Projet ajouté avec succès');
        chargerProjets();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerProjets(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) return;

    try {
        const res = await apiFetch('/api/Projets/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerProjets();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerProjets();
