document.getElementById("root").addEventListener("click", (e) => {
  // accessibility toggle for keyboard drop down users
  // needs to be dropbtn so only toggles when clicking button
  if (e.target.closest(".dropbtn")) {
    const dropdown = e.target.closest(".dropdown");
    const dropButton = dropdown.querySelector(".dropbtn");
    const ariaExpanded = !dropdown.classList.contains("open");

    dropdown.classList.toggle("open");
    dropButton.setAttribute("aria-expanded", ariaExpanded);
  }
});

// event listener for dropdown menu WAI-ARIA
document.getElementById("root").addEventListener("mouseover", (e) => {
  const dropdown = e.target.closest(".dropdown");
  if (!dropdown) {
    return;
  }

  dropdown.classList.add("open");
  dropdown.querySelector(".dropbtn").setAttribute("aria-expanded", "true");
});

document.getElementById("root").addEventListener("mouseout", (e) => {
  const dropdown = e.target.closest(".dropdown");
  if (!dropdown) {
    return;
  }

  dropdown.classList.remove("open");
  dropdown.querySelector(".dropbtn").setAttribute("aria-expanded", "false");
});

export function navHTML() {
  return dropdownHTML({
    name: "<box-icon name='menu'></box-icon>",
    className: "hamburger-menu",
    callback: () =>
      `<div class="history-button">History</div>
    <div class="logoff-button">Log off</div>`,
  });
}

export function dropdownHTML(options = {}) {
  let name = options.name || "";
  let className = options.className || "";
  let callback = options.callback || (() => {});

  return `
  <div class="dropdown ${className}">
    <button class="dropbtn" aria-expanded="false">${name}</button>
    <div class="dropdown-content">${callback()}</div>
  </div>`;
}
