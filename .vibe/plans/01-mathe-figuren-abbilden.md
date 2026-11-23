---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: commit
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 2
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 6 }
---

# Plan: mathe-figuren-abbilden, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-22. Explore, Plan, Code, Commit.*

## Goal

Schülerinnen und Schüler der Stufen 5–6 zeichnen mit Geodreieck und Zirkel, messen Winkel, erkennen Symmetrien und
bilden Figuren im Koordinatensystem ab (spiegeln, verschieben, drehen). Sie üben alle 9 Bausteine des Issues
lernapps/apps#397 (Strang `mathematik/geometrie`).


## Key decisions

- Archetyp `explainer` (Issue und Anweisung: Format 2, Strang `mathematik/geometrie`; Lernende lesen Erklärseiten mit Übungen).
- Strang `geometrie` (Karte: „Raum und Form“, 27 Kompetenzen); die 9 Bausteine des Issues sind die Auswahl.
- Sammel-Wiederholung (`recap`) am Anfang von Kapitel 1: `natuerliche-zahlen` (Voraussetzung von `koordinatensystem`, liegt in Strang `arithmetik`).
- Kapitelschnitt wie im Issue: 3 Kapitel (Punkte/Linien/Koordinaten · Figuren/Vierecke/Winkel · Symmetrie und Abbilden). (guess: Seitenzahl je Baustein, siehe Plan)
- Kein `scope` in `src/app.yaml`: keine `open-task`, kein Material des Creators (Entscheidung nach structure.md; nachträglich eingetragen, der Task war vorher abgehakt).
- Gemeinsame Darstellung „Koordinatensystem als Spielbrett“, Schatzkarte als roter Faden (Issue).

## Notes

**Quellen (geöffnet):** Lernlandkarte `https://lernapps.net/apps/map/mathematik.json` (Stand beim Lesen, Status draft);
Issue-Text lernapps/apps#397 und Regeln `docs/mathe-epic/regeln.md` (Epic #402). Lehrplan: nicht nötig (Strang gesetzt, Karte gibt die Reihenfolge).
KMK-Bildungsstandards und Hessischer Lehrplan: nicht gelesen (nicht geprüft); eigene Herleitungen und Aufgaben.

**Strang:** `mathematik/geometrie`, Stufe 5–6. Kompetenzen laut Karte (id · Schritt · öffnet · Voraussetzung):

1. Punkte, Linien und Koordinaten
   - `geometrische-grundbegriffe` · 1 · 52 · –
   - `parallel-senkrecht-abstand` · 2 · 36 · geometrische-grundbegriffe
   - `koordinatensystem` · 2 · 24 · natuerliche-zahlen (recap), geometrische-grundbegriffe
2. Figuren, Vierecke und Winkel
   - `grundfiguren-eben` · 3 · 35 · parallel-senkrecht-abstand
   - `vierecke-grundfiguren` · 4 · 5 · grundfiguren-eben
   - `winkel-messen` · 4 · 14 · grundfiguren-eben (Karte; didaktisch ohne Drehung kaum vorstellbar)
   - `konstruktionen` · 4 · 12 · grundfiguren-eben
3. Symmetrie, Spiegeln, Verschieben, Drehen
   - `symmetrie` · 4 · 11 · grundfiguren-eben
   - `bewegungen-figuren` · 5 · 9 · symmetrie, koordinatensystem, winkel-messen

Alle neun sind Lücken (`practisedBy` leer). Reihenfolge Kapitel 2: grundfiguren → winkel-messen → vierecke → konstruktionen (Winkel vor Konstruktion nötig; Karte erlaubt jede Reihenfolge innerhalb Schritt 4). Kapitel 3 braucht `winkel-messen` (Kapitel 2) und `koordinatensystem` (Kapitel 1): beides liegt vor Kapitel 3.

