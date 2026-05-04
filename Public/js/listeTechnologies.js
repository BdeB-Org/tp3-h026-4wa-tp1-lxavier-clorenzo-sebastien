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

async function supprimerTechnologie(id_technologies) {
    if (!confirm('Voulez-vous vraiment supprimer cet technologie ?')) return;

    try {
        const res = await apiFetch('/api/Technologies/' + id_technologies, { method: 'DELETE' });
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
