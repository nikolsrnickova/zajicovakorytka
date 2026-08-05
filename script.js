(() => {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const form = document.getElementById("inquiry-form");
  const status = document.getElementById("form-status");
  const year = document.getElementById("year");
  const mobileCta = document.querySelector(".mobile-cta");
  const poptavka = document.getElementById("poptavka");

  if (year) year.textContent = String(new Date().getFullYear());

  /* Sticky header shadow */
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otevřít menu");
  };

  const openNav = () => {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Zavřít menu");
  };

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) closeNav();
    else openNav();
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* Prefill occasion from cards */
  document.querySelectorAll("[data-occasion]").forEach((el) => {
    el.addEventListener("click", () => {
      const value = el.getAttribute("data-occasion");
      const select = document.getElementById("occasion");
      if (select && value) select.value = value;
    });
  });

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Hide mobile CTA when form is in view */
  if (poptavka && "IntersectionObserver" in window) {
    const formIo = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("form-in-view", entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    formIo.observe(poptavka);
  }

  /* Form validation + mailto fallback */
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");

    const name = form.elements.namedItem("name");
    const phone = form.elements.namedItem("phone");
    const email = form.elements.namedItem("email");
    const date = form.elements.namedItem("date");
    const guests = form.elements.namedItem("guests");
    const occasion = form.elements.namedItem("occasion");
    const note = form.elements.namedItem("note");

    const fields = [name, phone, email];
    let valid = true;

    fields.forEach((field) => {
      field.classList.remove("is-invalid");
      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        valid = false;
      }
    });

    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Prosím vyplňte jméno, telefon a e-mail.";
      status.classList.add("is-error");
      form.querySelector(".is-invalid")?.focus();
      return;
    }

    const body = [
      `Jméno: ${name.value.trim()}`,
      `Telefon: ${phone.value.trim()}`,
      `E-mail: ${email.value.trim()}`,
      `Datum akce: ${date.value || "—"}`,
      `Počet osob: ${guests.value || "—"}`,
      `Příležitost: ${occasion.value || "—"}`,
      "",
      "Poznámka:",
      note.value.trim() || "—",
    ].join("\n");

    const subject = encodeURIComponent(
      `Poptávka cateringu — ${name.value.trim()}${occasion.value ? ` (${occasion.value})` : ""}`
    );
    const mailto = `mailto:info@zajicovakorytka.cz?subject=${subject}&body=${encodeURIComponent(body)}`;

    status.textContent = "Děkujeme! Otevíráme e-mail s vaší poptávkou…";
    form.reset();

    window.location.href = mailto;
  });

  /* Soft focus ring for keyboard users only */
  function handleFirstTab(e) {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
      window.removeEventListener("keydown", handleFirstTab);
    }
  }
  window.addEventListener("keydown", handleFirstTab);
})();
