import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PersonCard from "../../../components/person-card/personCard";

import 'swiper/css';
import 'swiper/css/navigation';
import styles from "./mentors.module.css";
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
            <div className={styles.slider}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={4}
                    navigation
                    breakpoints={{
                        360: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 20,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                          },
                      }}
                >
                    {management.map((item) => (
                        <SwiperSlide key={item.id}>
                            <PersonCard item={item}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}