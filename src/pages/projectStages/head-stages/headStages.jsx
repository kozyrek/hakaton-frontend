import Button from "../../../components/button/button";
import styles from "./headStages.module.css";

export default function HeadStages() {
    return (
        <section className={styles.wrapper}>
            <h1 className={`titleH1 ${styles.title}`}>«Персональный ассистент на&#8239;&#8239;базе искусственного интеллекта»</h1>
            <p className={`text3 ${styles.text}`}>
                Наш проект&nbsp;&mdash; интеллектуальный персональный ассистент на&nbsp;базе&nbsp;ИИ, который поможет пользователям управлять задачами, планировать день и&nbsp;быстро находить нужную информацию. Мы&nbsp;создаем удобного и&nbsp;адаптивного помощника, способного понимать контекст запросов и&nbsp;интегрироваться с&nbsp;различными сервисами. Наша цель&nbsp;&mdash; разработать эффективное решение, которое сэкономит время и&nbsp;сделает повседневные дела проще.
            </p>
            <Button large white path="#" text='Смотреть документ проекта'></Button>
        </section>
    )
}