**Didaktik (aus dem Issue):** Geodreieck und Zirkel, Falten und Spiegeln tragen. Neben jeder Handzeichnung dieselbe Figur
als dynamische Geometrie (Punkte ziehen) – als Vue-Komponente mit statischer SVG-Form zuerst und Text ohne JavaScript.
Koordinatensystem als Spielbrett (Schiffe versenken, Schatzkarte).

**Üben (Muster `mathematics.md`, `figures.md`):** Bild (SVG) + `generated` mit Zufallswerten und typischen Fehlern; Single-/Multiple-Choice
und Zuordnung für Begriffe; Übungskomponenten für Zeichnen/Ziehen (Punkt setzen, Winkel am Geodreieck ablesen, Bildfigur eintragen).

**Je Kompetenz: Weg und Fehlvorstellung (Auszug, Details im Plan):**
- Grundbegriffe: Strecke/Gerade/Halbgerade am Alltag unterscheiden; Fehler: Gerade endet, Strecke „unendlich“.
- Parallelen/Senkrechte/Abstand: mit Geodreieck-Mitte zeichnen; Fehler: Abstand schräg statt senkrecht gemessen.
- Koordinatensystem: Schiffe versenken; Fehler: x und y vertauscht, Ursprung als Punkt (1|1).
- Grundfiguren: Eigenschaften beschreiben; Fehler: Quadrat ≠ Rechteck-Vorstellung.
- Winkel: Drehung (Uhrzeiger, Tür), dann messen; Fehler: falsche Skala am Geodreieck, Winkel mit Schenkellänge verwechselt.
- Vierecke: Ziehen in DGS: was bleibt; Fehler: Raute/Drachen/Parallelogramm-Eigenschaften vertauscht.
- Konstruieren: Zirkel, Mittelsenkrechte, Dreiecke aus Seiten; Fehler: Zirkelradius falsch.
- Symmetrie: Falten, Klecksbilder; Fehler: Diagonale als Symmetrieachse beim Rechteck.
- Bewegungen: im Koordinatensystem; Fehler: Spiegeln an y-Achse mit falschem Vorzeichen, Verschiebungspfeil umgekehrt.

