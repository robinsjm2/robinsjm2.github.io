// Light/dark toggle in the site header. Saves an explicit choice; otherwise follows the system setting.
(function () {
  var root = document.documentElement;

  function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }

  function apply(theme, save) {
    root.setAttribute("data-theme", theme);
    if (save) { try { localStorage.setItem("theme", theme); } catch (e) {} }
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      var next = theme === "dark" ? "light" : "dark";
      btn.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
      btn.setAttribute("aria-label", "Switch to " + next + " mode");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.addEventListener("click", function () { apply(current() === "dark" ? "light" : "dark", true); });
    var nav = document.querySelector(".site-nav .trigger") || document.querySelector(".site-header .wrapper");
    if (nav) nav.appendChild(btn);
    apply(current(), false);

    // Follow system changes until the visitor makes an explicit choice.
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        var saved;
        try { saved = localStorage.getItem("theme"); } catch (err) {}
        if (!saved) apply(e.matches ? "dark" : "light", false);
      });
    }
  });
})();
