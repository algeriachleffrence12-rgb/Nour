      var u = new SpeechSynthesisUtterance(text); u.lang = 'ar-SA'; if (arVoice) u.voice = arVoice; u.rate = 0.75;
      speechSynthesis.speak(u);
    } catch (e) {
      if (!voiceWarned) { voiceWarned = true; toast(t('noVoice')); }
    }
  }
  var toastTimer = 0;
  function toast(msg) {
    var old = document.querySelector('.toast'); if (old) old.remove();
    var d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; document.body.appendChild(d);
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { d.remove(); }, 2600);
  }

  // ---------- أدوات التقدم ----------
  function levelWorld(n) { for (var w = WORLDS - 1; w >= 0; w--) if (n >= WSTART[w]) return w; return 0; }
  function levelLetters(n) { var w = levelWorld(n), k = n - WSTART[w]; var src = wt(w) === 'vocab' ? WDEF[w].items : LET; return src.slice(k * PER, k * PER + PER); }
  function worldPool(w) { return wt(w) === 'vocab' ? WDEF[w].items : LET; }
  function unlocked(n) { return n === 0 || !!S.best[n - 1]; }
  function paid(n) { return n >= FREE_LEVELS && !S.premium; }
  function learnedCount() { var c = 0; for (var n = 0; n < PERW; n++) if (S.best[n]) c += levelLetters(n).length; return c; }
  function learnedLetters() { var o = []; for (var n = 0; n < PERW; n++) if (S.best[n]) o = o.concat(levelLetters(n)); return o; }
  function applyLang() { document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; }
  function checkDay() {
    var today = dayKey(Date.now());
    if (S.lastDay === today) return;
    var y = dayKey(Date.now() - 86400000);
    S.streak = S.lastDay === y ? S.streak + 1 : 1;
    S.lastDay = today; S.gift = Math.min(S.streak, 7) * 2; save();
  }

  // ---------- العرض ----------
  var app = document.getElementById('app');
  var V = { name: 'home', tok: 0 };
  function go(name, extra) { V = Object.assign({ name: name, tok: V.tok + 1 }, extra || {}); render(); window.scrollTo(0, 0); }
  function topbar(back) {
    return '<div class="top">' + (back ? '<button class="iconbtn" data-act="' + back + '" aria-label="' + t('back') + '">' + (S.lang === 'ar' ? '➡️' : '⬅️') + '</button>' : '<span></span>') +
      '<span><span class="chip">' + t('streak', { n: S.streak }) + '</span> <span class="chip">⭐ ' + S.stars + '</span></span></div>';
  }
  function mascot() { return '<div class="mascot">👩‍🏫' + (S.hat ? '<span class="hat">' + S.hat + '</span>' : '') + '</div>'; }
  function stars(n) { return '⭐'.repeat(n) + '☆'.repeat(3 - n); }

  function render() {
    applyLang();
    var f = VIEWS[V.name] || VIEWS.home;
    app.innerHTML = f();
  }

  var VIEWS = {};
  VIEWS.home = function () {
    var gift = S.gift > 0 ? '<div class="gift"><b>' + t('gift', { n: S.gift }) + '</b><button class="btn sun" data-act="gift" style="min-height:44px;padding:8px 16px">' + t('take') + '</button></div>' : '';
    return topbar() + '<div class="hero">' + mascot() + '<div><h1>Nour</h1><p>' + t('tag') + '</p></div></div>' + gift +
      '<div class="menu"><button class="btn coral" data-act="map">🎮 ' + t('play') + '</button>' +
      '<button class="btn teal" data-act="review">🔁 ' + t('review') + '</button><button class="btn sun" data-act="wheel">🎡 ' + t('wheel') + '</button>' +
      '<button class="btn" data-act="album">🖼️ ' + t('album') + '</button><button class="btn" data-act="shop">🛍️ ' + t('shop') + '</button>' +
      '<button class="btn ghost" data-act="gate" style="grid-column:1/-1">👪 ' + t('parents') + '</button></div>' +
      '<p class="muted" style="text-align:center">' + t('progress', { a: learnedCount(), b: LET.length }) + '</p>';
  };
  VIEWS.map = function () {
    var h = topbar('home');
    for (var w = 0; w < WORLDS; w++) {
      h += '<h2>' + t('world')[w] + '</h2><div class="map">';
      for (var k = 0; k < WDEF[w].n; k++) {
        var n = WSTART[w] + k, ok = unlocked(n), pd = paid(n);
        var ls = levelLetters(n).map(function (l) { return wt(w) === 'vowels' ? syl(l, 0) : wt(w) === 'letters' ? l.c : l.e; }).join(' ');
        h += '<button class="lvl' + (ok && !pd ? '' : ' lock') + '" data-act="level" data-v="' + n + '"><b>' + (pd ? '💎 ' : ok ? '' : '🔒 ') + t('level', { n: k + 1 }) + '</b><div class="ls ar">' + ls + '</div><div class="st">' + stars(S.best[n] || 0) + '</div></button>';
      }
      h += '</div>';
    }
    return h;
  };
  VIEWS.lesson = function () {
    var L = V.letters, l = L[V.step];
    if (wt(V.world) === 'vowels') {
      var sy = [0, 1, 2].map(function (v) { return '<button class="opt" data-act="saysyl" data-v="' + v + '" style="min-height:0;padding:10px 2px"><span class="ar" style="font-size:3rem;display:block;line-height:1.5">' + syl(l, v) + '</span><small class="muted">' + syltr(l, v) + '</small></button>'; }).join('');
      return topbar('map') + '<div class="card pop"><div class="muted" style="text-align:center">' + t('lessonOf', { a: V.step + 1, b: L.length }) + '</div><h2 style="text-align:center">' + t('vowelsT') + '</h2><p class="big ar" style="font-size:5rem">' + l.c + '</p><div class="forms" style="grid-template-columns:repeat(3,1fr)">' + sy + '</div>' +
        '<button class="btn coral" data-act="lessonNext" style="width:100%;margin-top:14px">' + t('next') + '</button></div>';
    }
    if (isWordy(V.world)) {
      return topbar('map') + '<div class="card pop"><div class="muted" style="text-align:center">' + t('lessonOf', { a: V.step + 1, b: L.length }) + '</div><h2 style="text-align:center">' + t('wordT') + '</h2><div class="bigpic">' + l.e + '</div><p class="big ar" style="font-size:4rem">' + l.w + '</p><p class="muted" style="text-align:center">' + l.tr + ' · ' + mean(l) + '</p>' +
        '<button class="btn teal" data-act="sayw0" data-v="' + l.i + '" style="width:100%">🔊 ' + t('listen') + '</button><button class="btn coral" data-act="lessonNext" style="width:100%;margin-top:12px">' + t('next') + '</button></div>';
    }
    var nj = NOJOIN.indexOf(l.c) !== -1;
    var forms = '<div><b class="ar">' + l.c + '</b><small>' + t('iso') + '</small></div>' +
      (nj ? '' : '<div><b class="ar">' + l.c + '‍</b><small>' + t('ini') + '</small></div><div><b class="ar">‍' + l.c + '‍</b><small>' + t('med') + '</small></div>') +
      '<div><b class="ar">‍' + l.c + '</b><small>' + t('fin') + '</small></div>';
    return topbar('map') + '<div class="card pop"><div class="muted" style="text-align:center">' + t('lessonOf', { a: V.step + 1, b: L.length }) + '</div>' +
      '<p class="big ar">' + l.c + '</p><h2 style="text-align:center">' + l.n + '</h2><p class="muted" style="text-align:center;margin:0">' + hint(l) + '</p>' +
      '<div class="say" style="margin-top:12px"><button class="btn teal" data-act="say" data-v="' + l.i + '" style="width:100%">🔊 ' + t('listen') + ' ' + ar(l.s) + '</button></div>' +
      '<h2 style="margin-top:14px">' + t('forms') + '</h2><div class="forms" style="grid-template-columns:repeat(' + (nj ? 2 : 4) + ',1fr)">' + forms + '</div>' +
      '<div class="word"><span class="em">' + l.e + '</span>' + ar(l.w) + '</div><p class="muted" style="text-align:center;margin:0">' + l.tr + ' · ' + mean(l) + '</p>' +
      '<button class="btn coral" data-act="lessonNext" style="width:100%;margin-top:14px">' + t('next') + '</button></div>';
  };

  // --- اختبار ---
  function aropt(html, id, cls) { return { id: String(id), html: html, cls: cls || '' }; }
  function makeQuiz(world, letters, pool, n) {
    var qs = [], voice = hasVoice();
    for (var i = 0; i < n; i++) {
      var l = letters[i % letters.length], q;
      if (wt(world) === 'vowels') {
        var v = rnd(3), id = l.i + ':' + v;
        var others = [0, 1, 2].filter(function (x) { return x !== v; }).map(function (x) { return aropt(syl(l, x), l.i + ':' + x); });
        var o2 = pick(LET.filter(function (x) { return x.i !== l.i; }));
        var opts = shuffle([aropt(syl(l, v), id)].concat(others, [aropt(syl(o2, v), o2.i + ':' + v)]));
        q = (i % 2 === 0 && voice) ? { head: 'quizSL', kind: 'say', say: syl(l, v), correct: id, opts: opts } : { head: 'quizST', kind: 'txt', txt: '« ' + syltr(l, v) + ' »', correct: id, opts: opts };
      } else if (isWordy(world)) {
        var wp = worldPool(world), oth = shuffle(wp.filter(function (x) { return x.i !== l.i; })).slice(0, 3);
        var mode = i % 3;
        if (mode === 1) q = { head: 'quizW', kind: 'txt', txt: ar(l.w), correct: String(l.i), opts: shuffle([l].concat(oth)).map(function (x) { return aropt(x.e, x.i, 'opte'); }) };
        else if (mode === 2 && voice) q = { head: 'quizSL', kind: 'say', say: l.w, correct: String(l.i), opts: shuffle([l].concat(oth)).map(function (x) { return aropt(x.e, x.i, 'opte'); }) };
        else q = { head: 'quizW', kind: 'pic', pic: l.e, correct: String(l.i), opts: shuffle([l].concat(oth)).map(function (x) { return aropt(x.w, x.i, 'optw'); }) };
      } else {
        var d = shuffle(pool.filter(function (x) { return x.i !== l.i; })).slice(0, 3);
        var op = shuffle([l].concat(d)).map(function (x) { return aropt(x.c, x.i); });
        q = (i % 2 === 0 && voice) ? { head: 'quizL', kind: 'say', say: l.s, correct: String(l.i), opts: op } : { head: 'quizP', kind: 'pic', pic: l.e, correct: String(l.i), opts: op };
      }
      qs.push(q);
    }
    return shuffle(qs);
  }
  VIEWS.quiz = function () {
    var q = V.qs[V.qi];
    var body = q.kind === 'say' ? '<div class="say"><button class="btn teal" data-act="sayq" style="font-size:1.6rem">🔊 ' + t('listen') + '</button></div>' : q.kind === 'pic' ? '<div class="bigpic">' + q.pic + '</div>' : '<div class="big" style="font-size:3.2rem;color:var(--violet)">' + q.txt + '</div>';
    var o = q.opts.map(function (x) { return '<button class="opt ar ' + x.cls + '" data-act="ans" data-v="' + x.id + '">' + x.html + '</button>'; }).join('');
    return topbar(V.review ? 'home' : 'map') + '<div class="card"><div class="prog"><i style="width:' + (V.qi / V.qs.length * 100) + '%"></i></div><p class="q">' + t(q.head) + '</p>' + body + '<div class="opts">' + o + '</div></div>';
  };
  // --- ذاكرة ---
  VIEWS.memory = function () {
    var cards = V.cards.map(function (c, k) {
      var up = V.up.indexOf(k) !== -1, dn = V.matched.indexOf(c.key) !== -1;
      var face = (up || dn) ? c.html : '❓';
//END
        
