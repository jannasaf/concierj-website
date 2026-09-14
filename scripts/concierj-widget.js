/* ============================================================
   ConcierjWidget
   ------------------------------------------------------------
   Reusable launcher + panel shell for the Concierj chat product.
   This file renders a PLACEHOLDER conversation only. When the
   real product is ready, replace renderPlaceholder() (or the
   static markup inside [data-concierj-body]) with the actual
   chat embed — the launcher, panel, open/close behavior, and
   responsive layout all stay as-is.

   Public API (for later wiring):
     window.ConcierjWidget.open()
     window.ConcierjWidget.close()
     window.ConcierjWidget.toggle()
   ============================================================ */

(function () {
  function init() {
    var root = document.querySelector("[data-concierj-widget]");
    if (!root) return;

    var launcher = root.querySelector("[data-concierj-launcher]");
    var panel = root.querySelector("[data-concierj-panel]");
    var closeBtn = root.querySelector("[data-concierj-close]");
    var body = root.querySelector("[data-concierj-body]");
    var chips = root.querySelectorAll("[data-concierj-chip]");

    function open() {
      panel.classList.add("is-open");
      launcher.classList.add("is-hidden");
      panel.setAttribute("aria-hidden", "false");
      var input = panel.querySelector("input");
      if (input) setTimeout(function () { input.focus(); }, 300);
    }

    function close() {
      panel.classList.remove("is-open");
      launcher.classList.remove("is-hidden");
      panel.setAttribute("aria-hidden", "true");
      launcher.focus();
    }

    function toggle() {
      panel.classList.contains("is-open") ? close() : open();
    }

    launcher.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) close();
    });

    // Placeholder-only behavior: tapping a suggestion chip echoes it
    // back as a "guest" bubble so the panel doesn't feel dead in a
    // walkthrough. Remove this block when the real chat is wired in.
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var bubble = document.createElement("div");
        bubble.className = "concierj-widget-bubble";
        bubble.style.alignSelf = "flex-end";
        bubble.style.background = "var(--ab-ink)";
        bubble.style.color = "var(--ab-paper)";
        bubble.style.borderColor = "transparent";
        bubble.textContent = chip.textContent;
        body.insertBefore(bubble, body.querySelector(".concierj-widget-placeholder-note"));
        body.scrollTop = body.scrollHeight;
      });
    });

    window.ConcierjWidget = { open: open, close: close, toggle: toggle };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
