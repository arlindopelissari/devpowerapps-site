const yearEl = document.getElementById("year");
const filterButtons = Array.from(document.querySelectorAll(".chip"));
const cards = Array.from(document.querySelectorAll(".port-card"));
const revealItems = document.querySelectorAll(".reveal");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lb-img");
const lightboxTitle = document.getElementById("lb-title");
const closeLightboxBtn = document.getElementById("close-lightbox");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    cards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.addEventListener("click", (event) => {
  const targetButton = event.target.closest(".cover-btn");
  if (!targetButton || !lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  lightboxImage.src = targetButton.dataset.src || "";
  lightboxTitle.textContent = targetButton.dataset.title || "Visualizacao";
  lightbox.showModal();
});

if (closeLightboxBtn && lightbox) {
  closeLightboxBtn.addEventListener("click", () => lightbox.close());
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}