**Scope:** Drin: ebene Geometrie 5–6, alle 9 Bausteine. Draußen: Winkelsätze, Thales, Kongruenz (#430), Körper (#432), Fläche/Umfang (#398).
Koordinatensystem: nur erster Quadrant (Orchestrator; vier Quadranten mit #768/#395); Bildpunkte der Bewegungen bleiben im ersten Quadranten. Zahlenstrahl, nicht Zahlengerade. Sprache: nur Deutsch (guess).
Schreibweisen nach `regeln.md` Abschnitt 2 (Komma, −, ·, geschützte Leerzeichen).

**Seiten je Kapitel (eine Kompetenz je Seite, nach `requires` geordnet):**
- Kapitel 1 `punkte-linien`: Sammel-Wiederholung `recap: arithmetik/natuerliche-zahlen` · `geometrische-grundbegriffe` · `parallel-senkrecht-abstand` · `koordinatensystem`
- Kapitel 2 `figuren-winkel`: `grundfiguren-eben` · `winkel-messen` · `vierecke-grundfiguren` · `konstruktionen`
- Kapitel 3 `abbilden`: `symmetrie` (1 Seite: Achsen-, Punkt-, Drehsymmetrie) · `bewegungen-figuren` (1–2 Seiten: spiegeln · verschieben · drehen). Entscheidung Orchestrator (Recherche-Antwort): nicht beide Bausteine auf einer Seite.
Baustein → Seite: je Baustein genau eine Seite, dort mind. drei Aufgaben.

**Regeln (Stand afc2bdd):** Brüche gesetzt (MathML), Nachschlagen ist keine Quelle, Schicht 1 / Tiefe 1 (hängt nur von #385 ab). Selbsteinschätzung: Skill `lernapps-explainer-self-assessment` folgen, Abweichung im Plan begründen. Musterseite Koordinatensystem: Bedienung per Tastatur (Punkt per Eingabe oder Pfeiltasten) und Textalternative.

**Ganze-App-Check (Lernenden-Prüfer) und Korrekturen:** siehe „Review“; behoben wurden Geschichte (zehn Hinweise, Nika und Jonas auf `grundbegriffe`, Abschluss), unerklärte Begriffe, Aufgabenfehler und Rückmeldungen, Komponenten (Eingabeformen, Skala, Drachen konvex), Schreibweisen.

**Offen / nicht geprüft:** Lehrplan Hessen und KMK nicht gelesen. Fehlvorstellungen aus eigener Fachkenntnis, nicht aus Quelle belegt.
**Fund für Orchestrator:** Karte verlangt für `winkel-messen` nur `grundfiguren-eben`; der Issue-Text führt Winkel als Drehung ein. Kein Widerspruch, nur Hinweis.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Recherche freigegeben, weiter mit dem Plan (Orchestrator in Vertretung). Kapitel 3: Symmetrie und Bewegungen auf getrennten Seiten; Koordinatensystem nur erster Quadrant.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal: laut Issue lernapps/apps#397 (Leitidee: Grundbegriffe der ebenen Geometrie, Zeichnen, Winkel, Symmetrie, Abbilden). Orchestrator in Vertretung: Auftrag ist ohne Rückfrage umzusetzen.
- Learners: Mathematik, Stufen 5–6; Vorwissen: natürliche Zahlen.
- Model and focus: an app of the catalog (https://lernapps.net/apps/llms.txt) as model; what matters most (exercises,
  visualisations, game feel).
- Hurdles: misconceptions and mistakes of the learners; the creator's examples and experiments.
- Content: who writes it (creator, you, from sources); own material (worksheets, tests).
- Amount: alle 9 Bausteine, mindestens 3 Aufgaben je Baustein (Regeln 3.1).
- Languages: Deutsch (guess).
- Look and feel: fixed by the archetype.
- Terms: the creator's words for the main things in the app, used everywhere.
- Finding the app: what teachers and parents would search for.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Plan und Content method bestätigt (Orchestrator in Vertretung). Weiter mit Code: Musterseite koordinaten zuerst.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

**Aufbau:** `src/app.yaml` (`format: 2`, `strand: mathematik/geometrie`, nur `de`), Kapitel `punkte-linien`, `figuren-winkel`, `abbilden`.
Gemeinsame Abschnitts-IDs je Seite: `einstieg` (erste leichte Handlung vor der Erklärung), `erklaerung`, `beispiel`, `uebung`.
**Roter Faden:** eine Schatzkarte; jede Konstruktion/Abbildung liefert einen Hinweis. Zwei erfundene Kinder (Namen/Aussehen einmal im Content-Guide „Figures“), eine Szene je Seite (Stufe 5–6).
**Darstellungen (einheitlich benannt):** Geodreieck und Zirkel als SVG-Zeichnung in nummerierten Schritten; „Spielbrett“ = Koordinatensystem, erster Quadrant, Achsen als Zahlenstrahl (nicht „Zahlengerade“).
**Voraussetzungen außerhalb des Strangs:** nur `arithmetik/natuerliche-zahlen` (für `koordinatensystem`): Sammel-Wiederholung `wiederholung` am Anfang von Kapitel 1. Alle anderen Voraussetzungen liegen im Strang und werden geübt.

**Komponenten (nur wo kein Block passt, `prefer-built-in-block`) und ihre Lernhandlung:**
- `Spielbrett` (Übung): Die Lernenden setzen einen Punkt per Klick, Pfeiltasten oder Eingabe (x | y) und prüfen; so üben sie, erst x, dann y zu lesen. Prüft Lage; zeigt vor „Prüfen“ keine Lösung. Kann nur den ersten Quadranten. `nojs`-Text: Aufgabe und Lösung als Tabelle.
- `FigurZiehen` (Darstellung): Die Lernenden ziehen Eckpunkte (Maus oder Pfeiltasten) und beobachten, welche Eigenschaften (Seiten, Winkel, Parallelität) bleiben. Text vorher benennt Bedienung und was zu beobachten ist; Textalternative beschreibt die Zustände.
- `WinkelAblesen` (Übung): Geodreieck-Skala; Winkel ablesen. Kann keine freie Zeichnung.
Alles andere mit Blöcken: `image` (SVG), `generated` (Zufallswerte mit Rechenprobe), Auswahl-/Zuordnungsaufgaben, `table`, `definition`.
**Selbsteinschätzung:** Skill `lernapps-explainer-self-assessment`, je Kapitel `selfAssessment`; Abweichung: keine geplant.

**Baustein → Seite → Übungen (Einstieg zuerst; steigend):**

| Kap. | Seite | Baustein | Einstieg → Übungen |
|---|---|---|---|
| 1 | `wiederholung` | recap natuerliche-zahlen | Text, ohne Übung |
| 1 | `grundbegriffe` | geometrische-grundbegriffe | Gleise, Fensterkreuz nachzeichnen; `matching` Punkt/Strecke/Gerade, `multiple-choice` Alltag, `generated` Strecken zwischen Punkten |
| 1 | `parallel-senkrecht` | parallel-senkrecht-abstand | Geodreieck anlegen (SVG-Schritte); `ordering` Zeichenschritte, `generated` Abstand (Fehler: schräg gemessen) |
| 1 | `koordinaten` (**Muster**) | koordinatensystem | Schiffe versenken; `Spielbrett`, `generated` Punkt ablesen (Fehler: x/y vertauscht), Figur aus Punkten |
| 2 | `grundfiguren` | grundfiguren-eben | Figuren in der Umgebung; `matching`, `multiple-choice` (Quadrat ist Rechteck), `generated` Ecken/Seiten |
| 2 | `winkel` | winkel-messen | Tür/Uhrzeiger als Drehung; `WinkelAblesen`, `generated` Winkelart (Fehler: falsche Skala) |
| 2 | `vierecke` | vierecke-grundfiguren | `FigurZiehen`: was bleibt?; `matching` Viereck–Eigenschaft, `generated` |
| 2 | `konstruieren` | konstruktionen | Zirkelschritte (`ordering`), `generated` Radius/Seitenlängen (Fehler: Radius falsch) |
| 3 | `symmetrie` | symmetrie | Falten, Klecksbild; Achsen zählen (`generated`), Punkt-/Drehsymmetrie `multiple-choice` (Fehler: Diagonale beim Rechteck) |
| 3 | `spiegeln` | bewegungen-figuren (Spiegeln) | Spiegelbild im Spielbrett; `Spielbrett`, `generated` Bildpunkt an Achse |
| 3 | `verschieben-drehen` | bewegungen-figuren (Verschieben, Drehen) | Pfeil, Drehpunkt + Winkel; `generated` Bildpunkt (Fehler: Pfeil umgekehrt); Bildpunkte bleiben im ersten Quadranten |

Pro Baustein ≥3 Aufgaben (bei `bewegungen-figuren` zusammen über zwei Seiten, je ≥3). Schreibweisen: Komma, ·, :, −, geschützte Leerzeichen; Brüche gesetzt.
**Engagement je Seite (Einstieg · Wechsel · Belohnung · Geschichte):**
- `wiederholung`: Einstieg: drei Ich-kann-Sätze zum Selbstcheck im Kopf · Wechsel: Text, Beispiel · Belohnung: „Du kannst jetzt eine Zahl auf dem Zahlenstrahl finden“ · Geschichte: Nika und Jonas finden eine Schatzkarte mit Zahlenrand.
- `grundbegriffe`: Gleise/Fensterkreuz nachzeichnen, Linienart benennen · Wechsel: schauen, zuordnen, zählen · Belohnung: erste Linie der Karte ist eingezeichnet · Geschichte: Weg zum ersten Hinweis folgt Geraden und Strecken.
- `parallel-senkrecht`: Einstieg: zwei Gleise, die sich nie treffen · Wechsel: Schritte lesen, ordnen, messen · Belohnung: du kannst Parallele und Senkrechte zeichnen · Geschichte: der Hinweis liegt senkrecht zum Weg.
- `koordinaten`: Einstieg: Schiffe versenken, einen Treffer setzen (vor der Erklärung) · Wechsel: setzen, ablesen, Figur aus Punkten · Belohnung: die Schatzkarte zeigt jetzt ihr Gitter · Geschichte: der Schatz liegt auf (x | y), das Gitter der Karte.
- `grundfiguren`: Einstieg: Figuren im Zimmer benennen · Wechsel: zuordnen, entscheiden, zählen · Belohnung: du kannst Figuren nach Eigenschaften beschreiben · Geschichte: Stempel der Karte zeigen Figuren.
- `winkel`: Einstieg: Tür öffnen, Uhrzeiger · Wechsel: Drehung beobachten, ablesen, einteilen · Belohnung: Winkel messen und zeichnen · Geschichte: der Hinweis nennt eine Richtung als Winkel.
- `vierecke`: Einstieg: ein Viereck ziehen, sehen, was bleibt · Wechsel: ziehen, zuordnen · Belohnung: Viereckshierarchie · Geschichte: Rätselfelder der Karte sind Vierecke.
- `konstruieren`: Einstieg: mit dem Zirkel einen Kreis um den Schatzpunkt · Wechsel: Schritte ordnen, berechnen · Belohnung: Konstruktion fertig, nächster Hinweis · Geschichte: Zirkelkreis grenzt den Fundort ein.
- `symmetrie`: Einstieg: Papier falten, Klecksbild · Wechsel: falten, zählen, entscheiden · Belohnung: Symmetrien erkennen · Geschichte: die Karte ist nur halb – die andere Hälfte ist ihr Spiegelbild.
- `spiegeln`: Einstieg: Punkt an der Achse spiegeln · Wechsel: setzen, bestimmen · Belohnung: du kannst spiegeln · Geschichte: die andere Kartenhälfte entsteht.
- `verschieben-drehen`: Einstieg: Figur um einen Pfeil schieben · Wechsel: Pfeil/Winkel angeben, bestimmen · Belohnung: Rückblick auf das Kapitel · Geschichte: der Schatz ist gefunden.

**Neues Kapitel später:** YAML-Seiten in `src/<kapitel>/`, in `chapter.yaml` eintragen, Content-Guide ergänzen.

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite kapitel punkte-linien/koordinaten: Kapitelgerüst, app.yaml, Content-Guide Figures, Komponente Spielbrett (Tastatur, Textalternative), Schatzkarten-Szene, ≥3 Aufgaben mit Rückmeldung
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Musterseite angenommen, die übrigen 10 Seiten dürfen nach diesem Muster entstehen (Orchestrator in Vertretung).
- [x] Kapitel 1: Seiten wiederholung (recap), grundbegriffe und parallel-senkrecht, je ≥3 Aufgaben
- [x] Kapitel 2: Seiten grundfiguren und winkel (Komponente WinkelAblesen)
- [x] Kapitel 2: Seiten vierecke (Komponente FigurZiehen) und konstruieren
- [x] Kapitel 3: Seiten symmetrie, spiegeln und verschieben-drehen, Bildpunkte im ersten Quadranten
- [x] Selbsteinschätzung je Kapitel nach Skill lernapps-explainer-self-assessment
- [x] Zwei Prüfer starten (Lernenden-Prüfer, fachlicher Prüfer, beide ohne Beteiligung am Schreiben), Befunde getrennt im Plan unter Review, Fehler beheben
<!-- tasks: pages (6 added): the other pages or screens, after the pattern -->
- [x] Update the content guide so that it describes the app as built (`app-content-matches`).
- [x] Run `npx --no -- lernapps check` until it passes.
- [x] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [x] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [x] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [x] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [x] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

Commit (Veröffentlichen gemeldet, nicht gemergt). Checkpoints: Recherche, Plan, Musterseite mit Ja des Orchestrators in Vertretung; Veröffentlichen wartet auf das Ja. Vorschau-PR #1 grün (`app`, `preview`).

### Creator turns after the plan

Eine Rückmeldung nach der Planbestätigung: Musterseite angenommen (Orchestrator in Vertretung). Zwei Hinweise des Orchestrators ohne Rückfrage (Winkelnotation `∠`, Schichtenreihenfolge). Keine Rückfragen von mir nach dem Plan.

### Where I had to guess

- Nur Deutsch (guess); Seitenschnitt (11 Seiten); kein `scope`.
- Trapez = genau ein Paar paralleler Seiten (guess; der fachliche Prüfer hätte „mindestens“ bevorzugt).
- Zehn Hinweise der Schatzkarte als roter Faden (guess; die Regeln nennen keine Form der Geschichte), zwei erfundene Kinder Nika und Jonas.
- Schema verlangt je Frage einen https-Link, die Regeln verbieten Weiterlesen-Links: Verweis auf die Kartenseite des Bausteins.
- Pages und Standard-Branch auf GitHub nicht geprüft (API über den Proxy gesperrt); das Skript des Orchestrators hat sie angelegt, die Vorschau lief.
- Prozess: Ich habe einzelne Plan-Tasks abgehakt, bevor ich sie ausgeführt hatte (u. a. `skills --archetype`, Entscheidung `scope`); beides nachgeholt.
- Geschützte Leerzeichen in Überschriften nicht möglich (Runtime-Test), nur im Fließtext.
- `lernapps check` lief unter Node 22, CI unter Node 26 (Warnung des Tools).

## Review

Die Prüfer haben nichts geschrieben. Sie wurden als Unteragenten der Session gestartet (nach der Musterseite und nach allen Seiten); ihre Befunde sind eingearbeitet, soweit unten nicht als offen genannt.

### Lernenden-Prüfer (Klasse 5)

- Musterseite (1. Lauf): „Nullpunkt“ und „Achse“ vor der Erklärung, Einstiegsaufgabe verriet die Lösung, Beispiel ohne Bild, „Felder“ statt Schritte, Grammatik („1 Felder“), Spielbrett ohne Bedienhinweis, Eingabe setzte y auf 0, Marker wie „Schließen“-Knopf. Behoben.
- Ganze App (2. Lauf): Nika und Jonas nicht eingeführt (Auftritt jetzt auf `grundbegriffe`), „Mara“ ohne Einführung (jetzt Nika), Hinweise der Karte nicht fortlaufend (jetzt zehn Hinweise), „Schiff“ ohne Erklärung, Ende ohne Schluss (Abschnitt `rueckblick`), „rechter Winkel“/„Geodreieck“ vor Einführung, „Radius“, „Kreisbogen“, „Schnittpunkt“, „Diagonale“, „regelmäßig“ ohne Einführung, Ordering mit zwei richtigen Reihenfolgen (Bögen), Trapez-Zuordnung mehrdeutig, Rückmeldung verriet Lösung (WinkelAblesen), Eingabe „110°“ gesperrt, Glossar zu klein. Behoben, soweit im Text möglich.
- Dev-Server: `WinkelAblesen` und `FigurZiehen` liefen dort nicht, weil die Komponenten nach dem Start des Servers entstanden (Insel-Modul veraltet); im gebauten `dist/` und in den End-zu-End-Tests laufen sie.
- Offen (Runtime, nicht in diesem Repo änderbar): Rückmeldung bei Zuordnung und Reihenfolge nennt nur „Richtig zugeordnet: 1 von 4“ ohne Warum; der „Lösung“-Knopf zeigte nichts Sichtbares; Satz der Selbsteinschätzung „Sie fragt jede Seite ab“ gilt nicht für Wiederholungsseiten.
- Offen (inhaltlich, bewusst nicht gebaut): Zeichnen und Messen mit echtem Geodreieck kann die App nicht (nur Schritte ordnen und Ablesen am Bild); Bewegungen üben einzelne Punkte, keine Figuren; Spiegeln nur an x = 4, Drehen nur 90° um Z(3 | 2); kein überstumpfer Winkel im Ablesen.

### Fachlicher Prüfer

- Nachgerechnet: alle `generated`-Aufgaben über den vollen Wertebereich (kein Fehlerwert gleich der Lösung, nichts unlösbar), Komponentenlogik (Spielbrett 2000 Seeds je Modus, FigurZiehen alle Eckenkombinationen im Gitter 0 bis 4, WinkelAblesen), alle `examples`.
- Fehler, behoben: falsches Verfahren für die Parallele mit der Mittellinie (jetzt lange Kante, Lineal an kurzer Kante; Mittellinie nur bei der Senkrechten); `dreieck-konstruktion.svg` zeigte keine Bögen durch C; Rückmeldung bei `verschieben-p` (x und y des Ergebnisses vertauscht); `quadrat-entsteht` und `vier-rechte-winkel` (Quadrat auch Raute); „ein: Raute“; Seitenbezeichnung a, b, c nicht eingeführt; Tür „halb“ geöffnet bei 70° (jetzt 90°); „ab 1 gezählt“ war umgekehrt (jetzt zu weit links und unten); Drachen nur konvex; Tabelle Symmetrie mit „kein Quadrat“ und „schief“; „Nur ihre Lage ändert sich“ beim Spiegeln.
- Schreibweisen: geschützte Leerzeichen vor `cm` und Minus U+2212 in angezeigten Rechnungen nachgetragen. Nicht möglich: geschütztes Leerzeichen in Überschriften (Runtime-Test „heading levels follow the nesting“ schlägt dann fehl); dort normales Leerzeichen.
- Offen: Entscheidung Trapez = genau ein Paar paralleler Seiten (Fachprüfer schlug „mindestens“ vor; für 5-6 gewählt, damit jedes Viereck einen Namen hat; (guess)); `winkel-teilen` (Nebenwinkel) und `dreieck-unmoeglich` (Dreiecksungleichung) grenzen an #430, `was-bleibt` an Kongruenz: bewusst als Vorerfahrung drin, dem Orchestrator gemeldet.
- Nicht geprüft: Kartenseiten auf lernapps.net (ob die Karte weitere Inhalte der Bausteine verlangt), Lehrplan Hessen/KMK.

### Recap nach Regel 7 (Auftrag des Menschen über den Orchestrator)

- Anzahl Recaps: 1 (`punkte-linien/wiederholung`, Baustein `natuerliche-zahlen`, die einzige Voraussetzung von außen laut `requires` der Karte). Neu: Kopf „Wofür diese Seite da ist“, ein Abschnitt je Baustein, Begriffe als Definition (natürliche Zahlen, Ziffer, Zahlenstrahl, Stellenwert, alle im Glossar), Abbildung Zahlenstrahl, Beispielkasten, Selbsttest mit Lösung und Fehlerhinweisen, Verweis auf die Kartenseite, Checkliste „Du bist bereit, wenn du …“.
- Der Block `recap` erlaubt keine Aufgaben (Build lehnt `generated` ab), und eine Seite mit Strang braucht `competencies`. Der Selbsttest ist deshalb Text im Kasten mit sichtbarer Lösung, keine Eingabe mit sofortiger Rückmeldung. Fund fürs Werkzeug.
- Lernenden-Prüfer (nur Recap): Beurteilung „ja, mit Einschränkung“. Befunde behoben: „Ziffer“ und „natürliche Zahlen“ ohne Erklärung und Glossar, Beispiel zum Stellenwert im Fließtext, holprige Bildunterschrift, Checkliste in Ich- und Du-Form gemischt, doppelte Überschrift. Offen: Lösung des Selbsttests steht sichtbar im Kasten (Werkzeug); Verweis führt aus der App auf lernapps.net; Kopf der Runtime-Seite (KI-Tutor-Link, Inhaltsverzeichnis) nicht änderbar.
- Fachlicher Prüfer (nur neue Texte): Rechnungen richtig (305, 5 + 3, 427, Fehlerwerte 3, 2, 724, 13). Behoben: Definition Stellenwert (Wert der Stelle, Ziffer mal Stellenwert), „immer eine mehr“, gleiche Abstände der Marken, typischer Zählfehler 9, Abbildung mit drei Bögen. Offen: Umkehraufgabe „Zahl am Punkt ablesen“ fehlt, weil keine Aufgaben im Recap möglich; Zahlen nur bis dreistellig (für Achsen 0 bis 8 genug); Lehrplantext nicht gelesen.
- Prüfung auf fehlende Recaps: Kapitel 2 und 3 brauchen laut `requires` nur Bausteine dieses Explainers. Nicht in `requires`, aber benutzt: Grundrechenarten (Subtraktion, Multiplikation, Division in einigen Aufgaben) und Längen in cm. Kein Recap angelegt (Fund für die Karte).
- Nachbesserung Kurztest: Der Selbsttest im Recap nutzt jetzt die Komponente `Kurztest` des Orchestrators (Frage mit Auswahl, Rückmeldung mit Grund, Tastatur, `nojs`-Text), drei Tests statt zwei. Lernenden-Prüfer (nur Recap, zweiter Lauf): Tests klar, sofort, per Tastatur und ohne JavaScript nutzbar; Beurteilung „teilweise“. Behoben: Satz nach den Tests (Antwort darf neu gewählt werden, alle drei richtig = bereit), dritter Test zum Ziffernwert, damit die Checkliste geprüft wird. Offen: Zahlenstrahl-Bild zeigt 0 bis 3, Test geht von 5 aus; „Stellenwertsystem“ nicht eigens erklärt; technischer Name im Eingangskasten und KI-Tutor-Link der Runtime nicht änderbar.

### Durchgang nach Regel 9 (Rückmeldungen des Menschen)

- Geändert: Punkt 6 `links:` an allen Aufgaben entfernt (10 Seiten, Build und Check ohne). Punkt 4 Kurztests schwerer (48 + 37, 3058, Wert der 7 in 4705; Antwortreihenfolge gemischt). Punkt 2 die Hinweise der Schatzkarte als Erzählung („Nika und Jonas lesen …“) statt Verweis auf eine Karte, die nicht zu sehen ist (9 Seiten); „Achsen“ im ersten Einstieg durch „Rand“ ersetzt; Zuordnung der Punkte ohne Buchstaben in den Antworten. Punkte 3 und 5 `verschieben-drehen`: Pfeil, Drehung und Bildpunkt vor der ersten Aufgabe in Worten; Pfeil und Drehzeichen als Legende neben dem Brett; nach einer richtigen, geprüften Antwort zeichnet das Brett den Weg von P nach P' (Pfeil, Bogen, Spiegelweg); Beispielbilder neu gezeichnet. Punkt 1 betrifft keine Seite (kein Abschnitt „Was du hier kannst“).
- Lernenden-Prüfer (Recap, `koordinaten`, `verschieben-drehen`): Befunde zu Pfeil/Drehung im Beispielbild, Drehsymbol, Hinweis zum Pfeil vor der ersten Aufgabe, „P'“ und „Bildfigur“ ungeklärt, Antworten der Zuordnung mit Buchstaben, Antwort der Kurztests immer an erster Stelle: behoben. Offen (Runtime): Rückmeldung „Lies dazu noch einmal den Text über der Aufgabe“ passt nicht überall; „Tipp“-Knopf ohne sichtbare Wirkung beim Prüfer ungeklärt.
