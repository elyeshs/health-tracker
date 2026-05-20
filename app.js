let data = JSON.parse(localStorage.getItem('healthData')) || [];
const dynamicFields = document.getElementById('dynamic-fields');
const typeSelect = document.getElementById('type-saisie');

typeSelect.onchange = updateForm;

function updateForm() {
    const t = typeSelect.value;
    if (t === 'cardio') {
        dynamicFields.innerHTML = `
            <input type="number" id="vitesse" step="0.1" placeholder="Vitesse (km/h)">
            <input type="number" id="temps" step="0.1" placeholder="Temps (min)">
            <input type="number" id="pente" step="0.1" placeholder="Pente (%)">
            <input type="number" id="distance" step="0.1" placeholder="Distance (km)">`;
    } else if (t === 'poids') {
        dynamicFields.innerHTML = `<input type="number" id="valeur" step="0.1" placeholder="Poids (kg)">`;
    } else {
        dynamicFields.innerHTML = `<input type="text" id="nom" placeholder="Nom record"><input type="number" id="valeur" step="0.1" placeholder="Valeur">`;
    }
}

function saveData() {
    const entry = {
        type: typeSelect.value,
        date: document.getElementById('date-saisie').value || new Date().toISOString().split('T')[0],
        details: {}
    };
    dynamicFields.querySelectorAll('input').forEach(i => entry.details[i.placeholder] = i.value);
    data.push(entry);
    localStorage.setItem('healthData', JSON.stringify(data));
    render();
}

function render() {
    const table = document.getElementById('historique-table');
    table.innerHTML = data.sort((a,b) => new Date(b.date) - new Date(a.date)).map(d => `
        <tr>
            <td>${d.date}</td>
            <td style="text-transform: capitalize; font-weight: 600;">${d.type}</td>
            <td style="color: #64748b;">${Object.entries(d.details).map(([k,v]) => `<strong>${v}</strong> ${k}`).join(' | ')}</td>
        </tr>
    `).join('');
}

updateForm();
render();
