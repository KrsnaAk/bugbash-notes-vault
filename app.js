const app = document.querySelector("#app");
let notes = [
    { id: 1, title: "Event ideas", body: "Add a lightning demo before lunch." },
    { id: 2, title: "Welcome note", body: "Make the instructions friendly." },
  ],
  query = "";
function render() {
  const view = notes.filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase()),
  );
  app.innerHTML = `<div class="row space"><div><span class="label">Private workspace</span><h2>Notes</h2></div><input id="search" value="${query}" placeholder="Search notes"/></div><form id="write" class="stack"><input name="title" placeholder="Title"/><textarea name="body" placeholder="Write a note"></textarea><button>Save note</button></form><div class="list">${view.map((n) => `<article class="item"><div><strong>${n.title}</strong><span class="muted small">${n.body}</span></div><button class="danger" data-remove="${n.title}">Delete</button></article>`).join("")}</div>`;
  document.querySelector("#search").oninput = (e) => {
    query = e.target.value;
    render();
  };
  document.querySelector("#write").onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    notes.push({ id: Date.now(), title: f.get("title"), body: f.get("body") });
    e.currentTarget.reset();
    render();
  };
  document.querySelectorAll("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        notes = notes.filter((n) => n.title !== b.dataset.remove);
        render();
      }),
  );
}
render();


// Added organizer feature: visible note character count.
function renderNoteSummary() {
  const host = document.querySelector("#app"); if (!host || document.querySelector("#note-summary")) return;
  const summary = document.createElement("p"); summary.id = "note-summary"; summary.className = "muted small";
  summary.textContent = notes.length + " note(s) · " + notes.reduce((total, note) => total + note.body.length, 0) + " body characters"; host.querySelector("h2")?.after(summary);
}
renderNoteSummary();
