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
//END
