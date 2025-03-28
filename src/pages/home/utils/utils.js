//Контент для блока О нас
import manager1 from "../about-us/images/image-1.png";
import manager2 from "../about-us/images/image-2.png";

//Контент для галереи
import img1 from "../gallery/images/img-1.png";
import img2 from "../gallery/images/img-2.png";
import img3 from "../gallery/images/img-3.png";
import img4 from "../gallery/images/img-4.png";
import img5 from "../gallery/images/img-5.png";

//Контент для блока Наши менторы
import mentor1 from "../mentors/images/image-1.png";
import mentor2 from "../mentors/images/image-2.png";
import mentor3 from "../mentors/images/image-3.png";
import mentor4 from "../mentors/images/image-4.png";
import mentor5 from "../mentors/images/image-5.png";
import mentor6 from "../mentors/images/image-6.png";
import mentor7 from "../mentors/images/image-7.png";
import mentor8 from "../mentors/images/image-8.png";
import mentor9 from "../mentors/images/image-9.png";
import mentor10 from "../mentors/images/image-10.png";
import mentor11 from "../mentors/images/image-11.png";
import mentor12 from "../mentors/images/image-12.png";
import mentor13 from "../mentors/images/image-13.png";
import mentor14 from "../mentors/images/image-14.png";
import mentor15 from "../mentors/images/image-15.png";
import mentor16 from "../mentors/images/image-16.png";

//Контент для блока Наши партнеры
import partner1 from "../partners/images/partner-1.svg";
import partner2 from "../partners/images/partner-2.svg";
import partner3 from "../partners/images/partner-3.svg";
import partner4 from "../partners/images/partner-4.svg";
import partner5 from "../partners/images/partner-5.svg";
import partner6 from "../partners/images/partner-6.svg";
import partner7 from "../partners/images/partner-7.svg";
import partner8 from "../partners/images/partner-8.svg";
import partner9 from "../partners/images/partner-9.svg";
import partner10 from "../partners/images/partner-10.svg";

//Контент для блока с отзывами
import image from "../reviews/images/image.png";

export const management = [
    {
        id: 1,
        url: manager1,
        name: "Бачкова Ирина Александровна",
        description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарёва, учитель информатики высшей квалификационной категории, Лауреат Премии Президента РФ, Премии Главы Республики Мордовия, Премии Правительства Республики Мордовия",
    },
    {
        id: 2,
        url: manager2,
        name: "Зарубин Олег Александрович ",
        description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета Высшей школы развития научно-образовательного потенциала МГУ им. Н.\u00A0П.\u00A0Огарёва, доцент кафедры землеустройства и\u00A0ландшафтного планирования, учитель географии Лицея МГУ им. Н.\u00A0П.\u00A0Огарёва"
    },
]

export const statistics = [
    {
        id: 1,
        value: "100+",
        text: "общее количество участников",
    },
    {
        id: 2,
        value: "7",
        text: "общее количество мероприятий",
    },
    {
        id: 3,
        value: "10+",
        text: "количество разработано кейсов",
    },
    {
        id: 4,
        value: "500 000+",
        text: "количество просмотров в\u00A0социальных сетях и\u00A0СМИ",
    },
]

export const contacts = [
    {
        id: 1,
        title: 'График работы: ',
        text: '11:00-18:00',
    },
    {
        id: 2,
        title: 'Телефон: ',
        text: '8 (8342) 22-32-50',
        link: true,
    },
    {
        id: 3,
        title: 'Почта: ',
        text: 'licey-mrsu@yandex.ru',
        link: true,
    },
]

