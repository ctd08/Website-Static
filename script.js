function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}
 
// Check localStorage first
const savedMode = localStorage.getItem("mode");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedMode === "dark") {
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


//search functionality-->
function handleSearch(event) {
  event.preventDefault(); // prevent page reload
  const input = document.getElementById("search-input").value.toLowerCase();
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

// Show or hide scroll-to-top button
window.addEventListener("scroll", function () {
  const btn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

// Scroll to top smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // ---- Click on tags in individual project pages → Go to projects.html with tag query
  document.querySelectorAll(".project-tags .tag").forEach(tag => {
    tag.addEventListener("click", function (e) {
      e.preventDefault();
      const tagName = tag.dataset.tag;
      if (tagName) {
        window.location.href = `../projects.html?tag=${encodeURIComponent(tagName)}`;
      }
    });
  });

  // ---- On projects.html → auto-filter if URL contains ?tag=...
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromUrl = urlParams.get("tag");
  if (tagFromUrl) {
    const filterBtn = document.querySelector(`.tag-filter[data-tag="${tagFromUrl.toLowerCase()}"]`);
    if (filterBtn) {
      filterBtn.click();
      const timeline = document.querySelector(".timeline");
      if (timeline) {
        timeline.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});
