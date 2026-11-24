/* =========================================================
   婕伶歡送電子卡片 — script.js
   內容來自 data.js（window.CARD_DATA），這裡只負責畫面與互動
   ========================================================= */
(function () {
  "use strict";

  var D = window.CARD_DATA || { photos: [], letters: [], wishes: [] };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  var hasCJK = /[㐀-鿿]/;

  /* ---------- Polaroid builder ---------- */
  function polaroid(photo, extraClass, tapeClass) {
    var fig = el("figure", "polaroid " + (extraClass || ""));
    if (tapeClass) fig.appendChild(el("span", "tape " + tapeClass));
    var img = el("img");
    img.src = photo.src;
    img.alt = photo.alt || "";
    img.loading = "lazy";
    img.decoding = "async";
    if (photo.ratio) { img.style.aspectRatio = photo.ratio; img.classList.add("is-cropped"); }
    if (photo.focus) img.style.objectPosition = photo.focus;
    fig.appendChild(img);
    if (photo.caption) fig.appendChild(el("figcaption", null, photo.caption));
    return fig;
  }

  /* ---------- 2 · Moments ---------- */
  var collage = $("collage");
  var dots = $("collageDots");
  (D.photos || []).forEach(function (p, i) {
    var tape = i === 0 ? "" : i === 2 ? "tape--clay" : null;
    collage.appendChild(polaroid(p, "slot-" + ((i % 5) + 1) + " reveal", tape));
    dots.appendChild(el("span", i === 0 ? "on" : ""));
  });
  // 手機版：滑動時更新小圓點
  collage.addEventListener("scroll", function () {
    // 依畫面上的實際位置排序（手機版直式照片會被排到最後）
    var items = Array.prototype.slice.call(collage.children).sort(function (a, b) { return a.offsetLeft - b.offsetLeft; });
    if (!items.length) return;
    var center = collage.scrollLeft + collage.clientWidth / 2;
    var best = 0, bestDist = Infinity;
    for (var i = 0; i < items.length; i++) {
      var c = items[i].offsetLeft + items[i].offsetWidth / 2;
      var d = Math.abs(c - center);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    for (var j = 0; j < dots.children.length; j++) dots.children[j].classList.toggle("on", j === best);
  }, { passive: true });

  /* ---------- 3 · Letters ---------- */
  var letters = D.letters || [];
  var grid = $("letterGrid");
  $("letterCount").textContent = letters.length;
  letters.forEach(function (L, i) {
    var li = el("li", "reveal");
    var btn = el("button", "letter-card");
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "dialog");
    var author = (L.author || "").trim() || "Anonymous";
    btn.setAttribute("aria-label", (L.label || "Note " + pad(i + 1)) + "，來自 " + author + "，打開信件");
    btn.innerHTML =
      '<svg class="letter-card__flap" viewBox="0 0 204 72" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 L102 64 L204 0 Z"/></svg>' +
      '<span class="letter-card__stamp" aria-hidden="true"></span>' +
      '<span class="letter-card__text"><span class="letter-card__label"></span><span class="letter-card__author"></span></span>' +
      '<span class="letter-card__open" aria-hidden="true">OPEN →</span>';
    btn.querySelector(".letter-card__label").textContent = L.label || "Note " + pad(i + 1);
    btn.querySelector(".letter-card__author").textContent = "from " + author;
    btn.addEventListener("click", function () { openLetter(i, btn); });
    li.style.transitionDelay = reduceMotion ? "0s" : (i % 5) * 60 + "ms";
    li.appendChild(btn);
    grid.appendChild(li);
  });

  /* ---------- Letter modal ---------- */
  var modal = $("letterModal");
  var sheetBody = $("sheetBody");
  var prevBtn = $("prevLetter");
  var nextBtn = $("nextLetter");
  var current = 0;
  var returnFocus = null;
  var closeTimer = null;

  function fillLetter(i) {
    var L = letters[i];
    current = i;
    $("sheetLabel").textContent = L.label || "Note " + pad(i + 1);
    $("sheetMessage").textContent = L.message || "";
    var author = (L.author || "").trim();
    $("sheetAuthor").textContent = "— " + (author || "Anonymous");
    $("sheetCount").textContent = pad(i + 1) + " / " + pad(letters.length);
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === letters.length - 1;
    sheetBody.scrollTop = 0;
  }

  function openLetter(i, trigger) {
    clearTimeout(closeTimer);
    returnFocus = trigger || document.activeElement;
    fillLetter(i);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add("is-visible"); });
    });
    modal.querySelector(".icon-btn").focus({ preventScroll: true });
    document.addEventListener("keydown", onKey);
  }

  function closeLetter() {
    modal.classList.remove("is-visible");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onKey);
    closeTimer = setTimeout(function () { modal.hidden = true; }, reduceMotion ? 0 : 350);
    // 回到剛剛點的那封信（若已用上一封/下一封切換，回到目前那封的卡片）
    var card = grid.children[current] && grid.children[current].querySelector("button");
    var target = card || returnFocus;
    if (target) target.focus({ preventScroll: true });
  }

  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); closeLetter(); }
    else if (e.key === "ArrowLeft" && current > 0) fillLetter(current - 1);
    else if (e.key === "ArrowRight" && current < letters.length - 1) fillLetter(current + 1);
    else if (e.key === "Tab") {
      // focus trap
      var f = modal.querySelectorAll("button:not([disabled]), [tabindex='0']");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeLetter();
  });
  prevBtn.addEventListener("click", function () { if (current > 0) fillLetter(current - 1); });
  nextBtn.addEventListener("click", function () { if (current < letters.length - 1) fillLetter(current + 1); });

  /* ---------- 4 · Wishes ---------- */
  var board = $("wishBoard");
  (D.wishes || []).forEach(function (w, i) {
    var card = el("div", "wish reveal");
    card.appendChild(el("span", "tape"));
    var zh = hasCJK.test(w.text);
    card.appendChild(el("p", "wish__text " + (zh ? "wish__text--zh" : "wish__text--en"), zh ? "「" + w.text + "」" : "“" + w.text + "”"));
    if (w.author) card.appendChild(el("p", "wish__author", "— " + w.author));
    card.style.transitionDelay = reduceMotion ? "0s" : i * 120 + "ms";
    board.appendChild(card);
  });

  /* ---------- 5 · Closing ---------- */
  if (D.closingPhoto) {
    var cp = polaroid(D.closingPhoto, "", null);
    var holder = $("closingPhoto");
    while (cp.firstChild) holder.appendChild(cp.firstChild);
  }
  var lines = document.querySelectorAll(".closing__text .line");
  for (var k = 0; k < lines.length; k++) lines[k].style.setProperty("--i", k);
  document.querySelector(".closing__text").classList.add("reveal-lines");

  /* ---------- 1 · Envelope ---------- */
  var opening = document.querySelector(".opening");
  var envelope = $("envelope");
  var hint = $("envelopeHint");
  envelope.addEventListener("click", function () {
    var wasOpen = opening.classList.contains("is-open");
    if (!wasOpen) {
      opening.classList.add("is-open");
      envelope.setAttribute("aria-expanded", "true");
      envelope.setAttribute("aria-label", "信封已打開，前往下一區");
      hint.querySelector("span").textContent = "Welcome — scroll to explore ↓";
    }
    setTimeout(function () {
      $("moments").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }, wasOpen || reduceMotion ? 0 : 1100);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(".reveal, .reveal-lines");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (var r = 0; r < revealTargets.length; r++) revealTargets[r].classList.add("in");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    for (var t = 0; t < revealTargets.length; t++) io.observe(revealTargets[t]);
  }
})();
