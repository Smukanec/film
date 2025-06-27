
const app = document.getElementById("app");

const licenceList = {
  "ABC123": { team: "Zdena", role: "uploader" },
  "XYZ456": { team: "Zdena", role: "viewer" },
  "GOLD77": { team: "Metrio Golden Majet", role: "admin" }
};

const input = document.createElement("input");
input.placeholder = "Zadej licenční klíč";
const btn = document.createElement("button");
btn.textContent = "Potvrdit";
const teamInput = document.createElement("input");
teamInput.placeholder = "Název týmu";
const createBtn = document.createElement("button");
createBtn.textContent = "Vytvořit tým";

btn.onclick = () => {
  const key = input.value.trim();
  const licence = licenceList[key];
  if (!licence) {
    app.innerHTML = "<p style='color:red;'>Neplatný klíč</p>";
    return;
  }
  localStorage.setItem("team", licence.team);
  localStorage.setItem("role", licence.role);
  app.innerHTML = `<h2>✅ Přihlášeno jako ${licence.role} týmu ${licence.team}</h2>`;
};

createBtn.onclick = () => {
  const name = teamInput.value.trim();
  const key = input.value.trim();
  if (!name || !key) return alert("Vyplň klíč i název týmu");
  const fd = new FormData();
  fd.append("action", "create");
  fd.append("team", name);
  fd.append("leader", key);
  fetch("team.php", { method: "POST", body: fd })
    .then(r => r.text())
    .then(t => alert(t));
};

app.appendChild(input);
app.appendChild(teamInput);
app.appendChild(btn);
app.appendChild(createBtn);