export const questionsPartOne = [
    {
        id: 1,
        title: 'Кто может принять участие в\u00A0Хакатоне и\u00A0что для этого необходимо сделать?',
        content: 'В\u00A0Хакатоне принимают участие команды в\u00A0составе 5-10\u00A0человек. Члены команды должны быть обучающимися одной образовательной организации: учащиеся 9-11 классов или студенты учреждений СПО. Каждый участник может входить в\u00A0состав только одной команды. Для участия в\u00A0Хакатоне необходимо пройти регистрацию (ссылка на\u00A0регистрацию).',
    },
    {
        id: 2,
        title: 'Что представляют собой кейсы? ',
        content: 'Кейс\u00A0\u2014 это описание конкретной проблемной ситуации в\u00A0соответствующей научной сфере деятельности или организационном процессе, представленное к\u00A0решению командам в\u00A0рамках Хакатона. В\u00A0рамках Хакатона команда решает один кейс, который она выбирает самостоятельно из\u00A0предложенного банка кейсов. Пример кейса (ссылка).',
    },
    {
        id: 3,
        title: 'Чем можно пользоваться во\u00A0время решения кейсов?',
        content: 'Команды на\u00A0Хакатоне во\u00A0время решения кейса могут пользоваться ресурсами, которые рекомендованы в\u00A0самом кейсе, источниками в\u00A0сети Интернет, печатных изданиях. Кейсовые задания составлены таким образом, что полное решение на\u00A0них невозможно найти в\u00A0каком-либо источнике. Также каждый из\u00A0кейсов не\u00A0имеет единственного верного решения. Работа над кейсом и\u00A0защищаемый командой проект направлены не\u00A0столько на\u00A0проверку знаний участников Хакатона, а\u00A0на\u00A0выявление способностей критического мышления, проектных компетенций, умений работать в\u00A0команде, лидерских навыков.',
    },
    {
        id: 4,
        title: 'Что представляет собой решение кейса?',
        content: 'Команда в\u00A0рамках Хакатона предлагает проект (проектное решение)\u00A0\u2014 комплекс взаимосвязанных мероприятий/действий, направленных на\u00A0создание научно обоснованного результата (продукта или его прототипа, услуги и\u00A0т.\u00A0п.) в\u00A0условиях временных и\u00A0ресурсных ограничений. Проект, который команды защищают перед членами жюри, обязательно должен быть результатом решения кейса.',
    },
]

export const questionsPartTwo = [
    {
        id: 5,
        title: 'Какая роль у\u00A0менторов?',
        content: 'Менторы\u00A0\u2014 это лица из\u00A0числа профессорско-преподавательского состава и\u00A0педагогического сообщества, привлекаемые организаторами. Ментор не\u00A0подсказывает команде решение задачи, его работа направлена на\u00A0сопровождение и\u00A0консультацию команд на\u00A0Хакатоне по\u00A0вопросам продуктового мышления, ресурсного планирования, постановки цели и\u00A0задач и\u00A0др.',
    },
    {
        id: 6,
        title: 'По\u00A0каким критериям оценивает жюри решение кейсов?',
        content: 'Жюри оценивает проекты по\u00A0следующим основным критериям: новизна и\u00A0актуальность; корректность постановки целей и\u00A0задач; практическая значимость и\u00A0конкурентоспособность проектного решения; реалистичность решения, учет ресурсной базы и\u00A0требований безопасности; представление проекта/решения задачи.',
    },
    {
        id: 7,
        title: 'Как происходит защита кейсов?',
        content: 'Команда презентует проект перед жюри (до\u00A07\u00A0минут). Капитан команды самостоятельно принимает решение по\u00A0функциям членов команды при защите. Жюри имеет право после выступления команды задать уточняющие вопросы (до\u00A03\u00A0минут). По\u00A0окончанию презентации проекта командой и\u00A0процедуры ответов на\u00A0вопросы членами жюри заполняется оценочная форма, рассчитывается суммарная оценка, выставленная каждым членом жюри, как сумма баллов по\u00A0всем критериям. Итоговая оценка высчитывается как среднее арифметическое от\u00A0суммарных оценок каждого из\u00A0членов Жюри.',
    },
]

export const photos = [
    {
        id: 1,
        image: img1,
    },
    {
        id: 2,
        image: img2,
    },
    {
        id: 3,
        image: img3,
    },
    {
        id: 4,
        image: img4,
        wide: true,
    },
    {
        id: 5,
        image: img5,
    },
]

