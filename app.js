const app = document.querySelector("#app");

let notes = [
  { id: 1, title: "Event ideas", body: "Add a lightning demo before lunch." },
  { id: 2, title: "Welcome note", body: "Make the instructions friendly." },
];

let query = "";

function render() {
  const view = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.body.toLowerCase().includes(query.toLowerCase()),
  );

  app.innerHTML = `
    <div class="row space">
      <div>
        <span class="label">Private workspace</span>
        <h2>Notes</h2>
      </div>
      <input id="search" value="${escapeHTML(query)}" placeholder="Search notes" />
    </div>

    <form id="write" class="stack">
      <input name="title" placeholder="Title" />
      <textarea name="body" placeholder="Write a note"></textarea>
      <button>Save note</button>
    </form>

    <div class="list">
      ${view
        .map(
          (n) => `
            <article class="item">
              <div>
                <strong>${escapeHTML(n.title)}</strong>
                <span class="muted small">${escapeHTML(n.body)}</span>
              </div>
              <button class="danger" data-remove="${n.id}">Delete</button>
            </article>
          `,
        )
        .join("")}
    </div>
  `;

  document.querySelector("#search").oninput = (e) => {
    query = e.target.value;
    const cursorPosition = e.target.selectionStart;

    render();

    const searchInput = document.querySelector("#search");
    searchInput.focus();
    searchInput.setSelectionRange(cursorPosition, cursorPosition);
  };

  document.querySelector("#write").onsubmit = (e) => {
    e.preventDefault();

    const f = new FormData(e.currentTarget);
    const title = f.get("title").trim();
    const body = f.get("body").trim();

    if (!title && !body) return;

    notes.push({
      id: Date.now(),
      title,
      body,
    });

    e.currentTarget.reset();
    render();
  };

  document.querySelectorAll("[data-remove]").forEach((b) => {
    b.onclick = () => {
      notes = notes.filter(
        (n) => n.id !== Number(b.dataset.remove),
      );

      render();
    };
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

render();