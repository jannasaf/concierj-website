// Simulated "Plan My Stay" conversation for the Concierj homepage.
// Purely illustrative — plays once when scrolled into view.

(function () {
  var body = document.querySelector("[data-chat-body]");
  var windowEl = document.querySelector("[data-chat-window]");
  if (!body || !windowEl) return;

  var script = [
    { type: "bot", text: "What brings you to Azure Bluff?" },
    { type: "guest", text: "Anniversary weekend." },
    { type: "bot", text: "Perfect. Are you imagining something mostly relaxing, mostly adventurous, or a mix of both?" },
    { type: "guest", text: "A mix — relaxing mornings, adventurous afternoons." },
    {
      type: "card",
      title: "Ocean Bluff Room",
      lines: [
        "Recommended for your anniversary weekend",
        "Morning: sunrise yoga + coffee on the terrace",
        "Afternoon: coastal bike ride to the vineyards",
        "Evening: cocktails, then dinner at Juniper",
      ],
    },
  ];

  var played = false;

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function addTyping() {
    var el = document.createElement("div");
    el.className = "typing-dots";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    return el;
  }

  async function play() {
    if (played) return;
    played = true;

    for (var i = 0; i < script.length; i++) {
      var step = script[i];

      if (step.type === "bot" || step.type === "card") {
        var typing = addTyping();
        await wait(700);
        typing.remove();
      } else {
        await wait(500);
      }

      if (step.type === "card") {
        var card = document.createElement("div");
        card.className = "bubble bubble--card";
        var html = '<p class="card-title">' + step.title + "</p>";
        step.lines.forEach(function (line) {
          html += '<p class="card-line">' + line + "</p>";
        });
        card.innerHTML = html;
        body.appendChild(card);
      } else {
        var bubble = document.createElement("div");
        bubble.className = "bubble " + (step.type === "bot" ? "bubble--bot" : "bubble--guest");
        bubble.textContent = step.text;
        body.appendChild(bubble);
      }

      body.scrollTop = body.scrollHeight;
      await wait(300);
    }
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            play();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(windowEl);
  } else {
    play();
  }
})();
