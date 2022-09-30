// For typ-o russian cyrillic keyboard practice mini web-app
// By Cemre Efe Karakaş, 2020 October

// keys on the r. cyrillic keyboard
// letters capitalized nonetheless
keys = [
  'Ё1234567890-='.split(''),
  'ЙЦУКЕНГШЩЗХЪ\\'.split(''),
  'ФЫВАПРОЛДЖЭ'.split(''),
  'ЯЧСМИТЬБЮ.'.split(''),
]

// keys on the r. cyrillic keyboard on shift
shift = [
  'Ё!"№;%:?*()_+'.split(''),
  'ЙЦУКЕНГШЩЗХЪ/'.split(''),
  'ФЫВАПРОЛДЖЭ'.split(''),
  'ЯЧСМИТЬБЮ,'.split(''),
]

// key codes on the keyboard
// notice the keycodes ending in ..00
// these key codes are duplicates, that is on opera.
// I had to implement a workaround making use of `event.code`s (ugly).
codes = [
  [222,49,50,51,52,53,54,55,56,57,48,189,18900,],
  [81,87,69,82,84,89,85,186,79,80,221,22100,188,],
  [65,83,68,70,71,72,74,75,76,18600,73,],
  [90,88,67,86,66,78,77,18800,190,191,],
]

// dictionary of keycodes:letters
keyDic = {
  222:"ё",
  49:"1",
  50:"2",
  51:"3",
  52:"4",
  53:"5",
  54:"6",
  55:"7",
  56:"8",
  57:"9",
  48:"0",
  189:"-",
  18900:"=", //cau

  81:"й",
  87:"ц",
  69:"у",
  82:"к",
  84:"е",
  89:"н",
  85:"г",
  186:"ш",
  79:"щ",
  80:"з",
  221:"х",
  22100:"ъ", //cau
  188:"\\",

  65:"ф",
  83:"ы",
  68:"в",
  70:"а",
  71:"п",
  72:"р",
  74:"о",
  75:"л",
  76:"д",
  18600:"ж", //cau
  73:"э",

  90:"я",
  88:"ч",
  67:"с",
  86:"м",
  66:"и",
  78:"т",
  77:"ь",
  18800:"б", //cau
  190:"ю",
  191:".",
}

// dictionary of keycodes:letters (on shift)
shiftDic = {
  222:"Ё",
  49:"!",
  50:"\"",
  51:"№",
  52:";",
  53:"%",
  54:":",
  55:"?",
  56:"*",
  57:"(",
  48:")",
  189:"_",
  18900:"+", //cau

  81:"Й",
  87:"Ц",
  69:"У",
  82:"К",
  84:"Е",
  89:"Н",
  85:"Г",
  186:"Ш",
  79:"Щ",
  80:"З",
  221:"Х",
  22100:"Ъ", //cau
  188:"/",

  65:"Ф",
  83:"Ы",
  68:"В",
  70:"А",
  71:"П",
  72:"Р",
  74:"О",
  75:"Л",
  76:"Д",
  18600:"Ж", //cau
  73:"Э",

  90:"Я",
  88:"Ч",
  67:"С",
  86:"М",
  66:"И",
  78:"Т",
  77:"Ь",
  18800:"Б", //cau
  190:"Ю",
  191:",",
}

