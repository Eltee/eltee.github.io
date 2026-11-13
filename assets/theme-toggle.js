(function () {
  "use strict";

  var storageKey = "eltee-online-color-theme";
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  var text = document.getElementById("theme-toggle-text");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  if (!button || !text) return;

  function activeTheme() {
    return root.dataset.theme || (media.matches ? "dark" : "light");
  }

  function updateButton() {
    var current = activeTheme();
    var next = current === "dark" ? "light" : "dark";
    text.textContent = next === "dark" ? "Dark" : "Light";
    button.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  button.addEventListener("click", function () {
    var next = activeTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch (_) { }
    updateButton();
  });

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", function () {
      if (!root.dataset.theme) updateButton();
    });
  }

  updateButton();
})();