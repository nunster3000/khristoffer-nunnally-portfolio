const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
function setTheme(theme) {
  root.dataset.theme = theme;
  const light = theme === "light";
  themeButton.textContent = light ? "☾" : "☀";
  themeButton.setAttribute(
    "aria-label",
    `Switch to ${light ? "dark" : "light"} theme`,
  );
  document.querySelector('meta[name="theme-color"]').content = light
    ? "#f6f8fa"
    : "#0d1117";
}
try {
  setTheme(
    localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark",
  );
} catch {
  setTheme("dark");
}
themeButton.addEventListener("click", () => {
  const theme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(theme);
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {}
});
const descriptions = {
  core: "CoreRunner → booking, dispatch & delivery proof.",
  rydr: "Rydr → clearer connections for riders & drivers.",
  cleaning: "Proverbs 31 → cinematic storytelling & interactive care planning.",
  drive: "DriveCoach → a new product taking shape.",
};
document.querySelectorAll("[data-preview]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-preview]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    document.querySelector("#terminal-output").textContent =
      descriptions[button.dataset.preview];
  });
});
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    let count = 0;
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
      if (!card.hidden) {
        count++;
        card.classList.add("visible");
      }
    });
    document.querySelector(".project-grid").hidden = ![
      ...document.querySelectorAll(".project-grid .project"),
    ].some((card) => !card.hidden);
    document.querySelector(".filter-count").textContent =
      `Showing ${count} project${count === 1 ? "" : "s"}`;
  });
});
document.querySelector(".copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText("khris.nunnally@outlook.com");
    status.textContent = "Email address copied.";
  } catch {
    status.textContent = "khris.nunnally@outlook.com";
  }
});
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.05 },
  );
  document
    .querySelectorAll(".project, .story, .principles > div, .contact")
    .forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
}
// The editor is a lightweight code animation, not a running terminal.
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const motionToggle = document.querySelector("#motion-toggle");
const codePane = document.querySelector("#animated-code");
const editorPhase = document.querySelector("#editor-phase");
const snippets = [
  '// CoreRunner / delivery experience\nconst project = {\n  name: "CoreRunner",\n  stack: ["React", "Express"],\n  flows: [\n    "book", "dispatch", "deliver"\n  ],\n  status: "live interactive demo"\n};',
  '// Rydr / connected journeys\nconst project = {\n  name: "Rydr",\n  site: "www.rydr-go.com",\n  experiences: [\n    "rider", "driver", "community"\n  ],\n  status: "controlled beta"\n};',
  '// Proverbs 31 / thoughtful care\nconst project = {\n  name: "Proverbs 31 Cleaning",\n  site: "proverbs-31-cleaning.vercel.app",\n  flows: ["explore", "plan", "book"],\n  status: "live interactive demo"\n};',
  '// DriveCoach / next chapter\nconst project = {\n  name: "DriveCoach",\n  focus: "product exploration",\n  next: [\n    "define", "build", "refine"\n  ],\n  status: "in development"\n};',
];
let snippetIndex = 0,
  character = 0,
  hold = 0,
  timer,
  paused = motionPreference.matches;
function syncMotion() {
  root.classList.toggle("motion-paused", paused);
  motionToggle.textContent = paused ? "Play animation" : "Pause animation";
  motionToggle.setAttribute("aria-pressed", String(paused));
}
function animateEditor() {
  if (!paused && !document.hidden) {
    if (character < snippets[snippetIndex].length) {
      character += 2;
      codePane.textContent = snippets[snippetIndex].slice(0, character);
      editorPhase.textContent = "Writing project definition…";
    } else if (++hold >= 50) {
      snippetIndex = (snippetIndex + 1) % snippets.length;
      character = 0;
      hold = 0;
    } else {
      editorPhase.textContent = "Project definition complete";
    }
  }
  timer = setTimeout(animateEditor, 55);
}
motionToggle.addEventListener("click", () => {
  paused = !paused;
  syncMotion();
});
motionPreference.addEventListener("change", (event) => {
  paused = event.matches;
  if (paused) {
    codePane.textContent = snippets[snippetIndex];
    character = snippets[snippetIndex].length;
  }
  syncMotion();
});
if (paused) {
  codePane.textContent = snippets[0];
  character = snippets[0].length;
  editorPhase.textContent = "Project definition";
}
syncMotion();
animateEditor();
document.querySelectorAll("[data-preview]").forEach((button, index) =>
  button.addEventListener("click", () => {
    snippetIndex = index;
    character = paused ? snippets[index].length : 0;
    hold = 0;
    codePane.textContent = paused ? snippets[index] : "";
    editorPhase.textContent = paused
      ? "Project definition"
      : "Writing project definition…";
  }),
);