// 600 most used russian words
// taken from http://masterrussian.com/vocabulary/most_common_words.htm
allWords = [ "и","в","не","он","на","я","что","тот","быть","с","а","весь","это","как","она","по","но","они","к","у","ты","из","мы","за","вы","так","же","от","сказать","этот","который","мочь","человек","о","один","ещё","бы","такой","только","себя","своё","какой","когда","уже","для","вот","кто","да","говорить","год","знать","мой","до","или","если","время","рука","нет","самый","ни","стать","большой","даже","другой","наш","свой","ну","под","где","дело","есть","сам","раз","чтобы","два","там","чем","глаз","жизнь","первый","день","тут","во","ничто","потом","очень","со","хотеть","ли","при","голова","надо","без","видеть","идти","теперь","тоже","стоять","друг","дом","сейчас","можно","после","слово","здесь","думать","место","спросить","через","лицо","что","тогда","ведь","хороший","каждый","новый","жить","должный","смотреть","почему","потому","сторона","просто","нога","сидеть","понять","иметь","конечный","делать","вдруг","над","взять","никто","сделать","дверь","перед","нужный","понимать","казаться","работа","три","ваш","уж","земля","конец","несколько","час","голос","город","последний","пока","хорошо","давать","вода","более","хотя","всегда","второй","куда","пойти","стол","ребёнок","увидеть","сила","отец","женщина","машина","случай","ночь","сразу","мир","совсем","остаться","об","вид","выйти","дать","работать","любить","старый","почти","ряд","оказаться","начало","твой","вопрос","много","война","снова","ответить","между","подумать","опять","белый","деньги","значить","про","лишь","минута","жена","посмотреть","правда","главный","страна","свет","ждать","мать","будто","никогда","товарищ","дорога","однако","лежать","именно","окно","никакой","найти","писать","комната","Москва","часть","вообще","книга","маленький","улица","решить","далекий","душа","чуть","вернуться","утро","некоторый","считать","сколько","помнить","вечер","пол","таки","получить","народ","плечо","хоть","сегодня","бог","вместе","взгляд","ходить","зачем","советский","русский","бывать","полный","прийти","палец","Россия","любой","история","наконец","мысль","узнать","назад","общий","заметить","словно","прошлый","уйти","известный","давно","слышать","слушать","бояться","сын","нельзя","прямо","долго","быстро","лес","похожий","пора","пять","глядеть","оно","сесть","имя","ж","разговор","тело","молодой","стена","красный","читать","право","старик","ранний","хотеться","мама","оставаться","высокий","путь","поэтому","совершенно","кроме","тысяча","месяц","брать","написать","целый","огромный","начинать","спина","настоящий","пусть","язык","точно","среди","чувствовать","сердце","вести","иногда","мальчик","успеть","небо","живой","смерть","продолжать","девушка","образ","ко","забыть","вокруг","письмо","власть","чёрный","пройти","появиться","воздух","разный","выходить","просить","брат","собственный","отношение","затем","пытаться","показать","вспомнить","система","четыре","квартира","держать","также","любовь","солдат","откуда","чтоб","называть","третий","хозяин","вроде","уходить","подойти","поднять","особенно","спрашивать","начальник","оба","бросить","школа","парень","кровь","двадцать","солнце","неделя","послать","находиться","ребята","поставить","встать","например","шаг","мужчина","равно","нос","мало","внимание","капитан","ухо","туда","сюда","играть","следовать","рассказать","великий","действительно","слишком","тяжёлый","спать","оставить","войти","длинный","чувство","молчать","рассказывать","отвечать","становиться","остановиться","берег","семья","искать","генерал","момент","десять","начать","следующий","личный","труд","верить","группа","немного","впрочем","видно","являться","муж","разве","движение","порядок","ответ","тихо","знакомый","газета","помощь","сильный","скорый","собака","дерево","снег","сон","смысл","смочь","против","бежать","двор","форма","простой","приехать","иной","кричать","возможность","общество","зеленый","грудь","угол","открыть","происходить","ладно","черный","век","карман","ехать","немец","наверное","губа","дядя","приходить","часто","домой","огонь","писатель","армия","состояние","зуб","очередь","кой","подняться","камень","гость","показаться","ветер","собираться","попасть","принять","сначала","либо","поехать","услышать","уметь","случиться","странный","единственный","рота","закон","короткий","море","добрый","темный","гора","врач","край","стараться","лучший","река","военный","мера","страшный","вполне","звать","произойти","вперед","медленно","возле","никак","заниматься","действие","довольно","вещь","необходимый","ход","боль","судьба","причина","положить","едва","черта","девочка","лёгкий","волос","купить","номер","основной","широкий","умереть","далеко","плохо","глава","красивый","серый","пить","командир","обычно","партия","проблема","страх","проходить","ясно","снять","бумага","герой","пара","государство","деревня","речь","начаться","средство","положение","связь","скоро","небольшой","представлять","завтра","объяснить","пустой","произнести","человеческий","нравиться","однажды","мимо","иначе","существовать","класс","удаться","толстый","цель","сквозь","прийтись","чистый","знать","прежний","профессор","господин","счастье","худой","дух","план","чужой","зал","представить","особый","директор","бывший","память","близкий","сей","результат","больной","данный","кстати","назвать","след","улыбаться","бутылка "
]

