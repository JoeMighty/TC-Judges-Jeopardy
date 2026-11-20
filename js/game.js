(function () {
  "use strict";

  var DATA = window.GAME_DATA;
  var STORAGE_KEY = "tc-games:judges-jeopardy";
  var $ = function (sel) { return document.querySelector(sel); };

  /* ---------- State ---------- */

  function freshState() {
    return { mode: null, players: [], used: {}, awards: {}, screen: "title", current: null };
  }

  var state = freshState();

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function clearSaved() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  function withAnswers() { return state.mode === "answers"; }

  function scoring() { return state.players.length > 0; }

  function syncAward() {
    var answerHidden = $("#answer").hidden;
    $("#award").hidden = !scoring() || (withAnswers() && answerHidden);
    if (!$("#award").hidden) renderAward();
  }

  function clueId(c, r) { return c + "-" + r; }

  function getClue(id) {
    if (id === "bonus") return DATA.bonus;
    var parts = id.split("-");
    return DATA.categories[+parts[0]].clues[+parts[1]];
  }

  function totalClues() {
    return DATA.categories.reduce(function (n, cat) { return n + cat.clues.length; }, 0);
  }

  function usedCount() {
    return Object.keys(state.used).filter(function (k) { return k !== "bonus"; }).length;
  }

  function scoreOf(i) {
    var p = state.players[i];
    var total = p.adjust || 0;
    Object.keys(state.awards).forEach(function (id) {
      var a = state.awards[id];
      if (id === "bonus") { total += (a[i] || 0); return; }
      if (a.indexOf(i) !== -1) total += getClue(id).points;
    });
    return total;
  }

  /* ---------- Helpers ---------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function lookup(path) {
    return path.split(".").reduce(function (o, k) { return o && o[k]; }, DATA);
  }

  function fillLines(node, lines) {
    node.textContent = "";
    lines.forEach(function (line, i) {
      if (i) node.appendChild(document.createElement("br"));
      node.appendChild(document.createTextNode(line));
    });
  }

  /* ---------- Static content ---------- */

  function renderStatic() {
    document.querySelectorAll("[data-text]").forEach(function (n) {
      n.textContent = lookup(n.getAttribute("data-text"));
    });

    fillLines($(".rules-heading"), DATA.rules.heading);

    var cards = $("#notecards");
    DATA.rules.cards.forEach(function (text, i) {
      var li = el("li", "notecard nc-" + (i + 1));
      li.appendChild(el("span", null, text));
      cards.appendChild(li);
    });

    var legend = $("#legend");
    DATA.board.legend.forEach(function (t) { legend.appendChild(el("li", "pill pill-sm", t)); });
  }

  /* ---------- Board ---------- */

  function renderBoard() {
    var board = $("#board");
    board.textContent = "";
    DATA.categories.forEach(function (cat, c) {
      var row = el("div", "board-row");
      row.setAttribute("role", "row");
      row.appendChild(el("div", "cat-label", cat.label)).setAttribute("role", "rowheader");
      var tiles = el("div", "tiles");
      cat.clues.forEach(function (clue, r) {
        var id = clueId(c, r);
        var b = el("button", "tile", String(clue.points));
        b.type = "button";
        b.setAttribute("role", "gridcell");
        b.setAttribute("aria-label", cat.label + ", " + clue.points + (state.used[id] ? ", done" : ""));
        b.dataset.action = "clue";
        b.dataset.id = id;
        if (state.used[id]) b.classList.add("is-used");
        tiles.appendChild(b);
      });
      row.appendChild(tiles);
      board.appendChild(row);
    });

    var bonus = $("#bonus-tile");
    bonus.classList.toggle("is-used", !!state.used.bonus);
    bonus.classList.toggle("is-ready", usedCount() === totalClues() && !state.used.bonus);

    renderScores();
  }

  function renderScores() {
    var sb = $("#scoreboard");
    sb.hidden = !scoring();
    if (!scoring()) return;
    var list = $("#scores");
    list.textContent = "";
    state.players.forEach(function (p, i) {
      var li = el("li", "score");
      li.appendChild(el("span", "score-name", p.name));
      var ctl = el("span", "score-ctl");
      var minus = el("button", "score-adj", "−");
      minus.type = "button";
      minus.dataset.action = "adjust"; minus.dataset.player = i; minus.dataset.delta = -1;
      minus.setAttribute("aria-label", "Take 1 point from " + p.name);
      var plus = el("button", "score-adj", "+");
      plus.type = "button";
      plus.dataset.action = "adjust"; plus.dataset.player = i; plus.dataset.delta = 1;
      plus.setAttribute("aria-label", "Give 1 point to " + p.name);
      ctl.appendChild(minus);
      ctl.appendChild(el("span", "score-num", String(scoreOf(i))));
      ctl.appendChild(plus);
      li.appendChild(ctl);
      list.appendChild(li);
    });
  }

  /* ---------- Players ---------- */

  function renderPlayers() {
    var list = $("#player-list");
    list.textContent = "";
    state.players.forEach(function (p, i) {
      var li = el("li", "player");
      li.appendChild(el("span", null, p.name));
      var rm = el("button", "player-remove", "×");
      rm.type = "button";
      rm.dataset.action = "remove-player";
      rm.dataset.player = i;
      rm.setAttribute("aria-label", "Remove " + p.name);
      li.appendChild(rm);
      list.appendChild(li);
    });
    var ok = state.players.length > 0;
    $("#players-done").disabled = !ok;
    $("#player-hint").hidden = ok;
  }

  /* ---------- Clue ---------- */

  function openClue(id) {
    var clue = getClue(id);
    state.current = id;
    state.used[id] = true;

    fillLines($("#clue-title"), clue.title);
    fillLines($("#clue-question"), clue.question);
    $("#clue-question").classList.toggle("is-long", clue.question.join(" ").length > 90);

    $("#answer-text").textContent = clue.answer;
    $("#answer-ref").textContent = clue.ref || "";
    $("#answer").hidden = true;
    $("#reveal-btn").hidden = !withAnswers();
    $("#reveal-btn").textContent = "Reveal answer";

    syncAward();
    resetTimer();
    show("clue");
  }

  function revealAnswer() {
    var ans = $("#answer");
    var showing = ans.hidden;
    ans.hidden = !showing;
    $("#reveal-btn").textContent = showing ? "Hide answer" : "Reveal answer";
    syncAward();
  }

  function renderAward() {
    var id = state.current;
    var isBonus = id === "bonus";
    var wrap = $("#award-list");
    wrap.textContent = "";

    if (!state.players.length) { $("#award").hidden = true; return; }

    $("#award-label").textContent = isBonus
      ? "Give points for each correct name"
      : "Who got it? Tap to add " + getClue(id).points + (getClue(id).points === 1 ? " point" : " points");

    state.players.forEach(function (p, i) {
      if (isBonus) {
        var a = state.awards.bonus || {};
        var box = el("div", "award-bonus");
        box.appendChild(el("span", "award-name", p.name));
        var m = el("button", "score-adj", "−");
        m.type = "button"; m.dataset.action = "bonus-adj"; m.dataset.player = i; m.dataset.delta = -1;
        m.setAttribute("aria-label", "Take 1 bonus point from " + p.name);
        var n = el("span", "score-num", String(a[i] || 0));
        var pl = el("button", "score-adj", "+");
        pl.type = "button"; pl.dataset.action = "bonus-adj"; pl.dataset.player = i; pl.dataset.delta = 1;
        pl.setAttribute("aria-label", "Give 1 bonus point to " + p.name);
        box.appendChild(m); box.appendChild(n); box.appendChild(pl);
        wrap.appendChild(box);
      } else {
        var winners = state.awards[id] || [];
        var on = winners.indexOf(i) !== -1;
        var b = el("button", "award-chip" + (on ? " is-on" : ""), p.name);
        b.type = "button";
        b.dataset.action = "award";
        b.dataset.player = i;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        wrap.appendChild(b);
      }
    });
  }

  function toggleAward(i) {
    var id = state.current;
    var list = state.awards[id] || (state.awards[id] = []);
    var at = list.indexOf(i);
    if (at === -1) list.push(i); else list.splice(at, 1);
    if (!list.length) delete state.awards[id];
    save();
    renderAward();
  }

  function adjustBonus(i, d) {
    var a = state.awards.bonus || (state.awards.bonus = {});
    a[i] = Math.max(0, (a[i] || 0) + d);
    save();
    renderAward();
  }

  /* ---------- Timer ---------- */

  var timer = { id: null, left: 0 };
  var RING = 2 * Math.PI * 19;

  function paintTimer() {
    var secs = DATA.timerSeconds;
    $("#timer-num").textContent = String(timer.left);
    $("#timer-ring").style.strokeDashoffset = String(RING * (1 - timer.left / secs));
    var t = $("#timer");
    t.classList.toggle("is-low", timer.id !== null && timer.left <= 5 && timer.left > 0);
    t.classList.toggle("is-done", timer.left === 0);
  }

  function resetTimer() {
    clearInterval(timer.id);
    timer.id = null;
    timer.left = DATA.timerSeconds;
    $("#timer").classList.remove("is-running");
    $("#timer-label").textContent = "Start timer";
    paintTimer();
  }

  function toggleTimer() {
    if (timer.id !== null || timer.left === 0) { resetTimer(); return; }
    $("#timer").classList.add("is-running");
    $("#timer-label").textContent = "Tap to reset";
    timer.id = setInterval(function () {
      timer.left -= 1;
      if (timer.left <= 0) {
        timer.left = 0;
        clearInterval(timer.id);
        timer.id = null;
        $("#timer").classList.remove("is-running");
        $("#timer-label").textContent = "Time’s up";
        chime();
      }
      paintTimer();
    }, 1000);
    paintTimer();
  }

  var audioCtx = null;
  function chime() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.18].forEach(function (offset, k) {
        var o = audioCtx.createOscillator();
        var g = audioCtx.createGain();
        o.type = "sine";
        o.frequency.value = k ? 523.25 : 659.25;
        g.gain.setValueAtTime(0.0001, audioCtx.currentTime + offset);
        g.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + offset + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + offset + 0.5);
        o.connect(g).connect(audioCtx.destination);
        o.start(audioCtx.currentTime + offset);
        o.stop(audioCtx.currentTime + offset + 0.55);
      });
    } catch (e) { /* audio unavailable */ }
  }

  /* ---------- Final ---------- */

  function renderFinal() {
    var ranked = state.players.map(function (p, i) { return { name: p.name, score: scoreOf(i) }; })
      .sort(function (a, b) { return b.score - a.score; });
    var list = $("#final-list");
    list.textContent = "";
    ranked.forEach(function (p) {
      var li = el("li", "final-row");
      li.appendChild(el("span", null, p.name));
      li.appendChild(el("strong", null, String(p.score)));
      list.appendChild(li);
    });
    var top = ranked.length ? ranked[0].score : 0;
    var winners = ranked.filter(function (p) { return p.score === top; });
    $("#winner").textContent = !ranked.length ? "No players"
      : winners.length > 1 ? "It’s a tie!" : winners[0].name + " wins!";
  }

  /* ---------- Navigation ---------- */

  function show(name) {
    if (name !== "clue") resetTimer();
    if (name === "board") renderBoard();
    if (name === "players") renderPlayers();
    if (name === "final") renderFinal();

    document.querySelectorAll(".screen").forEach(function (s) {
      s.classList.toggle("is-active", s.dataset.screen === name);
    });
    document.body.dataset.screen = name;
    $("[data-action='go-board'].tool").hidden = !(name === "clue" || name === "final");
    state.screen = name;
    if (state.mode) save();
    window.scrollTo(0, 0);

  }

  function newGame() {
    clearSaved();
    state = freshState();
    $("#confirm").close && $("#confirm").open && $("#confirm").close();
    updateResume();
    show("title");
  }

  function updateResume() {
    var saved = load();
    $("[data-action='resume']").hidden = !(saved && saved.mode && saved.screen !== "title");
  }

  /* ---------- Events ---------- */

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-action]");
    if (!t || t.disabled) return;
    var a = t.dataset.action;

    switch (a) {
      case "start": show("mode"); break;
      case "resume":
        var saved = load();
        if (saved) { state = saved; show(saved.screen === "clue" ? "board" : saved.screen); }
        break;
      case "go": show(t.dataset.to); break;
      case "mode":
        state.mode = t.dataset.mode;
        show("players");
        break;
      case "remove-player":
        state.players.splice(+t.dataset.player, 1);
        renderPlayers();
        break;
      case "players-done": show("rules"); break;
      case "skip-scoring": state.players = []; state.awards = {}; show("rules"); break;
      case "go-board": show("board"); break;
      case "clue": openClue(t.dataset.id); break;
      case "bonus": openClue("bonus"); break;
      case "reveal": revealAnswer(); break;
      case "award": toggleAward(+t.dataset.player); break;
      case "bonus-adj": adjustBonus(+t.dataset.player, +t.dataset.delta); break;
      case "adjust":
        var p = state.players[+t.dataset.player];
        p.adjust = (p.adjust || 0) + (+t.dataset.delta);
        save();
        renderScores();
        break;
      case "timer": toggleTimer(); break;
      case "final": show("final"); break;
      case "fullscreen": toggleFullscreen(); break;
      case "new-game":
        if (!state.mode) { newGame(); break; }
        var dlg = $("#confirm");
        if (typeof dlg.showModal === "function") dlg.showModal();
        else if (window.confirm("Start a new game? The board and scores will be cleared.")) newGame();
        break;
    }
  });

  $("#confirm").addEventListener("close", function () {
    if (this.returnValue === "ok") newGame();
  });

  $("#player-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("#player-name");
    var name = input.value.trim();
    if (!name) return;
    state.players.push({ name: name, adjust: 0 });
    input.value = "";
    renderPlayers();
    input.focus();
  });

  function toggleFullscreen() {
    var d = document;
    if (!d.fullscreenElement && !d.webkitFullscreenElement) {
      var r = d.documentElement;
      (r.requestFullscreen || r.webkitRequestFullscreen || function () {}).call(r);
    } else {
      (d.exitFullscreen || d.webkitExitFullscreen || function () {}).call(d);
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    if ($("#confirm").open) return;
    var k = e.key.toLowerCase();
    if (k === "f") { toggleFullscreen(); }
    else if (state.screen === "clue") {
      if (k === "escape" || k === "b") show("board");
      else if (k === "t") toggleTimer();
      else if (k === "a" && withAnswers()) revealAnswer();
    } else if (state.screen === "final" && k === "escape") {
      show("board");
    }
  });

  /* ---------- Boot ---------- */

  renderStatic();
  updateResume();
  show("title");
})();
