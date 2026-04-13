const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(
  ".hero-copy, .hero-card, .info-card, .person-card, .publication-item, .contact-panel"
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

const heroCarousel = document.querySelector(".hero-carousel");

if (heroCarousel) {
  const slides = Array.from(heroCarousel.querySelectorAll(".hero-slide"));
  const dots = Array.from(heroCarousel.querySelectorAll("[data-carousel-dot]"));
  const prevButton = heroCarousel.querySelector("[data-carousel-prev]");
  const nextButton = heroCarousel.querySelector("[data-carousel-next]");
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let intervalId;

  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const renderSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    activeIndex = index;
  };

  const goToSlide = (index) => {
    const nextIndex = (index + slides.length) % slides.length;
    renderSlide(nextIndex);
  };

  const startCarousel = () => {
    if (slides.length < 2) {
      return;
    }

    intervalId = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 8000);
  };

  const stopCarousel = () => {
    window.clearInterval(intervalId);
  };

  prevButton?.addEventListener("click", () => {
    stopCarousel();
    goToSlide(activeIndex - 1);
    startCarousel();
  });

  nextButton?.addEventListener("click", () => {
    stopCarousel();
    goToSlide(activeIndex + 1);
    startCarousel();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      stopCarousel();
      goToSlide(dotIndex);
      startCarousel();
    });
  });

  heroCarousel.addEventListener("mouseenter", stopCarousel);
  heroCarousel.addEventListener("mouseleave", startCarousel);
  heroCarousel.addEventListener("focusin", stopCarousel);
  heroCarousel.addEventListener("focusout", startCarousel);

  renderSlide(activeIndex);
  startCarousel();
}

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
