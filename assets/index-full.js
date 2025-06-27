
let mode = "upload";
let structure = JSON.parse(localStorage.getItem("structure") || "{}");
let expanded = {};

let offline;
try {
  const raw = localStorage.getItem("offline");
  offline = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
} catch { offline = []; }

function toggle(keys) {
  const key = keys.join(".");
  expanded[key] = !expanded[key];
  render();
}

function toggleOffline(key) {
  const idx = offline.indexOf(key);
  if (idx >= 0) offline.splice(idx, 1);
  else offline.push(key);
  localStorage.setItem("offline", JSON.stringify(offline));
  render();
}

function render() {
  const r = document.getElementById("root");
  r.innerHTML = "";

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = mode === "upload" ? "Přepnout na prohlížení" : "Přepnout na nahrávání";
  toggleBtn.onclick = () => { mode = mode === "upload" ? "view" : "upload"; render(); };
  r.appendChild(toggleBtn);

  if (mode === "upload") {
    const f = document.createElement("form");
    f.innerHTML = `
      <h2>Nahrávání</h2>
      <input placeholder='Projekt' id='p'><br>
      <input placeholder='Den' id='d'><br>
      <input placeholder='Obraz' id='o'><br>
      <input type='file' id='f'><br>
      <button>Nahrát</button>
    `;
    f.onsubmit = e => {
      e.preventDefault();
      const p = f.querySelector("#p").value.trim();
      const d = f.querySelector("#d").value.trim();
      const o = f.querySelector("#o").value.trim();
      const file = f.querySelector("#f").files[0];
      if (!p || !d || !o || !file) return alert("Vyplň vše");

      if (!structure[p]) structure[p] = {};
      if (!structure[p][d]) structure[p][d] = {};
      if (!structure[p][d][o]) structure[p][d][o] = [];

      const ts = Date.now();
      const ext = file.name.split(".").pop();
      const newName = `${p}_${d}_${o}_${ts}.${ext}`;
      structure[p][d][o].push(newName);
      localStorage.setItem("structure", JSON.stringify(structure));

      const fd = new FormData();
      fd.append("file", file, newName);
      fetch("upload.php", { method: "POST", body: fd })
        .then(res => res.text()).then(t => alert("Server: " + t));
    };
    r.appendChild(f);
  } else {
    r.innerHTML += "<h2>Prohlížení</h2>";
    Object.entries(structure).forEach(([proj, days]) => {
      const pd = document.createElement("div");
      const pkey = [proj];
      const open = expanded[pkey.join(".")];
      pd.innerHTML = `<b style="cursor:pointer" onclick="toggle(['${proj}'])">
        ${open ? "▼" : "▶"} ${proj}</b>`;
      if (open) {
        Object.entries(days).forEach(([day, scenes]) => {
          const dd = document.createElement("div");
          dd.style.marginLeft = "20px";
          const dkey = [proj, day];
          const dopen = expanded[dkey.join(".")];
          dd.innerHTML = `<span style="cursor:pointer" onclick="toggle(['${proj}','${day}'])">
            ${dopen ? "▼" : "▶"} Den ${day}</span>`;
          if (dopen) {
            Object.entries(scenes).forEach(([scene, files]) => {
              const sd = document.createElement("div");
              sd.style.marginLeft = "40px";
              const skey = [proj, day, scene];
              const skeyStr = skey.join(".");
              const sopen = expanded[skeyStr];
              const mark = offline.includes(skeyStr) ? "🟢" : "⚪";
              sd.innerHTML = `<span style="cursor:pointer" onclick="toggle(['${proj}','${day}','${scene}'])">
                ${sopen ? "▼" : "▶"} Obraz ${scene} (${files.length}) ${mark}</span>
                <button onclick="toggleOffline('${skeyStr}')">offline</button>`;
              if (sopen) {
                files.forEach(fname => {
                  const f = document.createElement("div");
                  f.style.marginLeft = "60px";
                  const url = `./fotky/${fname}`;
                  f.innerHTML = `<img src="${url}" style="max-width:200px;"><br>${fname}`;
                  sd.appendChild(f);
                });
              }
              dd.appendChild(sd);
            });
          }
          pd.appendChild(dd);
        });
      }
      r.appendChild(pd);
    });
  }
}
window.toggle = toggle;
window.toggleOffline = toggleOffline;
document.addEventListener("DOMContentLoaded", render);
