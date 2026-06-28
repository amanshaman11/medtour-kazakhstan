/**
 * Sync callCenter + procedures translations into all locale files.
 * Merges full English procedure catalog, then applies locale-specific UI overlays.
 * Run: node scripts/sync-procedures-i18n.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "../lib/i18n/translations");
const locales = ["ru", "kk", "uz", "ky", "tg", "ar", "zh"];

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

import { callCenterFormI18n } from "./callcenter-form-i18n.mjs";

const en = JSON.parse(readFileSync(join(dir, "en.json"), "utf8"));
// Merge structural procedure keys only — never overwrite localized callCenter/form with English
const { form: _form, items: _items, ...proceduresWithoutFormItems } = en.procedures;
const base = { procedures: proceduresWithoutFormItems };

const overlays = {
  ru: {
    nav: { procedures: "Процедуры", menu: "Меню" },
    footer: { medicalProcedures: "Медицинские процедуры" },
    callCenter: callCenterFormI18n.ru.callCenter,
    procedures: {
      ...JSON.parse(readFileSync(join(dir, "ru.json"), "utf8")).procedures,
      mainCategories: "Диагностика и оздоровление",
      categorySubtitle: "Выберите процедуру, чтобы увидеть детали, цену и запросить консультацию.",
      procedureColumn: "Процедура",
      priceColumn: "Ориентировочная цена",
      detailSubtitle: "Информация для международных пациентов",
      aboutProcedure: "О процедуре",
      trust: {
        accredited: "Аккредитованные клиники-партнёры",
        fast: "Быстрая запись на приём",
        support: "Поддержка координатора 24/7 — 1717",
      },
      form: callCenterFormI18n.ru.form,
      flow: {
        ...JSON.parse(readFileSync(join(dir, "ru.json"), "utf8")).procedures?.flow,
        clinic: "Выбор клиники",
      },
    },
  },
  kk: {
    nav: { procedures: "Процедуралар", menu: "Мәзір" },
    footer: { medicalProcedures: "Медициналық процедуралар" },
    callCenter: {
      badge: "24/7",
      title: "24/7 халықаралық медициналық байланыс орталығы",
      callLabel: "Байланыс орталығы",
      features: {
        booking: "Жазылу",
        consultations: "Медициналық консультациялар",
        travel: "Саяхатқа көмек",
      },
    },
    procedures: {
      badge: "Медициналық процедуралар",
      title: "Қазақстандағы медициналық процедуралар",
      subtitle: "Серіктес ауруханалардағы диагностика, емдеу және wellness. USD бағалары.",
      total: "Барлық процедуралар",
      viewAll: "Барлық процедуралар",
      viewAllCategories: "Барлық санаттар",
      bySpecialty: "Мамандық бойынша процедуралар",
      browseOther: "Басқа санаттар",
      medicalProceduresIn: "Медициналық процедуралар",
      mainCategories: "Диагностика және wellness",
      categorySubtitle: "Процедура туралы толық ақпарат пен бағаны көру үшін таңдаңыз.",
      procedureColumn: "Процедура",
      priceColumn: "Баға",
      detailSubtitle: "Халықаралық пациенттерге арналған",
      aboutProcedure: "Процедура туралы",
      startingFrom: "Бастап",
      estimatedPrice: "Болжамды баға",
      priceNote: "KZT бағасынан USD-ке айналдырылған. Нақты баға консультациядан кейін.",
      breadcrumb: { home: "Басты бет", all: "Барлық процедуралар" },
      form: {
        title: "Консультация сұрау",
        subtitle: "Халықаралық медициналық координаторымыз процедура, клиника және саяхат туралы хабарлайды.",
        firstName: "Аты", lastName: "Тегі", email: "Email", phone: "Телефон",
        submit: "Консультация сұрау", sending: "Жіберілуде…",
        successTitle: "Сұрау қабылданды",
        successMessage: "Рахмет. Координаторымыз жақын арада хабарласады.",
        coordinator: "Халықаралық медициналық координатор",
        privacy: "Ақпаратыңыз құпия және тек координация командасына беріледі.",
        error: "Жіберу сәтсіз. Қайта көріңіз немесе 1717 қоңырау шалыңыз.",
      },
      trust: {
        accredited: "Аккредиттелген клиникалар",
        fast: "Жылдам жазылу",
        support: "24/7 координатор — 1717",
      },
      flow: { clinic: "Клиника таңдау" },
      clinics: {
        title: "Серіктес клиниканы таңдаңыз",
        subtitle: "Процедура үшін аккредиттелген аурухананы таңдаңыз",
        available: "{count} серіктес клиника бар",
        selected: "Таңдалған клиника",
        chooseClinic: "Клиниканы таңдау және жалғастыру",
        nextStep: "Келесі: клиниканы таңдау",
        nextStepDesc: "Бұл қалада {count} аккредиттелген клиника бұл процедураны ұсынады.",
      },
      home: {
        howTitle: "Процедураға қалай жазылуға болады",
        howSubtitle: "Қала таңдаудан клиникаға дейін — халықаралық пациенттерге арналған жол.",
        step1: "Медициналық қалаңызды таңдаңыз",
        step2: "Процедура санаттарын қараңыз",
        step3: "Баға мен мәліметтерді салыстырыңыз",
        step4: "Серіктес клиниканы таңдаңыз",
        statsProcedures: "Медициналық процедуралар",
        statsCities: "Медициналық қалалар",
        statsClinics: "Серіктес клиникалар",
        statsSavings: "Орташа үнемдеу",
        popularTitle: "Танымал процедуралар",
        popularSubtitle: "Таңдалған қала үшін USD бастапқы бағалары",
        benefit1Title: "Ашық USD бағалары",
        benefit1Desc: "Бізбен байланыспас бұрын болжамды бағаларды көріңіз.",
        benefit2Title: "Тек аккредиттелген ауруханалар",
        benefit2Desc: "Әр клиника ұлттық немесе халықаралық стандарттарға сәйкес.",
        benefit3Title: "Толық қолдау",
        benefit3Desc: "24/7 координаторлар жазылу, саяхат және қадағалауға көмектеседі.",
      },
      categories: {
        "check-up": "Check-up", ct: "КТ", mri: "МРТ", ultrasound: "УДЗ",
        dentistry: "Стоматология", xray: "Рентген", massage: "Массаж",
        "functional-diagnostics": "Функционалды диагностика",
        "treatment-room": "Процедуралық", certificates: "Анықтамалар",
        cardiology: "Кардиология", gynecology: "Гинекология", neurology: "Неврология",
        orthopedics: "Ортопедия", ophthalmology: "Офтальмология", urology: "Урология",
        surgery: "Хирургия", pediatrics: "Педиатрия", dermatology: "Дерматология",
        endocrinology: "Эндокринология",
      },
    },
  },
  uz: {
    nav: { procedures: "Protseduralar", menu: "Menyu" },
    footer: { medicalProcedures: "Tibbiy protseduralar" },
    callCenter: {
      badge: "24/7",
      title: "24/7 xalqaro tibbiy aloqa markazi",
      callLabel: "Aloqa markazi",
      features: { booking: "Qabulga yozilish", consultations: "Tibbiy konsultatsiyalar", travel: "Sayohat yordami" },
    },
    procedures: {
      badge: "Tibbiy protseduralar",
      title: "Qozog'istondagi tibbiy protseduralar",
      subtitle: "Hamkor klinikalarda diagnostika va davolash. USD narxlari.",
      total: "Jami protseduralar",
      viewAll: "Barcha protseduralar",
      bySpecialty: "Mutaxassislik bo'yicha",
      browseOther: "Boshqa toifalar",
      medicalProceduresIn: "Tibbiy protseduralar",
      mainCategories: "Diagnostika va wellness",
      categorySubtitle: "Tafsilotlar va narx uchun protsedurani tanlang.",
      procedureColumn: "Protsedura",
      priceColumn: "Narx",
      detailSubtitle: "Xalqaro bemorlar uchun",
      aboutProcedure: "Protsedura haqida",
      startingFrom: "Dan",
      estimatedPrice: "Taxminiy narx",
      priceNote: "KZT dan USD ga. Aniq narx konsultatsiyadan keyin.",
      breadcrumb: { home: "Bosh sahifa", all: "Barcha protseduralar" },
      form: {
        title: "Konsultatsiya so'rash",
        subtitle: "Xalqaro tibbiy koordinatorimiz siz bilan bog'lanadi.",
        firstName: "Ism", lastName: "Familiya", email: "Email", phone: "Telefon",
        submit: "Konsultatsiya so'rash", sending: "Yuborilmoqda…",
        successTitle: "So'rov qabul qilindi",
        successMessage: "Rahmat. Koordinatorimiz tez orada bog'lanadi.",
        coordinator: "Xalqaro tibbiy koordinator",
        privacy: "Ma'lumotlaringiz maxfiy.",
        error: "Yuborib bo'lmadi. Qayta urining yoki 1717 ga qo'ng'iroq qiling.",
      },
      trust: { accredited: "Akreditatsiyalangan klinikalar", fast: "Tez yozilish", support: "24/7 — 1717" },
      categories: {
        "check-up": "Check-up", ct: "KT", mri: "MRT", ultrasound: "UTT",
        dentistry: "Stomatologiya", xray: "Rentgen", massage: "Massaj",
        "functional-diagnostics": "Funksional diagnostika",
        "treatment-room": "Protsedura xonasi", certificates: "Ma'lumotnomalar",
        cardiology: "Kardiologiya", gynecology: "Ginekologiya", neurology: "Nevrologiya",
        orthopedics: "Ortopediya", ophthalmology: "Oftalmologiya", urology: "Urologiya",
        surgery: "Jarrohlik", pediatrics: "Pediatriya", dermatology: "Dermatologiya",
        endocrinology: "Endokrinologiya",
      },
    },
  },
  ky: {
    nav: { procedures: "Процедуралар", menu: "Меню" },
    footer: { medicalProcedures: "Медициналык процедуралар" },
    callCenter: {
      badge: "24/7",
      title: "24/7 эл аралык медициналык байланыш борбору",
      callLabel: "Байланыш борбору",
      features: { booking: "Жазылуу", consultations: "Медициналык консультациялар", travel: "Саякат жардамы" },
    },
    procedures: {
      badge: "Медициналык процедуралар",
      title: "Кыргызстандагы медициналык процедуралар",
      subtitle: "Өнөктөш клиникалардагы диагностика жана дарылоо.",
      total: "Жалпы процедуралар",
      medicalProceduresIn: "Медициналык процедуралар",
      mainCategories: "Диагностика жана wellness",
      categorySubtitle: "Процедураны тандап, баасын жана маалыматын көрүңүз.",
      procedureColumn: "Процедура",
      priceColumn: "Баа",
      aboutProcedure: "Процедура жөнүндө",
      startingFrom: "Баштап",
      breadcrumb: { home: "Башкы бет", all: "Бардык процедуралар" },
      form: {
        title: "Консультация суроо",
        subtitle: "Эл аралык координаторубуз сиз менен байланышат.",
        firstName: "Аты", lastName: "Фамилиясы", email: "Email", phone: "Телефон",
        submit: "Консультация суроо", sending: "Жөнөтүлүүдө…",
        successTitle: "Суроо кабыл алынды",
        successMessage: "Рахмат. Координаторубуз жакында байланышат.",
        coordinator: "Эл аралык медициналык координатор",
        privacy: "Маалыматыңыз купуя.",
        error: "Жөнөтүү ишке ашкан жок. 1717 чалыңыз.",
      },
      trust: { accredited: "Аккредитацияланган клиникалар", fast: "Тез жазылуу", support: "24/7 — 1717" },
      categories: {
        "check-up": "Check-up", ct: "КТ", mri: "МРТ", ultrasound: "УЗИ",
        dentistry: "Стоматология", xray: "Рентген", massage: "Массаж",
        cardiology: "Кардиология", gynecology: "Гинекология", neurology: "Неврология",
        orthopedics: "Ортопедия", ophthalmology: "Офтальмология", urology: "Урология",
        surgery: "Хирургия", pediatrics: "Педиатрия", dermatology: "Дерматология",
        endocrinology: "Эндокринология",
      },
    },
  },
  tg: {
    nav: { procedures: "Процедураҳо", menu: "Меню" },
    footer: { medicalProcedures: "Процедураҳои тиббӣ" },
    callCenter: {
      badge: "24/7",
      title: "Маркази байналмилалии тиббии 24/7",
      callLabel: "Маркази тамос",
      features: { booking: "Қабулгирӣ", consultations: "Машварати тиббӣ", travel: "Кумаки сафар" },
    },
    procedures: {
      badge: "Процедураҳои тиббӣ",
      title: "Процедураҳои тиббӣ дар Қазоқистон",
      medicalProceduresIn: "Процедураҳои тиббӣ дар",
      mainCategories: "Диагностика ва wellness",
      startingFrom: "Аз",
      breadcrumb: { home: "Асосӣ", all: "Ҳамаи процедураҳо" },
      form: {
        title: "Дархости машварат",
        subtitle: "Координатори байналмилалии мо бо шумо тамос мегирад.",
        firstName: "Ном", lastName: "Насаб", email: "Email", phone: "Телефон",
        submit: "Дархости машварат", sending: "Фиристода мешавад…",
        successTitle: "Дархост қабул шуд",
        successMessage: "Ташаккур. Координатори мо зуд тамос мегирад.",
        coordinator: "Координатори тиббии байналмилалӣ",
        privacy: "Маълумоти шумо махфӣ аст.",
        error: "Фиристода нашуд. 1717 занг занед.",
      },
      categories: {
        "check-up": "Check-up", ct: "КТ", mri: "МРТ", ultrasound: "УЗИ",
        dentistry: "Дандонпизишкӣ", xray: "Рентген", massage: "Массаж",
        cardiology: "Кардиология", gynecology: "Гинекология", neurology: "Неврология",
        orthopedics: "Ортопедия", ophthalmology: "Офтальмология", urology: "Урология",
        surgery: "Ҷарроҳӣ", pediatrics: "Педиатрия", dermatology: "Дерматология",
        endocrinology: "Эндокринология",
      },
    },
  },
  ar: {
    nav: { procedures: "الإجراءات", menu: "القائمة" },
    footer: { medicalProcedures: "الإجراءات الطبية" },
    callCenter: {
      badge: "24/7",
      title: "مركز الاتصال الطبي الدولي على مدار الساعة",
      callLabel: "مركز الاتصال",
      features: { booking: "حجز المواعيد", consultations: "استشارات طبية", travel: "مساعدة السفر" },
    },
    procedures: {
      badge: "الإجراءات الطبية",
      title: "الإجراءات الطبية في كازاخستان",
      medicalProceduresIn: "الإجراءات الطبية في",
      mainCategories: "فئات التشخيص والعافية",
      startingFrom: "يبدأ من",
      breadcrumb: { home: "الرئيسية", all: "جميع الإجراءات" },
      form: {
        title: "طلب استشارة",
        subtitle: "سيتواصل معك منسقنا الطبي الدولي بمزيد من المعلومات.",
        firstName: "الاسم الأول", lastName: "اسم العائلة", email: "البريد الإلكتروني", phone: "رقم الهاتف",
        submit: "طلب استشارة", sending: "جارٍ الإرسال…",
        successTitle: "تم استلام الطلب",
        successMessage: "شكراً لك. سيتواصل معك منسقنا قريباً.",
        coordinator: "منسق طبي دولي",
        privacy: "معلوماتك سرية.",
        error: "تعذر الإرسال. يرجى الاتصال على 1717.",
      },
      categories: {
        "check-up": "فحص شامل", ct: "أشعة مقطعية", mri: "رنين مغناطيسي", ultrasound: "موجات فوق صوتية",
        dentistry: "طب الأسنان", xray: "أشعة سينية", massage: "تدليك",
        cardiology: "أمراض القلب", gynecology: "أمراض النساء", neurology: "طب الأعصاب",
        orthopedics: "جراحة العظام", ophthalmology: "طب العيون", urology: "المسالك البولية",
        surgery: "جراحة", pediatrics: "طب الأطفال", dermatology: "الأمراض الجلدية",
        endocrinology: "الغدد الصماء",
      },
    },
  },
  zh: {
    nav: { procedures: "医疗项目", menu: "菜单" },
    footer: { medicalProcedures: "医疗项目" },
    callCenter: {
      badge: "24/7",
      title: "24/7 国际医疗呼叫中心",
      callLabel: "呼叫中心",
      features: { booking: "预约挂号", consultations: "医疗咨询", travel: "旅行协助" },
    },
    procedures: {
      badge: "医疗项目",
      title: "哈萨克斯坦医疗项目",
      medicalProceduresIn: "医疗项目",
      mainCategories: "诊断与健康类别",
      startingFrom: "起价",
      breadcrumb: { home: "首页", all: "所有项目" },
      form: {
        title: "申请咨询",
        subtitle: "我们的国际医疗协调员将与您联系，提供更多信息。",
        firstName: "名", lastName: "姓", email: "电子邮件", phone: "电话号码",
        submit: "申请咨询", sending: "提交中…",
        successTitle: "申请已收到",
        successMessage: "谢谢。我们的协调员将尽快与您联系。",
        coordinator: "国际医疗协调员",
        privacy: "您的信息将被保密。",
        error: "提交失败，请重试或拨打1717。",
      },
      categories: {
        "check-up": "体检", ct: "CT扫描", mri: "核磁共振", ultrasound: "超声",
        dentistry: "牙科", xray: "X光", massage: "按摩",
        cardiology: "心脏病学", gynecology: "妇科", neurology: "神经科",
        orthopedics: "骨科", ophthalmology: "眼科", urology: "泌尿科",
        surgery: "外科", pediatrics: "儿科", dermatology: "皮肤科",
        endocrinology: "内分泌科",
      },
    },
  },
};

for (const locale of locales) {
  const file = join(dir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, "utf8"));
  deepMerge(data, base);
  if (overlays[locale]) deepMerge(data, overlays[locale]);
  if (callCenterFormI18n[locale]) {
    data.callCenter = callCenterFormI18n[locale].callCenter;
    data.procedures = data.procedures ?? {};
    data.procedures.form = callCenterFormI18n[locale].form;
  }
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Synced ${locale}.json`);
}

console.log("Done.");
