/** @file script.js
 * JavaScript for interactive features of the personal portfolio website.
 * Includes:
 * - Sidebar and dark mode toggling.
 * - Active navigation link highlighting.
 * - CV dropdown menu functionality.
 * - Project filtering on the projects page.
 * - Scroll-to-top button behavior.
 * 
 * @author Cristina Tutunariu
 * @version 1.0
 * 
 * @see {@link https://cristina-diana-tutunariu.netlify.app/}
 */
 

// ===================================================================
//  GLOBAL FUNCTIONS
//  These functions must be in the global scope to be called by HTML onclick/onsubmit attributes.
// ===================================================================

/**
 * @description Toggles the 'collapsed' class on the sidebar element to show/hide it.
 * @returns {void}
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
  }
}

/**
 * @description Toggles dark mode on the website and saves the preference in localStorage.
 * @returns {void}
 */
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("mode", mode);
}

/**
 * @description Prevents the search form from reloading the page, gets the search term, and filters timeline items based on a text match.
 *
 * @param {Event} event - The form submission event.
 * @returns {boolean} Returns false to ensure the form submission is cancelled.
 */
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
  // Compares current URL path with sidebar links and adds 'active' class to the matching link.
  const currentPath = window.location.pathname.split("/").pop() || "index.html"; // Default to index.html if root
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
  // Adds click event listeners to filter buttons to show/hide timeline items based on selected tag.
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

  // If a 'tag' parameter is present in the URL, simulate a click on the corresponding filter button.
  // Example: projects.html?tag=javascript

  // This will automatically filter projects to show only those tagged with 'javascript'.
  // Note: Ensure the tag values in the URL match the data-tag attributes on the buttons (case-insensitive).

  // This feature enhances user experience by allowing direct linking to specific filtered views.
  // Example usage: <a href="projects.html?tag=javascript">View JavaScript Projects</a>
  // This link will open the projects page with only JavaScript projects displayed.
  
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromUrl = urlParams.get("tag");
  if (tagFromUrl) {
    const filterBtn = document.querySelector(`.tag-filter[data-tag="${tagFromUrl.toLowerCase()}"]`);
    if (filterBtn) {
      filterBtn.click();
    }
  }

  // --- CV Dropdown Menu Logic ---
  // Toggles the CV dropdown menu and arrow icon when the button is clicked.
  // Assumes the button has class 'dropdown-toggle' and the menu is the next sibling element.
  // The 'open' class is used to control visibility and arrow rotation via CSS.

  const dropdownToggle = document.querySelector(".dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", () => {
      // Find the menu that is the "next sibling" of the button
      const dropdownMenu = dropdownToggle.nextElementSibling;
      
      // Toggle the 'open' class on both the button (for arrow) and menu (for slide)
      dropdownToggle.classList.toggle("open");
      dropdownMenu.classList.toggle("open");
    });
  }
  
  // --- Scroll-to-Top Button Functionality ---
  // Shows the button when scrolled down 300px and scrolls to top when clicked.
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    // Show or hide the button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex"; // 'flex' to match the CSS
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