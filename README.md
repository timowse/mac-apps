# Timos Apps

Statische, deutschsprachige GitHub-Pages-Site für Timos macOS-Apps.

## Lokal ansehen

Vom übergeordneten Verzeichnis starten, damit der produktive Basispfad `/mac-apps/` erhalten bleibt:

```bash
cd /home/twiese
python3 -m http.server 8000
```

Dann `http://localhost:8000/mac-apps/` öffnen.

## Eine App ergänzen

1. App-Daten in `assets/js/apps.js` ergänzen.
2. Echte Bilder unter `assets/<slug>/` ablegen.
3. Detailseite unter `apps/<slug>/index.html` hinzufügen.
4. URL in `sitemap.xml` ergänzen.

## FluxBond

FluxBond befindet sich noch in Vorbereitung. Name, Detailseite und zukünftiger Repository-Link sind bereits zentral in `assets/js/apps.js` hinterlegt. Die sichtbare MultiPath-Upstream-Attribution und der MIT-Hinweis müssen bei späteren Änderungen erhalten bleiben.

Die Site benötigt keinen Build-Schritt. GitHub Pages kann sie direkt aus dem Repository-Root veröffentlichen.
