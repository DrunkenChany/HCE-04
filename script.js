const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".bookmark a")];
const progress = document.querySelector("#progressBar");
const revealItems = [...document.querySelectorAll(".reveal")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

function updatePageUI() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  if (progress) {
    progress.style.width = `${maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0}%`;
  }

  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (scrollTop >= section.offsetTop - window.innerHeight * 0.38) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === current);
  });
}

window.addEventListener("scroll", updatePageUI, { passive: true });
window.addEventListener("resize", updatePageUI);
updatePageUI();

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
