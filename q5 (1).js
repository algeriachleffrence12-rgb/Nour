        V.step++; render(); window.scrollTo(0, 0);
        var nl = V.letters[V.step]; speak(isWordy(V.world) ? nl.w : wt(V.world) === 'vowels' ? syl(nl, 0) : nl.s);
      } else {
        var upto = V.letters[V.letters.length - 1].i, wp = worldPool(V.world);
        var pool = wt(V.world) === 'letters' ? LET.filter(function (l) { return l.i <= upto; }) : wp;
        startQuiz(V.level, V.letters, pool.length >= 8 ? pool : wp, V.mis, V.world, false);
      }
    },
    saysyl: function (v) { speak(syl(V.letters[V.step], +v)); },
    sayw0: function (v) { speak(LET[+v].w); },
    sayq: function () { var q = V.qs[V.qi]; speak(q.say); },
    sayinst: function () { speakUI(instrText()); },
    ans: function (v, el) {
      if (V.locked) return;
      var q = V.qs[V.qi], right = v === q.correct, tok = V.tok; markSeen('quiz');
      if (!right) { V.mis++; el.classList.add('no'); beep(200, 0.2); return; }
      V.locked = true; el.classList.add('ok'); beep(880, 0.15);
      setTimeout(function () {
        if (V.tok !== tok) return;
        if (V.qi + 1 < V.qs.length) { V.qi++; V.locked = false; render(); var n = V.qs[V.qi]; if (n.kind === 'say') speak(n.say); }
        else nextAfterQuiz(V);
      }, 600);
    },
    flip: function (v) {
      var k = +v;
      if (V.locked || V.up.indexOf(k) !== -1 || V.matched.indexOf(V.cards[k].key) !== -1) return;
      V.up.push(k); markSeen('mem'); beep(500, 0.08); speak(V.cards[k].say); render();
      if (V.up.length === 2) {
        var a = V.cards[V.up[0]], b = V.cards[V.up[1]], tok = V.tok;
        if (a.key === b.key && a.kind !== b.kind) {
          V.matched.push(a.key); V.up = []; beep(880, 0.15);
          if (V.matched.length === V.letters.length) { V.locked = true; setTimeout(function () { if (V.tok !== tok) return; if (wt(V.world) === 'vowels') finishLevel(V.level, V.mis); else startBuild(V.level, V.world, V.letters, V.mis, 0); }, 900); }
          setTimeout(function () { if (V.tok === tok) render(); }, 10);
        } else {
          V.mis++; V.locked = true; beep(200, 0.2);
          setTimeout(function () { if (V.tok !== tok) return; V.up = []; V.locked = false; render(); }, 800);
        }
      }
    },
    tile: function (v) {
      if (V.locked) return;
      var k = +v; if (V.slots.indexOf(k) !== -1) return;
      V.slots.push(k); markSeen('build'); beep(600, 0.06); if (V.slots.length < V.word.chars.length) speak(V.tiles[k]);
      if (V.slots.length === V.word.chars.length) {
        var tried = V.slots.map(function (s) { return V.tiles[s]; }).join('');
        if (tried === V.word.chars.join('')) {
          V.locked = true; beep(880, 0.2); speak(V.word.l.w); render();
          var tok = V.tok, lv = V.level, ls = V.letters, mis = V.mis, round = V.round;
          setTimeout(function () { if (V.tok !== tok) return; if (round + 1 < 2) startBuild(lv, V.world, ls, mis, round + 1); else finishLevel(lv, mis); }, 1300);
          return;
        }
        V.mis++; beep(200, 0.25); V.slots = [];
      }
      render();
    },
    unslot: function (v) { if (V.locked) return; var k = +v; if (V.slots[k] !== undefined) { V.slots.splice(k, 1); render(); } },
    sayw: function () { speak(V.word.l.w); },
    review: function () {
      var L = learnedLetters(); if (!L.length) { toast(t('rev0')); return; }
      var set = shuffle(L).slice(0, 6);
      startQuiz(-1, set, LET, 0, 0, true);
    },
    wheel: function () { go('wheel', {}); },
    spin: function () {
      var L = learnedLetters(); if (!L.length) return;
      V.spinning = true; V.shown = LET[0].c; S.lastSpin = Date.now(); save(); render();
      var tok = V.tok, c = 0;
      var iv = setInterval(function () {
        if (V.tok !== tok) { clearInterval(iv); return; }
        V.shown = pick(LET).c; c++; beep(400 + c * 10, 0.04);
        var el = app.querySelector('.wheel .ar'); if (el) el.textContent = V.shown;
        if (c >= 14) {
          clearInterval(iv); var l = pick(L), win = 1 + rnd(5);
          V.spinning = false; V.spun = l; V.win = win; S.stars += win; save(); beep(988, 0.3); speak(l.s); render();
        }
      }, 110);
    },
    album: function () { go('album'); }, shop: function () { go('shop'); },
    buy: function (v) {
      var h = HATS.filter(function (x) { return x[0] === v; })[0];
      if (!h || S.hats.indexOf(v) !== -1) return;
      if (S.stars < h[1]) { toast(t('notEnough')); beep(200, 0.2); return; }
      S.stars -= h[1]; S.hats.push(v); S.hat = v; save(); beep(900, 0.2); render();
    },
    wear: function (v) { S.hat = S.hat === v ? '' : v; save(); render(); },
    gate: function () { go('gate', { a: 3 + rnd(6), b: 4 + rnd(6), next: 'parents' }); },
    gatePay: function () { go('gate', { a: 3 + rnd(6), b: 4 + rnd(6), next: 'pay' }); },
    gateGo: function () {
      var val = parseInt((document.getElementById('gateIn') || {}).value, 10);
      var nx = V.next;
      if (val === V.a + V.b) { if (nx === 'pay') { go('paywall', {}); buy(); } else go('parents', {}); }
      else { toast(t('gateBad')); go('gate', { a: 3 + rnd(6), b: 4 + rnd(6), next: nx }); }
    },
    restore: function () { restorePurchase(true); },
    toggleSound: function () { S.sound = !S.sound; save(); render(); },
    lang: function (v) { S.lang = v; save(); render(); },
    reset: function (v, el) {
      if (!V.sure) { V.sure = true; toast(t('resetSure')); return; }
      var lang = S.lang; S = defaults(); S.lang = lang; checkDay(); save(); toast(t('resetDone')); go('home');
    }
  };

  app.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!el || !ACT[el.getAttribute('data-act')]) return;
    ACT[el.getAttribute('data-act')](el.getAttribute('data-v'), el);
  });

  window.__nour = { W: function (n) { return levelWorld(n); }, S: function () { return S; }, V: function () { return V; }, LET: LET };
  checkDay(); applyLang(); render(); restorePurchase(false);
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
//END
