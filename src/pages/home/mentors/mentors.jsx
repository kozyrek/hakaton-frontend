import Slider from "../../../components/slider/slider";
import PersonCard from "../../../components/person-card/personCard";

// import styles from "./mentors.module.css";
import image1 from "../../home/about-us/images/image-1.png";
import image2 from "../../home/about-us/images/image-2.png";

export default function Mentors() {
    const management = [
        {
            id: 1,
            url: image1,
            name: "Бачкова Ирина Александровна",
            description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарева, учитель информатики высшей квалификационной категории, Лауреат Премии Президента\u00A0РФ",
        },
        {
            id: 2,
            url: image2,
            name: "Зарубин Олег Александрович ",
            description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета МГУ им. Н.\u00A0П.\u00A0Огарева, Председатель совета молодых ученых МГУ им. Н.\u00A0П.\u00A0Огарева"
        },
        {
            id: 3,
            url: image1,
            name: "Бачкова Ирина Александровна",
            description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарева, учитель информатики высшей квалификационной категории, Лауреат Премии Президента\u00A0РФ",
        },
        {
            id: 4,
            url: image2,
            name: "Зарубин Олег Александрович ",
            description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета МГУ им. Н.\u00A0П.\u00A0Огарева, Председатель совета молодых ученых МГУ им. Н.\u00A0П.\u00A0Огарева"
        },
        {
            id: 5,
            url: image1,
            name: "Бачкова Ирина Александровна",
            description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарева, учитель информатики высшей квалификационной категории, Лауреат Премии Президента\u00A0РФ",
        },
        {
            id: 6,
            url: image2,
            name: "Зарубин Олег Александрович ",
            description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета МГУ им. Н.\u00A0П.\u00A0Огарева, Председатель совета молодых ученых МГУ им. Н.\u00A0П.\u00A0Огарева"
        },
        {
            id: 7,
            url: image1,
            name: "Бачкова Ирина Александровна",
            description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарева, учитель информатики высшей квалификационной категории, Лауреат Премии Президента\u00A0РФ",
        },
        {
            id: 8,
            url: image2,
            name: "Зарубин Олег Александрович ",
            description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета МГУ им. Н.\u00A0П.\u00A0Огарева, Председатель совета молодых ученых МГУ им. Н.\u00A0П.\u00A0Огарева"
        },
        {
            id: 9,
            url: image1,
            name: "Бачкова Ирина Александровна",
            description: "директор Лицея МГУ им. Н.\u00A0П.\u00A0Огарева, учитель информатики высшей квалификационной категории, Лауреат Премии Президента\u00A0РФ",
        },
        {
            id: 10,
            url: image2,
            name: "Зарубин Олег Александрович ",
            description: "кандидат географических наук, директор Центра проектирования научно-образовательного пространства университета МГУ им. Н.\u00A0П.\u00A0Огарева, Председатель совета молодых ученых МГУ им. Н.\u00A0П.\u00A0Огарева"
        },
    ]

    return (
        <section className="contentBox">
            <h2 className="titleH2">Наши менторы</h2>
            <Slider items={management} Component={PersonCard}/>
        </section>
    )
}