// meanings of the 600 most used russian words
// taken from http://masterrussian.com/vocabulary/most_common_words.htm
allMeanings = [
"and, though","in, at","not","he","on, it, at, to","I","what, that, why","that","to be","with, and, from, of","while, and, but","all, everything","that, this, it","how, what, as, like","she","on, along, by","but","they","to, for, by","by, with, of","you, thou","from, of, in","we","behind, over, at, after","you","so, thus, then","and, as for, but, same","from, of, for","to say, to speak","this","which, who, that","be able","man, person","of, about, against","one, some, alone","still, yet","would","such, so, some","only, merely, but","myself, himself, herself","one's own, my, our","what, which, how","when, while, as","already, by now","for, to","here, there, this is, that's","who, that, some","yes, but","to say, to tell, to speak","year","to know, be aware","my, mine","to, up to, about, before","or","if","time, season","hand, arm","no, not, but","most, the very, the same","not a, not, neither… nor","to become, begin, come","big, large, important","even","other, another, different","our, ours","my, our, your","now, right, well, come on","under, for, towards, to","where","business, affair, matter","to eat, to be","myself, yourself","time, once, since","that, in order that","two","there, then","than; instead of","eye; sight","life","first, front, former","day","here, now, then","in, at; super, exactly","nothing","afterwards, then","very","with","to want, like","whether, if","attached to, in the presence of, by, about","head, mind, brains","over, above, ought to","without","to see","to go, come","now, nowadays","also, as well, too","to stand, be, stand up","friend","house, home","now, presently, soon","one can","after, afterwards","word","here","to think; believe","place; seat","to ask","through, across","face; person","what, which, that","then","you see, you know","good, nice","each, every","new; modern","to live","due, proper","to look, watch","why","that's why","side, party","simply","foot, leg","to sit","to understand; realize","to have, own","final, last","to do, make","suddenly","above, over","to take","nobody","to do, make, finish","door","before, in front of","necessary","to understand","to seem, appear","work, job","three","yours","really, already","earth, land, soil","end, distance","several, some","hour, time","voice","town, city","last, the latest, new","for the present","well","to give; let, allow","water","more","although","always","second","where, what for, much","to go","table, desk; board","child, kid, infant","to see","strength, force","father","woman","car, machine, engine","case, occasion, incident","night","at once, right away, just","world, peace","quite, entirely, totally","to remain, stay","about, of","appearance, look, view","to go out, come out, appear","to give","to work","to love","old","almost","row, line","find oneself, turn out","beginning, origin, source","your, yours (informal)","question, matter, problem","many, much","war","again","to answer, reply","between, among","to think","again","white","money","to mean, signify","about, for","only, as soon as","minute, moment","wife","to take a look, watch, inspect","truth","main, chief","country","light;world","to wait","mother","as if, as though","never","comrade, friend","road, way, journey","however, though","to lie, be situated","namely, just","window, windowsill","no, none","to find, discover, consider","to write","a room","Moscow","part, share, department","in general, altogether, on the whole","a book","small, little","street","to decide, solve","distant, remote","soul, spirit","hardly, slightly","to return","morning","some","to count, consider","how much, how many","to remember","evening","floor; sex","after all","to receive, get, obtain","people, nation","shoulder, upper arm","even, if you want, though","today","god","together","look, glance; view","to go, walk","what for, why","Soviet","Russian","be, visit, happen","full, complete","to come, arrive","finger, toe","Russia","any, every","history, story, event","at last, finally","thought, idea","to know, learn, recognize","back, backwards","general, common","to notice, observe","as if, like","past","to leave, go away","well-known, famous","long ago","to hear","to listen, hear","to be afraid, fear","son","it is impossible, can't","straight, frankly","for a long time","fast, quickly","forest","similar, alike","time; pore (see #1000)","five","to look, gaze","it","to sit","name","and, as for, but","talk, conversation","body","young ; bridegroom (as a noun)","wall","red","to read","right","old man","early","want, like","mummy, mum","to remain, stay","tall, high","way, track, path","therefore","absolutely, quite","except, besides","a thousand","month","to take; hire","to write","intact, whole, entire","huge, enormous","to begin","back","present;real, true","let's, though","tongue, language","exactly","among","to feel","heart","to lead","sometimes","boy","to be in time, be successful","sky","living, live, lively","death","to continue","girl, miss","shape, form, image","to, towards, by","to forget","around","letter","power","black","to pass, go by, be over","to appear, show up","air","different","to go out; nurse","to ask","brother","one's own","relationship, attitude","then, after that","to try","to show, display","to remember, recall","system","four","flat, apartment","to hold, keep","also, as well, too","love","soldier","where… from","that, in order that,","to call, name,","third","master, boss, host","like, not unlike","to leave, go away","to approach, come up","to lift, raise","especially, particularly","to ask, inquire","chief, head, superior","both","to throw","school","boy, fellow, guy","blood","twenty","sun","week","to send, dispatch","to be found, turn up","guys, children","to put, place, set","to get up, rise, stand up","for example, for instance","step","man, male","alike, in like manner","nose","little, few,","attention","captain, master","ear","there","here","to play","to follow, come next","to tell, narrate","great","indeed, really","too, too much","heavy","to sleep","to leave, abandon","to enter, come in","long","feeling","to keep silence","to tell, narrate,","to answer, reply,","to stand; to become","to stop","bank, shore, coast","family","to search","general","moment, instant","ten","to begin","next, following","personal","labor, work","to believe","group","a little","however, though","evidently, obviously","to appear","husband","really?, perhaps","movement","order","answer, reply","quietly, softly, slowly","familiar, acquainted","newspaper","help","strong, powerful","quick, fast","dog","tree","snow","dream","sense, meaning, purpose","to be able","against, opposite, contrary to","to run, hurry","yard, court","form, shape, uniform","simple, easy, plain","to arrive, come","different, other","to cry, shout","possibility, opportunity, chance","society","green","breast, chest","corner, angle","to open","to happen, occur, take place","in harmony, well, all right","black (as in \"she wears black\")","century, age","pocket","to go, ride, drive, travel","German","probably, most likely","lip","uncle","to come, arrive","often","home(as in \"she came home\")","fire","writer","army","state, condition; fortune","tooth","line, queue, turn","which (old-fashioned, literary); mostly found in set expressions: ни в ко́ем слу́чае, ни ко́им о́бразом, в кои ве́ки, на кой чёрт?","to rise, climb","stone","guest","to appear, come in sight","wind","to gather together, assemble; intend","to hit; to find oneself","to take, admit, accept","at first, from the beginning","or","to depart, set off","to hear","to be able, know, can","to happen","strange","only, sole","company (military)","law, act, statue","short","sea","kind","dark","mountain, hill","physician, doctor","border, edge; land, country","to try, endeavour","better, best","river","military","measure, step","terrible, frightful","quite, fully","to call","to happen, occur, take place","forward","slowly","by, near, close by","in now way, by no means","to be occupied, engage","action, effect","enough; rather","thing","necessary","move","pain","fate, fortune, destiny","cause, reason, motive","to lay down, put down, place","hardly, just, barely","line, boundary; trait","girl, little girl","light, easy","hair","to buy, purchase","number, size, room, issue","main","wide","to die","far, far off","badly","head, chief","beautiful","grey; dull","to drink","commander, commanding officer","usually","party","problem, issue","fear","to pass, go;study","clear, clearly","to take away, take off;photograph","paper","hero","pair, couple","State","village, country","speech","to begin","means, remedy","position, posture, condition, state","tie, bond; connection, relation","quickly, fast, soon","small, not great","to present, introduce, imagine","tomorrow","to explain","empty, hollow; idle","to pronounce, say, utter","human","to please, like","once, one day","past, by","otherwise, differently","to exist, to be","class","turn out well, succeed, manage","thick, heavy, fat","goal, object, target","through","to fit, fall; have to","clean, pure","to know","former","professor","gentleman, Mr.","happiness, luck","thin, skinny; masterrussian.com","spirit","plan","somebody else's;strange, foreign","hall","to present, produce, introduce","special","director, manager","former, ex-","memory","near, similar; intimate","this","result, outcome","sick","given, present","to the point, at the same time","to call, name","track, footprint","to smile","bottle"
]

