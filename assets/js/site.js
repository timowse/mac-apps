(() => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  document.body.classList.toggle("is-ios", isIOS);
  const apps = window.APP_CATALOG || {};
  const base = document.documentElement.dataset.base || "/mac-apps";
  const asset = path => path.replace(/^\/mac-apps/, base);
  const catalog = document.querySelector("[data-catalog]");

  if (catalog) {
    catalog.innerHTML = Object.values(apps).map(app => `
      <article class="app-card">
        <img class="app-icon" src="${asset(app.icon)}" width="116" height="116" alt="${app.name} App-Symbol">
        <h2>${app.name}</h2>
        ${app.brandStatus ? `<span class="brand-status">${app.brandStatus}</span>` : ""}
        <p>${app.short}</p>
        <div class="card-actions">
          <a class="button" href="${asset(app.detail)}" aria-label="Mehr über ${app.name}">Entdecken</a>
          ${app.download ? `<a href="${app.download}" aria-label="${app.name} ${app.version} als DMG laden">DMG laden</a>` : `<span class="pending" aria-label="Für ${app.name} gibt es noch keinen Download">Download folgt</span>`}
        </div>
        <img class="card-shot" src="${asset(app.heroShot)}" alt="${app.name} Programmoberfläche" loading="lazy">
      </article>`).join("");
  }

  const appKey = document.body.dataset.app;
  const app = apps[appKey];
  if (app) {
    document.querySelectorAll("[data-download]").forEach(link => {
      if (app.download) link.href = app.download;
      else { link.removeAttribute("href"); link.setAttribute("aria-disabled", "true"); }
    });
    document.querySelectorAll("[data-repo]").forEach(link => link.href = app.repo);
    document.querySelectorAll("[data-version]").forEach(node => node.textContent = app.version);
    document.querySelectorAll("[data-platform]").forEach(node => node.textContent = app.platform);
    document.querySelectorAll("[data-privacy]").forEach(node => node.textContent = app.privacy);
    const canonical = `https://timowse.github.io/mac-apps/apps/${app.slug}/`;
    document.querySelectorAll("[data-mail-link]").forEach(link => {
      const subject = encodeURIComponent(`${app.name} für den Mac`);
      const body = encodeURIComponent(`Hier ist der Download-Link für ${app.name}:\n${canonical}`);
      link.href = `mailto:?subject=${subject}&body=${body}`;
    });
    document.querySelectorAll("[data-copy-link]").forEach(button => button.addEventListener("click", async () => {
      const feedback = document.querySelector("[data-copy-feedback]");
      try {
        await navigator.clipboard.writeText(canonical);
        feedback.textContent = "Link kopiert.";
      } catch (_) {
        const area = document.createElement("textarea"); area.value = canonical; document.body.append(area); area.select();
        document.execCommand("copy"); area.remove(); feedback.textContent = "Link kopiert.";
      }
    }));
  }

  document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
})();
