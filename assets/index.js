
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

app.appendChild(input);
app.appendChild(btn);
