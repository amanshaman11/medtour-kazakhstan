/**
 * Merges missing i18n keys into kk, uz, ky, tg, ar, zh translation files.
 * Run: node scripts/sync-missing-i18n.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "../lib/i18n/translations");

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const patches = {
  kk: {
    hero: {
      kazakhstan: "Қазақстан",
      exploreTreatments: "Емдеуді зерттеу",
      contactExpert: "Сарапшымен байланысу",
      discover: "Ашу",
      scrollDown: "Төмен айналдырыңыз",
    },
    citySelection: {
      badge: "Бағытыңызды таңдаңыз",
      title: "Үш әлемдік деңгейдегі медициналық қала",
      subtitle:
        "Әр қала бірегей медициналық мамандықтар, заманауи мекемелер және шынайы қазақ қонақжайлылығын ұсынады.",
      medicalStrengths: "Медициналық мамандықтар",
      attractions: "Негізгі көрікті жерлер",
      cities: {
        almaty: {
          name: "Алматы",
          description:
            "Қазақстанның ең ірі қаласы Алатау тауларының баурайында орналасқан — әлемдік деңгейдегі ауруханалар мен таулы пейзаждар, қала мәдениеті үйлеседі. Кардиохирургия, ЭКҰ, пластикалық хирургия және ортопедия орталықтарымен Алматы емделу мен есік ашатын қалпына келу ортасы үшін тамаша таңдау.",
          strengths: ["Кардиохирургия", "ЭКҰ және репродукция", "Пластикалық хирургия", "Ортопедия"],
          attractions: [
            "Үлкен Алматы көлі",
            "Медеу және Шымбұлақ шаңғы курорты",
            "Көк-Төбе",
            "Жасыл базар",
            "Орталық мемлекеттік музей",
          ],
        },
        astana: {
          name: "Астана",
          description:
            "Астана — Қазақстанның заманауи астанасы: футуристік сәулет, тамаша инфрақұрылым және елдің ең озық медициналық кампустары. Нейрохирургия, онкология, кардиология және күрделі диагностика үшін пациенттер мұнда келеді.",
          strengths: ["Нейрохирургия", "Онкология", "Кардиология", "Озық диагностика"],
          attractions: [
            "Бәйтерек мұнарасы",
            "Хан Шатыр",
            "Астана опера театры",
            "Ұлттық музей",
            "Есіл өзені жағажайы",
          ],
        },
        shymkent: {
          name: "Шымкент",
          description:
            "Шымкент — күн шуағы мол оңтүстік қала, Жібек жолының тарихи орны. Жылы қонақжайлылық, қолжетімді емдеу және табиғи кеңістіктерге оңай қол жеткізумен танымал.",
          strengths: ["Жалпы хирургия", "Стоматология", "Диагностика", "Отбасылық медицина"],
          attractions: [
            "Ордабасы алаңы",
            "Облыстық тарих музейі",
            "Ақсу-Жабағылы қорығы",
            "Дәстүрлі базарлар",
            "Жібек жолы ескерткіштері",
          ],
        },
      },
    },
    whyKazakhstan: {
      badge: "Неліктен Қазақстан",
      title: "Халықаралық пациенттер неге Қазақстанды таңдайды",
      subtitle:
        "Заманауи медициналық инфрақұрылым, қолжетімділік және жылы қонақжайлылықты біріктіретін елде ерекше медициналық көмек алыңыз.",
      reasons: {
        affordable: {
          title: "Қолжетімді денсаулық сақтау",
          description:
            "Батыс елдерімен салыстырғанда 40–60% үнемдеп, сол сападағы күтім алыңыз. Ашық бағалар жасырын шығындарсыз.",
        },
        specialists: {
          title: "Жоғары білікті мамандар",
          description:
            "Серіктес ауруханаларда халықаралық мекемелерде оқытылған дәрігерлер жұмыс істейді, көбінің ондаған жылдық тәжірибесі бар.",
        },
        equipment: {
          title: "Заманауи медициналық жабдық",
          description:
            "Озық диагностикалық құралдар, хирургиялық робототехника және әлемдік деңгейдегі технологияларға қол жеткізіңіз.",
        },
        waiting: {
          title: "Қысқа күту мерзімдері",
          description:
            "Консультация мен процедураларды айлар емес, күндер ішінде жоспарлаңыз. Ұзақ кезектер жоқ.",
        },
        support: {
          title: "Халықаралық пациенттерді қолдау",
          description:
            "Көптілді координаторлар сұраудан кейінгі бақылауға дейін әр қадамда көмектеседі.",
        },
        destinations: {
          title: "Керемет туристік бағыттар",
          description:
            "Емделуді саяхатпен үйлестіріңіз. Сауығу кезінде таулы пейзаждар мен мәдени мұраны зерттеңіз.",
        },
        safety: {
          title: "Қауіпсіз және қонақжайлы орта",
          description:
            "Қазақстан көптеген елдерге визасыз кіру, заманауи инфрақұрылым және қауіпсіздік репутациясымен танымал.",
        },
        care: {
          title: "Пациентке бағытталған күтім",
          description:
            "Жеке палаталар, отбасылық тұру опциялары және жеке емдеу жоспарларымен жеке назар аударылымын алыңыз.",
        },
      },
      stats: {
        savings: "Орташа үнемдеу",
        hospitals: "Аккредиттелген ауруханалар",
        patients: "Халықаралық пациенттер",
        support: "Көптілді қолдау",
      },
    },
    footer: {
      contactCenterLink: "Байланыс орталығы",
      available247: "24/7 қолжетімді",
      languages: "Тілдер",
      langs: {
        english: "Ағылшын",
        russian: "Орыс",
        kazakh: "Қазақ",
        uzbek: "Өзбек",
        kyrgyz: "Қырғыз",
        tajik: "Тәжік",
        arabic: "Араб",
        chinese: "Қытай",
      },
      serviceTypes: {
        hospitals: "Медициналық мекемелер",
        translation: "Аударма",
        hotels: "Тұру",
        transportation: "Көлік",
        tourism: "Туризм",
      },
    },
  },
};

// For other locales, use ru.json sections as structural base with locale-specific translations
// loaded from separate patch objects below
const ru = JSON.parse(readFileSync(join(dir, "ru.json"), "utf8"));

const uzPatch = {
  hero: {
    kazakhstan: "Qozog'iston",
    exploreTreatments: "Davolanishni o'rganish",
    contactExpert: "Mutaxassis bilan bog'lanish",
    discover: "Kashf eting",
    scrollDown: "Pastga aylantiring",
  },
  citySelection: {
    badge: "Manzilingizni tanlang",
    title: "Uchta jahon darajasidagi tibbiy shahar",
    subtitle:
      "Har bir shahar noyob tibbiy ixtisosliklar, zamonaviy muassasalar va haqiqiy qozoq mehmondo'stligini taklif etadi.",
    medicalStrengths: "Tibbiy ixtisosliklar",
    attractions: "Asosiy diqqatga sazovor joylar",
    cities: {
      almaty: {
        name: "Olmaota",
        description:
          "Qozog'istonning eng yirik shahri Alatau tog'lari etagida — jahon darajasidagi kasalxonalar va tog' manzaralari uyg'unlashgan. Kardiojarrohlik, EKO, plastik jarrohlik va ortopediya markazlari bilan Olmaota davolanish va tiklanish uchun ajoyib tanlov.",
        strengths: ["Kardiojarrohlik", "EKO va reproduksiya", "Plastik jarrohlik", "Ortopediya"],
        attractions: ["Katta Olmaota ko'li", "Medeu va Chimbolak", "Kok-Tobe", "Yashil bozor", "Markaziy davlat muzeyi"],
      },
      astana: {
        name: "Astana",
        description:
          "Astana — Qozog'istonning zamonaviy poytaxti: futuristik arxitektura va mamlakatning eng ilg'or tibbiy kampuslari. Nevrojarrohlik, onkologiya va kardiologiya uchun tanlanadi.",
        strengths: ["Nevrojarrohlik", "Onkologiya", "Kardiologiya", "Ilg'or diagnostika"],
        attractions: ["Bayterek minorasi", "Xan Shatir", "Astana opera teatri", "Milliy muzey", "Esil daryosi"],
      },
      shymkent: {
        name: "Chimkent",
        description:
          "Chimkent — quyoshli janubiy shahar, Ipak yo'li tarixiy joyi. Issiq mehmondo'stlik, arzon tibbiy xizmat va tabiatga qulay kirish bilan mashhur.",
        strengths: ["Umumiy jarrohlik", "Stomatologiya", "Diagnostika", "Oila tibbiyoti"],
        attractions: ["Ordabosiy maydoni", "Viloyat tarix muzeyi", "Aqsu-Jabag'ili qo'riqxonasi", "An'anaviy bozorlar", "Ipak yo'li yodgorliklari"],
      },
    },
  },
  whyKazakhstan: {
    badge: "Nima uchun Qozog'iston",
    title: "Xalqaro bemorlar nima uchun Qozog'istonni tanlaydi",
    subtitle:
      "Zamonaviy tibbiy infratuzilma, arzonlik va iliq mehmondo'stlikni birlashtirgan mamlakatda ajoyib tibbiy yordam oling.",
    reasons: {
      affordable: { title: "Arzon tibbiyot", description: "G'arb mamlakatlari bilan solishtirganda 40–60% tejash. Shaffof narxlar, yashirin xarajatlar yo'q." },
      specialists: { title: "Yuqori malakali mutaxassislar", description: "Hamkor kasalxonalarda xalqaro institutlarda o'qigan shifokorlar ishlaydi." },
      equipment: { title: "Zamonaviy tibbiy uskunalar", description: "Ilg'or diagnostika vositalari, jarrohlik robotlari va eng so'nggi texnologiyalar." },
      waiting: { title: "Qisqa kutish muddati", description: "Konsultatsiya va protseduralarni kunlar ichida rejalashtiring." },
      support: { title: "Xalqaro bemorlarni qo'llab-quvvatlash", description: "Ko'p tilli koordinatorlar har bir bosqichda yordam beradi." },
      destinations: { title: "Chiroyli sayyohlik yo'nalishlari", description: "Davolanishni sayohat bilan birlashtiring." },
      safety: { title: "Xavfsiz va mehmondo'st muhit", description: "Ko'p mamlakatlar uchun vizasiz kirish va zamonaviy infratuzilma." },
      care: { title: "Bemorga yo'naltirilgan parvarish", description: "Shaxsiy palatalar va oilaviy turar joy variantlari." },
    },
    stats: { savings: "O'rtacha tejash", hospitals: "Akkreditatsiyalangan kasalxonalar", patients: "Xalqaro bemorlar", support: "Ko'p tilli qo'llab-quvvatlash" },
  },
  footer: {
    contactCenterLink: "Aloqa markazi",
    available247: "24/7 mavjud",
    languages: "Tillar",
    langs: { english: "Ingliz", russian: "Rus", kazakh: "Qozoq", uzbek: "O'zbek", kyrgyz: "Qirg'iz", tajik: "Tojik", arabic: "Arab", chinese: "Xitoy" },
    serviceTypes: { hospitals: "Tibbiy muassasalar", translation: "Tarjima", hotels: "Turar joy", transportation: "Transport", tourism: "Turizm" },
  },
};

const kyPatch = {
  hero: {
    kazakhstan: "Казакстан",
    exploreTreatments: "Дарылоону изилдөө",
    contactExpert: "Адис менен байланышуу",
    discover: "Ачуу",
    scrollDown: "Төмөн айландырыңыз",
  },
  citySelection: {
    badge: "Багытыңызды тандаңыз",
    title: "Үч дүйнөлүк деңгээлдеги медициналык шаар",
    subtitle: "Ар бир шаар уникалдуу медициналык адистерди, заманбап мекемелерди жана казак меймандостугун сунуштайт.",
    medicalStrengths: "Медициналык адистер",
    attractions: "Негизги көрүү жерлери",
    cities: {
      almaty: { name: "Алматы", description: "Казакстандын эң ири шаары Ала-Тоо тоолорунун этегинде — дүйнөлүк деңгээлдеги ооруканалар жана тоо пейзаждары.", strengths: ["Кардиохирургия", "ЭКО", "Пластикалык хирургия", "Ортопедия"], attractions: ["Чоң Алматы көлү", "Медеу жана Шымбулак", "Кок-Тобе", "Жашыл базар", "Улуттук музей"] },
      astana: { name: "Астана", description: "Астана — заманбап борбор шаар жана өлкөнүн эң өнүккөн медициналык кампустары.", strengths: ["Нейрохирургия", "Онкология", "Кардиология", "Өнүккөн диагностика"], attractions: ["Байтерек", "Хан Шатыр", "Астана опера театры", "Улуттук музей", "Есил дарыясы"] },
      shymkent: { name: "Шымкент", description: "Шымкент — күн нуру мол түштүк шаар, Жибек жолунун тарыхый жери.", strengths: ["Жалпы хирургия", "Стоматология", "Диагностика", "Үй-бүлөлүк медицина"], attractions: ["Ордабасы аянты", "Облустук тарых музейи", "Аксу-Жабагылы коругу", "Салттуу базарлар", "Жибек жолу эстеликтери"] },
    },
  },
  whyKazakhstan: {
    badge: "Эмне үчүн Казакстан",
    title: "Эл аралык ооруканалар эмне үчүн Казакстанды тандашат",
    subtitle: "Заманбап медициналык инфраструктура, жеткиликтүүлүк жана меймандостук бириккен өлкөдө сапаттуу медициналык жардам алыңыз.",
    reasons: {
      affordable: { title: "Жеткиликтүү медицина", description: "Батыш өлкөлөрүнө караганда 40–60% үнөмдөө." },
      specialists: { title: "Жогорку квалификациялуу адистер", description: "Эл аралык мекемелерде окутулган дарыгерлер." },
      equipment: { title: "Заманбап медициналык жабдуулар", description: "Өнүккөн диагностикалык каражаттар жана хирургиялык робототехника." },
      waiting: { title: "Кыска күтүү мөөнөттөрү", description: "Консультацияларды күндөр ичинде пландаңыз." },
      support: { title: "Эл аралык ооруканаларды колдоо", description: "Көп тилдүү координаторлор ар бир кадамда жардам берет." },
      destinations: { title: "Керемет туристтик багыттар", description: "Дарылоону саякат менен бириктириңиз." },
      safety: { title: "Коопсуз жана меймандостук чөйрө", description: "Көп өлкөлөргө визасыз кирүү жана заманбап инфраструктура." },
      care: { title: "Ооруканага багытталган кам көрүү", description: "Жеке палаталар жана үй-бүлөлүк жайгашуу варианттары." },
    },
    stats: { savings: "Орточо үнөмдөө", hospitals: "Аккредитацияланган ооруканалар", patients: "Эл аралык ооруканалар", support: "Көп тилдүү колдоо" },
  },
  footer: {
    contactCenterLink: "Байланыш борбору",
    available247: "24/7 жеткиликтүү",
    languages: "Тилдер",
    langs: { english: "Англис", russian: "Орус", kazakh: "Казак", uzbek: "Өзбек", kyrgyz: "Кыргыз", tajik: "Тажик", arabic: "Араб", chinese: "Кытай" },
    serviceTypes: { hospitals: "Медициналык мекемелер", translation: "Котормо", hotels: "Жайгашуу", transportation: "Транспорт", tourism: "Туризм" },
  },
};

const tgPatch = {
  hero: {
    kazakhstan: "Қазоқистон",
    exploreTreatments: "Табобатро омӯзед",
    contactExpert: "Бо мутахассис тамос гиред",
    discover: "Кашф кунед",
    scrollDown: "Ба поён гардонед",
  },
  citySelection: {
    badge: "Мақсади худро интихоб кунед",
    title: "Се шаҳри тиббии дунёвӣ",
    subtitle: "Ҳар шаҳр ихтисосҳои тиббии беҳамто, муассисаҳои муосир ва меҳмоннавозии қазоқиро пешниҳод мекунад.",
    medicalStrengths: "Ихтисосҳои тиббӣ",
    attractions: "Ҷойҳои асосии тамошо",
    cities: {
      almaty: { name: "Олмотӣ", description: "Шаҳри бузургтарини Қазоқистон дар поёни кӯҳҳои Алатау — беморхонаҳои дунёвӣ ва манзараҳои кӯҳӣ.", strengths: ["Ҷарроҳии қалб", "ЭКО", "Ҷарроҳии пластикӣ", "Ортопедия"], attractions: ["Кӯли Олмотии калон", "Медеу ва Шимбулак", "Кӯк-Тобе", "Бозори сабз", "Музейи давлатӣ"] },
      astana: { name: "Астана", description: "Астана — пойтахти муосир бо меъмории ояндани ва муассисаҳои пешрафтаи тиббӣ.", strengths: ["Нейрожарроҳӣ", "Онкология", "Кардиология", "Ташхиси пешрафта"], attractions: ["Минораи Байтерек", "Хан Шатир", "Театри операи Астана", "Музейи миллӣ", "Канори наҳри Ишим"] },
      shymkent: { name: "Шимкент", description: "Шимкент — шаҳри ҷанубии офтобӣ дар Роҳи Абрешим.", strengths: ["Ҷарроҳии умумӣ", "Дандонпизишкӣ", "Ташхис", "Тибби оилавӣ"], attractions: ["Майдони Ордабосӣ", "Музейи таърихи вилоят", "Захирагоҳи Ақсу-Жабағилӣ", "Бозорҳои анъанавӣ", "Ёдгориҳои Роҳи Абрешим"] },
    },
  },
  whyKazakhstan: {
    badge: "Чаро Қазоқистон",
    title: "Чаро беморони байналмилалӣ Қазоқистонро интихоб мекунанд",
    subtitle: "Дар кишваре, ки инфрасохтори тиббии муосир, арзонӣ ва меҳмоннавозиро муттаҳид мекунад, тибби аъло гиред.",
    reasons: {
      affordable: { title: "Тибби арзон", description: "40–60% сарфа нисбат ба кишварҳои ғарбӣ." },
      specialists: { title: "Мутахассисони баландсифат", description: "Духтурони дар муассисаҳои байналмилалӣ омӯхташуда." },
      equipment: { title: "Таҷҳизоти тиббии муосир", description: "Воситаҳои ташхиси пешрафта ва роботҳои ҷарроҳӣ." },
      waiting: { title: "Вақти интизории кӯтоҳ", description: "Машварату процедураҳоро дар рӯзҳо на моҳҳо нақша кунед." },
      support: { title: "Дастгирии беморони байналмилалӣ", description: "Мутахассисони координатори чандзабона." },
      destinations: { title: "Ҷойҳои зебои сайёҳӣ", description: "Табобатро бо сафар якҷо кунед." },
      safety: { title: "Муҳити бехатар ва меҳмоннавоз", description: "Воридоти бевиза барои кишварҳои зиёд." },
      care: { title: "Муносибати бемормарказӣ", description: "Ҳуҷраҳои хусусӣ ва ҷойгиршавии оилавӣ." },
    },
    stats: { savings: "Сарфаи миёна", hospitals: "Беморхонаҳои аккредитатсияшуда", patients: "Беморони байналмилалӣ", support: "Дастгирии чандзабона" },
  },
  footer: {
    contactCenterLink: "Маркази тамос",
    available247: "Дастрас 24/7",
    languages: "Забонҳо",
    langs: { english: "Англисӣ", russian: "Русӣ", kazakh: "Қазоқӣ", uzbek: "Ӯзбекӣ", kyrgyz: "Қирғизӣ", tajik: "Тоҷикӣ", arabic: "Арабӣ", chinese: "Хитоӣ" },
    serviceTypes: { hospitals: "Муассисаҳои тиббӣ", translation: "Тарҷума", hotels: "Ҷойгиршавӣ", transportation: "Нақлиёт", tourism: "Сайёҳат" },
  },
};

const arPatch = {
  hero: {
    kazakhstan: "كازاخستان",
    exploreTreatments: "استكشف العلاجات",
    contactExpert: "تواصل مع خبير",
    discover: "اكتشف",
    scrollDown: "مرر للأسفل",
  },
  citySelection: {
    badge: "اختر وجهتك",
    title: "ثلاث مدن طبية عالمية المستوى",
    subtitle: "تقدم كل مدينة تخصصات طبية فريدة ومرافق حديثة وضيافة كازاخية أصيلة.",
    medicalStrengths: "التخصصات الطبية",
    attractions: "أهم المعالم",
    cities: {
      almaty: { name: "ألماتي", description: "أكبر مدن كازاخستان عند سفح جبال ألاتاو — حيث تلتقي المستشفيات العالمية بالمناظر الجبلية والثقافة الحضرية.", strengths: ["جراحة القلب", "أطفال الأنابيب والخصوبة", "الجراحة التجميلية", "جراحة العظام"], attractions: ["بحيرة ألماتي الكبرى", "ميديو وشيمبولاك", "تلة كوك-توبي", "السوق الأخضر", "المتحف الوطني"] },
      astana: { name: "أستانا", description: "عاصمة كازاخستان الحديثة بعمارتها المستقبلية وأحدث الحرم الطبي في البلاد.", strengths: ["جراحة الأعصاب", "الأورام", "أمراض القلب", "التشخيص المتقدم"], attractions: ["برج بايتيريك", "خان شاطير", "دار أوبرا أستانا", "المتحف الوطني", "واجهة نهر إيشيم"] },
      shymkent: { name: "شيمكنت", description: "مدينة جنوبية مشمسة على طريق الحرير التاريخي، مع رعاية طبية ميسورة التكلفة.", strengths: ["الجراحة العامة", "طب الأسنان", "التشخيص", "طب الأسرة"], attractions: ["ساحة أورداباسي", "متحف التاريخ الإقليمي", "محمية أكسو-جاباغلي", "الأسواق التقليدية", "معالم طريق الحرير"] },
    },
  },
  whyKazakhstan: {
    badge: "لماذا كازاخستان",
    title: "لماذا يختار المرضى الدوليون كازاخستان",
    subtitle: "احصل على رعاية طبية استثنائية في بلد يجمع بين البنية التحتية الطبية الحديثة والأسعار المعقولة والضيافة الدافئة.",
    reasons: {
      affordable: { title: "رعاية صحية ميسورة", description: "وفّر 40–60% مقارنة بالدول الغربية مع نفس جودة الرعاية." },
      specialists: { title: "أخصائيون مؤهلون تأهيلاً عالياً", description: "أطباء مدربون في مؤسسات دولية رائدة." },
      equipment: { title: "معدات طبية حديثة", description: "أدوات تشخيص متطورة وروبوتات جراحية وأحدث التقنيات." },
      waiting: { title: "أوقات انتظار قصيرة", description: "حدد مواعيد الاستشارات والإجراءات خلال أيام وليس أشهراً." },
      support: { title: "دعم المرضى الدوليين", description: "منسقون متعددو اللغات يرافقونك في كل خطوة." },
      destinations: { title: "وجهات سياحية جميلة", description: "اجمع بين العلاج واستكشاف المناظر الجبلية والتراث الثقافي." },
      safety: { title: "بيئة آمنة ومرحبة", description: "دخول بدون تأشيرة لكثير من الدول وبنية تحتية حديثة." },
      care: { title: "رعاية تركز على المريض", description: "غرف خاصة مريحة وخيارات إقامة عائلية." },
    },
    stats: { savings: "متوسط التوفير", hospitals: "مستشفيات معتمدة", patients: "مرضى دوليون", support: "دعم متعدد اللغات" },
  },
  footer: {
    contactCenterLink: "مركز الاتصال",
    available247: "متاح 24/7",
    languages: "اللغات",
    langs: { english: "الإنجليزية", russian: "الروسية", kazakh: "الكازاخية", uzbek: "الأوزبكية", kyrgyz: "القيرغيزية", tajik: "الطاجيكية", arabic: "العربية", chinese: "الصينية" },
    serviceTypes: { hospitals: "المؤسسات الطبية", translation: "الترجمة", hotels: "الإقامة", transportation: "النقل", tourism: "السياحة" },
  },
};

const zhPatch = {
  hero: {
    kazakhstan: "哈萨克斯坦",
    exploreTreatments: "探索治疗方案",
    contactExpert: "联系专家",
    discover: "探索",
    scrollDown: "向下滚动",
  },
  citySelection: {
    badge: "选择您的目的地",
    title: "三座世界级医疗城市",
    subtitle: "每座城市都提供独特的医疗专长、现代化设施和地道的哈萨克热情好客。",
    medicalStrengths: "医疗专科",
    attractions: "主要景点",
    cities: {
      almaty: { name: "阿拉木图", description: "哈萨克斯坦最大城市坐落于阿拉套山脚下，世界级医院与高山景观和都市文化交相辉映。", strengths: ["心脏外科", "试管婴儿与生育", "整形外科", "骨科"], attractions: ["大阿拉木图湖", "麦迪奥与钦布拉克", "科克托别山", "绿巴扎", "国家中央博物馆"] },
      astana: { name: "阿斯塔纳", description: "哈萨克斯坦现代首都，拥有未来主义建筑和全国最先进的医疗园区。", strengths: ["神经外科", "肿瘤科", "心脏病学", "先进诊断"], attractions: ["巴伊铁列克塔", "可汗沙特尔", "阿斯塔纳歌剧院", "国家博物馆", "伊希姆河滨步道"] },
      shymkent: { name: "奇姆肯特", description: "阳光充沛的南部城市，位于历史悠久的丝绸之路上，提供实惠的医疗服务和便捷的自然与文化体验。", strengths: ["普通外科", "牙科", "诊断", "家庭医学"], attractions: ["奥尔达巴西广场", "地区历史博物馆", "阿克苏-扎巴格利自然保护区", "传统集市", "丝绸之路地标"] },
    },
  },
  whyKazakhstan: {
    badge: "为什么选择哈萨克斯坦",
    title: "国际患者为何选择哈萨克斯坦",
    subtitle: "在这个将现代医疗基础设施、实惠价格和热情好客完美结合的国家，体验卓越的医疗服务。",
    reasons: {
      affordable: { title: "实惠的医疗", description: "与西方国家相比节省40–60%，同时获得同等质量的护理。" },
      specialists: { title: "高素质专家", description: "合作医院聘请在国际领先机构培训的医生。" },
      equipment: { title: "现代医疗设备", description: "先进的诊断工具、手术机器人和最新医疗技术。" },
      waiting: { title: "等待时间短", description: "在数天而非数月内安排咨询和手术。" },
      support: { title: "国际患者支持", description: "多语言协调员全程为您提供指导。" },
      destinations: { title: "美丽的旅游目的地", description: "将治疗与壮丽的山景和丰富的文化遗产探索相结合。" },
      safety: { title: "安全热情的环境", description: "多国免签入境，基础设施现代化，以安全和好客著称。" },
      care: { title: "以患者为中心的护理", description: "舒适的私人病房和家庭住宿选择。" },
    },
    stats: { savings: "平均节省", hospitals: "认证医院", patients: "国际患者", support: "多语言支持" },
  },
  footer: {
    contactCenterLink: "联系中心",
    available247: "24/7全天候服务",
    languages: "语言",
    langs: { english: "英语", russian: "俄语", kazakh: "哈萨克语", uzbek: "乌兹别克语", kyrgyz: "吉尔吉斯语", tajik: "塔吉克语", arabic: "阿拉伯语", chinese: "中文" },
    serviceTypes: { hospitals: "医疗机构", translation: "翻译", hotels: "住宿", transportation: "交通", tourism: "旅游" },
  },
};

patches.uz = uzPatch;
patches.ky = kyPatch;
patches.tg = tgPatch;
patches.ar = arPatch;
patches.zh = zhPatch;

for (const [locale, patch] of Object.entries(patches)) {
  const file = join(dir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, "utf8"));
  // Remove stale extra key
  if (data.hero?.trust3) delete data.hero.trust3;
  deepMerge(data, patch);
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Updated ${locale}.json`);
}

// Verify
const en = JSON.parse(readFileSync(join(dir, "en.json"), "utf8"));
function flatten(obj, prefix = "") {
  const keys = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(keys, flatten(v, key));
    else keys[key] = true;
  }
  return keys;
}
const enKeys = Object.keys(flatten(en));
let ok = true;
for (const locale of Object.keys(patches)) {
  const loc = flatten(JSON.parse(readFileSync(join(dir, `${locale}.json`), "utf8")));
  const missing = enKeys.filter((k) => !(k in loc));
  if (missing.length) {
    console.error(`${locale}: still missing ${missing.length} keys:`, missing.join(", "));
    ok = false;
  }
}
console.log(ok ? "All keys synced!" : "Some keys still missing.");
