// Mobile nav toggle — shared by every page
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }
});

// Scroll reveal: sections and cards fade up into place as they scroll into view.
// Skipped for visitors who prefer reduced motion, and the page works without it.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var selector = ".section .section-title, .section .section-subtitle, .section .card, " +
    ".section .split-photo, .section .split-text, .section .photo-strip a, .section .table-wrap, .banner-img, " +
    ".section .day-card, .section .tl-item, .section .event-graphic, .section .photo-band, .section .fact-row";
  var els = [].slice.call(document.querySelectorAll(selector));
  if (!els.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  var siblingCount = new Map();
  els.forEach(function (el) {
    var parent = el.parentNode;
    var i = siblingCount.get(parent) || 0;
    siblingCount.set(parent, i + 1);
    el.classList.add("reveal");
    el.style.transitionDelay = (Math.min(i, 5) * 70) + "ms";
    el.addEventListener("transitionend", function done(ev) {
      if (ev.propertyName !== "opacity") return;
      el.classList.remove("reveal", "in");
      el.style.transitionDelay = "";
      el.removeEventListener("transitionend", done);
    });
    io.observe(el);
  });
})();