export const forWhom = [
    {
        id: 1,
        text: 'Хотят развить свои навыки в\u00A0науке, технологиях и\u00A0проектной работе.',
    },
    {
        id: 2,
        text: 'Мечтают найти единомышленников и\u00A0работать в\u00A0команде.',
    },
    {
        id: 3,
        text: 'Стремятся к\u00A0профессиональному самоопределению и\u00A0хотят понять, как их\u00A0знания могут быть применены на\u00A0практике.',
    },
]

export const advantages = [
    {
        id: 1,
        text: 'Получишь реальный опыт решения научных задач, которые важны для общества.'
    },
    {
        id: 2,
        text: 'Научишься представлять свои идеи в\u00A0формате презентаций и\u00A0питчей.'
    },
    {
        id: 3,
        text: 'Станешь частью большого движения, которое популяризирует науку и\u00A0технологии в\u00A0России.'
    },
]

export const consist = [
    {
        id: 1,
        text: 'Курс \u00ABОсновы проектной деятельности\u00BB',
    },
    {
        id: 2,
        text: '2\u00A0проектные сессии',
    },
    {
        id: 3,
        text: '1\u00A0презентация',
    },
    {
        id: 4,
        text: '2\u00A0лекции и\u00A0мастер-класса',
    },
    {
        id: 5,
        text: '1\u00A0профориентационный питч',
    },
    {
        id: 6,
        text: '1\u00A0профориентационная игра, научная и\u00A0образовательная викторина',
    },
]

export const stages = [
    {
        id: 1,
        title: 'Формирование команд. ',
        text: 'Участники объединяются в\u00A0команды (из\u00A0одной образовательной организации) и\u00A0выбирают кейс.',
    },
    {
        id: 2,
        title: 'Работа над проектом. ',
        text: 'Команда разрабатывает решение под руководством ментора\u00A0\u2014 ученого или педагога.',
    },
    {
        id: 3,
        title: 'Образовательная программа. ',
        text: 'Участники посещают лекции, мастер-классы и\u00A0викторины, чтобы глубже погрузиться в\u00A0тему.',
    },
    {
        id: 4,
        title: 'Питч-сессия. ',
        text: 'Команда представляет свой проект жюри в\u00A0формате презентации, макета или видео.',
    },
    {
        id: 5,
        title: 'Итоги. ',
        text: 'Лучшие проекты выбираются на\u00A0основе защиты кейсов и\u00A0получают признание экспертов.',
    },
]

export const important = [
    {
        id: 1,
        text: 'Проект создается с\u00A0нуля прямо на\u00A0хакатоне.',
    },
    {
        id: 2,
        text: 'Решения должны быть научно обоснованными и\u00A0опираться на\u00A0методы исследований.',
    },
    {
        id: 3,
        text: 'Защита проекта\u00A0\u2014 это возможность ярко и\u00A0интерактивно представить свои идеи.',
    },
]

