import { Accordion } from "react-bootstrap";
import { questionsPartOne, questionsPartTwo } from "../utils/utils";

import styles from "./faq.module.css";

export default function Faq() {
    return (
        <section className="contentBox">
            <h2 className="titleH2">Часто задаваемые вопросы</h2>
            <Accordion className={styles.accordionList}>
                <div>
                    {questionsPartOne.map((item) => (
                        <Accordion.Item eventKey={item.id} key={item.id} className={styles.accordionItem}>
                            <Accordion.Header className={`text2 ${styles.accordionButton}`}>{item.title}</Accordion.Header>
                            <Accordion.Body className={`text1 ${styles.accordionBody}`}>{item.content}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </div>
                <div>
                    {questionsPartTwo.map((item) => (
                        <Accordion.Item eventKey={item.id} key={item.id} className={styles.accordionItem}>
                            <Accordion.Header className={`text2 ${styles.accordionButton}`}>{item.title}</Accordion.Header>
                            <Accordion.Body className={`text1 ${styles.accordionBody}`}>{item.content}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </div>
            </Accordion>
        </section>   
    )
}