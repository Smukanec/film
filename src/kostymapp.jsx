
// Kostýmérská aplikace — přidáno ukládání obrazu pro offline režim
import { useState, useEffect } from "react";

export default function KostymApp() {
  const [mode, setMode] = useState("view");
  const [structure, setStructure] = useState({});
  const [cloudUrl, setCloudUrl] = useState(() => localStorage.getItem("cloudUrl") || "");
  const [cloudInput, setCloudInput] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectParts, setNewProjectParts] = useState("");
  const [newProjectDays, setNewProjectDays] = useState("");
  const [newProjectScenes, setNewProjectScenes] = useState("");
  const [project, setProject] = useState("");
  const [part, setPart] = useState("");
  const [day, setDay] = useState("");
  const [scene, setScene] = useState("");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [expanded, setExpanded] = useState({});
  const [offlineScenes, setOfflineScenes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("offlineScenes")) || [];
    } catch {
      return [];
    }
  });

  const toggle = (level, keys) => {
    const key = keys.join(".");
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isExpanded = (level, keys) => {
    const key = keys.join(".");
    return expanded[key];
  };

  const toggleOfflineScene = (project, part, day, scene, photos) => {
    const key = `${project}.${part}.${day}.${scene}`;
    const already = offlineScenes.includes(key);

    if (!already) {
      photos.forEach((photo, index) => {
        fetch(photo.src)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result;
              localStorage.setItem(`offline_${key}_${index}`, base64);
            };
            reader.readAsDataURL(blob);
          });
      });
      const updated = [...offlineScenes, key];
      setOfflineScenes(updated);
      localStorage.setItem("offlineScenes", JSON.stringify(updated));
      setStatusMessage("📥 Obraz uložen pro offline režim.");
    } else {
      photos.forEach((_, index) => localStorage.removeItem(`offline_${key}_${index}`));
      const updated = offlineScenes.filter((k) => k !== key);
      setOfflineScenes(updated);
      localStorage.setItem("offlineScenes", JSON.stringify(updated));
      setStatusMessage("❌ Obraz odstraněn z offline režimu.");
    }
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const isSceneOffline = (project, part, day, scene) => {
    return offlineScenes.includes(`${project}.${part}.${day}.${scene}`);
  };

  // zbytek aplikace zůstává beze změn (funkce, render, atd.)
}
