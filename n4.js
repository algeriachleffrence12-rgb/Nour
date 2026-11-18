      return '<button class="mc' + (dn ? ' done' : up ? ' up' : '') + '" data-act="flip" data-v="' + k + '" style="' + (c.small && (up || dn) ? 'font-size:1.4rem' : '') + '">' + face + '</button>';
    }).join('');
    return topbar('map') + '<div class="card"><p class="q">' + t(wt(V.world) === 'vowels' ? 'memS' : isWordy(V.world) ? 'memW' : 'mem') + '</p><div class="mem">' + cards + '</div></div>';
  };
  // --- بناء الكلمة ---
  VIEWS.build = function () {
    var w = V.word, slots = '', tiles = '';
    for (var k = 0; k < w.chars.length; k++) {
      var s = V.slots[k];
      slots += '<div class="slot ar' + (s !== undefined ? ' f' : '') + '" data-act="unslot" data-v="' + k + '">' + (s !== undefined ? V.tiles[s] : '') + '</div>';
    }
    V.tiles.forEach(function (ch, k) { tiles += '<button class="tile ar' + (V.slots.indexOf(k) !== -1 ? ' used' : '') + '" data-act="tile" data-v="' + k + '">' + ch + '</button>'; });
    return topbar('map') + '<div class="card"><p class="q">' + t('build') + '</p><div class="bigpic">' + w.l.e + '</div><p class="muted" style="text-align:center;margin:0">' + mean(w.l) + '</p>' +
      '<div class="slots">' + slots + '</div><div class="tiles">' + tiles + '</div><div class="say"><button class="btn teal" data-act="sayw">🔊 ' + t('listen') + '</button></div></div>';
  };
  VIEWS.result = function () {
    var gained = V.gained;
    return topbar('map') + '<div class="card pop" style="text-align:center"><h2>🎉 ' + t('done') + '</h2><div class="stars">' + stars(V.stars) + '</div><p style="font-size:1.4rem;font-weight:800">' + t('starsWon', { n: gained }) + '</p>' +
      '<p class="muted">' + t('mis', { n: V.mis }) + '</p><div class="row"><button class="btn ghost" data-act="level" data-v="' + V.level + '">' + t('retry') + '</button>' +
      (V.level + 1 < LEVELS ? '<button class="btn coral" data-act="level" data-v="' + (V.level + 1) + '">' + t('cont') + '</button>' : '<button class="btn coral" data-act="map">' + t('cont') + '</button>') + '</div></div>';
  };
  VIEWS.wheel = function () {
    var wait = Math.ceil((S.lastSpin + 30 * 60000 - Date.now()) / 60000);
    var can = wait <= 0 && learnedCount() > 0;
    var body = V.spun ? '<div class="wheel pop"><span class="ar" style="color:var(--coral)">' + V.spun.c + '</span></div><div class="word"><span class="em">' + V.spun.e + '</span>' + ar(V.spun.w) + '</div><p style="text-align:center;font-weight:800;font-size:1.3rem">' + t('spinWin', { n: V.win }) + '</p>' :
      '<div class="wheel">' + (V.spinning ? '<span class="ar">' + V.shown + '</span>' : '🎡') + '</div>';
    var act = V.spinning ? '' : can && !V.spun ? '<button class="btn coral" data-act="spin" style="width:100%">' + t('spin') + '</button>' : '<p class="muted" style="text-align:center">' + (learnedCount() === 0 ? t('rev0') : t('spinWait', { m: Math.max(wait, 0) })) + '</p>';
    return topbar('home') + '<div class="card"><h2 style="text-align:center">🎡 ' + t('wheel') + '</h2>' + body + act + '</div>';
  };
  VIEWS.album = function () {
    var got = {}; learnedLetters().forEach(function (l) { got[l.i] = 1; });
    var h = topbar('home') + '<h2>' + t('albumT') + '</h2><div class="album">';
    LET.forEach(function (l) { h += '<div class="stk' + (got[l.i] ? '' : ' off') + '"><b class="ar">' + l.c + '</b><span>' + l.e + '</span></div>'; });
    return h + '</div>' + (learnedCount() === 0 ? '<p class="muted">' + t('albumH') + '</p>' : '');
  };
  VIEWS.shop = function () {
    var h = topbar('home') + '<div class="hero" style="margin-bottom:6px">' + mascot() + '<div><h1>' + t('shopT') + '</h1></div></div><div class="shop" style="margin-top:14px">';
    HATS.forEach(function (x) {
      var own = S.hats.indexOf(x[0]) !== -1, wearing = S.hat === x[0];
      h += '<div class="item"><div class="e">' + x[0] + '</div>' + (own ? '<button data-act="wear" data-v="' + x[0] + '" class="' + (wearing ? 'off' : '') + '">' + (wearing ? t('off') : t('wear')) + '</button>' : '<button data-act="buy" data-v="' + x[0] + '">⭐ ' + x[1] + '</button>') + '</div>';
    });
    return h + '</div>';
  };
  VIEWS.paywall = function () {
    var paidN = LEVELS - FREE_LEVELS;
    return topbar('map') + '<div class="card pop" style="text-align:center"><div style="font-size:3.4rem">💎</div><h2>' + t('payTitle') + '</h2><p>' + t('payText', { f: FREE_LEVELS, n: paidN }) + '</p><p class="muted">' + t('payAsk') + '</p>' +
      '<button class="btn coral" data-act="gatePay" style="width:100%">' + t('payBtn') + '</button><button class="btn ghost" data-act="restore" style="width:100%;margin-top:10px">' + t('payRestore') + '</button></div>';
  };
  VIEWS.gate = function () {
    return topbar('home') + '<div class="card"><h2>👪 ' + t('parents') + '</h2><p>' + t('gateQ', { a: V.a, b: V.b }) + '</p><input class="gate" id="gateIn" inputmode="numeric" autocomplete="off"><button class="btn coral" data-act="gateGo" style="width:100%">' + t('gateGo') + '</button></div>';
  };
  VIEWS.parents = function () {
    return topbar('home') + '<div class="card"><h2>👪 ' + t('parents') + '</h2><p>' + t('progress', { a: learnedCount(), b: LET.length }) + '</p>' +
      '<p><b>' + (S.premium ? t('premiumOn') : '') + '</b></p>' + (S.premium ? '' : '<p><button class="btn ghost" data-act="restore" style="min-height:44px">' + t('payRestore') + '</button></p>') +
      '<p><b>' + t('sound') + ' : </b><button class="btn ghost" data-act="toggleSound" style="display:inline-flex;min-height:40px;padding:6px 14px">' + (S.sound ? '🔊 ' + t('on') : '🔇 ' + t('offS')) + '</button></p>' +
      '<p><b>' + t('lang') + ' :</b></p><div class="row"><button class="btn ' + (S.lang === 'fr' ? '' : 'ghost') + '" data-act="lang" data-v="fr">Français</button><button class="btn ' + (S.lang === 'en' ? '' : 'ghost') + '" data-act="lang" data-v="en">English</button><button class="btn ' + (S.lang === 'ar' ? '' : 'ghost') + '" data-act="lang" data-v="ar">العربية</button></div>' +
      '<p class="muted">' + t('privacy') + '</p><button class="btn coral" data-act="reset" style="width:100%">' + t('reset') + '</button></div>';
  };

  // ---------- المنطق ----------
  function praise() { return pick(t('good')); }
  function startLevel(n) {
    if (!unlocked(n)) { toast(t('locked')); return; }
    if (paid(n)) { go('paywall', { from: n }); return; }
    var L = levelLetters(n);
    go('lesson', { level: n, world: levelWorld(n), letters: L, step: 0, mis: 0 });
    speak(isWordy(V.world) ? L[0].w : wt(V.world) === 'vowels' ? syl(L[0], 0) : L[0].s);
  }
  function startQuiz(level, letters, pool, mis, world, review) {
    go('quiz', { level: level, world: world, letters: letters, qs: makeQuiz(world, letters, pool, wt(world) === 'vowels' ? 8 : 6), qi: 0, mis: mis, locked: false, review: !!review });
    var q = V.qs[0]; if (q.kind === 'say') speak(q.say);
  }
  function startMemory(level, world, letters, mis) {
    var cards = [];
    letters.forEach(function (l) {
      if (wt(world) === 'vowels') { cards.push({ key: 's' + l.i, kind: 'a', html: '<span class="ar">' + syl(l, 1) + '</span>' }, { key: 's' + l.i, kind: 'b', html: syltr(l, 1), small: true }); }
      else if (isWordy(world)) { cards.push({ key: 'w' + l.i, kind: 'a', html: '<span class="ar">' + l.w + '</span>', small: true }, { key: 'w' + l.i, kind: 'b', html: l.e }); }
      else { cards.push({ key: 'l' + l.i, kind: 'a', html: '<span class="ar">' + l.c + '</span>' }, { key: 'l' + l.i, kind: 'b', html: l.e }); }
    });
    go('memory', { level: level, world: world, letters: letters, cards: shuffle(cards), up: [], matched: [], mis: mis, locked: false });
  }
  function startBuild(level, world, letters, mis, round) {
    var cand = letters.filter(function (l) { var c = Array.from(l.w).length; return c >= 2 && c <= 6; });
    if (!cand.length) { finishLevel(level, mis); return; }
    var l = cand[round % cand.length];
    var chars = Array.from(l.w);
    go('build', { level: level, world: world, letters: letters, mis: mis, round: round, word: { l: l, chars: chars }, tiles: shuffle(chars), slots: [], locked: false });
    speak(l.w);
  }
  function finishLevel(level, mis) {
    var st = mis <= 1 ? 3 : mis <= 4 ? 2 : 1;
    var prev = S.best[level] || 0;
    var gained = st * 3 + (st > prev ? 3 : 0);
    S.best[level] = Math.max(prev, st); S.stars += gained; save();
    beep(784, 0.2); setTimeout(function () { beep(1046, 0.3); }, 200);
    go('result', { level: level, stars: st, gained: gained, mis: mis });
  }
  function nextAfterQuiz(v) {
    if (v.review) { speakDone(); go('home'); toast(praise()); return; }
    startMemory(v.level, v.world, v.letters, v.mis);
  }
  function speakDone() { beep(880, 0.2); }

  // ---------- الشراء (Google Play Billing عبر Digital Goods API) ----------
  function billingSvc() {
    if (!('getDigitalGoodsService' in window)) return Promise.reject(new Error('nobilling'));
    return window.getDigitalGoodsService('https://play.google.com/billing');
  }
  function unlockAll() { S.premium = true; save(); beep(784, 0.2); setTimeout(function () { beep(1046, 0.3); }, 200); toast(t('payOk')); go('map'); }
  function buy() {
    billingSvc().then(function (svc) {
      var pr = new PaymentRequest([{ supportedMethods: 'https://play.google.com/billing', data: { sku: SKU } }], { total: { label: 'Nour', amount: { currency: 'USD', value: '0' } } });
      return pr.show().then(function (res) {
        var tokenv = res.details && res.details.purchaseToken;
        return svc.acknowledge(tokenv, 'onetime').then(function () { return res.complete('success'); }).then(unlockAll);
      });
    }).catch(function (e) { toast(e && e.message === 'nobilling' ? t('payNo') : t('payFail')); });
  }
  function restorePurchase(manual) {
    billingSvc().then(function (svc) { return svc.listPurchases(); }).then(function (list) {
      var has = (list || []).some(function (x) { return x.itemId === SKU; });
      if (has) { if (!S.premium) { S.premium = true; save(); if (manual) toast(t('payOk')); render(); } } else if (manual) toast(t('payNone'));
    }).catch(function () { if (manual) toast(t('payNo')); });
  }

  var ACT = {
    home: function () { go('home'); }, map: function () { go('map'); },
    gift: function () { S.stars += S.gift; S.gift = 0; save(); beep(900, 0.2); render(); },
    level: function (v) { startLevel(+v); },
    say: function (v) { speak(LET[+v].s); },
    lessonNext: function () {
      if (V.step + 1 < V.letters.length) {
//END
