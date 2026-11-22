/* ==========================================================
   main.js - all page behavior. Loaded after data.js.
   Each feature is a small function, called once at the bottom.
   ========================================================== */
"use strict";

/* ---------- Helper: build an element in one line ---------- */
function el(tag, className = "", html = "") {
  const node = document.createElement(tag);
  node.className = className;
  node.innerHTML = html;
  return node;
}

/* ---------- 1. Rotating motto in the hero ---------- */
function initMotto() {
  const target = document.getElementById("mottoText");
  let i = 0;
  const show = () => { target.textContent = MOTTOS[i]; i = (i + 1) % MOTTOS.length; };
  show();                                   // show first motto immediately
  setInterval(show, 4000);                  // then switch every 4 seconds
}

/* ---------- 2. Design philosophy cards ---------- */
function renderPrinciples() {
  const box = document.getElementById("principles");
  PRINCIPLES.forEach(p => {
    const col = el("div", "col-sm-6");
    col.innerHTML = `<div class="principle"><i class="bi ${p.icon}"></i>
      <h3 class="fs-5 mt-2">${p.title}</h3><p class="mb-0">${p.text}</p></div>`;
    box.appendChild(col);
  });
}

/* ---------- 3. Projects: cards, filter, modal ---------- */
function renderProjects(filter = "All") {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";                                   // clear old cards
  PROJECTS.forEach((p, index) => {
    if (filter !== "All" && p.term !== filter) return;   // skip non-matching terms
    const col = el("div", "col-md-6");
    col.innerHTML = `
      <article class="project-card bg-body">
        <img src="${p.image}" alt="Screenshot of ${p.title}" data-index="${index}">
        <div class="card-body">
          <span class="badge term-badge mb-2">${p.term}</span>
          <h3 class="fs-5">${p.title}</h3>
          <p>${p.desc}</p>
        </div>
        <div class="card-footer d-flex gap-2 bg-body">
          <button class="btn btn-sm btn-accent" data-index="${index}">Details</button>
          <a class="btn btn-sm btn-outline-dark" href="${p.github}" target="_blank" rel="noopener">
            <i class="bi bi-github"></i> GitHub</a>
        </div>
      </article>`;
    grid.appendChild(col);
  });
}

function initProjectFilters() {
  const bar = document.getElementById("projectFilters");
  ["All", "Midterm", "Finals"].forEach((name, i) => {
    const btn = el("button", "btn btn-outline-secondary" + (i === 0 ? " active" : ""), name);
    btn.type = "button";
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(name);
    });
    bar.appendChild(btn);
  });
}

/* One click listener on the grid handles every card (event delegation) */
function initProjectModal() {
  const modal = new bootstrap.Modal(document.getElementById("projectModal"));
  document.getElementById("projectGrid").addEventListener("click", e => {
    const trigger = e.target.closest("[data-index]");
    if (!trigger) return;
    const p = PROJECTS[trigger.dataset.index];
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalImg").src = p.image;
    document.getElementById("modalImg").alt = "Screenshot of " + p.title;
    document.getElementById("modalDesc").textContent = p.desc;
    document.getElementById("modalLink").href = p.github;
    const tech = document.getElementById("modalTech");
    tech.innerHTML = "";
    p.tech.forEach(t => tech.appendChild(el("span", "badge text-bg-secondary", t)));
    modal.show();
  });
}

/* ---------- 4. Contact details + form validation ---------- */
function renderContacts() {
  const list = document.getElementById("contactList");
  CONTACTS.forEach(c => {
    const text = `<i class="bi ${c.icon} me-2 text-primary"></i>${c.label}`;
    list.appendChild(el("li", "mb-2", c.href ? `<a class="text-reset" href="${c.href}">${text}</a>` : text));
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");
  form.addEventListener("submit", e => {
    e.preventDefault();                                  // no real server, so we simulate sending
    form.classList.add("was-validated");                 // reveal Bootstrap validation messages
    if (!form.checkValidity()) {
      alertBox.innerHTML = "";
      return;
    }
    const name = document.getElementById("cName").value.trim();
    alertBox.innerHTML = `<div class="alert alert-success">Thanks, ${name}. Your message is ready to send.</div>`;
    form.reset();
    form.classList.remove("was-validated");
  });
}

/* ---------- 5. Dark / light theme toggle (remembered) ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-bs-theme", saved);
  const sync = () => btn.innerHTML =
    `<i class="bi ${root.dataset.bsTheme === "dark" ? "bi-sun" : "bi-moon-stars"}"></i>`;
  sync();
  btn.addEventListener("click", () => {
    const next = root.dataset.bsTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);
    sync();
  });
}

/* ---------- 6. Footer year ---------- */
function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* ---------- Start everything once the page is ready ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMotto();
  renderPrinciples();
  initProjectFilters();
  renderProjects();
  initProjectModal();
  renderContacts();
  initContactForm();
  initThemeToggle();
  setYear();
});
