import Slider from "../../../components/slider/slider";
import PersonCard from "../../../components/person-card/personCard";
import { mentors } from "../utils/utils";

// import styles from "./mentors.module.css";

export default function Mentors() {
    return (
        <section className="contentBox">
            <h2 className="titleH2">Наши менторы</h2>
            <Slider items={mentors} Component={PersonCard}/>
        </section>
    )
}
