export function attachHamburgerMenu(navElement) {
  const hamburgerMenu = navElement.querySelector(".hamburger-menu");
  const navLinks = navElement.querySelector(".nav-links");

  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}
