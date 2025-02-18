import React from "react";
import { Container } from "react-bootstrap";
// import MainContainer from "../../components/container/mainContainer";
import LayoutLogin from "./auth/layoutLogin";
import AboutUs from "./about-us/aboutUs";
import Promo from "./promo/promo";

export default function Home() {
 return (
    <>
        <LayoutLogin>
            <Container>
                <Promo/>
            </Container>      
        </LayoutLogin>
        <Container>
            <AboutUs></AboutUs>
            {/* <div>Что такое хакатон?</div> */}
            {/* <div>Как это происходит?</div> */}
            {/* <div>Наши менторы</div> */}
            {/* <div>Яркие моменты с&nbsp;прошедших хакатонов</div> */}
            {/* <div>Отзывы участников</div> */}
            {/* <div>Обратная связь</div> */}
            {/* <div>Наши партнеры</div> */}
            {/* <div>Часто задаваемые вопросы</div> */}
        </Container>
    </>
    
 )
}