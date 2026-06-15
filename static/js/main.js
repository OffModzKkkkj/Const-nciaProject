document.addEventListener("DOMContentLoaded", () => {

  // ── Scroll reveal ──────────────────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // ── Staggered list items ───────────────────────────────────────
  const staggerLists = document.querySelectorAll(".stagger-list");
  const staggerObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".stagger-item");
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("visible"), i * 100);
          });
          staggerObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  staggerLists.forEach((el) => staggerObs.observe(el));

  // ── Accordion FAQ ──────────────────────────────────────────────
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-btn");
    const body = item.querySelector(".faq-body");
    btn.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-body").style.maxHeight = "0";
      });
      if (!open) {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // ── Smooth scroll for anchor links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ── Floating orbs parallax ────────────────────────────────────
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    document.querySelectorAll(".orb").forEach((orb, i) => {
      const speed = i % 2 === 0 ? 0.08 : -0.05;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  });

  // ── Form micro-feedback ────────────────────────────────────────
  const form = document.querySelector(".lead-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const btn = form.querySelector("button[type=submit]");
      btn.textContent = "Redirecionando...";
      btn.disabled = true;
    });
  }

  // ── Number mask for WhatsApp input ────────────────────────────
  const waInput = document.getElementById("whatsapp");
  if (waInput) {
    waInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length >= 7) {
        v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
      } else if (v.length >= 3) {
        v = v.replace(/^(\d{2})(\d*)/, "($1) $2");
      }
      e.target.value = v;
    });
  }
});
