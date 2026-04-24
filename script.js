const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(
  ".hero-copy, .hero-visual-frame, .hero-link-card, .info-card, .person-card, .publication-item, .contact-panel"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});

const mediaCarousel = document.querySelector(".media-carousel");

if (mediaCarousel) {
  const mediaTrack = mediaCarousel.querySelector(".media-track");
  const prevButton = mediaCarousel.querySelector("[data-media-prev]");
  const nextButton = mediaCarousel.querySelector("[data-media-next]");
  const firstCard = mediaTrack?.querySelector(".media-card");

  const getScrollAmount = () => {
    if (!mediaTrack || !firstCard) {
      return 0;
    }

    const trackStyles = window.getComputedStyle(mediaTrack);
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
    return cardWidth + gap;
  };

  const getMaxScroll = () => {
    if (!mediaTrack) {
      return 0;
    }

    return mediaTrack.scrollWidth - mediaTrack.clientWidth;
  };

  prevButton?.addEventListener("click", () => {
    if (!mediaTrack) {
      return;
    }

    if (mediaTrack.scrollLeft <= 4) {
      mediaTrack.scrollTo({ left: getMaxScroll(), behavior: "smooth" });
      return;
    }

    mediaTrack.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextButton?.addEventListener("click", () => {
    if (!mediaTrack) {
      return;
    }

    if (mediaTrack.scrollLeft >= getMaxScroll() - 4) {
      mediaTrack.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    mediaTrack.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
}
