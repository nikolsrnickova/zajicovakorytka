(() => {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");

  // Reload often restores #kontakt (bottom). Open at top on refresh.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const navEntry = performance.getEntriesByType("navigation")[0];
  const isReload = navEntry?.type === "reload";
  if (isReload) {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  } else if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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

  // Aktualita / obsazenost — text se bere z aktualita.json
  const aktualitaBand = document.getElementById("aktualita");
  const aktualitaTitle = document.getElementById("aktualita-title");
  const aktualitaText = document.getElementById("aktualita-text");

  const loadAktualita = async () => {
    if (!aktualitaBand || !aktualitaText) return;
    try {
      const res = await fetch(`aktualita.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const text = typeof data.text === "string" ? data.text.trim() : "";
      const active = data.active === true && text.length > 0;
      if (!active) {
        aktualitaBand.hidden = true;
        return;
      }
      if (aktualitaTitle) {
        aktualitaTitle.textContent =
          typeof data.title === "string" ? data.title.trim() : "";
      }
      aktualitaText.textContent = text;
      aktualitaBand.hidden = false;
    } catch {
      // Při chybě načtení banner nezobrazujeme
    }
  };

  loadAktualita();
})();
