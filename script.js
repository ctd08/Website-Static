// ===================================================================
//  GLOBAL FUNCTIONS
//  These functions must be in the global scope to be called by HTML onclick attributes.
// ===================================================================

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("mode", mode);
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form input");
  if (!searchInput) return false;

  const input = searchInput.value.toLowerCase();
  const items = document.querySelectorAll(".timeline-item");

  items.forEach(item => {
    const tags = (item.getAttribute("data-tags") || "").toLowerCase();
    const text = item.innerText.toLowerCase();

    if (tags.includes(input) || text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  return false;
}


// ===================================================================
//  DOM CONTENT LOADED
//  Code that runs only after the entire HTML document has been loaded.
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {

  // --- Initialize Dark Mode ---
  // Checks localStorage for saved user preference.
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // --- Highlight Active Navigation Link ---
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".sidebar nav a");
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // --- Tag Filtering Logic (for projects.html) ---
  const filterButtons = document.querySelectorAll(".tag-filter");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      const tag = button.getAttribute("data-tag");
      const timelineItems = document.querySelectorAll(".timeline-item");

      timelineItems.forEach(item => {
        const tags = (item.getAttribute("data-tags") || "").split(" ");
        if (tag === "all" || tags.includes(tag)) {
          item.style.display = "block"; // Or 'flex' if they are flex items
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // --- Auto-filter from URL Query Parameter ---
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromUrl = urlParams.get("tag");
  if (tagFromUrl) {
    const filterBtn = document.querySelector(`.tag-filter[data-tag="${tagFromUrl.toLowerCase()}"]`);
    if (filterBtn) {
      filterBtn.click();
    }
  }
  
  // --- Scroll-to-Top Button Functionality ---
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    // Show or hide the button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex"; // Use 'flex' to match your CSS
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

    // Scroll to the top when the button is clicked
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});  