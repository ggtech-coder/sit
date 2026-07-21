(function () {
  "use strict";

  // ---------- Apply config-driven content ----------
  function applyConfig() {
    const c = window.SITE_CONFIG;
    if (!c) return;

    const waMsg = encodeURIComponent(
      "Olá! Vim pelo site da GG Tech e quero saber mais sobre um projeto."
    );
    const waLink = `https://wa.me/${c.contato.whatsapp}?text=${waMsg}`;

    ["whatsappNavBtn", "whatsappContactLink", "whatsappCtaBtn", "whatsappFloat"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute("href", waLink);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });

    const emailLink = document.getElementById("emailContactLink");
    if (emailLink) {
      emailLink.textContent = c.contato.email;
      emailLink.setAttribute("href", `mailto:${c.contato.email}`);
    }

    const igLink = document.getElementById("instagramLink");
    if (igLink) igLink.setAttribute("href", c.contato.instagram);

    const liLink = document.getElementById("linkedinLink");
    if (liLink) liLink.setAttribute("href", c.contato.linkedin);

    const mapEmbed = document.getElementById("mapEmbed");
    if (mapEmbed) mapEmbed.setAttribute("src", c.mapa.embedSrc);

    const form = document.getElementById("contactForm");
    if (form) form.setAttribute("data-endpoint", c.formulario.endpoint);

    document.title = c.seo.tituloBase;
  }

  // ---------- Nav scroll state + mobile toggle ----------
  function setupNav() {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("navToggle");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    });

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("mobile-open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll("#navLinks a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        toggle.classList.remove("open");
      });
    });
  }

  // ---------- FAQ accordion ----------
  function setupFaq() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-q");
      const answer = item.querySelector(".faq-a");
      btn.setAttribute("aria-expanded", "false");

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item.open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".faq-a").style.maxHeight = null;
            openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          answer.style.maxHeight = null;
          btn.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ---------- Scroll reveal ----------
  function setupReveal() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  // ---------- Contact form ----------
  function setupForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute("data-endpoint");
      const successBox = document.getElementById("formSuccess");
      const submitBtn = form.querySelector("button[type=submit]");
      const originalLabel = submitBtn.textContent;

      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      try {
        if (endpoint && !endpoint.includes("SEU_ID_AQUI")) {
          const data = new FormData(form);
          await fetch(endpoint, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
        }
        successBox.classList.add("visible");
        form.reset();
      } catch (err) {
        successBox.textContent = "Não foi possível enviar agora. Fale com a gente pelo WhatsApp.";
        successBox.classList.add("visible");
      } finally {
        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
      }
    });
  }

  // ---------- Footer year ----------
  function setupYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // ---------- Scroll progress ruler ----------
  function setupScrollRuler() {
    const ruler = document.getElementById("scrollRuler");
    const fill = document.getElementById("scrollRulerFill");
    if (!ruler || !fill) return;
    let ticking = false;

    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      fill.style.width = pct + "%";
      fill.setAttribute("data-pct", Math.round(pct) + "%");
      ruler.classList.toggle("active", window.scrollY > 40);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    });
    update();
  }

  // ---------- Drafting cursor readout (hero only) ----------
  function setupCursorTag() {
    const hero = document.getElementById("heroInteractive");
    const tag = document.getElementById("cursorTag");
    const label = document.getElementById("cursorTagLabel");
    const gridBg = hero ? hero.querySelector(".hero-grid-bg") : null;
    if (!hero || !tag || !label || !finePointer || reduceMotion) return;

    hero.addEventListener("mouseenter", () => tag.classList.add("visible"));
    hero.addEventListener("mouseleave", () => {
      tag.classList.remove("visible");
      if (gridBg) gridBg.style.transform = "";
    });

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      tag.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      label.textContent = `X ${x} · Y ${y}`;

      if (gridBg) {
        const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        gridBg.style.transform = `translate(${dx * -14}px, ${dy * -14}px)`;
      }
    });
  }

  // ---------- Count-up numbers ----------
  function setupCountUp() {
    const nums = document.querySelectorAll(".proof-num[data-count]");
    if (!nums.length) return;

    function animate(el) {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion || target === 0) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1100;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((el) => io.observe(el));
  }

  // ---------- Magnetic buttons ----------
  function setupMagnetic() {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // ---------- Tilt cards ----------
  function setupTilt() {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ---------- Active nav link on scroll ----------
  function setupActiveNav() {
    const links = document.querySelectorAll('#navLinks a[href^="#"]');
    const sections = Array.from(links)
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = "#" + entry.target.id;
          const link = document.querySelector(`#navLinks a[href="${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    setupNav();
    setupFaq();
    setupReveal();
    setupForm();
    setupYear();
    setupScrollRuler();
    setupCursorTag();
    setupCountUp();
    setupMagnetic();
    setupTilt();
    setupActiveNav();
  });
})();
