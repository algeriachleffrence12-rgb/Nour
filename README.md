<!doctype html>
<html lang="fr" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#ff6b6b">
<meta name="description" content="Nour : apprends les 28 lettres arabes en jouant. Leçons, quiz, mémoire, mots, roue et collection.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-192.png">
<title>Nour</title>
<style>
:root { --bg:#fff7ec; --ink:#2b2140; --muted:#6d6385; --coral:#ff6b6b; --sun:#ffc23c; --teal:#22b8a8; --violet:#7b5cff; --card:#ffffff; --good:#2fbf71; --bad:#e8505b; }
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html { background: var(--bg); }
[hidden] { display: none !important; }
body { margin: 0; color: var(--ink); background: linear-gradient(180deg,#fff0d9 0,var(--bg) 220px); font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; }
#app { max-width: 560px; margin: 0 auto; padding: 0 max(14px, env(safe-area-inset-left)) calc(24px + env(safe-area-inset-bottom)) max(14px, env(safe-area-inset-right)); }
.ar { font-family: 'Noto Naskh Arabic','Amiri','Traditional Arabic','Droid Arabic Naskh',serif; direction: rtl; unicode-bidi: isolate; }
.top { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: calc(10px + env(safe-area-inset-top)) 0 10px; position: sticky; top: 0; z-index: 5; background: linear-gradient(#fff0d9ee,#fff0d900); }
.chip { background: #fff; border-radius: 999px; padding: 6px 12px; font-weight: 800; box-shadow: 0 2px 0 #0001; white-space: nowrap; }
.iconbtn { border: 0; background: #fff; border-radius: 999px; width: 44px; height: 44px; font-size: 1.3rem; box-shadow: 0 3px 0 #0002; cursor: pointer; }
.hero { background: linear-gradient(120deg,#ffa63c,#ff5fa2); color: #fff; border-radius: 24px; padding: 18px; display: flex; gap: 14px; align-items: center; box-shadow: 0 6px 0 #c9406f55; }
.mascot { font-size: 3.2rem; position: relative; line-height: 1; flex: none; }
.mascot .hat { position: absolute; top: -18px; left: 50%; transform: translateX(-50%); font-size: 1.8rem; }
.hero h1 { margin: 0 0 4px; font-size: 1.5rem; }
.hero p { margin: 0; opacity: .95; line-height: 1.4; }
.menu { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
.menu .btn:first-child { grid-column: 1 / -1; }
.btn { border: 0; border-radius: 20px; padding: 16px 12px; font-size: 1.1rem; font-weight: 800; color: #fff; background: var(--violet); box-shadow: 0 5px 0 #0003; cursor: pointer; min-height: 56px; display: flex; align-items: center; justify-content: center; gap: 8px; text-align: center; }
.btn:active { transform: translateY(3px); box-shadow: 0 2px 0 #0003; }
.btn.coral { background: var(--coral); } .btn.teal { background: var(--teal); } .btn.sun { background: var(--sun); color: #5a3b00; } .btn.ghost { background: #fff; color: var(--ink); }
.btn[disabled] { opacity: .45; }
.card { background: var(--card); border-radius: 24px; padding: 16px; box-shadow: 0 5px 0 #0001; margin-top: 14px; }
h2 { margin: 6px 0 10px; font-size: 1.3rem; }
.muted { color: var(--muted); }
.map { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.lvl { position: relative; border: 0; background: #fff; border-radius: 22px; padding: 14px 10px; box-shadow: 0 5px 0 #0002; cursor: pointer; text-align: center; font: inherit; color: inherit; }
.lvl.lock { opacity: .5; filter: grayscale(.8); }
.lvl .ls { font-size: 1.9rem; letter-spacing: 4px; margin: 4px 0; }
.lvl .st { font-size: 1.1rem; }
.big { font-size: 7rem; line-height: 1.3; text-align: center; color: var(--coral); margin: 0; }
.forms { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 10px 0; }
.forms div { background: #fff4e0; border-radius: 16px; text-align: center; padding: 8px 2px; }
.forms b { display: block; font-size: 2.2rem; line-height: 1.5; }
.forms small { color: var(--muted); font-size: .7rem; }
.word { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 2.2rem; margin: 8px 0; }
.word .em { font-size: 3rem; }
.say { text-align: center; }
.prog { height: 12px; background: #0001; border-radius: 99px; overflow: hidden; margin: 6px 0 4px; }
.prog i { display: block; height: 100%; background: var(--teal); border-radius: 99px; transition: width .3s; }
.opts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px; }
.opt { border: 0; background: #fff; border-radius: 22px; min-height: 96px; font-size: 3.4rem; box-shadow: 0 5px 0 #0002; cursor: pointer; color: var(--ink); }
.opt.opte { font-size: 3.2rem; } .opt.optw { font-size: 2.1rem; min-height: 84px; } .opt.ok { background: var(--good); color: #fff; } .opt.no { background: var(--bad); color: #fff; animation: shake .35s; }
.q { text-align: center; font-size: 1.15rem; font-weight: 800; }
.bigpic { font-size: 5.5rem; text-align: center; }
.mem { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 14px; }
.mc { aspect-ratio: 1; border: 0; border-radius: 18px; font-size: 2.3rem; background: var(--violet); color: #fff; box-shadow: 0 4px 0 #0003; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.mc.up { background: #fff; color: var(--ink); } .mc.done { background: var(--good); color: #fff; }
.slots, .tiles { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 14px 0; direction: rtl; }
.slot, .tile { width: 58px; height: 66px; border-radius: 16px; font-size: 2.3rem; border: 0; display: flex; align-items: center; justify-content: center; }
.slot { background: #0001; border: 3px dashed #0003; } .slot.f { background: #fff; border: 3px solid var(--teal); cursor: pointer; }
.tile { background: var(--sun); box-shadow: 0 4px 0 #0003; cursor: pointer; color: #5a3b00; } .tile.used { opacity: .25; }
.stars { font-size: 3rem; text-align: center; letter-spacing: 6px; }
.pop { animation: pop .5s; }
@keyframes pop { 0% { transform: scale(.6); opacity: 0; } 70% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-7px); } 75% { transform: translateX(7px); } }
.album { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.stk { background: #fff; border-radius: 16px; text-align: center; padding: 8px 2px; box-shadow: 0 3px 0 #0002; }
.stk.off { opacity: .35; filter: grayscale(1); }
.stk b { display: block; font-size: 1.8rem; } .stk span { font-size: 1.5rem; }
.shop { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.item { background: #fff; border-radius: 18px; padding: 10px 4px; text-align: center; box-shadow: 0 4px 0 #0002; }
.item .e { font-size: 2.2rem; }
.item button { margin-top: 6px; border: 0; border-radius: 12px; padding: 8px 6px; font-weight: 800; background: var(--teal); color: #fff; width: 90%; cursor: pointer; }
.item button.off { background: #0002; color: var(--ink); }
.row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.row > * { flex: 1; }
.toast { position: fixed; left: 50%; bottom: calc(24px + env(safe-area-inset-bottom)); transform: translateX(-50%); background: #2b2140; color: #fff; padding: 12px 18px; border-radius: 16px; z-index: 20; max-width: 90%; text-align: center; animation: pop .3s; }
.gift { background: linear-gradient(120deg,#22b8a8,#2fbf71); color: #fff; border-radius: 20px; padding: 14px; margin-top: 14px; display: flex; align-items: center; gap: 10px; justify-content: space-between; }
input.gate { font-size: 1.5rem; width: 100%; padding: 12px; border-radius: 14px; border: 3px solid #0002; text-align: center; margin: 10px 0; }
.wheel { font-size: 6rem; text-align: center; margin: 10px 0; line-height: 1.2; }
</style>
</head>
<body>
<div id="app"></div>
<script>
'use strict';
(function () {
  // ---------- بيانات الحروف ----------
  // [الحرف، الاسم، تلميح fr، تلميح en، كلمة، نطق، معنى fr، معنى en، رمز، مقطع صوتي]
  var LET = [
    ['ا','Alif','voyelle longue « a »','long vowel “a”','أسد','asad','lion','lion','🦁'],
    ['ب','Ba','comme « b »','like “b”','بطة','baṭṭa','canard','duck','🦆'],
    ['ت','Ta','comme « t »','like “t”','تفاحة','tuffāḥa','pomme','apple','🍎'],
    ['ث','Tha','« th » anglais (think)','English “th” (think)','ثعلب','thaʿlab','renard','fox','🦊'],
    ['ج','Jim','« dj » comme dans djembé','like “j” in jam','جمل','jamal','chameau','camel','🐫'],
    ['ح','Ha','« h » soufflé, au fond de la gorge','deep breathy “h”','حصان','ḥiṣān','cheval','horse','🐴'],
    ['خ','Kha','« j » espagnol / « ch » de Bach','like “ch” in Bach','خروف','kharūf','mouton','sheep','🐑'],
    ['د','Dal','comme « d »','like “d”','دب','dubb','ours','bear','🐻'],
    ['ذ','Dhal','« th » doux (this)','soft “th” (this)','ذرة','dhura','maïs','corn','🌽'],
    ['ر','Ra','« r » roulé','rolled “r”','راديو','rādiyū','radio','radio','📻'],
    ['ز','Zay','comme « z »','like “z”','زرافة','zarāfa','girafe','giraffe','🦒'],
    ['س','Sin','comme « s »','like “s”','سمكة','samaka','poisson','fish','🐟'],
    ['ش','Shin','comme « ch »','like “sh”','شمس','shams','soleil','sun','☀️'],
    ['ص','Sad','« s » appuyé, bouche arrondie','heavy “s”','صاروخ','ṣārūkh','fusée','rocket','🚀'],
    ['ض','Dad','« d » appuyé','heavy “d”','ضفدع','ḍifdaʿ','grenouille','frog','🐸'],
    ['ط','Ta','« t » appuyé','heavy “t”','طائرة','ṭā’ira','avion','plane','✈️'],
    ['ظ','Dha','« th » doux appuyé','heavy soft “th”','ظرف','ẓarf','enveloppe','envelope','✉️'],
    ['ع','ʿAyn','son de gorge serrée','squeezed throat sound','عنب','ʿinab','raisin','grapes','🍇'],
    ['غ','Ghayn','« r » grasseyé','gargled “r”','غيمة','ghayma','nuage','cloud','☁️'],
    ['ف','Fa','comme « f »','like “f”','فيل','fīl','éléphant','elephant','🐘'],
    ['ق','Qaf','« k » du fond de la gorge','deep “k”','قمر','qamar','lune','moon','🌙'],
    ['ك','Kaf','comme « k »','like “k”','كتاب','kitāb','livre','book','📖'],
    ['ل','Lam','comme « l »','like “l”','ليمون','laymūn','citron','lemon','🍋'],
    ['م','Mim','comme « m »','like “m”','موزة','mawza','banane','banana','🍌'],
    ['ن','Nun','comme « n »','like “n”','نجمة','najma','étoile','star','⭐'],
    ['ه','Ha','« h » léger comme dans hop','light “h” as in hop','هدية','hadiyya','cadeau','gift','🎁'],
    ['و','Waw','« ou » / « w »','“oo” / “w”','وردة','warda','fleur','flower','🌹'],
    ['ي','Ya','« i » / « y »','“ee” / “y”','يد','yad','main','hand','✋']
  ].map(function (r, i) {
    return { i: i, c: r[0], n: r[1], h: { fr: r[2], en: r[3] }, w: r[4], tr: r[5], m: { fr: r[6], en: r[7] }, e: r[8], s: (r[0] === 'ا' ? 'أَ' : r[0] + 'َ') };
  });
  var NOJOIN = 'ادذرزو';
  var PER = 4, PERW = Math.ceil(LET.length / PER), FREE_LEVELS = 7, SKU = 'nour_full';
  function mk(rows) { return rows.map(function (r, i) { return { i: i, w: r[0], tr: r[1], m: { fr: r[2], en: r[3] }, e: r[4] }; }); }
  var VOC = [
    mk([['أحمر','aḥmar','rouge','red','🔴'],['أزرق','azraq','bleu','blue','🔵'],['أخضر','akhḍar','vert','green','🟢'],['أصفر','aṣfar','jaune','yellow','🟡'],['برتقالي','burtuqālī','orange','orange','🟠'],['بنفسجي','banafsajī','violet','purple','🟣'],['أسود','aswad','noir','black','⚫'],['أبيض','abyaḍ','blanc','white','⚪']]),
    mk([['قطة','qiṭṭa','chat','cat','🐱'],['كلب','kalb','chien','dog','🐶'],['بقرة','baqara','vache','cow','🐮'],['دجاجة','dajāja','poule','hen','🐔'],['أرنب','arnab','lapin','rabbit','🐰'],['سلحفاة','sulaḥfā','tortue','turtle','🐢'],['فراشة','farāsha','papillon','butterfly','🦋'],['نحلة','naḥla','abeille','bee','🐝'],['ذئب','dhi’b','loup','wolf','🐺'],['قرد','qird','singe','monkey','🐵'],['ثعبان','thuʿbān','serpent','snake','🐍'],['تمساح','timsāḥ','crocodile','crocodile','🐊'],['حوت','ḥūt','baleine','whale','🐳'],['عصفور','ʿuṣfūr','oiseau','bird','🐦'],['نمر','namir','tigre','tiger','🐯'],['دلفين','dulfīn','dauphin','dolphin','🐬']]),
    mk([['برتقال','burtuqāl','orange (fruit)','orange (fruit)','🍊'],['فراولة','farāwla','fraise','strawberry','🍓'],['بطيخ','biṭṭīkh','pastèque','watermelon','🍉'],['خوخ','khawkh','pêche','peach','🍑'],['كرز','karaz','cerise','cherry','🍒'],['أناناس','ananās','ananas','pineapple','🍍'],['جزر','jazar','carotte','carrot','🥕'],['طماطم','ṭamāṭim','tomate','tomato','🍅'],['بطاطس','baṭāṭis','pomme de terre','potato','🥔'],['فلفل','filfil','piment','chili','🌶️'],['بصل','baṣal','oignon','onion','🧅'],['ثوم','thūm','ail','garlic','🧄']]),
    mk([['بيت','bayt','maison','house','🏠'],['باب','bāb','porte','door','🚪'],['سرير','sarīr','lit','bed','🛏️'],['كرسي','kursī','chaise','chair','🪑'],['ساعة','sāʿa','horloge','clock','⏰'],['مفتاح','miftāḥ','clé','key','🔑'],['أب','ab','papa','dad','👨'],['أم','umm','maman','mum','👩'],['طفل','ṭifl','enfant','child','🧒'],['جدة','jadda','grand-mère','grandma','👵'],['جد','jadd','grand-père','grandpa','👴'],['مدرسة','madrasa','école','school','🏫']]),
    mk([['صفر','ṣifr','zéro','zero','0️⃣'],['واحد','wāḥid','un','one','1️⃣'],['اثنان','ithnān','deux','two','2️⃣'],['ثلاثة','thalātha','trois','three','3️⃣'],['أربعة','arbaʿa','quatre','four','4️⃣'],['خمسة','khamsa','cinq','five','5️⃣'],['ستة','sitta','six','six','6️⃣'],['سبعة','sabʿa','sept','seven','7️⃣'],['ثمانية','thamāniya','huit','eight','8️⃣'],['تسعة','tisʿa','neuf','nine','9️⃣'],['عشرة','ʿashara','dix','ten','🔟']])
  ];
  var WDEF = [{ t: 'letters', n: 7 }, { t: 'vowels', n: 7 }, { t: 'words', n: 7 }].concat(VOC.map(function (it) { return { t: 'vocab', n: Math.ceil(it.length / 4), items: it }; }));
  var WSTART = [], LEVELS = 0, WORLDS = WDEF.length;
  WDEF.forEach(function (d) { WSTART.push(LEVELS); LEVELS += d.n; });
  function wt(w) { return WDEF[w].t; }
  function isWordy(w) { return wt(w) === 'words' || wt(w) === 'vocab'; }
  var CON = ['', 'b', 't', 'th', 'dj', 'ḥ', 'kh', 'd', 'dh', 'r', 'z', 's', 'ch', 'ṣ', 'ḍ', 'ṭ', 'ẓ', 'ʿ', 'gh', 'f', 'q', 'k', 'l', 'm', 'n', 'h', 'w', 'y'];
  var MARK = ['\u064E', '\u0650', '\u064F'], VOW = ['a', 'i', 'ou'], VOWEN = ['a', 'i', 'u'];
  function syl(l, v) { return (l.c === 'ا' ? 'أ' : l.c) + MARK[v]; }
  function syltr(l, v) { return (S.lang === 'en' ? CON[l.i] + VOWEN[v] : CON[l.i] + VOW[v]).replace(/^(a|i|u|ou)/, function (m) { return m; }); }
  var HATS = [['🧢', 15], ['🎀', 20], ['🎓', 25], ['🌸', 30], ['🕶️', 35], ['🎩', 45], ['👑', 70]];

  // ---------- الترجمة ----------
  var TX = {
    fr: {
      world: ['Monde 1 · Les lettres', 'Monde 2 · Les voyelles', 'Monde 3 · Les mots', 'Monde 4 · Les couleurs', 'Monde 5 · Les animaux', 'Monde 6 · Fruits et légumes', 'Monde 7 · La maison et la famille', 'Monde 8 · Les chiffres'], quizSL: 'Écoute et trouve la syllabe', quizST: 'Quelle syllabe lit-on :', quizW: 'Quel est le mot de cette image ?', vowelsT: 'Lettre + voyelle = syllabe', memS: 'Trouve les paires : syllabe et sa lecture', memW: 'Trouve les paires : mot et image', wordT: 'Le mot',
      payTitle: 'Débloque toute l’aventure', payText: 'Les {f} premiers niveaux sont gratuits. Un seul achat, une seule fois, débloque les {n} autres niveaux : voyelles, mots, couleurs, animaux, fruits, maison et chiffres. Pas d’abonnement, pas de publicité.', payBtn: 'Débloquer (achat unique)', payNo: 'L’achat est disponible dans l’application installée depuis Google Play.', payOk: 'Merci ! Tout est débloqué 🎉', payFail: 'Achat annulé.', payRestore: 'Restaurer mon achat', payNone: 'Aucun achat à restaurer.', payAsk: 'Un adulte doit confirmer l’achat.', premiumOn: 'Version complète ✅', quizQ: 'Quel est ce mot ?',
      tag: 'Bonjour mon champion ! La maîtresse parle français, les lettres parlent arabe ❤️',
      play: 'Jouer', review: 'Révision', wheel: 'La roue', album: 'Album', shop: 'Boutique', parents: 'Parents', back: 'Retour',
      level: 'Niveau {n}', lessonOf: 'Leçon : lettre {a} sur {b}', next: 'Suivant', listen: 'Écouter', forms: 'Les 4 formes',
      iso: 'seule', ini: 'début', med: 'milieu', fin: 'fin', quizL: 'Écoute et trouve la lettre', quizP: 'Quelle est la première lettre du mot ?',
      mem: 'Trouve les paires : lettre et image', build: 'Remets les lettres dans l’ordre', good: ['Bravo !', 'Super !', 'Génial !', 'Excellent !', 'Tu es un champion !'],
      oops: 'Essaie encore !', done: 'Niveau terminé !', starsWon: '+{n} ⭐', cont: 'Continuer', retry: 'Rejouer', locked: 'Termine le niveau précédent pour l’ouvrir.',
      streak: '🔥 {n} j', gift: 'Cadeau du jour : +{n} ⭐', take: 'Prendre', spin: 'Tourner la roue !', spinWait: 'Reviens dans {m} min pour tourner encore.', spinWin: 'Tu gagnes {n} ⭐ !',
      albumT: 'Mes autocollants', albumH: 'Termine un niveau pour gagner ses autocollants.', shopT: 'Habille Nour', buy: 'Acheter', wear: 'Mettre', off: 'Enlever', worn: 'Porté', notEnough: 'Pas assez d’étoiles.',
      gateQ: 'Pour les parents : {a} + {b} = ?', gateGo: 'Entrer', gateBad: 'Ce n’est pas la bonne réponse.', sound: 'Son', lang: 'Langue', on: 'Activé', offS: 'Coupé',
      reset: 'Effacer la progression', resetSure: 'Appuie encore pour confirmer : tout sera effacé.', resetDone: 'Progression effacée.',
      privacy: 'Nour ne collecte aucune donnée, n’affiche aucune publicité et n’envoie rien sur Internet. La progression reste sur cet appareil.',
      noVoice: 'Pas de voix arabe sur cet appareil : les images et les lettres restent disponibles.', progress: 'Lettres apprises : {a} sur {b}', rev0: 'Termine d’abord le niveau 1 pour ouvrir la révision.',
      mis: 'Erreurs : {n}'
    },
    en: {
      world: ['World 1 · Letters', 'World 2 · Vowels', 'World 3 · Words', 'World 4 · Colors', 'World 5 · Animals', 'World 6 · Fruit and vegetables', 'World 7 · Home and family', 'World 8 · Numbers'], quizSL: 'Listen and find the syllable', quizST: 'Which syllable reads:', quizW: 'Which word matches this picture?', vowelsT: 'Letter + vowel = syllable', memS: 'Find the pairs: syllable and how it reads', memW: 'Find the pairs: word and picture', wordT: 'The word',
      payTitle: 'Unlock the whole adventure', payText: 'The first {f} levels are free. One purchase, one time, unlocks the other {n} levels: vowels, words, colors, animals, fruit, home and numbers. No subscription, no ads.', payBtn: 'Unlock (one-time purchase)', payNo: 'Purchase is available in the app installed from Google Play.', payOk: 'Thank you! Everything is unlocked 🎉', payFail: 'Purchase cancelled.', payRestore: 'Restore my purchase', payNone: 'No purchase to restore.', payAsk: 'An adult must confirm the purchase.', premiumOn: 'Full version ✅', quizQ: 'What is this word?',
      tag: 'Hello champion! Your teacher speaks English, the letters speak Arabic ❤️',
      play: 'Play', review: 'Review', wheel: 'Wheel', album: 'Album', shop: 'Shop', parents: 'Parents', back: 'Back',
      level: 'Level {n}', lessonOf: 'Lesson: letter {a} of {b}', next: 'Next', listen: 'Listen', forms: 'The 4 forms',
      iso: 'alone', ini: 'start', med: 'middle', fin: 'end', quizL: 'Listen and find the letter', quizP: 'What is the first letter of the word?',
      mem: 'Find the pairs: letter and picture', build: 'Put the letters in order', good: ['Great!', 'Super!', 'Awesome!', 'Excellent!', 'You are a champion!'],
      oops: 'Try again!', done: 'Level complete!', starsWon: '+{n} ⭐', cont: 'Continue', retry: 'Play again', locked: 'Finish the previous level to open it.',
      streak: '🔥 {n} d', gift: 'Daily gift: +{n} ⭐', take: 'Take', spin: 'Spin the wheel!', spinWait: 'Come back in {m} min to spin again.', spinWin: 'You win {n} ⭐!',
      albumT: 'My stickers', albumH: 'Finish a level to win its stickers.', shopT: 'Dress up Nour', buy: 'Buy', wear: 'Wear', off: 'Take off', worn: 'Worn', notEnough: 'Not enough stars.',
      gateQ: 'For parents: {a} + {b} = ?', gateGo: 'Enter', gateBad: 'That is not the right answer.', sound: 'Sound', lang: 'Language', on: 'On', offS: 'Off',
      reset: 'Erase progress', resetSure: 'Press again to confirm: everything will be erased.', resetDone: 'Progress erased.',
      priva
