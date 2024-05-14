// Toggle primary menu
(() => {
  const primaryNav = document.getElementById("primary-nav");
  const primaryNavBackdrop = document.getElementById("primary-nav-backdrop");
  const primaryNavToggle = document.getElementById("primary-nav-toggle");
  const primaryNavToggleSvgTop = document.getElementById(
    "primary-nav-toggle-svg-top"
  );

  if (
    !(
      primaryNav &&
      primaryNavBackdrop &&
      primaryNavToggle &&
      primaryNavToggleSvgTop
    )
  ) {
    throw new Error("Primary nav elements are missing from the DOM");
  }

  let isToggling = false;

  function togglePrimaryMenu(event) {
    if (isToggling) return;
    isToggling = true;
    setTimeout(() => {
      isToggling = false;
    }, 300); // Adjust timeout as needed

    event.stopPropagation();

    const isClosing = primaryNav.classList.contains("is-open");

    // Toggle visibility
    primaryNavBackdrop.classList.toggle("is-open");
    primaryNav.classList.toggle("is-open");
    primaryNavToggleSvgTop.classList.toggle("is-open");

    // Set ARIA attributes
    primaryNav.setAttribute("aria-expanded", !isClosing);
    primaryNavToggle.setAttribute("aria-expanded", !isClosing);

    // Add or remove event listeners based on the state of the menu
    if (isClosing) {
      document.removeEventListener("keydown", toggleOnEsc);
      document.removeEventListener("click", closeOnClickOutside);
      primaryNavToggle.focus();
    } else {
      document.addEventListener("keydown", toggleOnEsc);
      document.addEventListener("click", closeOnClickOutside);
      const firstLink = primaryNav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  function toggleOnEsc(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      togglePrimaryMenu(event);
    }
  }

  function closeOnClickOutside(event) {
    if (event.target === primaryNavBackdrop) {
      togglePrimaryMenu(event);
    }
  }

  primaryNavToggle.addEventListener("click", togglePrimaryMenu);
})();
