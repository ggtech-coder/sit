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

  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    setupNav();
    setupFaq();
    setupReveal();
    setupForm();
    setupYear();
  });
})();
