
// Placeholder pro JS logiku – kontrola licence, přepínání režimů atd.
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const licenseKey = localStorage.getItem('licenseKey');

    if (licenseKey) {
        root.innerHTML = `
            <h1>Aplikace spuštěna ✅</h1>
            <p id="status">Licence: ${licenseKey}</p>
            <button onclick="reset()">Zadat jiný klíč</button>
        `;
    } else {
        root.innerHTML = `
            <h1>Vložte licenční klíč</h1>
            <input type="text" id="keyInput" placeholder="např. ZDENA-123" />
            <button onclick="store()">Uložit</button>
        `;
    }
});

function store() {
    const val = document.getElementById('keyInput').value;
    if (val) {
        localStorage.setItem('licenseKey', val);
        location.reload();
    }
}

function reset() {
    localStorage.removeItem('licenseKey');
    location.reload();
}
