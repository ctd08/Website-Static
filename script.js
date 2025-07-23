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
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop(); // gets "index.html" or "projects.html"
  const navLinks = document.querySelectorAll(".sidebar nav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (
      (currentPath === "" && href === "#about") || // index.html default
      (href === currentPath) // exact match like "projects.html"
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".tag-filter");
  const timelineItems = document.querySelectorAll(".timeline-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active state
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const tag = button.getAttribute("data-tag");

      timelineItems.forEach(item => {
        const tags = item.getAttribute("data-tags").split(" ");
        if (tag === "all" || tags.includes(tag)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
