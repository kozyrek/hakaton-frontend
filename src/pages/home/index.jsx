import React from "react";
import { Container } from "react-bootstrap";
// import MainContainer from "../../components/container/mainContainer";
import LayoutLogin from "./auth/layoutLogin";
import AboutUs from "./about-us/aboutUs";
import Hackathon from "./hackathon/hackathon";
import HowHackathonGoes from "./how-hackathon-goes/howHackathonGoes";
import Promo from "./promo/promo";
import Gallery from "./gallery/gallery";

export default function Home() {
 return (
    <>
        <LayoutLogin>
            <Container>
                <Promo/>
            </Container>      
        </LayoutLogin>
        <Container>
            <AboutUs/>
            <Hackathon/>
            <HowHackathonGoes/>
            {/* <div>Наши менторы</div> */}
            <Gallery/>
            {/* <div>Отзывы участников</div> */}
            {/* <div>Обратная связь</div> */}
            {/* <div>Наши партнеры</div> */}
            {/* <div>Часто задаваемые вопросы</div> */}
        </Container>
    </>
    
 )
}