export const mentors = [
    {
        id: 1,
        url: mentor1,
        name: "Кирдяшова Евгения Васильевна",
        description: "кандидат педагогических наук, доцент кафедры психологии МГУ им. Н.\u00A0П.\u00A0Огарёва, эксперт-наставник Росмолодёжь. Гранты"
    },        
    {
        id: 2,
        url: mentor2,
        name: "Зарубин Олег Александрович",
        description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета Высшей школы развития научно-образовательного потенциала МГУ им. Н.\u00A0П.\u00A0Огарёва, доцент кафедры землеустройства и\u00A0ландшафтного планирования,учитель географии Лицея МГУ им. Н.\u00A0П.\u00A0Огарёва"
    },
    {
        id: 3,
        url: mentor3,
        name: "Пиняев Сергей Иванович",
        description: "кандидат биологических наук, заведующий лабораторией генно-инженерных биологических продуктов Федерального центра развития биотехнологий и\u00A0медицины МГУ им. Н.\u00A0П.\u00A0Огарёва, региональный представитель Фонда содействия инновациям в\u00A0республике Мордовия",
    },
    {
        id: 4,
        url: mentor4,
        name: "Леоненко Евгений Анатольевич",
        description: "кандидат экономических наук, доцент кафедры менеджмента экономического института МГУ им.Н.П. Огарева, директор филиала РО\u00A0«Знание» в\u00A0Республике Мордовия"
    },
    {
        id: 5,
        url: mentor5,
        name: "Таратынова Алина Дмитриевна",
        description: "аспирант, менеджер проектов ООО «Стартап-студия МГУ им. Н.\u00A0П.\u00A0Огарева», Председатель Молодежного правительства Республики Мордовия, преподаватель проектной деятельности Лицея МГУ им. Н.\u00A0П.\u00A0Огарёва",
    },
    {
        id: 6,
        url: mentor6,
        name: "Сафонов Владимир Иванович",
        description: "кандидат физико-математических наук, доцент, доцент кафедры информационных технологий и\u00A0программирования МГУ им. Н.\u00A0П.\u00A0Огарёва"
    },
    {
        id: 7,
        url: mentor7,
        name: "Тараскина Ирина Викторовна",
        description: "доцент кафедры психологии, кандидат психологических наук, заместитель директора историко-социологического института по\u00A0молодежной политике МГУ им. Н.\u00A0П.\u00A0Огарёва, член экспертного совета Росмолодёжь. Гранты",
    },
    {
        id: 8,
        url: mentor8,
        name: "Агеева Ольга Николаевна",
        description: "кандидат юридических наук, доцент, директор Института подготовки и\u00A0аттестации научных и\u00A0научно-педагогических кадров, доцент кафедры уголовного права и\u00A0процесса МГУ им. Н.\u00A0П.\u00A0Огарёва"
    },
    {
        id: 9,
        url: mentor9,
        name: "Окина Екатерина Викторовна",
        description: "кандидат химических наук, директор Департамента образовательной политики, доцент кафедры фундаментальной химии и\u00A0химической технологии МГУ им. Н.\u00A0П.\u00A0Огарёва",
    },
    {
        id: 10,
        url: mentor10,
        name: "Федорова Светлана Владимировна",
        description: "директор Центра развития проектных компетенций «Точка кипения МГУ им. Н.\u00A0П.\u00A0Огарёва», директор Автономной некоммерческой организации «Центр интеллектуального и\u00A0творческого развития»"
    },
    {
        id: 11,
        url: mentor11,
        name: "Сокольникова Ирина Анатольевна",
        description: "директор департамента по\u00A0связям с\u00A0общественностью МГУ имени Н.\u00A0П.\u00A0Огарёва, победитель проекта «ТопБЛОГ»"
    },
    {
        id: 12,
        url: mentor12,
        name: "Гусев Александр Юрьевич",
        description: "преподаватель кафедры мобильных энергетических средств и\u00A0сельскохозяйственных машин имени профессора А.\u00A0И.\u00A0Лещанкина Института механики и\u00A0энергетики МГУ им. Н.\u00A0П.\u00A0Огарёва, директор ООО «ТАН»"
    },
    {
        id: 13,
        url: mentor13,
        name: "Курбаков Иван Иванович",
        description: "кандидат технических наук, доцент, заведующий кафедрой электрификации и\u00A0автоматизации производства института механики и\u00A0энергетики МГУ им. Н.\u00A0П.\u00A0Огарёва"
    },
    {
        id: 14,
        url: mentor14,
        name: "Малкова Яна Геннадьевна",
        description: "заместитель директора Лицея ФГБОУ ВО\u00A0«МГУ им. Н.\u00A0П.\u00A0Огарёва», учитель математики высшей квалификационной категорииМГУ им. Н.\u00A0П.\u00A0Огарёва"
    },
    {
        id: 15,
        url: mentor15,
        name: "Смирнов Александр Андреевич",
        description: "заместитель директора во\u00A0воспитательной работе Лицея МГУ им. Н.\u00A0П.\u00A0Огарёва, учитель истории первой квалификационной категории, игротехник, вожатый"
    },
    {
        id: 16,
        url: mentor16,
        name: "Бачкова Ирина Александровна",
        description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарёва, учитель информатики высшей квалификационной категории, Лауреат Премии Президента РФ, Премии Главы Республики Мордовия, Премии Правительства Республики Мордовия",
    },
]

