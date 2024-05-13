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

  function togglePrimaryMenu(event) {
    event.stopPropagation();

    const isClosing = primaryNav.classList.contains("is-open");

    // Toggle visibility
    primaryNavBackdrop.classList.toggle("is-open");
    primaryNav.classList.toggle("is-open");
    primaryNavToggleSvgTop.classList.toggle("is-open");

    // Set ARIA attributes
    primaryNav.setAttribute("aria-expanded", !isClosing);
    primaryNavToggle.setAttribute("aria-expanded", !isClosing);

    // Close with ECS key
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
    if (isClosing) {
      document.removeEventListener("click", closeOnClickOutside);
      primaryNavToggle.focus();
    } else {
      document.addEventListener("keydown", toggleOnEsc, { once: true });
      document.addEventListener("click", closeOnClickOutside);
      const firstLink = primaryNav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  primaryNavToggle.addEventListener("click", togglePrimaryMenu);
})();
