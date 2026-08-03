/* =========================================================
   APP.JS — Descubra sua Casa | SON
   Lógica das telas, do quiz, da revelação e do resultado.
   Conteúdo em quiz-data.js · links em config.js
   ========================================================= */

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const HOUSE_KEYS = Object.keys(HOUSES);
  const STORE_KEY = "son_casas_v2";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = {
    screens: {
      landing: $("screen-landing"),
      quiz: $("screen-quiz"),
      loading: $("screen-loading"),
      result: $("screen-result")
    },
    landingShields: $("landing-shields"),
    quizShields: $("quiz-shields"),
    loadingShields: $("loading-shields"),
    beam: $("loading-beam"),
    loadingStage: $("loading-stage"),
    loadingTag: $("loading-tag"),
    progressFill: $("progress-fill"),
    progressTrack: $("progress-track"),
    progressMessage: $("progress-message"),
    qCurrent: $("q-current"),
    qTotal: $("q-total"),
    question: $("question-text"),
    options: $("options-wrap"),
    toast: $("toast")
  };

  const state = { index: 0, answers: [] };

  /* ---------- escudos ---------- */
  function shieldMarkup(key) {
    const h = HOUSES[key];
    return `<img src="${h.image}" alt="Escudo da ${h.name}" width="240" height="320" loading="lazy" decoding="async">`;
  }

  function paintShieldRows() {
    const row = HOUSE_KEYS.map((k) => `<li data-house="${k}">${shieldMarkup(k)}</li>`).join("");
    el.landingShields.innerHTML = row;
    el.quizShields.innerHTML = row;
    el.loadingShields.innerHTML = row;
  }

  /* ---------- navegação entre telas ---------- */
  function show(name) {
    Object.values(el.screens).forEach((s) => s.classList.remove("active", "leaving"));
    el.screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => el.toast.classList.remove("show"), 2600);
  }

  const wait = (ms) => new Promise((r) => window.setTimeout(r, reduce ? Math.min(ms, 120) : ms));

  /* ---------- quiz ---------- */
  function progressText(ratio) {
    const found = PROGRESS_MESSAGES.find((m) => ratio < m.until);
    return found ? found.text : "";
  }

  function renderQuestion() {
    const q = QUESTIONS[state.index];
    const total = QUESTIONS.length;
    const ratio = state.index / total;

    el.qTotal.textContent = String(total);
    el.qCurrent.textContent = String(state.index + 1);
    el.progressFill.style.width = (ratio * 100).toFixed(1) + "%";
    el.progressTrack.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
    el.progressMessage.textContent = progressText(ratio);

    // brilho progressivo nos escudos conforme a jornada avança
    const lit = Math.round(ratio * HOUSE_KEYS.length);
    Array.from(el.quizShields.children).forEach((li, i) => {
      li.classList.toggle("lit", i < lit);
    });

    el.question.textContent = q.text;
    el.question.classList.remove("q-enter");
    void el.question.offsetWidth;
    el.question.classList.add("q-enter");

    el.options.innerHTML = q.options
      .map(
        (o, i) =>
          `<button type="button" class="option" role="radio" aria-checked="false" data-i="${i}" style="--d:${0.06 * i}s">${o.text}</button>`
      )
      .join("");
    Array.from(el.options.children).forEach((b, i) => {
      b.classList.add("reveal");
      b.addEventListener("click", () => choose(i));
    });

    $("btn-back").disabled = false;
  }

  async function choose(optionIndex) {
    const buttons = Array.from(el.options.children);
    buttons.forEach((b, i) => {
      b.disabled = true;
      b.classList.add(i === optionIndex ? "selected" : "dimmed");
      if (i === optionIndex) b.setAttribute("aria-checked", "true");
    });

    state.answers[state.index] = optionIndex;
    save();

    await wait(360);
    el.options.classList.add("q-exit");
    await wait(160);
    el.options.classList.remove("q-exit");

    if (state.index < QUESTIONS.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      el.progressFill.style.width = "100%";
      runReveal();
    }
  }

  function goBack() {
    if (state.index === 0) {
      show("landing");
      return;
    }
    state.index -= 1;
    renderQuestion();
  }

  /* ---------- cálculo ---------- */
  function userVector() {
    const v = {};
    TRAITS.forEach((t) => (v[t] = 0));
    state.answers.forEach((optIndex, qIndex) => {
      const opt = QUESTIONS[qIndex] && QUESTIONS[qIndex].options[optIndex];
      if (!opt) return;
      Object.entries(opt.weights).forEach(([t, w]) => {
        if (t in v) v[t] += w;
      });
    });
    return v;
  }

  function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    TRAITS.forEach((t) => {
      const x = a[t] || 0, y = b[t] || 0;
      dot += x * y; na += x * x; nb += y * y;
    });
    if (!na || !nb) return 0;
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  function computeResult() {
    const v = userVector();
    // similaridade de cosseno entre o vetor do jovem e o vetor de cada Casa
    const scores = HOUSE_KEYS.map((k) => ({ key: k, score: cosine(v, HOUSE_PROFILES[k]) }))
      .sort((a, b) => b.score - a.score);

    // normaliza para uma faixa legível (78% – 99%)
    const best = scores[0].score;
    const worst = scores[scores.length - 1].score;
    const span = Math.max(best - worst, 0.0001);
    const compat = Math.round(78 + ((best - worst) / span) * 21);

    // nível de confiança: distância relativa entre 1º e 2º colocado
    const second = scores[1] ? scores[1].score : 0;
    const gap = best > 0 ? ((best - second) / best) * 100 : 0;
    const confidence = {
      gap: Math.round(gap * 10) / 10,
      label: gap >= 12 ? "Alta" : gap >= 5 ? "Boa" : "Equilibrada",
      runnerUp: scores[1] ? HOUSES[scores[1].key].name : ""
    };

    return { vector: v, winner: scores[0].key, compat, confidence, ranking: scores };
  }

  /* ---------- revelação cinematográfica ---------- */
  async function runReveal() {
    const result = computeResult();
    show("loading");

    const items = Array.from(el.loadingShields.children);
    items.forEach((li) => li.classList.remove("dim", "winner"));
    el.loadingStage.classList.remove("on");
    el.beam.classList.remove("on");

    await wait(200);
    el.loadingStage.classList.add("on");

    for (const message of LOADING_SEQUENCE) {
      el.loadingTag.textContent = message;
      el.loadingTag.classList.add("on");
      await wait(1000);
      el.loadingTag.classList.remove("on");
      await wait(260);
    }

    // feixe de luz percorrendo os escudos
    el.loadingTag.textContent = "Sua Casa foi revelada";
    el.loadingTag.classList.add("on");
    el.beam.classList.add("on");
    await wait(1500);

    // revelação: apaga as outras, acende a vencedora
    items.forEach((li) => {
      if (li.dataset.house === result.winner) li.classList.add("winner");
      else li.classList.add("dim");
    });
    await wait(1500);

    renderResult(result);
  }

  /* ---------- resultado ---------- */
  const HOUSE_GLOW = {
    aguia: "rgba(59, 105, 220, 0.42)",
    arvore: "rgba(63, 168, 82, 0.42)",
    grao: "rgba(200, 72, 60, 0.4)",
    cruz: "rgba(140, 92, 226, 0.42)"
  };

  function stars(value, max) {
    const filled = Math.max(1, Math.round((value / max) * 5));
    return (
      '<span class="stars" aria-hidden="true">' +
      "\u2605".repeat(filled) +
      '<span class="off">' + "\u2605".repeat(5 - filled) + "</span></span>"
    );
  }

  function renderResult(result) {
    const house = HOUSES[result.winner];

    $("result-image").src = house.image;
    $("result-image").alt = "Escudo da " + house.name;
    $("result-shield-wrap").style.setProperty("--house-glow", HOUSE_GLOW[result.winner]);

    $("result-name").textContent = house.name.toUpperCase();
    $("result-tagline").textContent = house.tagline;
    $("result-verse").textContent = house.verse;
    $("result-verse-ref").textContent = house.verseRef;
    $("result-desc").textContent = house.description;
    $("result-whyfit").textContent = house.whyFit;

    $("result-live-list").innerHTML = house.whatYouWillLive
      .map((t) => `<li>${t}</li>`)
      .join("");

    // perfil: cinco características mais fortes, em estrelas
    const entries = Object.entries(result.vector).sort((a, b) => b[1] - a[1]);
    const max = entries[0][1] || 1;
    const top = entries.slice(0, 5);
    $("result-profile-list").innerHTML = top
      .map(
        ([t, v]) =>
          `<li><span>${TRAIT_LABELS[t].name}</span>${stars(v, max)}</li>`
      )
      .join("");
    $("result-profile-summary").textContent =
      "Sua caminhada se destaca por " +
      top.slice(0, 3).map(([t]) => TRAIT_LABELS[t].phrase).join(", ") +
      ". São esses traços que aproximam você da " + house.name + ".";

    $("compat-value").textContent = result.compat + "%";
    $("compat-track").setAttribute("aria-valuenow", String(result.compat));
    $("compat-note").textContent =
      "Confiança do discernimento: " + result.confidence.label +
      (result.confidence.runnerUp
        ? " · segunda Casa mais próxima: " + result.confidence.runnerUp +
          " (" + result.confidence.gap + "% de distância)"
        : "");

    // botão dinâmico de WhatsApp
    const label = $("btn-join-label");
    label.textContent = "Entrar na " + house.name;
    $("btn-join-shield").src = house.image;
    $("btn-join").href = joinLink(house, result.compat);

    show("result");
    window.setTimeout(() => {
      $("compat-fill").style.width = result.compat + "%";
    }, 320);

    save({ winner: result.winner, compat: result.compat });
  }

  /* Mensagem montada a partir do template em config.js.
     Sempre passa por encodeURIComponent, senão emojis e quebras
     de linha corrompem o link em parte dos navegadores. */
  function joinMessage(house, compat) {
    const template =
      (typeof WHATSAPP_TEMPLATE !== "undefined" && WHATSAPP_TEMPLATE) ||
      "Olá! Minha Casa no SON é a {{NOME_DA_CASA}} ({{PERCENTUAL}}%).";
    return template
      .replace(/\{\{NOME_DA_CASA\}\}/g, house.name)
      .replace(/\{\{PERCENTUAL\}\}/g, String(compat));
  }

  /* Cada Casa pode ter link de grupo próprio; sem link, cai no
     contato responsável (por Casa, se houver) com a mensagem pronta. */
  function joinLink(house, compat) {
    const key = Object.keys(HOUSES).find((k) => HOUSES[k] === house);
    const direct = (typeof HOUSE_LINKS !== "undefined" && HOUSE_LINKS[key]) || "";
    if (direct) return direct;
    const perHouse = (typeof HOUSE_PHONES !== "undefined" && HOUSE_PHONES[key]) || "";
    const phone = perHouse || ((typeof CONTACT_PHONE !== "undefined" && CONTACT_PHONE) || "");
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(joinMessage(house, compat));
  }

  async function share() {
    const name = $("result-name").textContent;
    const text = "Descobri minha Casa no SON: " + name + ". Descubra a sua!";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Descubra sua Casa | SON", text, url: location.href });
        return;
      }
      await navigator.clipboard.writeText(text + " " + location.href);
      toast("Link copiado para compartilhar");
    } catch (_) {
      toast("Não foi possível compartilhar agora");
    }
  }

  /* ---------- persistência ---------- */
  function save(extra) {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ index: state.index, answers: state.answers, ...(extra || {}) })
      );
    } catch (_) { /* modo privado */ }
  }

  function clear() {
    try { localStorage.removeItem(STORE_KEY); } catch (_) { /* noop */ }
  }

  function restart() {
    state.index = 0;
    state.answers = [];
    clear();
    el.progressFill.style.width = "0%";
    $("compat-fill").style.width = "0%";
    show("landing");
  }

  /* ---------- partículas douradas ---------- */
  function initParticles() {
    const canvas = $("particles");
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dots = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      const count = window.innerWidth < 640 ? 34 : 60;
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.5 + 0.4) * dpr,
        vy: (Math.random() * 0.22 + 0.05) * dpr,
        vx: (Math.random() - 0.5) * 0.12 * dpr,
        a: Math.random() * 0.4 + 0.12,
        p: Math.random() * Math.PI * 2
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.y -= d.vy;
        d.x += d.vx;
        d.p += 0.02;
        if (d.y < -8) { d.y = h + 8; d.x = Math.random() * w; }
        if (d.x < -8) d.x = w + 8;
        if (d.x > w + 8) d.x = -8;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 175, 55, " + (d.a * (0.6 + 0.4 * Math.sin(d.p))).toFixed(3) + ")";
        ctx.fill();
      });
      window.requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.requestAnimationFrame(frame);
  }

  /* ---------- ripple (transform/opacity apenas) ---------- */
  function initRipple() {
    document.addEventListener("pointerdown", (ev) => {
      const target = ev.target.closest(".btn, .option");
      if (!target || target.disabled || reduce) return;
      const rect = target.getBoundingClientRect();
      const ink = document.createElement("span");
      ink.className = "ripple";
      const size = Math.max(rect.width, rect.height);
      ink.style.width = ink.style.height = size + "px";
      ink.style.left = ev.clientX - rect.left - size / 2 + "px";
      ink.style.top = ev.clientY - rect.top - size / 2 + "px";
      target.appendChild(ink);
      window.setTimeout(() => ink.remove(), 620);
    }, { passive: true });
  }

  /* ---------- parallax de entrada da landing ---------- */
  function initParallax() {
    if (reduce) return;
    const crest = document.querySelector(".crest-wrap");
    if (!crest) return;
    window.addEventListener("pointermove", (ev) => {
      if (!el.screens.landing.classList.contains("active")) return;
      const dx = (ev.clientX / window.innerWidth - 0.5) * 12;
      const dy = (ev.clientY / window.innerHeight - 0.5) * 8;
      crest.style.setProperty("--px", dx.toFixed(2) + "px");
      crest.style.setProperty("--py", dy.toFixed(2) + "px");
    }, { passive: true });
  }

  /* ---------- init ---------- */
  function init() {
    paintShieldRows();
    el.qTotal.textContent = String(QUESTIONS.length);

    $("btn-start").addEventListener("click", () => {
      state.index = 0;
      state.answers = [];
      show("quiz");
      renderQuestion();
      window.setTimeout(() => {
        const first = el.options.querySelector(".option");
        if (first) first.focus();
      }, 240);
    });
    $("btn-back").addEventListener("click", goBack);
    $("btn-restart").addEventListener("click", restart);
    $("btn-share").addEventListener("click", share);

    // navegação por teclado no radiogroup das alternativas
    el.options.addEventListener("keydown", (ev) => {
      const items = Array.from(el.options.querySelectorAll(".option:not(:disabled)"));
      if (!items.length) return;
      const at = items.indexOf(document.activeElement);
      let next = -1;
      if (ev.key === "ArrowDown" || ev.key === "ArrowRight") next = (at + 1) % items.length;
      if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") next = (at - 1 + items.length) % items.length;
      if (next < 0) return;
      ev.preventDefault();
      items[next].focus();
    });

    initParticles();
    initRipple();
    initParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
