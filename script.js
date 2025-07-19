function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}
 
// Check localStorage first
const savedMode = localStorage.getItem("mode");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedMode === "dark" || (!savedMode && prefersDark)) {
  document.body.classList.add("dark-mode");
}

// Toggle dark mode and save preference
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("mode", mode);
}