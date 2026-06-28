/**
 * Generate procedure item translations for all non-English locales.
 * Reads procedures.items from en.json and writes flat locale files.
 * Run: node scripts/generate-procedure-item-translations.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const EN_PATH = join(ROOT, "lib/i18n/translations/en.json");
const OUT_DIR = join(ROOT, "lib/i18n/procedure-items");
const LOCALES = ["ru","kk","uz","ky","tg","ar","zh"];

const translations = {
  "ru": {
    "cardio-checkup": {
      "name": "Кардиологическое обследование",
      "description": "Комплексное кардиологическое обследование, включающее ЭКГ, анализ крови и консультацию специалиста в аккредитованных клиниках-партнёрах."
    },
    "full-body-ct-checkup": {
      "name": "Комплексное КТ-обследование",
      "description": "Расширенный пакет компьютерной томографии для оценки состояния всего организма с заключением радиолога."
    },
    "full-body-mri-checkup": {
      "name": "Комплексное МРТ-обследование",
      "description": "Высокоточный пакет МРТ-скрининга основных органов и систем организма."
    },
    "womens-checkup": {
      "name": "Женское медицинское обследование",
      "description": "Гинекологический осмотр, УЗИ и лабораторное обследование, адаптированное для женщин."
    },
    "mens-checkup": {
      "name": "Мужское медицинское обследование",
      "description": "Урологическое и общее медицинское обследование для мужчин."
    },
    "executive-checkup": {
      "name": "Премиальное медицинское обследование",
      "description": "Многодневная программа скрининга с расширенной диагностикой и консультациями узких специалистов."
    },
    "ct-head": {
      "name": "КТ головы",
      "description": "Компьютерная томография головного мозга и черепа с интерпретацией специалиста."
    },
    "ct-chest": {
      "name": "КТ грудной клетки",
      "description": "КТ органов грудной клетки для оценки лёгких, сердца и средостения."
    },
    "ct-abdomen": {
      "name": "КТ брюшной полости",
      "description": "КТ брюшной полости для оценки печени, почек, поджелудочной железы и органов пищеварения."
    },
    "ct-full-body": {
      "name": "КТ всего тела",
      "description": "Комплексное КТ-исследование от головы до таза."
    },
    "ct-angiography": {
      "name": "КТ-ангиография",
      "description": "КТ с контрастным усилением для оценки состояния кровеносных сосудов."
    },
    "mri-brain": {
      "name": "МРТ головного мозга",
      "description": "Высокоточная магнитно-резонансная томография головного мозга."
    },
    "mri-spine": {
      "name": "МРТ позвоночника",
      "description": "МРТ шейного, грудного или поясничного отдела позвоночника."
    },
    "mri-joint": {
      "name": "МРТ сустава",
      "description": "МРТ коленного, плечевого, тазобедренного или другого сустава."
    },
    "mri-full-body": {
      "name": "МРТ всего тела",
      "description": "Комплексный пакет МРТ-скрининга."
    },
    "mri-cardiac": {
      "name": "МРТ сердца",
      "description": "Специализированная МРТ для оценки структуры и функции сердца."
    },
    "us-abdomen": {
      "name": "УЗИ брюшной полости",
      "description": "Ультразвуковое исследование органов брюшной полости."
    },
    "us-thyroid": {
      "name": "УЗИ щитовидной железы",
      "description": "Ультразвуковое исследование щитовидной железы и структур шеи."
    },
    "us-pregnancy": {
      "name": "УЗИ при беременности",
      "description": "Акушерское ультразвуковое исследование на различных сроках беременности."
    },
    "us-doppler": {
      "name": "Допплерографическое УЗИ",
      "description": "Сосудистое ультразвуковое исследование с оценкой кровотока."
    },
    "us-heart": {
      "name": "Эхокардиография",
      "description": "Ультразвуковое исследование сердца."
    },
    "dental-implant": {
      "name": "Зубной имплантат",
      "description": "Установка одного зубного имплантата с коронкой в стоматологических клиниках-партнёрах."
    },
    "dental-crown": {
      "name": "Зубная коронка",
      "description": "Установка керамической или циркониевой коронки."
    },
    "teeth-whitening": {
      "name": "Отбеливание зубов",
      "description": "Профессиональное отбеливание зубов в клинических условиях."
    },
    "dental-cleaning": {
      "name": "Профессиональная чистка зубов",
      "description": "Ультразвуковая чистка и полировка зубов."
    },
    "root-canal": {
      "name": "Лечение корневых каналов",
      "description": "Эндодонтическое лечение при инфекции пульпы зуба."
    },
    "xray-chest": {
      "name": "Рентгенография грудной клетки",
      "description": "Стандартная рентгенограмма грудной клетки в прямой проекции."
    },
    "xray-spine": {
      "name": "Рентгенография позвоночника",
      "description": "Рентгенологическое исследование отделов позвоночника."
    },
    "xray-dental": {
      "name": "Стоматологический рентген",
      "description": "Панорамная или прицельная стоматологическая рентгенография."
    },
    "xray-joint": {
      "name": "Рентгенография сустава",
      "description": "Рентгенологическое исследование крупных суставов."
    },
    "therapeutic-massage": {
      "name": "Лечебный массаж",
      "description": "Медицинский массаж для облегчения боли и восстановления."
    },
    "sports-massage": {
      "name": "Спортивный массаж",
      "description": "Массаж для спортсменов и активного восстановления."
    },
    "lymphatic-massage": {
      "name": "Лимфодренажный массаж",
      "description": "Щадящий массаж для уменьшения отёков и улучшения кровообращения."
    },
    "recovery-massage": {
      "name": "Восстановительный массаж после лечения",
      "description": "Массаж, адаптированный для периода восстановления медицинских туристов."
    },
    "ecg": {
      "name": "Электрокардиограмма (ЭКГ)",
      "description": "Регистрация сердечного ритма и электрической активности сердца."
    },
    "holter-monitor": {
      "name": "Суточное холтеровское мониторирование",
      "description": "Непрерывное кардиологическое наблюдение в течение 24 часов."
    },
    "spirometry": {
      "name": "Спирометрия",
      "description": "Исследование функции внешнего дыхания для оценки состояния дыхательной системы."
    },
    "stress-test": {
      "name": "Нагрузочный кардиотест",
      "description": "Нагрузочное или фармакологическое стресс-тестирование сердца."
    },
    "iv-therapy": {
      "name": "Внутривенная терапия",
      "description": "Внутривенная витаминная и инфузионная терапия."
    },
    "injection-therapy": {
      "name": "Инъекционная терапия",
      "description": "Внутримышечные или подкожные медицинские инъекции."
    },
    "wound-dressing": {
      "name": "Перевязка раны",
      "description": "Профессиональный уход за раной и смена повязки."
    },
    "medical-certificate": {
      "name": "Медицинская справка",
      "description": "Официальная медицинская справка для работы или учёбы."
    },
    "fitness-certificate": {
      "name": "Справка для занятий спортом",
      "description": "Медицинское заключение о допуске к спортивным и фитнес-нагрузкам."
    },
    "travel-medical-cert": {
      "name": "Медицинская справка для поездки",
      "description": "Медицинская документация для международных поездок."
    },
    "cardio-consultation": {
      "name": "Консультация кардиолога",
      "description": "Консультация врача-кардиолога."
    },
    "echo-cardiogram": {
      "name": "Эхокардиограмма",
      "description": "Ультразвуковое исследование сердца с оценкой кардиолога."
    },
    "gyno-consultation": {
      "name": "Консультация гинеколога",
      "description": "Консультация врача-гинеколога."
    },
    "pap-smear": {
      "name": "Мазок на цитологию (Пап-тест)",
      "description": "Цитологическое исследование для скрининга шейки матки."
    },
    "neuro-consultation": {
      "name": "Консультация невролога",
      "description": "Консультация врача-невролога."
    },
    "eeg": {
      "name": "ЭЭГ (электроэнцефалография)",
      "description": "Регистрация электрической активности головного мозга."
    },
    "ortho-consultation": {
      "name": "Консультация ортопеда",
      "description": "Консультация по заболеваниям костей и суставов."
    },
    "joint-injection": {
      "name": "Инъекция в сустав",
      "description": "Лечебная инъекция при боли и воспалении сустава."
    },
    "eye-exam": {
      "name": "Комплексное обследование глаз",
      "description": "Полное офтальмологическое обследование."
    },
    "lasik-consultation": {
      "name": "Консультация по LASIK",
      "description": "Предоперационное обследование перед лазерной коррекцией зрения."
    },
    "urology-consultation": {
      "name": "Консультация уролога",
      "description": "Консультация врача-уролога."
    },
    "prostate-screening": {
      "name": "Обследование предстательной железы",
      "description": "Анализ ПСА и ультразвуковое исследование простаты."
    },
    "general-surgery-consult": {
      "name": "Консультация хирурга",
      "description": "Предоперационная хирургическая консультация."
    },
    "hernia-repair": {
      "name": "Операция по поводу грыжи",
      "description": "Хирургическое лечение паховой или брюшной грыжи."
    },
    "pediatric-consultation": {
      "name": "Консультация педиатра",
      "description": "Консультация врача-педиатра."
    },
    "child-vaccination": {
      "name": "Детская вакцинация",
      "description": "Плановая иммунизация детей."
    },
    "dermatology-consultation": {
      "name": "Консультация дерматолога",
      "description": "Оценка состояния кожи и составление плана лечения."
    },
    "skin-biopsy": {
      "name": "Биопсия кожи",
      "description": "Малоинвазивная процедура для гистологического исследования кожного образования."
    },
    "endocrinology-consultation": {
      "name": "Консультация эндокринолога",
      "description": "Консультация по гормональным и метаболическим нарушениям."
    },
    "thyroid-panel": {
      "name": "Обследование щитовидной железы",
      "description": "Анализы крови и ультразвуковое исследование функции щитовидной железы."
    }
  },
  "kk": {
    "cardio-checkup": {
      "name": "Кардиологиялық тексеру",
      "description": "Аккредиттелген серіктес клиникаларда ЭКГ, қан талдауы және маман консультациясын қамтитын кешенді жүрек-қантамыр тексеруі."
    },
    "full-body-ct-checkup": {
      "name": "Толық дене КТ тексеруі",
      "description": "Радиолог қорытындысымен бүкіл дененің денсаулығын бағалауға арналған кеңейтілген КТ диагностика пакеті."
    },
    "full-body-mri-checkup": {
      "name": "Толық дене МРТ тексеруі",
      "description": "Негізгі ағзалар мен жүйелерді қамтитын жоғары ажыратымдылықты МРТ скрининг пакеті."
    },
    "womens-checkup": {
      "name": "Әйелдер денсаулығын тексеру",
      "description": "Әйелдерге арналған гинекологиялық тексеру, УДЗ және зертханалық скрининг."
    },
    "mens-checkup": {
      "name": "Ерлер денсаулығын тексеру",
      "description": "Ерлерге арналған урологиялық және жалпы медициналық тексеру пакеті."
    },
    "executive-checkup": {
      "name": "Премиум денсаулық тексеруі",
      "description": "Кеңейтілген диагностика мен мамандардың қарауы бар көп күндік скрининг бағдарламасы."
    },
    "ct-head": {
      "name": "Бас КТ",
      "description": "Ми мен бас сүйегінің компьютерлік томографиясы, маман интерпретациясымен."
    },
    "ct-chest": {
      "name": "Кеуде қуысы КТ",
      "description": "Өкпе, жүрек және орта кеудені бағалауға арналған кеуде қуысы КТ."
    },
    "ct-abdomen": {
      "name": "Қарын қуысы КТ",
      "description": "Бауыр, бүйрек, ұйқы безі және ас қорыту ағзаларын бағалауға арналған қарын қуысы КТ."
    },
    "ct-full-body": {
      "name": "Толық дене КТ",
      "description": "Бастан жамбасқа дейінгі кешенді КТ зерттеуі."
    },
    "ct-angiography": {
      "name": "КТ ангиография",
      "description": "Қан тамырларын бағалауға арналған контрастты КТ."
    },
    "mri-brain": {
      "name": "Ми МРТ",
      "description": "Мидың жоғары ажыратымдылықты магниттік-резонанстық томографиясы."
    },
    "mri-spine": {
      "name": "Омыртқа МРТ",
      "description": "Мойын, кеуде немесе бел омыртқасы бөліктерінің МРТ-сы."
    },
    "mri-joint": {
      "name": "Буын МРТ",
      "description": "Тізе, иық, жамбас немесе басқа буынның МРТ-сы."
    },
    "mri-full-body": {
      "name": "Толық дене МРТ",
      "description": "Кешенді МРТ скрининг пакеті."
    },
    "mri-cardiac": {
      "name": "Жүрек МРТ",
      "description": "Жүрек құрылымы мен функциясын бағалауға арналған мамандандырылған МРТ."
    },
    "us-abdomen": {
      "name": "Қарын қуысы УДЗ",
      "description": "Қарын қуысы ағзаларының ультрадыбыстық зерттеуі."
    },
    "us-thyroid": {
      "name": "Қалқанша без УДЗ",
      "description": "Қалқанша безі мен мойын құрылымдарының ультрадыбыстық зерттеуі."
    },
    "us-pregnancy": {
      "name": "Жүктілік УДЗ",
      "description": "Жүктіліктің әртүрлі мерзімдеріндегі акушерлік ультрадыбыс."
    },
    "us-doppler": {
      "name": "Допплер УДЗ",
      "description": "Қан ағынын бағалаумен сосудтық ультрадыбыс."
    },
    "us-heart": {
      "name": "Эхокардиография",
      "description": "Жүректің ультрадыбыстық зерттеуі."
    },
    "dental-implant": {
      "name": "Тіс имплантаты",
      "description": "Серіктес стоматологиялық клиникаларда коронкасы бар бір тіс имплантаты."
    },
    "dental-crown": {
      "name": "Тіс коронкасы",
      "description": "Керамикалық немесе цирконий коронкасын орнату."
    },
    "teeth-whitening": {
      "name": "Тісті ағарту",
      "description": "Клиникада кәсіби тісті ағарту."
    },
    "dental-cleaning": {
      "name": "Кәсіби тіс тазалау",
      "description": "Ультрадыбыстық тазалау және полировка."
    },
    "root-canal": {
      "name": "Тіс жұлдызшасын емдеу",
      "description": "Тіс пульпасының инфекциясына арналған эндодонтиялық емдеу."
    },
    "xray-chest": {
      "name": "Кеуде рентгені",
      "description": "Кеуде қуысының стандартты тікелей рентгенограммасы."
    },
    "xray-spine": {
      "name": "Омыртқа рентгені",
      "description": "Омыртқа бөліктерінің рентгенологиялық зерттеуі."
    },
    "xray-dental": {
      "name": "Стоматологиялық рентген",
      "description": "Панорамалық немесе нүктелік стоматологиялық рентген."
    },
    "xray-joint": {
      "name": "Буын рентгені",
      "description": "Ірі буындардың рентгенологиялық зерттеуі."
    },
    "therapeutic-massage": {
      "name": "Емдік массаж",
      "description": "Ауырсынуды жеңілдету және қалпына келтіру үшін медициналық массаж."
    },
    "sports-massage": {
      "name": "Спорттық массаж",
      "description": "Спортшылар мен белсенді қалпына келуге арналған массаж."
    },
    "lymphatic-massage": {
      "name": "Лимфодренаждық массаж",
      "description": "Ісінуді азайту және қан айналымын жақсартуға арналған жұмсақ массаж."
    },
    "recovery-massage": {
      "name": "Емдеуден кейінгі қалпына келтіру массажы",
      "description": "Медициналық туризм қалпына келу кезеңіне бейімделген массаж."
    },
    "ecg": {
      "name": "Электрокардиограмма (ЭКГ)",
      "description": "Жүрек ырғағы мен электрлік белсенділікті тіркеу."
    },
    "holter-monitor": {
      "name": "24 сағаттық Холтер мониторингі",
      "description": "24 сағат бойы үздіксіз кардиологиялық бақылау."
    },
    "spirometry": {
      "name": "Спирометрия",
      "description": "Тыныс алу жүйесін бағалауға арналған өкпе функциясының тексеруі."
    },
    "stress-test": {
      "name": "Жүрек стресс-тесті",
      "description": "Жүрекке жүктеме немесе фармакологиялық стресс-тестілеу."
    },
    "iv-therapy": {
      "name": "Вена ішіне терапия",
      "description": "Витаминдік және инфузиялық вена ішіне енгізу терапиясы."
    },
    "injection-therapy": {
      "name": "Инъекциялық терапия",
      "description": "Бұлшықет ішіне немесе тері астына медициналық инъекциялар."
    },
    "wound-dressing": {
      "name": "Жара байлауы",
      "description": "Кәсіби жара күтімі және байлауды ауыстыру."
    },
    "medical-certificate": {
      "name": "Медициналық анықтама",
      "description": "Жұмыс немесе оқу үшін ресми медициналық анықтама."
    },
    "fitness-certificate": {
      "name": "Спортқа жарамдылық анықтамасы",
      "description": "Спорт және фитнес жүктемелеріне рұқсат беретін медициналық қорытынды."
    },
    "travel-medical-cert": {
      "name": "Саяхатқа медициналық анықтама",
      "description": "Халықаралық саяхатқа арналған медициналық құжаттама."
    },
    "cardio-consultation": {
      "name": "Кардиолог консультациясы",
      "description": "Кардиолог маманының консультациясы."
    },
    "echo-cardiogram": {
      "name": "Эхокардиограмма",
      "description": "Кардиолог бағалауымен жүректің ультрадыбыстық зерттеуі."
    },
    "gyno-consultation": {
      "name": "Гинеколог консультациясы",
      "description": "Гинеколог маманының консультациясы."
    },
    "pap-smear": {
      "name": "Пап-тест (цитология)",
      "description": "Мойын жатыны скринингі үшін цитологиялық талдау."
    },
    "neuro-consultation": {
      "name": "Невролог консультациясы",
      "description": "Невролог маманының консультациясы."
    },
    "eeg": {
      "name": "ЭЭГ (электроэнцефалография)",
      "description": "Мидың электрлік белсенділігін тіркеу."
    },
    "ortho-consultation": {
      "name": "Ортопед консультациясы",
      "description": "Сүйек және буын аурулары бойынша консультация."
    },
    "joint-injection": {
      "name": "Буынға инъекция",
      "description": "Буын ауруы мен қабынуына арналған емдік инъекция."
    },
    "eye-exam": {
      "name": "Кешенді көз тексеруі",
      "description": "Толық офтальмологиялық тексеру."
    },
    "lasik-consultation": {
      "name": "LASIK консультациясы",
      "description": "Лазерлік көруді түзетуге дейінгі алдын ала тексеру."
    },
    "urology-consultation": {
      "name": "Уролог консультациясы",
      "description": "Уролог маманының консультациясы."
    },
    "prostate-screening": {
      "name": "Простата скринингі",
      "description": "ПСА талдауы және простатаның ультрадыбысы."
    },
    "general-surgery-consult": {
      "name": "Хирург консультациясы",
      "description": "Операцияға дейінгі хирургиялық консультация."
    },
    "hernia-repair": {
      "name": "Жарық жөндеу операциясы",
      "description": "Сан немесе іш қуысы жарығын хирургиялық емдеу."
    },
    "pediatric-consultation": {
      "name": "Педиатр консультациясы",
      "description": "Педиатр маманының консультациясы."
    },
    "child-vaccination": {
      "name": "Бала вакцинациясы",
      "description": "Балалардың жоспарлы иммунизациясы."
    },
    "dermatology-consultation": {
      "name": "Дерматолог консультациясы",
      "description": "Тері жағдайын бағалау және емдеу жоспарын құру."
    },
    "skin-biopsy": {
      "name": "Тері биопсиясы",
      "description": "Тері өзгерісін гистологиялық зерттеуге арналған шағын процедура."
    },
    "endocrinology-consultation": {
      "name": "Эндокринолог консультациясы",
      "description": "Гормоналды және метаболикалық бұзылыстар бойынша консультация."
    },
    "thyroid-panel": {
      "name": "Қалқанша без тексеруі",
      "description": "Қалқанша безі функциясына арналған қан талдауы және ультрадыбыс."
    }
  },
  "uz": {
    "cardio-checkup": {
      "name": "Kardiologik tekshiruv",
      "description": "Akreditatsiyalangan hamkor klinikalarda EKG, qon tahlili va mutaxassis konsultatsiyasini o'z ichiga olgan keng qamrovli yurak-qon tomir tekshiruvi."
    },
    "full-body-ct-checkup": {
      "name": "To'liq tana KT tekshiruvi",
      "description": "Radiolog xulosasi bilan butun organizm salomatligini baholash uchun kengaytirilgan KT diagnostika paketi."
    },
    "full-body-mri-checkup": {
      "name": "To'liq tana MRT tekshiruvi",
      "description": "Asosiy organ tizimlarini qamrab oluvchi yuqori aniqlikdagi MRT skrining paketi."
    },
    "womens-checkup": {
      "name": "Ayollar salomatligi tekshiruvi",
      "description": "Ayollar uchun ginekologik ko'rik, UTT va laboratoriya skriningi."
    },
    "mens-checkup": {
      "name": "Erkaklar salomatligi tekshiruvi",
      "description": "Erkaklar uchun urologik va umumiy tibbiy tekshiruv paketi."
    },
    "executive-checkup": {
      "name": "Premium salomatlik tekshiruvi",
      "description": "Kengaytirilgan diagnostika va mutaxassislar ko'rigi bilan ko'p kunlik skrining dasturi."
    },
    "ct-head": {
      "name": "Bosh KT",
      "description": "Miya va bosh suyagining kompyuter tomografiyasi, mutaxassis talqini bilan."
    },
    "ct-chest": {
      "name": "Ko'krak qafasi KT",
      "description": "O'pka, yurak va mediastenumni baholash uchun ko'krak qafasi KT."
    },
    "ct-abdomen": {
      "name": "Qorin bo'shlig'i KT",
      "description": "Jigar, buyrak, oshqozon osti bezi va hazm a'zolarini baholash uchun qorin bo'shlig'i KT."
    },
    "ct-full-body": {
      "name": "To'liq tana KT",
      "description": "Boshdan tos suyagigacha kompleks KT tekshiruvi."
    },
    "ct-angiography": {
      "name": "KT angiografiya",
      "description": "Qon tomirlarini baholash uchun kontrastli KT."
    },
    "mri-brain": {
      "name": "Miya MRT",
      "description": "Miyaning yuqori aniqlikdagi magnit-rezonans tomografiyasi."
    },
    "mri-spine": {
      "name": "Umurtqa pog'onasi MRT",
      "description": "Bo'yin, ko'krak yoki bel bo'limi umurtqa pog'onasining MRT tekshiruvi."
    },
    "mri-joint": {
      "name": "Bo'g'im MRT",
      "description": "Tizza, yelka, son yoki boshqa bo'g'imning MRT tekshiruvi."
    },
    "mri-full-body": {
      "name": "To'liq tana MRT",
      "description": "Kompleks MRT skrining paketi."
    },
    "mri-cardiac": {
      "name": "Yurak MRT",
      "description": "Yurak tuzilishi va funksiyasini baholash uchun ixtisoslashtirilgan MRT."
    },
    "us-abdomen": {
      "name": "Qorin bo'shlig'i UTT",
      "description": "Qorin bo'shlig'i a'zolarining ultratovush tekshiruvi."
    },
    "us-thyroid": {
      "name": "Qalqonsimon bez UTT",
      "description": "Qalqonsimon bez va bo'yin tuzilmalarining ultratovush tekshiruvi."
    },
    "us-pregnancy": {
      "name": "Homiladorlik UTT",
      "description": "Homiladorlikning turli bosqichlarida akusherlik ultratovushi."
    },
    "us-doppler": {
      "name": "Doppler UTT",
      "description": "Qon oqimini baholash bilan tomir ultratovushi."
    },
    "us-heart": {
      "name": "Exokardiografiya",
      "description": "Yurakning ultratovush tekshiruvi."
    },
    "dental-implant": {
      "name": "Tish implantati",
      "description": "Hamkor stomatologiya klinikalarida toj bilan bitta tish implantati."
    },
    "dental-crown": {
      "name": "Tish toji",
      "description": "Keramik yoki sirkoniy tojni o'rnatish."
    },
    "teeth-whitening": {
      "name": "Tishlarni oqartirish",
      "description": "Klinikada professional tishlarni oqartirish."
    },
    "dental-cleaning": {
      "name": "Professional tish tozalash",
      "description": "Ultratovush tozalash va polishing."
    },
    "root-canal": {
      "name": "Ildiz kanallarini davolash",
      "description": "Tish pulpasining infeksiyasi uchun endodontik davolash."
    },
    "xray-chest": {
      "name": "Ko'krak qafasi rentgeni",
      "description": "Ko'krak qafasining standart to'g'ri proyeksiyadagi rentgenogrammasi."
    },
    "xray-spine": {
      "name": "Umurtqa pog'onasi rentgeni",
      "description": "Umurtqa pog'onasi bo'limlarining rentgenologik tekshiruvi."
    },
    "xray-dental": {
      "name": "Stomatologik rentgen",
      "description": "Panoramik yoki nuqtaviy stomatologik rentgen."
    },
    "xray-joint": {
      "name": "Bo'g'im rentgeni",
      "description": "Yirik bo'g'imlarning rentgenologik tekshiruvi."
    },
    "therapeutic-massage": {
      "name": "Davolash massaji",
      "description": "Og'riqni kamaytirish va tiklanish uchun tibbiy massaj."
    },
    "sports-massage": {
      "name": "Sport massaji",
      "description": "Sportchilar va faol tiklanish uchun massaj."
    },
    "lymphatic-massage": {
      "name": "Limfodrenaj massaji",
      "description": "Shishni kamaytirish va qon aylanishini yaxshilash uchun yumshoq massaj."
    },
    "recovery-massage": {
      "name": "Davolashdan keyingi tiklanish massaji",
      "description": "Tibbiy turizm tiklanish davri uchun moslashtirilgan massaj."
    },
    "ecg": {
      "name": "Elektrokardiogramma (EKG)",
      "description": "Yurak ritmi va elektr faolligini qayd etish."
    },
    "holter-monitor": {
      "name": "24 soatlik Xolter monitoringi",
      "description": "24 soat davomida uzluksiz kardiologik kuzatuv."
    },
    "spirometry": {
      "name": "Spirometriya",
      "description": "Nafas olish tizimini baholash uchun o'pka funksiyasi tekshiruvi."
    },
    "stress-test": {
      "name": "Yurak stress-testi",
      "description": "Yurakka yuklama yoki farmakologik stress-test."
    },
    "iv-therapy": {
      "name": "Vena ichiga terapiya",
      "description": "Vena ichiga vitamin va infuzion terapiya."
    },
    "injection-therapy": {
      "name": "In'ektsion terapiya",
      "description": "Mushak ichiga yoki teri ostiga tibbiy in'ektsiyalar."
    },
    "wound-dressing": {
      "name": "Yara bog'lash",
      "description": "Professional yara parvarishi va bog'lama almashtirish."
    },
    "medical-certificate": {
      "name": "Tibbiy ma'lumotnoma",
      "description": "Ish yoki o'qish uchun rasmiy tibbiy ma'lumotnoma."
    },
    "fitness-certificate": {
      "name": "Sportga yaroqlilik ma'lumotnomasi",
      "description": "Sport va fitnes mashg'ulotlariga ruxsat beruvchi tibbiy xulosa."
    },
    "travel-medical-cert": {
      "name": "Sayohat uchun tibbiy ma'lumotnoma",
      "description": "Xalqaro sayohat uchun tibbiy hujjatlar."
    },
    "cardio-consultation": {
      "name": "Kardiolog konsultatsiyasi",
      "description": "Kardiolog mutaxassisining konsultatsiyasi."
    },
    "echo-cardiogram": {
      "name": "Exokardiogramma",
      "description": "Kardiolog bahosi bilan yurakning ultratovush tekshiruvi."
    },
    "gyno-consultation": {
      "name": "Ginekolog konsultatsiyasi",
      "description": "Ginekolog mutaxassisining konsultatsiyasi."
    },
    "pap-smear": {
      "name": "Pap-test (sitolologiya)",
      "description": "Bachadon bo'yni skriningi uchun sitologik tahlil."
    },
    "neuro-consultation": {
      "name": "Nevrolog konsultatsiyasi",
      "description": "Nevrolog mutaxassisining konsultatsiyasi."
    },
    "eeg": {
      "name": "EEG (elektroensefalografiya)",
      "description": "Miya elektr faolligini qayd etish."
    },
    "ortho-consultation": {
      "name": "Ortoped konsultatsiyasi",
      "description": "Suyak va bo'g'im kasalliklari bo'yicha konsultatsiya."
    },
    "joint-injection": {
      "name": "Bo'g'imga in'ektsiya",
      "description": "Bo'g'im og'rig'i va yallig'lanishi uchun davolash in'ektsiyasi."
    },
    "eye-exam": {
      "name": "Kompleks ko'z tekshiruvi",
      "description": "To'liq oftalmologik tekshiruv."
    },
    "lasik-consultation": {
      "name": "LASIK konsultatsiyasi",
      "description": "Lazer ko'rishni tuzatish oldidan oldindan tekshiruv."
    },
    "urology-consultation": {
      "name": "Urolog konsultatsiyasi",
      "description": "Urolog mutaxassisining konsultatsiyasi."
    },
    "prostate-screening": {
      "name": "Prostata skriningi",
      "description": "PSA tahlili va prostata ultratovushi."
    },
    "general-surgery-consult": {
      "name": "Jarroh konsultatsiyasi",
      "description": "Operatsiyadan oldingi jarrohlik konsultatsiyasi."
    },
    "hernia-repair": {
      "name": "Chanoq tanasini tuzatish operatsiyasi",
      "description": "Chanoq yoki qorin bo'shlig'i tanasini jarrohlik bilan davolash."
    },
    "pediatric-consultation": {
      "name": "Pediatr konsultatsiyasi",
      "description": "Pediatr mutaxassisining konsultatsiyasi."
    },
    "child-vaccination": {
      "name": "Bolalar emlashi",
      "description": "Bolalarning rejalashtirilgan emlanishi."
    },
    "dermatology-consultation": {
      "name": "Dermatolog konsultatsiyasi",
      "description": "Teri holatini baholash va davolash rejasini tuzish."
    },
    "skin-biopsy": {
      "name": "Teri biopsiyasi",
      "description": "Teri o'zgarishini gistologik tekshirish uchun kichik protsedura."
    },
    "endocrinology-consultation": {
      "name": "Endokrinolog konsultatsiyasi",
      "description": "Gormonal va metabolik buzilishlar bo'yicha konsultatsiya."
    },
    "thyroid-panel": {
      "name": "Qalqonsimon bez tekshiruvi",
      "description": "Qalqonsimon bez funksiyasi uchun qon tahlili va ultratovush."
    }
  },
  "ky": {
    "cardio-checkup": {
      "name": "Кардиологиялык текшерүү",
      "description": "Аккредитацияланган өнөктөш клиникаларда ЭКГ, кан анализи жана адис консультациясын камтыган комплекстүү жүрөк-кан тамыр текшерүүсү."
    },
    "full-body-ct-checkup": {
      "name": "Толук дене КТ текшерүүсү",
      "description": "Радиологдун корутуму менен бүткүл организмдин ден соолугун баалоо үчүн кеңейтилген КТ диагностика пакети."
    },
    "full-body-mri-checkup": {
      "name": "Толук дене МРТ текшерүүсү",
      "description": "Негизги орган системаларын камтыган жогорку ажыратымдуулуктагы МРТ скрининг пакети."
    },
    "womens-checkup": {
      "name": "Аялдардын ден соолугун текшерүү",
      "description": "Аялдар үчүн гинекологиялык текшерүү, УЗИ жана лабораториялык скрининг."
    },
    "mens-checkup": {
      "name": "Эркектердин ден соолугун текшерүү",
      "description": "Эркектер үчүн урологиялык жана жалпы медициналык текшерүү пакети."
    },
    "executive-checkup": {
      "name": "Премиум ден соолук текшерүүсү",
      "description": "Кеңейтилген диагностика жана адистердин көрүүсү бар көп күндүк скрининг программасы."
    },
    "ct-head": {
      "name": "Баш КТ",
      "description": "Мээ жана баш сөөктүн компьютердик томографиясы, адис талдамы менен."
    },
    "ct-chest": {
      "name": "Көкүрөк кафасы КТ",
      "description": "Өпкө, жүрөк жана орто көкүрөктү баалоо үчүн көкүрөк кафасы КТ."
    },
    "ct-abdomen": {
      "name": "Карын кафасы КТ",
      "description": "Боор, боор, уйку бези жана азуу органдарын баалоо үчүн карын кафасы КТ."
    },
    "ct-full-body": {
      "name": "Толук дене КТ",
      "description": "Баштан жамбашка чейин комплекстүү КТ изилдөөсү."
    },
    "ct-angiography": {
      "name": "КТ ангиография",
      "description": "Кан тамырларын баалоо үчүн контрасттуу КТ."
    },
    "mri-brain": {
      "name": "Мээ МРТ",
      "description": "Мээдин жогорку ажыратымдуулуктагы магниттик-резонанстык томографиясы."
    },
    "mri-spine": {
      "name": "Омуртка МРТ",
      "description": "Моюн, көкүрөк же бел омурткасы бөлүктөрүнүн МРТ текшерүүсү."
    },
    "mri-joint": {
      "name": "Булчуң МРТ",
      "description": "Тизе, ийин, жамбаш же башка булчуңдун МРТ текшерүүсү."
    },
    "mri-full-body": {
      "name": "Толук дене МРТ",
      "description": "Комплекстүү МРТ скрининг пакети."
    },
    "mri-cardiac": {
      "name": "Жүрөк МРТ",
      "description": "Жүрөктүн түзүлүшү жана функциясын баалоо үчүн адистештирилген МРТ."
    },
    "us-abdomen": {
      "name": "Карын кафасы УЗИ",
      "description": "Карын кафасы органдарынын ультрадыбыс изилдөөсү."
    },
    "us-thyroid": {
      "name": "Калкан бези УЗИ",
      "description": "Калкан бези жана моюн түзүлүштөрүнүн ультрадыбыс изилдөөсү."
    },
    "us-pregnancy": {
      "name": "Кошумдуулук УЗИ",
      "description": "Кошумдуулуктун ар кандай мөөнөттөрүндө акушердик ультрадыбыс."
    },
    "us-doppler": {
      "name": "Допплер УЗИ",
      "description": "Кан агымын баалоо менен тамыр ультрадыбысы."
    },
    "us-heart": {
      "name": "Эхокардиография",
      "description": "Жүрөктүн ультрадыбыс изилдөөсү."
    },
    "dental-implant": {
      "name": "Тиш имплантаты",
      "description": "Өнөктөш стоматологиялык клиникаларда тажы бар бир тиш имплантаты."
    },
    "dental-crown": {
      "name": "Тиш тажы",
      "description": "Керамикалык же цирконий тажын орнотуу."
    },
    "teeth-whitening": {
      "name": "Тишти агартуу",
      "description": "Клиникада кесипкөй тишти агартуу."
    },
    "dental-cleaning": {
      "name": "Кесипкөй тиш тазалоо",
      "description": "Ультрадыбыс тазалоо жана полировка."
    },
    "root-canal": {
      "name": "Тиш жүлдүзчасын дарылоо",
      "description": "Тиш пульпасынын инфекциясы үчүн эндодонтиялык дарылоо."
    },
    "xray-chest": {
      "name": "Көкүрөк рентгени",
      "description": "Көкүрөк кафасынын стандарттык тик проекциядагы рентгенограммасы."
    },
    "xray-spine": {
      "name": "Омуртка рентгени",
      "description": "Омуртка бөлүктөрүнүн рентгенологиялык изилдөөсү."
    },
    "xray-dental": {
      "name": "Стоматологиялык рентген",
      "description": "Панорамалык же нүктөлүү стоматологиялык рентген."
    },
    "xray-joint": {
      "name": "Булчуң рентгени",
      "description": "Ири булчуңдардын рентгенологиялык изилдөөсү."
    },
    "therapeutic-massage": {
      "name": "Дарылоочу массаж",
      "description": "Ооруну жеңилдетүү жана калыбына келтирүү үчүн медициналык массаж."
    },
    "sports-massage": {
      "name": "Спорттук массаж",
      "description": "Спортчулар жана активдүү калыбына келтирүү үчүн массаж."
    },
    "lymphatic-massage": {
      "name": "Лимфодренаждык массаж",
      "description": "Шишикти азайтуу жана кан айлануусун жакшыртуу үчүн жумшак массаж."
    },
    "recovery-massage": {
      "name": "Дарылоодон кийинки калыбына келтирүү массажы",
      "description": "Медициналык туризм калыбына келтирүү мезгили үчүн ылайыкташтырылган массаж."
    },
    "ecg": {
      "name": "Электрокардиограмма (ЭКГ)",
      "description": "Жүрөк ыргагы жана электрдик активдүүлүктү каттоо."
    },
    "holter-monitor": {
      "name": "24 сааттык Холтер мониторинги",
      "description": "24 саат бою үзгүлтүксүз кардиологиялык байкоо."
    },
    "spirometry": {
      "name": "Спирометрия",
      "description": "Дем алуу системасын баалоо үчүн өпкө функциясынын текшерүүсү."
    },
    "stress-test": {
      "name": "Жүрөк стресс-тести",
      "description": "Жүрөккө жүктөм же фармакологиялык стресс-тестирлөө."
    },
    "iv-therapy": {
      "name": "Вена ичине терапия",
      "description": "Витаминдик жана инфузиялык вена ичине киргизүү терапиясы."
    },
    "injection-therapy": {
      "name": "Инъекциялык терапия",
      "description": "Булчуң ичине же тери астына медициналык инъекциялар."
    },
    "wound-dressing": {
      "name": "Жара байлоосу",
      "description": "Кесипкөй жара кам көрүүсү жана байлоону алмаштыруу."
    },
    "medical-certificate": {
      "name": "Медициналык маалымкат",
      "description": "Жумуш же окуу үчүн расмий медициналык маалымкат."
    },
    "fitness-certificate": {
      "name": "Спортко жарактуулук маалымкаты",
      "description": "Спорт жана фитнес жүктөмдөрүнө уруксат берүүчү медициналык корутум."
    },
    "travel-medical-cert": {
      "name": "Саякатка медициналык маалымкат",
      "description": "Эл аралык саякат үчүн медициналык документтер."
    },
    "cardio-consultation": {
      "name": "Кардиолог консультациясы",
      "description": "Кардиолог адисинин консультациясы."
    },
    "echo-cardiogram": {
      "name": "Эхокардиограмма",
      "description": "Кардиолог баалоосу менен жүрөктүн ультрадыбыс изилдөөсү."
    },
    "gyno-consultation": {
      "name": "Гинеколог консультациясы",
      "description": "Гинеколог адисинин консультациясы."
    },
    "pap-smear": {
      "name": "Пап-тест (цитология)",
      "description": "Мойну чейинен скрининг үчүн цитологиялык анализ."
    },
    "neuro-consultation": {
      "name": "Невролог консультациясы",
      "description": "Невролог адисинин консультациясы."
    },
    "eeg": {
      "name": "ЭЭГ (электроэнцефалография)",
      "description": "Мээдин электрдик активдүүлүгүн каттоо."
    },
    "ortho-consultation": {
      "name": "Ортопед консультациясы",
      "description": "Сөөк жана булчуң оорулары боюнча консультация."
    },
    "joint-injection": {
      "name": "Булчуңга инъекция",
      "description": "Булчуң оорусу жана сезгенүүсү үчүн дарылоочу инъекция."
    },
    "eye-exam": {
      "name": "Комплекстүү көз текшерүүсү",
      "description": "Толук офтальмологиялык текшерүү."
    },
    "lasik-consultation": {
      "name": "LASIK консультациясы",
      "description": "Лазердик көрүүнү оңдоо алдындагы алдын ала текшерүү."
    },
    "urology-consultation": {
      "name": "Уролог консультациясы",
      "description": "Уролог адисинин консультациясы."
    },
    "prostate-screening": {
      "name": "Простата скрининги",
      "description": "ПСА анализи жана простатанын ультрадыбысы."
    },
    "general-surgery-consult": {
      "name": "Хирург консультациясы",
      "description": "Операцияга чейинки хирургиялык консультация."
    },
    "hernia-repair": {
      "name": "Жарык оңдоо операциясы",
      "description": "Сан же карын кафасы жарыгын хирургиялык дарылоо."
    },
    "pediatric-consultation": {
      "name": "Педиатр консультациясы",
      "description": "Педиатр адисинин консультациясы."
    },
    "child-vaccination": {
      "name": "Бала эмдөөсү",
      "description": "Балдардын пландаштырылган иммунизациясы."
    },
    "dermatology-consultation": {
      "name": "Дерматолог консультациясы",
      "description": "Тери абалын баалоо жана дарылоо планын түзүү."
    },
    "skin-biopsy": {
      "name": "Тери биопсиясы",
      "description": "Тери өзгөрүүсүн гистологиялык изилдөө үчүн кичинекей процедура."
    },
    "endocrinology-consultation": {
      "name": "Эндокринолог консультациясы",
      "description": "Гормоналдык жана метаболикалык бузулуулар боюнча консультация."
    },
    "thyroid-panel": {
      "name": "Калкан бези текшерүүсү",
      "description": "Калкан бези функциясы үчүн кан анализи жана ультрадыбыс."
    }
  },
  "tg": {
    "cardio-checkup": {
      "name": "Тафтиши кардиологӣ",
      "description": "Тафтиши комплексии дилу ва рагҳои хун дар клиникаҳои аккредитатсияшудаи шарик, аз ҷумла ЭКГ, таҳлили хун ва машварати мутахассис."
    },
    "full-body-ct-checkup": {
      "name": "Тафтиши КТ-и тамоми бадан",
      "description": "Бастаи пешрафтаи КТ барои арзёбии саломатии тамоми бадан бо хулосаи радиолог."
    },
    "full-body-mri-checkup": {
      "name": "Тафтиши МРТ-и тамоми бадан",
      "description": "Бастаи скрининги МРТ бо аниқияти баланд барои системаҳои асосии аъзоҳо."
    },
    "womens-checkup": {
      "name": "Тафтиши саломатии занон",
      "description": "Муоинаи гинекологӣ, УЗИ ва скрининги лабораторӣ барои занон."
    },
    "mens-checkup": {
      "name": "Тафтиши саломатии мардон",
      "description": "Бастаи тафтиши урологӣ ва тиббии умумӣ барои мардон."
    },
    "executive-checkup": {
      "name": "Тафтиши премиуми саломатӣ",
      "description": "Барномаи скрининги чандрӯза бо диагностикаи пешрафта ва баҳси мутахассисон."
    },
    "ct-head": {
      "name": "КТ-и сар",
      "description": "Томографияи компютерии майя ва ҷангалаки сар бо тафсири мутахассис."
    },
    "ct-chest": {
      "name": "КТ-и сина",
      "description": "КТ-и сина барои арзёбии шуш, дил ва медиастенум."
    },
    "ct-abdomen": {
      "name": "КТ-и шикам",
      "description": "КТ-и шикам барои арзёбии ҷигар, гурда, лӯби шикам ва аъзоҳои ҳозима."
    },
    "ct-full-body": {
      "name": "КТ-и тамоми бадан",
      "description": "Таҳқиқоти комплексии КТ аз сар то лон."
    },
    "ct-angiography": {
      "name": "КТ-ангиография",
      "description": "КТ бо контраст барои арзёбии рагҳои хун."
    },
    "mri-brain": {
      "name": "МРТ-и майя",
      "description": "Томографияи магнитӣ-резонансии майя бо аниқияти баланд."
    },
    "mri-spine": {
      "name": "МРТ-и устухонпушак",
      "description": "МРТ-и қитъаҳои гарданӣ, сина ё камарии устухонпушак."
    },
    "mri-joint": {
      "name": "МРТ-и мафсал",
      "description": "МРТ-и зонӯ, шона, сон ё мафсали дигар."
    },
    "mri-full-body": {
      "name": "МРТ-и тамоми бадан",
      "description": "Бастаи комплексии скрининги МРТ."
    },
    "mri-cardiac": {
      "name": "МРТ-и дил",
      "description": "МРТ-и ихтисосӣ барои арзёбии сохтор ва функсияи дил."
    },
    "us-abdomen": {
      "name": "УЗИ-и шикам",
      "description": "Тафтиши ултрасонии аъзоҳои шикам."
    },
    "us-thyroid": {
      "name": "УЗИ-и ғадди лаҳмӣ",
      "description": "Тафтиши ултрасонии ғадди лаҳмӣ ва сохторҳои гардан."
    },
    "us-pregnancy": {
      "name": "УЗИ-и ҳомиладорӣ",
      "description": "Ултрасонии акушерӣ дар марҳилаҳои гуногуни ҳомиладорӣ."
    },
    "us-doppler": {
      "name": "УЗИ-и Допплер",
      "description": "Ултрасонии рагҳо бо арзёбии ҷараёни хун."
    },
    "us-heart": {
      "name": "Эхокардиография",
      "description": "Тафтиши ултрасонии дил."
    },
    "dental-implant": {
      "name": "Импланти дандон",
      "description": "Насбкунии як импланти дандон бо тож дар клиникаҳои стоматологии шарик."
    },
    "dental-crown": {
      "name": "Тожи дандон",
      "description": "Насбкунии тожи керамикӣ ё сирконий."
    },
    "teeth-whitening": {
      "name": "Сафедкунии дандон",
      "description": "Сафедкунии касбии дандон дар клиника."
    },
    "dental-cleaning": {
      "name": "Тозакунии касбии дандон",
      "description": "Тозакунии ултрасонӣ ва полировка."
    },
    "root-canal": {
      "name": "Даволани каналҳои реша",
      "description": "Даволани эндодонтии пулпаи дандони сироятшуда."
    },
    "xray-chest": {
      "name": "Рентгени сина",
      "description": "Рентгенограммаи стандартии сина дар проекцияи рост."
    },
    "xray-spine": {
      "name": "Рентгени устухонпушак",
      "description": "Тафтиши рентгенологии қитъаҳои устухонпушак."
    },
    "xray-dental": {
      "name": "Рентгени дандон",
      "description": "Рентгени панорамӣ ё нуқтагӣ барои дандон."
    },
    "xray-joint": {
      "name": "Рентгени мафсал",
      "description": "Тафтиши рентгенологии мафсалҳои калон."
    },
    "therapeutic-massage": {
      "name": "Массажи табобатӣ",
      "description": "Массажи тиббӣ барои коҳиши дард ва барқарорсозӣ."
    },
    "sports-massage": {
      "name": "Массажи варзишӣ",
      "description": "Массаж барои варзишгарон ва барқарорсозии фаъол."
    },
    "lymphatic-massage": {
      "name": "Массажи лимфодренажӣ",
      "description": "Массажи нарм барои коҳиши варам ва беҳбудии гардиши хун."
    },
    "recovery-massage": {
      "name": "Массажи барқарорсозӣ пас аз табобат",
      "description": "Массаж барои давраи барқарорсозии туризми тиббӣ."
    },
    "ecg": {
      "name": "Электрокардиограмма (ЭКГ)",
      "description": "Сабти ритми дил ва фаъолияти барқии дил."
    },
    "holter-monitor": {
      "name": "Мониторинги Холтери 24-соата",
      "description": "Мониторинги беқатъи кардиологӣ дар давоми 24 соат."
    },
    "spirometry": {
      "name": "Спирометрия",
      "description": "Тафтиши функсияи шуш барои арзёбии системаи нафаскашӣ."
    },
    "stress-test": {
      "name": "Тести стресси дил",
      "description": "Тести стресси физикӣ ё фармакологӣ барои дил."
    },
    "iv-therapy": {
      "name": "Терапияи венӣ",
      "description": "Терапияи витаминӣ ва инфузионии венӣ."
    },
    "injection-therapy": {
      "name": "Терапияи инъексионӣ",
      "description": "Инъексияҳои тиббии мушакӣ ё зери пӯст."
    },
    "wound-dressing": {
      "name": "Печонидани захм",
      "description": "Муҳофизати касбии захм ва ивазкунии печона."
    },
    "medical-certificate": {
      "name": "Шаҳодатномаи тиббӣ",
      "description": "Шаҳодатномаи расмии тиббӣ барои кор ё таҳсил."
    },
    "fitness-certificate": {
      "name": "Шаҳодатнома барои варзиш",
      "description": "Хулосаи тиббӣ барои иҷозати варзиш ва фитнес."
    },
    "travel-medical-cert": {
      "name": "Шаҳодатномаи тиббӣ барои сафар",
      "description": "Ҳуҷҷатҳои тиббӣ барои сафари байналмилалӣ."
    },
    "cardio-consultation": {
      "name": "Машварати кардиолог",
      "description": "Машварати мутахассиси кардиолог."
    },
    "echo-cardiogram": {
      "name": "Эхокардиограмма",
      "description": "Тафтиши ултрасонии дил бо баҳси кардиолог."
    },
    "gyno-consultation": {
      "name": "Машварати гинеколог",
      "description": "Машварати мутахассиси гинеколог."
    },
    "pap-smear": {
      "name": "Озмоиши Пап (ситология)",
      "description": "Таҳлили ситологӣ барои скрининги гардани матка."
    },
    "neuro-consultation": {
      "name": "Машварати невролог",
      "description": "Машварати мутахассиси невролог."
    },
    "eeg": {
      "name": "ЭЭГ (электроэнцефалография)",
      "description": "Сабти фаъолияти барқии майя."
    },
    "ortho-consultation": {
      "name": "Машварати ортопед",
      "description": "Машвараат дар бораи бемориҳои устухон ва мафсал."
    },
    "joint-injection": {
      "name": "Инъексия ба мафсал",
      "description": "Инъексияи табобатӣ барои дард ва варами мафсал."
    },
    "eye-exam": {
      "name": "Тафтиши комплексии чашм",
      "description": "Муоинаи пурраи офтальмологӣ."
    },
    "lasik-consultation": {
      "name": "Машварати LASIK",
      "description": "Арзёбии пешоперативӣ барои ислоҳи лазерии биниш."
    },
    "urology-consultation": {
      "name": "Машварати уролог",
      "description": "Машварати мутахассиси уролог."
    },
    "prostate-screening": {
      "name": "Скрининги простата",
      "description": "Таҳлили ПСА ва ултрасонии простата."
    },
    "general-surgery-consult": {
      "name": "Машварати ҷарроҳ",
      "description": "Машварати ҷарроҳии пешоперативӣ."
    },
    "hernia-repair": {
      "name": "Амалиёти таъмири фтқ",
      "description": "Таъмири ҷарроҳии фтқи пахш ё шикам."
    },
    "pediatric-consultation": {
      "name": "Машварати педиатр",
      "description": "Машварати мутахассиси педиатр."
    },
    "child-vaccination": {
      "name": "Эмкунии кӯдак",
      "description": "Эмкунии нақшавии кӯдакон."
    },
    "dermatology-consultation": {
      "name": "Машварати дерматолог",
      "description": "Арзёбии ҳолати пӯст ва тартиби табобат."
    },
    "skin-biopsy": {
      "name": "Биопсияи пӯст",
      "description": "Процедураи хурд барои таҳлили гистологии тағйироти пӯст."
    },
    "endocrinology-consultation": {
      "name": "Машварати эндокринолог",
      "description": "Машвараат дар бораи ихтилоли гормонӣ ва метаболикӣ."
    },
    "thyroid-panel": {
      "name": "Тафтиши ғадди лаҳмӣ",
      "description": "Таҳлили хун ва ултрасонӣ барои функсияи ғадди лаҳмӣ."
    }
  },
  "ar": {
    "cardio-checkup": {
      "name": "الفحص القلبي الشامل",
      "description": "فحص شامل للقلب والأوعية الدموية يشمل تخطيط القلب الكهربائي وتحاليل الدم واستشارة أخصائي في العيادات الشريكة المعتمدة."
    },
    "full-body-ct-checkup": {
      "name": "فحص الأشعة المقطعية للجسم كاملاً",
      "description": "باقة متقدمة من التصوير المقطعي لتقييم صحة الجسم بالكامل مع تقرير أخصائي الأشعة."
    },
    "full-body-mri-checkup": {
      "name": "فحص الرنين المغناطيسي للجسم كاملاً",
      "description": "باقة فحص بالرنين المغناطيسي عالي الدقة تغطي الأجهزة والأنظمة الرئيسية."
    },
    "womens-checkup": {
      "name": "فحص صحة المرأة",
      "description": "فحص نسائي، موجات فوق صوتية، وفحوصات مخبرية مخصصة للنساء."
    },
    "mens-checkup": {
      "name": "فحص صحة الرجل",
      "description": "باقة فحص مسالك بولية وطبية عامة مخصصة للرجال."
    },
    "executive-checkup": {
      "name": "الفحص الصحي التنفيذي",
      "description": "برنامج فحص متعدد الأيام مع تشخيصات متقدمة ومراجعات أخصائيين."
    },
    "ct-head": {
      "name": "أشعة مقطعية للرأس",
      "description": "تصوير مقطعي محوسب للدماغ والجمجمة مع تفسير أخصائي."
    },
    "ct-chest": {
      "name": "أشعة مقطعية للصدر",
      "description": "أشعة مقطعية للصدر لتقييم الرئتين والقلب والمنصف."
    },
    "ct-abdomen": {
      "name": "أشعة مقطعية للبطن",
      "description": "أشعة مقطعية للبطن لتقييم الكبد والكلى والبنكرياس والجهاز الهضمي."
    },
    "ct-full-body": {
      "name": "أشعة مقطعية للجسم كاملاً",
      "description": "تصوير مقطعي شامل من الرأس إلى الحوض."
    },
    "ct-angiography": {
      "name": "تصوير الأوعية بالأشعة المقطعية",
      "description": "أشعة مقطعية مع صبغة لتقييم الأوعية الدموية."
    },
    "mri-brain": {
      "name": "رنين مغناطيسي للدماغ",
      "description": "تصوير بالرنين المغناطيسي عالي الدقة للدماغ."
    },
    "mri-spine": {
      "name": "رنين مغناطيسي للعمود الفقري",
      "description": "رنين مغناطيسي لقطاعات العمود الفقري العنقي أو الصدري أو القطني."
    },
    "mri-joint": {
      "name": "رنين مغناطيسي للمفصل",
      "description": "رنين مغناطيسي للركبة أو الكتف أو الورك أو مفاصل أخرى."
    },
    "mri-full-body": {
      "name": "رنين مغناطيسي للجسم كاملاً",
      "description": "باقة فحص شاملة بالرنين المغناطيسي."
    },
    "mri-cardiac": {
      "name": "رنين مغناطيسي للقلب",
      "description": "رنين مغناطيسي متخصص لتقييم بنية ووظيفة القلب."
    },
    "us-abdomen": {
      "name": "موجات فوق صوتية للبطن",
      "description": "فحص بالموجات فوق الصوتية لأعضاء البطن."
    },
    "us-thyroid": {
      "name": "موجات فوق صوتية للغدة الدرقية",
      "description": "فحص بالموجات فوق الصوتية للغدة الدرقية وبنى الرقبة."
    },
    "us-pregnancy": {
      "name": "موجات فوق صوتية للحمل",
      "description": "موجات فوق صوتية توليدية في مراحل مختلفة من الحمل."
    },
    "us-doppler": {
      "name": "دوبلر بالموجات فوق الصوتية",
      "description": "فحص وعائي بالموجات فوق الصوتية مع تقييم تدفق الدم."
    },
    "us-heart": {
      "name": "تخطيط صدى القلب",
      "description": "فحص بالموجات فوق الصوتية للقلب."
    },
    "dental-implant": {
      "name": "زراعة الأسنان",
      "description": "زراعة سن واحدة مع تاج في عيادات الأسنان الشريكة."
    },
    "dental-crown": {
      "name": "تاج الأسنان",
      "description": "تركيب تاج خزفي أو زركوني."
    },
    "teeth-whitening": {
      "name": "تبييض الأسنان",
      "description": "تبييض أسنان احترافي في العيادة."
    },
    "dental-cleaning": {
      "name": "تنظيف الأسنان الاحترافي",
      "description": "تنظيف بالموجات فوق الصوتية وتلميع."
    },
    "root-canal": {
      "name": "علاج قناة الجذر",
      "description": "علاج لب الأسنان المصاب بعدوى."
    },
    "xray-chest": {
      "name": "أشعة سينية للصدر",
      "description": "أشعة سينية قياسية للصدر في الإسقاط الأمامي."
    },
    "xray-spine": {
      "name": "أشعة سينية للعمود الفقري",
      "description": "تصوير إشعاعي لقطاعات العمود الفقري."
    },
    "xray-dental": {
      "name": "أشعة سينية للأسنان",
      "description": "أشعة بانورامية أو موضعية للأسنان."
    },
    "xray-joint": {
      "name": "أشعة سينية للمفصل",
      "description": "تصوير إشعاعي للمفاصل الكبرى."
    },
    "therapeutic-massage": {
      "name": "تدليك علاجي",
      "description": "تدليك طبي لتخفيف الألم والتعافي."
    },
    "sports-massage": {
      "name": "تدليك رياضي",
      "description": "تدليك للرياضيين والتعافي النشط."
    },
    "lymphatic-massage": {
      "name": "تدليك تصريف لمفي",
      "description": "تدليك لطيف لتقليل التورم وتحسين الدورة الدموية."
    },
    "recovery-massage": {
      "name": "تدليك التعافي بعد العلاج",
      "description": "تدليك مخصص لفترة التعافي في السياحة العلاجية."
    },
    "ecg": {
      "name": "تخطيط كهربائية القلب (ECG)",
      "description": "تسجيل إيقاع القلب والنشاط الكهربائي."
    },
    "holter-monitor": {
      "name": "مراقبة هولتر لمدة 24 ساعة",
      "description": "مراقبة قلبية مستمرة على مدار 24 ساعة."
    },
    "spirometry": {
      "name": "قياس التنفس (سبيرومترية)",
      "description": "فحص وظائف الرئة لتقييم الجهاز التنفسي."
    },
    "stress-test": {
      "name": "اختبار إجهاد القلب",
      "description": "اختبار إجهاد بالتمارين أو بالأدوية."
    },
    "iv-therapy": {
      "name": "العلاج الوريدي",
      "description": "علاج وريدي بالفيتامينات والسوائل."
    },
    "injection-therapy": {
      "name": "العلاج بالحقن",
      "description": "حقن طبية عضلية أو تحت الجلد."
    },
    "wound-dressing": {
      "name": "تضميد الجروح",
      "description": "رعاية احترافية للجروح وتغيير الضمادات."
    },
    "medical-certificate": {
      "name": "شهادة طبية",
      "description": "شهادة طبية رسمية للعمل أو الدراسة."
    },
    "fitness-certificate": {
      "name": "شهادة اللياقة البدنية",
      "description": "تصريح طبي للأنشطة الرياضية واللياقة."
    },
    "travel-medical-cert": {
      "name": "شهادة طبية للسفر",
      "description": "وثائق طبية للسفر الدولي."
    },
    "cardio-consultation": {
      "name": "استشارة أمراض القلب",
      "description": "استشارة مع أخصائي أمراض القلب."
    },
    "echo-cardiogram": {
      "name": "تخطيط صدى القلب",
      "description": "فحص بالموجات فوق الصوتية للقلب مع مراجعة أخصائي القلب."
    },
    "gyno-consultation": {
      "name": "استشارة أمراض النساء",
      "description": "استشارة مع أخصائي أمراض النساء والتوليد."
    },
    "pap-smear": {
      "name": "مسحة عنق الرحم (اختبار باب)",
      "description": "فحص سيتولوجي لفحص عنق الرحم."
    },
    "neuro-consultation": {
      "name": "استشارة الأعصاب",
      "description": "استشارة مع أخصائي الأعصاب."
    },
    "eeg": {
      "name": "تخطيط الدماغ الكهربائي (EEG)",
      "description": "تسجيل النشاط الكهربائي للدماغ."
    },
    "ortho-consultation": {
      "name": "استشارة جراحة العظام",
      "description": "استشارة لحالات العظام والمفاصل."
    },
    "joint-injection": {
      "name": "حقن المفصل",
      "description": "حقن علاجي لألم والتهاب المفاصل."
    },
    "eye-exam": {
      "name": "فحص شامل للعيون",
      "description": "فحص طب العيون الكامل."
    },
    "lasik-consultation": {
      "name": "استشارة LASIK",
      "description": "تقييم ما قبل العملية لتصحيح البصر بالليزر."
    },
    "urology-consultation": {
      "name": "استشارة المسالك البولية",
      "description": "استشارة مع أخصائي المسالك البولية."
    },
    "prostate-screening": {
      "name": "فحص البروستاتا",
      "description": "فحص PSA وموجات فوق صوتية للبروستاتا."
    },
    "general-surgery-consult": {
      "name": "استشارة الجراحة العامة",
      "description": "استشارة جراحية قبل العملية."
    },
    "hernia-repair": {
      "name": "جراحة إصلاح الفتق",
      "description": "إصلاح جراحي للفتق الإربي أو البطني."
    },
    "pediatric-consultation": {
      "name": "استشارة طب الأطفال",
      "description": "استشارة مع طبيب أطفال."
    },
    "child-vaccination": {
      "name": "تطعيم الأطفال",
      "description": "تطعيم روتيني للأطفال."
    },
    "dermatology-consultation": {
      "name": "استشارة الأمراض الجلدية",
      "description": "تقييم حالة الجلد ووضع خطة العلاج."
    },
    "skin-biopsy": {
      "name": "خزعة الجلد",
      "description": "إجراء بسيط لتحليل آفات الجلد نسيجياً."
    },
    "endocrinology-consultation": {
      "name": "استشارة الغدد الصماء",
      "description": "استشارة لاضطرابات الهرمونات والتمثيل الغذائي."
    },
    "thyroid-panel": {
      "name": "فحص الغدة الدرقية",
      "description": "تحاليل دم وموجات فوق صوتية لوظيفة الغدة الدرقية."
    }
  },
  "zh": {
    "cardio-checkup": {
      "name": "心血管体检",
      "description": "在认证合作诊所进行的心血管综合检查，包括心电图、血液检测和专科医生咨询。"
    },
    "full-body-ct-checkup": {
      "name": "全身CT体检",
      "description": "先进的CT影像套餐，用于全面健康评估，并提供放射科医生报告。"
    },
    "full-body-mri-checkup": {
      "name": "全身MRI体检",
      "description": "高分辨率MRI筛查套餐，覆盖主要器官系统。"
    },
    "womens-checkup": {
      "name": "女性健康检查",
      "description": "专为女性设计的妇科检查、超声和实验室筛查。"
    },
    "mens-checkup": {
      "name": "男性健康检查",
      "description": "专为男性设计的泌尿科及综合健康筛查套餐。"
    },
    "executive-checkup": {
      "name": "高管健康体检",
      "description": "多日高级筛查项目，包含先进诊断和专科医生评估。"
    },
    "ct-head": {
      "name": "头部CT扫描",
      "description": "脑部和颅骨计算机断层扫描，并由专科医生解读。"
    },
    "ct-chest": {
      "name": "胸部CT扫描",
      "description": "胸部CT，用于评估肺部、心脏和纵隔。"
    },
    "ct-abdomen": {
      "name": "腹部CT扫描",
      "description": "腹部CT，用于评估肝脏、肾脏、胰腺和消化器官。"
    },
    "ct-full-body": {
      "name": "全身CT扫描",
      "description": "从头到骨盆的全面CT影像检查。"
    },
    "ct-angiography": {
      "name": "CT血管造影",
      "description": "增强对比CT，用于评估血管状况。"
    },
    "mri-brain": {
      "name": "脑部MRI",
      "description": "高分辨率脑部磁共振成像。"
    },
    "mri-spine": {
      "name": "脊柱MRI",
      "description": "颈椎、胸椎或腰椎MRI检查。"
    },
    "mri-joint": {
      "name": "关节MRI",
      "description": "膝关节、肩关节、髋关节或其他关节MRI检查。"
    },
    "mri-full-body": {
      "name": "全身MRI",
      "description": "综合MRI筛查套餐。"
    },
    "mri-cardiac": {
      "name": "心脏MRI",
      "description": "专门用于评估心脏结构和功能的MRI。"
    },
    "us-abdomen": {
      "name": "腹部超声",
      "description": "腹部器官超声检查。"
    },
    "us-thyroid": {
      "name": "甲状腺超声",
      "description": "甲状腺及颈部结构超声检查。"
    },
    "us-pregnancy": {
      "name": "孕期超声",
      "description": "不同孕期的产科超声检查。"
    },
    "us-doppler": {
      "name": "多普勒超声",
      "description": "血管超声检查，评估血流情况。"
    },
    "us-heart": {
      "name": "超声心动图",
      "description": "心脏超声检查。"
    },
    "dental-implant": {
      "name": "种植牙",
      "description": "在合作牙科诊所进行单颗种植牙及牙冠修复。"
    },
    "dental-crown": {
      "name": "牙冠修复",
      "description": "陶瓷或氧化锆牙冠安装。"
    },
    "teeth-whitening": {
      "name": "牙齿美白",
      "description": "诊所内专业牙齿美白。"
    },
    "dental-cleaning": {
      "name": "专业洁牙",
      "description": "超声波洁牙和抛光。"
    },
    "root-canal": {
      "name": "根管治疗",
      "description": "针对牙髓感染的内科治疗。"
    },
    "xray-chest": {
      "name": "胸部X光",
      "description": "标准后前位胸部X光片。"
    },
    "xray-spine": {
      "name": "脊柱X光",
      "description": "脊柱各节段X光检查。"
    },
    "xray-dental": {
      "name": "牙科X光",
      "description": "全景或根尖牙科X光片。"
    },
    "xray-joint": {
      "name": "关节X光",
      "description": "主要关节X光影像检查。"
    },
    "therapeutic-massage": {
      "name": "治疗按摩",
      "description": "用于缓解疼痛和促进康复的医疗按摩。"
    },
    "sports-massage": {
      "name": "运动按摩",
      "description": "面向运动员和积极康复的按摩。"
    },
    "lymphatic-massage": {
      "name": "淋巴引流按摩",
      "description": "轻柔按摩，用于减轻肿胀和改善循环。"
    },
    "recovery-massage": {
      "name": "术后康复按摩",
      "description": "专为医疗旅游康复期设计的按摩。"
    },
    "ecg": {
      "name": "心电图（ECG）",
      "description": "记录心脏节律和电活动。"
    },
    "holter-monitor": {
      "name": "24小时动态心电图",
      "description": "24小时连续心脏监测。"
    },
    "spirometry": {
      "name": "肺功能检查（肺量测定）",
      "description": "肺功能测试，用于呼吸系统评估。"
    },
    "stress-test": {
      "name": "心脏负荷试验",
      "description": "运动或药物心脏负荷试验。"
    },
    "iv-therapy": {
      "name": "静脉输液治疗",
      "description": "静脉维生素及补液治疗。"
    },
    "injection-therapy": {
      "name": "注射治疗",
      "description": "肌肉或皮下医疗注射。"
    },
    "wound-dressing": {
      "name": "伤口换药",
      "description": "专业伤口护理和敷料更换。"
    },
    "medical-certificate": {
      "name": "医疗证明",
      "description": "用于工作或学习的正式医疗证明。"
    },
    "fitness-certificate": {
      "name": "运动健康证明",
      "description": "用于体育运动和健身活动的医疗许可。"
    },
    "travel-medical-cert": {
      "name": "旅行医疗证明",
      "description": "用于国际旅行的医疗文件。"
    },
    "cardio-consultation": {
      "name": "心脏科咨询",
      "description": "心脏科专科医生咨询。"
    },
    "echo-cardiogram": {
      "name": "超声心动图检查",
      "description": "心脏超声检查并由心脏科医生评估。"
    },
    "gyno-consultation": {
      "name": "妇科咨询",
      "description": "妇科专科医生咨询。"
    },
    "pap-smear": {
      "name": "宫颈涂片检查（巴氏涂片）",
      "description": "用于宫颈癌筛查的细胞学检查。"
    },
    "neuro-consultation": {
      "name": "神经科咨询",
      "description": "神经科专科医生咨询。"
    },
    "eeg": {
      "name": "脑电图（EEG）",
      "description": "记录大脑电活动。"
    },
    "ortho-consultation": {
      "name": "骨科咨询",
      "description": "骨骼和关节疾病咨询。"
    },
    "joint-injection": {
      "name": "关节注射",
      "description": "用于关节疼痛和炎症的治疗性注射。"
    },
    "eye-exam": {
      "name": "全面眼科检查",
      "description": "完整眼科检查。"
    },
    "lasik-consultation": {
      "name": "LASIK咨询",
      "description": "激光视力矫正术前评估。"
    },
    "urology-consultation": {
      "name": "泌尿科咨询",
      "description": "泌尿科专科医生咨询。"
    },
    "prostate-screening": {
      "name": "前列腺筛查",
      "description": "PSA检测和前列腺超声。"
    },
    "general-surgery-consult": {
      "name": "普外科咨询",
      "description": "术前外科咨询。"
    },
    "hernia-repair": {
      "name": "疝气修补手术",
      "description": "腹股沟或腹壁疝的外科修补。"
    },
    "pediatric-consultation": {
      "name": "儿科咨询",
      "description": "儿科专科医生咨询。"
    },
    "child-vaccination": {
      "name": "儿童疫苗接种",
      "description": "常规儿童免疫接种。"
    },
    "dermatology-consultation": {
      "name": "皮肤科咨询",
      "description": "皮肤状况评估和治疗方案制定。"
    },
    "skin-biopsy": {
      "name": "皮肤活检",
      "description": "用于皮肤病变组织学分析的小手术。"
    },
    "endocrinology-consultation": {
      "name": "内分泌科咨询",
      "description": "激素和代谢紊乱咨询。"
    },
    "thyroid-panel": {
      "name": "甲状腺功能检查",
      "description": "甲状腺功能血液检测和超声检查。"
    }
  }
};

const en = JSON.parse(readFileSync(EN_PATH, "utf8"));
const sourceItems = en.procedures?.items;
if (!sourceItems || typeof sourceItems !== "object") {
  throw new Error("Missing procedures.items in en.json");
}
const procedureIds = Object.keys(sourceItems);

function buildLocaleFile(locale) {
  const localeTranslations = translations[locale];
  if (!localeTranslations) {
    throw new Error(`Missing translations for locale: ${locale}`);
  }

  const output = {};
  for (const id of procedureIds) {
    const entry = localeTranslations[id];
    if (!entry?.name || !entry?.description) {
      throw new Error(`Missing translation for ${locale}/${id}`);
    }
    output[id] = {
      name: entry.name,
      description: entry.description,
    };
  }
  return output;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const locale of LOCALES) {
  const data = buildLocaleFile(locale);
  const outPath = join(OUT_DIR, `${locale}.json`);
  writeFileSync(outPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outPath} (${Object.keys(data).length} items)`);
}

console.log(`Done. Source: ${procedureIds.length} procedure IDs from en.json`);
