requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyTechnologies');
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

async function chargerTechnologies() {
    try {
        const res = await apiFetch('/api/Technologies');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Technologie => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Technologie.id_technologies}</td>
                <td>${escapeHtml(Technologie.nom_technologies)}</td>
                <td>${escapeHtml(Technologie.description_technologies)}</td>
                <td>${escapeHtml(Technologie.id_projets)}</td>
                <td>
                    <a class="btn-link" href="/editTechnologies.html?id=${Technologie.id_technologies}">Modifier</a>
                    <button class="danger" onclick="supprimerTechnologie(${Technologie.id_technologies})">Supprimer</button>
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

    const nom_technologies = document.getElementById('nom_technologies').value.trim();
    const description_technologies = document.getElementById('description_technologies').value.trim();
    const id_projets = document.getElementById('id_projets').value.trim();

    try {
        const res = await apiFetch('/api/Technologies', {
            method: 'POST',
            body: JSON.stringify({ nom_technologies, description_technologies, id_projets })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Technologie ajouté avec succès');
        chargerTechnologies();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerTechnologie(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet technologie ?')) return;

    try {
        const res = await apiFetch('/api/Technologies/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerTechnologies();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerTechnologies();
