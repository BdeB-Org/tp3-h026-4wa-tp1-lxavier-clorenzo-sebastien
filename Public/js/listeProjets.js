requireAuth();

const tbody = document.getElementById('tbodyListe');
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
                <td>${escapeHtml(Projets.Nom_Projet)}</td>
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

async function supprimerProjets(id_projets) {
    if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) return;

    try {
        const res = await apiFetch('/api/Projets/' + id_projets, { method: 'DELETE' });
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
