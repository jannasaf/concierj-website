// Azure Bluff — realistic placeholder behavior for elements that
// don't have a real backend in this demo (the availability search).

(function () {
  var searchForm = document.querySelector(".ab-search");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.ConcierjWidget && window.ConcierjWidget.open();
    });
  }
})();