// On document ready
$( document ).ready(function() {
    console.log( "ready!" );

    // indicator: shift is currently down
    var shiftDown = false;

    // if shift down, set shiftDown true
    $(document).keydown(function(e) {
      if (e.keyCode == 16) {
        shiftDown = true;
        fillKeyboard(shift);
      }
    });

    // if shift up, set shiftDown false
    $(document).keyup(function(e) {
      if (e.keyCode == 16) {
        shiftDown = false;
        fillKeyboard(keys);
      }
    });

    // fill the virtual keyboard with given set of keys
    function fillKeyboard(keys) {
      $('.kbb').remove();
      for(i=0; i<4; i++){
        for(j=0; j<keys[i].length; j++){
          var b = document.createElement('button');
          $(b).addClass('kbb')
            .html(keys[i][j])
            .attr('id', codes[i][j].toString())
            .appendTo($('#kw'+(i+1)));
        }
      }
    }

    // fill the virtual keyboard
    fillKeyboard(keys);

    // get pressed key's corresponding char
    function cyrillize(code) {
      if (shiftDown) {
        return(shiftDic[code]);
      } else {
        return(keyDic[code]);
      }
    }


    var area = $('#txtArea');

    area.keydown(function(e){

      kCode = e.keyCode;

      if (kCode > 123 || kCode < 112) {
          e.preventDefault();
      }

      // escape duplicate keycodes
      // hope to ensure cross browser reliability

      //221 duality & browser support
      if(e.code == 'BracketLeft') {
        kCode = 221;
      } else if(e.code == 'BracketRight') {
        kCode = 22100;
      //188 duality & browser support
      } else if(e.code == 'Backslash') {
        kCode = 188;
      } else if(e.code == 'Comma') {
        kCode = 18800;
      //189 duality & browser support
      } else if(e.code == 'Minus') {
        kCode = 189;
      } else if(e.code == 'Equal') {
        kCode = 18900;
      //186 duality & browser support
      } else if(e.code == 'KeyI') {
        kCode = 186;18900
      } else if(e.code == 'Semicolon') {
        kCode = 18600;
      }

      // if the pressed key is not Unidentified
      if ( !(e.key != null && e.key === 'Unidentified') ) {

        // highlight corresponding button
        $('#' + kCode.toString()).css('background-color', 'var(--hover-color)');
        // get the text on txtArea excluding the trailing blank space & block
        $("#txtArea").text($("#txtArea").text().slice(0, -2));

        // if key is Backspace
        if (kCode == 8) {
          $("#txtArea").text($("#txtArea").text().slice(0, -1));
        // if key is Return
        } else if (kCode == 32) {
          $("#txtArea").text($("#txtArea").text() + " ");
        // if key will produce a char
        } else {
          $('#txtArea').append(cyrillize(kCode));
        }

        // add trailing space and block
        $("#txtArea").text($("#txtArea").text() + " █");


      }
    });

    area.keyup(function(e){
      // unhighlight the buttons
      $('.kbb').css('background-color', '#ffffff44');
    });

    // when a button is clicked, write down the corresponding char
    $(document).on('click', '.kbb', function(e) {
      // choose appropriate code:char dictionary
      choi = shiftDown ? shiftDic : keyDic;
      area.text(area.text().slice(0,-2) + choi[$(this).attr('id')] + ' █');
    });

    // pad numbers
    function pad(num, size=4) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

    // shuffle two arrays in a parallel manner
    // taken from https://stackoverflow.com/questions/18194745/shuffle-multiple-javascript-arrays-in-the-same-way
    function shuffle(obj1, obj2) {
      var index = obj1.length;
      var rnd, tmp1, tmp2;

      while (index) {
        rnd = Math.floor(Math.random() * index);
        index -= 1;
        tmp1 = obj1[index];
        tmp2 = obj2[index];
        obj1[index] = obj1[rnd];
        obj2[index] = obj2[rnd];
        obj1[rnd] = tmp1;
        obj2[rnd] = tmp2;
      }
    }


    var t;
    var word;
    var score;
    var timeSec;
    var gameOn = false;

    // start practice game
    function startGame() {

      area.text(" █");
      area.focus();

      gameOn = true;

      area = $('#txtArea');

      undt = $('#underTrue');
      undf = $('#underFalse');

      words = allWords;
      meanings = allMeanings;

      shuffle(words, meanings);

      turn = 0;

      word = words[0];
      timeSec = 12000;
      score = 0;

      $('#displaySpan').html(word);
      $('#timeRem').html(Math.ceil(timeSec/1000));
      $('#scorePts').html(pad(score));

      $('#meaning').html(meanings[turn]);

      undt.html(word);undf.html(word);

      block = "█"
      underlierF = "";
      underlierT = "";

      elapsed = 0;
      function decreaseTime() {
        timeSec -= 1000;
        elapsed += 1;
        $('#timeRem').html(Math.ceil(timeSec/1000));
        if (timeSec <= 0) {
          clearInterval(t);
          alert("Oops! Time beats us all!: You scored "+score.toString()+" points in "+elapsed.toString()+" seconds.");
          $('#displaySpan').html("Click Start!");
          undt.html("");undf.html("");
          area.text(" █");
          $('#meaning').html("");
          gameOn = false;
          return;
        }
      }

      /*
      get how much time to add to the timer
      calculated using https://mycurvefit.com
      on the following datapts
      |score|time|
      |1    |8000|
      |100  |6000|
      |200  |4000|
      |400  |3000|
      |800  |2000|
      |1000 |1000|
      */
      function getBonusTime(score, timer){
        timeToAdd = (2.706775 + (8049.318 - 2.706775)/(1 + Math.pow((score/232.6811), 1.108186)));
        return timeToAdd;
      }

      clearInterval(t);
      t=setInterval(decreaseTime,1000);


      area.keydown(function(e){

        if (gameOn) {
          if (e.keyCode == 13) {
            //console.log(area.text());
            answer = area.text().slice(0, -2);
            area.text(" █");
            if (word == answer) {

              timeSec += getBonusTime(score, timeSec);
              timeSec; // timer continues from previous value if not for this line lol

              score += word.length*(1+Math.ceil(timeSec/10000));
              turn += 1;
              if (turn == words.length) {
                clearInterval(t);
                alert("Congrats, you've gone through every word available! You scored "+score.toString()+" points in "+elapsed.toString()+" seconds.");
                $('#displaySpan').html("Click Start!");
                undt.html("");undf.html("");
                $('#meaning').html("");
                area.text(" █");
                turn = 0;
                gameOn = false;
                return;
              }
              word = words[turn];
              $('#meaning').html(meanings[turn]);
              $('#displaySpan').html(word);
              $('#timeRem').html(Math.ceil(timeSec/1000));
              $('#scorePts').html(pad(score));
              undt.html(word);undf.html(word);
            } else {
              //console.log("("+word + ")-(" + answer+")");
            }

          }

          var input = area.text();

          underlierF = "";
          underlierT = "";

          for(i=0;i<word.length;i++){
            var s;

            if (i<input.length-2 && word[i]==input[i]) {
              underlierF += word[i];
              underlierT += block;
            } else if (i<input.length-2 && word[i]!=input[i]){
              underlierF += block;
              underlierT += word[i];
            } else {
              underlierF += "&nbsp;";//word[i];
              underlierT += "&nbsp;";//block;
            }
          }
          undf.html("\"" + underlierF + "\"");
          undt.html("\"" + underlierT + "\"");
        }

      });

    }

    $("#startButton").click(function() {
      startGame();
    });


});
