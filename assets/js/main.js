/* Mates, Aromas y Bla Bla Bla - interacciones mínimas, sin dependencias */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* año del footer */
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  /* header con sombra al salir del tope (sin scroll listener) */
  var header = document.querySelector(".header");
  var sentinel = document.getElementById("top-sentinel");
  if (header && sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* reveal on scroll */
  var revs = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revs.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revs.forEach(function (el) { io.observe(el); });
  }

  /* destellos del hero: titileo sutil (solo si hay movimiento permitido) */
  if (!reduce) {
    document.querySelectorAll(".spark").forEach(function (s, i) {
      s.animate(
        [{ opacity: .35, transform: "scale(.85)" }, { opacity: 1, transform: "scale(1.08)" }, { opacity: .35, transform: "scale(.85)" }],
        { duration: 2600 + i * 500, iterations: Infinity, delay: i * 400, easing: "ease-in-out" }
      );
    });
  }

  /* menú mobile */
  var mt = document.getElementById("menuToggle");
  var mn = document.getElementById("mobileNav");
  if (mt && mn) {
    var close = function () { mn.classList.remove("is-open"); mt.setAttribute("aria-expanded", "false"); };
    mt.addEventListener("click", function () {
      var open = mn.classList.toggle("is-open");
      mt.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mn.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    window.addEventListener("resize", function () { if (window.innerWidth > 760) close(); });
  }

  /* video del local: click para reproducir con sonido */
  var reel = document.getElementById("reel");
  var play = document.getElementById("reelPlay");
  if (reel && play) {
    play.addEventListener("click", function () {
      reel.muted = false;
      reel.play();
      play.hidden = true;
    });
    reel.addEventListener("pause", function () { if (!reel.ended) play.hidden = false; });
    reel.addEventListener("click", function () {
      if (!reel.paused) { reel.pause(); }
    });
  }
})();
