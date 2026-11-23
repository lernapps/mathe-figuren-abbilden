---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer "Figuren zeichnen und abbilden", Strang `mathematik/geometrie` (Raum und Form), Stufen 5-6, nur Deutsch.
Teil des Epics lernapps/apps#402, Issue lernapps/apps#397. Die gemeinsamen Regeln stehen in
`docs/mathe-epic/regeln.md` des Repos `lernapps/apps` (Branch `claude/determined-cray-fmepl7`); sie gelten hier.

## Curriculum

Hessen, Gymnasium, Klasse 5-6 (Annahme der Epic-Regeln). Reihenfolge und Inhalt kommen aus der Lernlandkarte
`https://lernapps.net/apps/map/mathematik.json` (Strang `geometrie`); ein Lehrplan wurde nicht gelesen (nicht geprüft).
Abgrenzung: Winkelsätze, Thales, Kongruenz gehören zu #430, Körper zu #432, Fläche und Umfang zu #398.
Koordinatensystem: nur der erste Quadrant (vier Quadranten kommen mit negativen Zahlen, #768/#395).

## Competencies

Seiten tragen die ID der Karte in `competencies`. Je Seite eine Kompetenz (Ausnahme: `bewegungen-figuren` auf zwei Seiten).

- Kapitel `punkte-linien`
  - `wiederholung` – recap `mathematik/natuerliche-zahlen` (keine Übung)
  - `grundbegriffe` – `geometrische-grundbegriffe`: Ich kann Punkt, Strecke, Gerade und Ebene unterscheiden und richtig benennen.
  - `parallel-senkrecht` – `parallel-senkrecht-abstand`: Ich kann parallele und senkrechte Geraden zeichnen und Abstände messen.
  - `koordinaten` – `koordinatensystem`: Ich kann Punkte und Figuren im Koordinatensystem eintragen und ablesen.
- Kapitel `figuren-winkel`
  - `grundfiguren` – `grundfiguren-eben`: Ich kann ebene Grundfiguren erkennen, benennen und ihre Eigenschaften beschreiben.
  - `winkel` – `winkel-messen`: Ich kann Winkel messen, zeichnen und nach ihrer Größe einteilen.
  - `vierecke` – `vierecke-grundfiguren`: Ich kann besondere Vierecke mit ihren Eigenschaften beschreiben und unterscheiden.
  - `konstruieren` – `konstruktionen`: Ich kann Figuren mit Geodreieck, Zirkel oder Geometriesoftware zeichnen und konstruieren.
- Kapitel `abbilden`
  - `symmetrie` – `symmetrie`: Ich kann Achsen-, Punkt- und Drehsymmetrie bei Figuren erkennen und nutzen.
  - `spiegeln`, `verschieben-drehen` – `bewegungen-figuren`: Ich kann Figuren spiegeln, verschieben und drehen und die Bildfigur bestimmen.

Übungs-IDs: `<seite>-<muster>` in Kleinschreibung mit Bindestrichen, z. B. `koordinaten-ablesen`.

## Content structure

Gemeinsame Abschnitts-IDs je Seite, in dieser Reihenfolge: `einstieg` (erste leichte Handlung vor der Erklärung, mit Begründung der Lösung),
`erklaerung`, `beispiel`, `uebung`. Titel sagen, was der Abschnitt tut; "Ausprobieren" nur über Bedienbarem. Eine Seite beginnt mit dem Ziel in
Lernendenworten ("Du kannst danach …") und endet mit dem nächsten Schritt der Schatzkarte. Mindestens drei Aufgaben je Baustein,
steigend: erkennen, anwenden, neue Situation. Höchstens 350 Wörter Text. Jede Seite hat ein Bild oder eine Komponente.
Schatzkarte als roter Faden: zwei erfundene Kinder (siehe Figures), eine Szene je Seite, jede Konstruktion liefert einen Hinweis.
Kapitel 1 beginnt mit der Sammel-Wiederholung `wiederholung`; ein Kapitel endet mit einem Rückblick und einer Selbsteinschätzung (`selfAssessment`).

## Terminology

Das Wort der Karte gilt (Name des Bausteins). Anrede "du", kurze Sätze, kein "man" in Arbeitsaufträgen. Schreibweisen: Dezimalkomma
(`3,5`), Einheiten mit geschütztem Leerzeichen (`3 cm`, Einheit nie kursiv), Winkel `45°` (geschütztes Leerzeichen vor `°` nicht), Minus `−`,
Mal `·`, geteilt `:`, Brüche gesetzt. Das Wort „Ursprung“ (nicht „Nullpunkt“). Punkte werden `P(3 | 2)` geschrieben: erst x, dann y (Eingabe akzeptiert `3|2`, `3 2`, `(3|2)`).
"Zahlenstrahl" für die Achsen (nicht "Zahlengerade"). Neue Wörter werden bei der ersten Verwendung am Beispiel erklärt.
Winkel heißen mit griechischen Buchstaben (α, β) und Eckpunkten; "Strecke AB" mit Überstrich in Formeln.

## Exercise patterns

- Ablesen/Berechnen: `generated` mit Zufallswerten, Rechenprobe über die Formel in `answer.value`, `mistakes` mit Fehlertyp-Text
  (x/y vertauscht, schräg gemessen, falsche Skala, Pfeil umgekehrt). Beispiel: `koordinaten-ablesen` auf `src/punkte-linien/koordinaten.yaml`.
- Zuordnen/Ordnen: `matching`, `ordering` (Zeichenschritte, Begriff–Eigenschaft).
- Auswahl: `single-choice`, `multiple-choice`, `true-false` höchstens zur Hälfte der Aufgaben einer Seite.
- Komponenten (nur wo kein Block passt, `prefer-built-in-block`): `Spielbrett` (Übung: Punkt per Klick, Pfeiltasten oder Eingabe setzen, nur
  erster Quadrant), `FigurZiehen` (Darstellung: Ecken ziehen, Eigenschaften beobachten, immer mit `nojs`-Text), `WinkelAblesen` (Übung: Geodreieck-Skala).
  Jede mit `<Name>.ts`, `<Name>.test.ts` und Textalternative.
- Datendateien: `src/data/` nur wenn ein Muster Datensätze braucht; Eintrag je Fakt einmal.

## Figures

Eigene SVG-Bilder in `src/images/` (nichts von fremden Servern, nichts aus Schulbüchern); Quelle und Lizenz: eigene Zeichnung, CC BY 4.0.
Konventionen: Spielbrett = Koordinatensystem erster Quadrant, Gitterabstand 1 Einheit, Achsen beschriftet x (waagerecht) und y (senkrecht),
Ursprung (0 | 0) beschriftet; Geodreieck und Zirkel als nummerierte Schritte; Farben nie allein als Information (zusätzlich Beschriftung/Form);
`alt` sagt, was die Figur zeigt, nicht die Lösung; Aufgabenbilder zeigen nur das Gegebene (`explainer-figure-hides-answer`).
Szenen: zwei erfundene Kinder, Nika (gelbe Jacke, Zopf) und Jonas (blaue Kappe), Zeichnung im Stil von `story-characters.svg`; Kinder, Orte und Schatzkarte
nur in dieser Form wiederverwenden.

## Sources

Lernlandkarte Mathematik (lernapps.net/apps/map/mathematik/) und eigene Herleitungen und Aufgaben. KMK-Bildungsstandards (2022) und Hessischer Lehrplan:
nicht gelesen. Nachschlagen ist keine Quelle: nichts aus Schulbüchern oder Wikipedia übernommen, keine Weiterlesen-Links. Alle Rechenaufgaben mit Rechenprobe
(fester Seed, Test im Build). Keine Dritt-Inhalte (`thirdParty`: keine).

## Adding a chapter or round

1. Neue Kompetenz der Karte wählen (Strang `geometrie`), Voraussetzungen prüfen (`requires`), fehlende als Recap-Seite.
2. Ordner `src/<kapitel>/` mit `chapter.yaml` (title, summary, pages), Seiten als `<seite>.yaml` mit `competencies` und den Abschnitten `einstieg`, `erklaerung`, `beispiel`, `uebung`.
3. Kapitel in `src/app.yaml` unter `chapters` eintragen; Übungen nach den Mustern oben; Bilder nach Figures.
4. 1 bis 3 ihrer Übungen in `selfAssessment` aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt.
5. Diesen Guide in derselben Änderung ergänzen; `npx --no -- lernapps check`; Commit.

## Rules learned from mistakes

- Wörter vor ihrer Erklärung vermeiden (Lernenden-Check: „Nullpunkt“, „Achse“ vor Erklärung): einen Begriff je Seite einführen, dann nur ihn benutzen („Ursprung“, nicht „Nullpunkt").
- Gitter: „Schritte“ zählen, nicht „Felder“ (Punkte liegen auf Kreuzungen, nicht in Feldern).
- Die Einstiegsaufgabe liest etwas aus dem Bild ab; der Aufgabentext verrät die Lösung nicht.
- Fehlertexte nennen den Fehlertyp; Zufallsaufgaben mit Singular-Problemen (1 Schritte) vermeiden (Wertebereich ≥2).
