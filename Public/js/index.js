requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyEtudiants');
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

async function chargerEtudiants() {
    try {
        const res = await apiFetch('/api/Etudiants');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(etudiant => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${etudiant.id}</td>
                <td>${escapeHtml(etudiant.Nom)}</td>
                <td>${escapeHtml(etudiant.Prenom)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${etudiant.id}">Modifier</a>
                    <button class="danger" onclick="supprimerEtudiant(${etudiant.id})">Supprimer</button>
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

    const Nom = document.getElementById('Nom)').value.trim();
    const Prenom = document.getElementById('Prenom').value.trim();

    try {
        const res = await apiFetch('/api/Etudiants', {
            method: 'POST',
            body: JSON.stringify({ Nom, Prenom })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Étudiant ajouté avec succès');
        chargerEtudiants();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerEtudiant(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return;

    try {
        const res = await apiFetch('/api/Etudiants/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerEtudiants();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerEtudiants();