export const partners = [
    {
        id: 1,
        image: partner1,
    },
    {
        id: 2,
        image: partner2,
    },
    {
        id: 3,
        image: partner3,
    },
    {
        id: 4,
        image: partner4,
    },
    {
        id: 5,
        image: partner5,
    },
    {
        id: 6,
        image: partner6,
    },
    {
        id: 7,
        image: partner7,
    },
    {
        id: 8,
        image: partner8,
    },
    {
        id: 9,
        image: partner9,
    },
    {
        id: 10,
        image: partner10,
    },
]

export const reviews = [
    {
        id: 1,
        user: {
            firstName: 'Дарья',
            lastName: 'Радайкина',
            image: image,
            position: 'Председатель регионального отделения Движения Первых Республики Мордовия',
        },
        text: 'Безусловно, этот вуз обладает очень сильным педагогическим сообществом\u00A0— наставниками. Первичное отделение, существующее в\u00A0МГУ, славится сильными педагогическими отрядами и\u00A0лицеем, которые действуют на\u00A0базе этого вуза. От\u00A0имени Движения Первых хочется пожелать вузу расширять границы, расширять новые направления, а\u00A0также совершать новые научные открытия. И, безусловно, вместе с\u00A0Первыми быть в\u00A0движении!',
    },

    {
        id: 11,
        user: {
            firstName: 'Иван',
            lastName: 'Иванов',
        },
        text: 'От\u00A0имени Движения Первых хочется пожелать вузу расширять границы, расширять новые направления, а\u00A0также совершать новые научные открытия. От\u00A0имени Движения Первых хочется пожелать вузу расширять границы, расширять новые направления, а\u00A0также совершать новые научные открытия. От\u00A0имени Движения Первых хочется пожелать вузу расширять границы.',
    },

    {
        id: 3,
        user: {
            firstName: 'Любовь',
            lastName: 'Савельева',
        },
        text: 'Эта история про\u00A0то, как Вселенная сводит близких по\u00A0ценностям людей. В\u00A0апреле на\u00A0конференции про одаренность в\u00A0Нижнем Новгороде мы\u00A0познакомились с\u00A0Ириной Александровной Бачковой, директором лицея МГУ им.Н.П.Огарева города Саранска. В\u00A0сентябре мы\u00A0встретились на\u00A0встрече председателей клубов «Учитель Года» в\u00A0Подмосковье, в\u00A0октябре в\u00A0Саранске на\u00A0форуме наставнических практик, а\u00A0вчера, спустя всего полгода уже провели совместное событие в\u00A0нашем лицее в\u00A0Ульяновске. Ирина Александровна со\u00A0своей командой разработали проект «НАУЧНЫЙ ХАКАТОН» SCIENCEHACK`23, поддержанный движением Первых. И\u00A0вот вчера старшеклассники нашего Губернаторского лицея №\u00A0101 имели счастье провести целый день осенних каникул вместе с\u00A0командой деятелей науки и\u00A0образования Республики Мордовия: решали научные кейсы, развивали проектные навыки, презентовали свои проектные решения. Вместе с\u00A0Ириной Александровной, в\u00A0прямом смысле, преодолев самую настоящую пургу.',
    },

    {
        id: 5,
        user: {
            firstName: 'Любовь',
            lastName: 'Савельева',
        },
        text: 'Эта история про\u00A0то, как Вселенная сводит близких по\u00A0ценностям людей. В\u00A0апреле на\u00A0конференции про одаренность в\u00A0Нижнем Новгороде мы\u00A0познакомились с\u00A0Ириной Александровной Бачковой, директором лицея МГУ им.Н.П.Огарева города Саранска. В\u00A0сентябре мы\u00A0встретились на\u00A0встрече председателей клубов «Учитель Года» в\u00A0Подмосковье, в\u00A0октябре в\u00A0Саранске на\u00A0форуме наставнических практик, а\u00A0вчера, спустя всего полгода уже провели совместное событие в\u00A0нашем лицее в\u00A0Ульяновске. Ирина Александровна со\u00A0своей командой разработали проект «НАУЧНЫЙ ХАКАТОН» SCIENCEHACK`23, поддержанный движением Первых. И\u00A0вот вчера старшеклассники нашего Губернаторского лицея №\u00A0101 имели счастье провести целый день осенних каникул вместе с\u00A0командой деятелей науки и\u00A0образования Республики Мордовия: решали научные кейсы, развивали проектные навыки, презентовали свои проектные решения. Вместе с\u00A0Ириной Александровной, в\u00A0прямом смысле, преодолев самую настоящую пургу.',
    },
    {
        id: 6,
        user: {
            firstName: 'Любовь',
            lastName: 'Савельева',
        },
        text: 'Эта история про\u00A0то, как Вселенная сводит близких по\u00A0ценностям людей. В\u00A0апреле на\u00A0конференции про одаренность в\u00A0Нижнем Новгороде мы\u00A0познакомились с\u00A0Ириной Александровной Бачковой, директором лицея МГУ им.Н.П.Огарева города Саранска. В\u00A0сентябре мы\u00A0встретились на\u00A0встрече председателей клубов «Учитель Года» в\u00A0Подмосковье, в\u00A0октябре в\u00A0Саранске на\u00A0форуме наставнических практик, а\u00A0вчера, спустя всего полгода уже провели совместное событие в\u00A0нашем лицее в\u00A0Ульяновске. Ирина Александровна со\u00A0своей командой разработали проект «НАУЧНЫЙ ХАКАТОН» SCIENCEHACK`23, поддержанный движением Первых. И\u00A0вот вчера старшеклассники нашего Губернаторского лицея №\u00A0101 имели счастье провести целый день осенних каникул вместе с\u00A0командой деятелей науки и\u00A0образования Республики Мордовия: решали научные кейсы, развивали проектные навыки, презентовали свои проектные решения. Вместе с\u00A0Ириной Александровной, в\u00A0прямом смысле, преодолев самую настоящую пургу.',
    },
    {
        id: 7,
        user: {
            firstName: 'Любовь',
            lastName: 'Савельева',
        },
        text: 'Эта история про\u00A0то, как Вселенная сводит близких по\u00A0ценностям людей. В\u00A0апреле на\u00A0конференции про одаренность в\u00A0Нижнем Новгороде мы\u00A0познакомились с\u00A0Ириной Александровной Бачковой, директором лицея МГУ им.Н.П.Огарева города Саранска. В\u00A0сентябре мы\u00A0встретились на\u00A0встрече председателей клубов «Учитель Года» в\u00A0Подмосковье, в\u00A0октябре в\u00A0Саранске на\u00A0форуме наставнических практик, а\u00A0вчера, спустя всего полгода уже провели совместное событие в\u00A0нашем лицее в\u00A0Ульяновске. Ирина Александровна со\u00A0своей командой разработали проект «НАУЧНЫЙ ХАКАТОН» SCIENCEHACK`23, поддержанный движением Первых. И\u00A0вот вчера старшеклассники нашего Губернаторского лицея №\u00A0101 имели счастье провести целый день осенних каникул вместе с\u00A0командой деятелей науки и\u00A0образования Республики Мордовия: решали научные кейсы, развивали проектные навыки, презентовали свои проектные решения. Вместе с\u00A0Ириной Александровной, в\u00A0прямом смысле, преодолев самую настоящую пургу.',
    },
]