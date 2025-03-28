import React from "react";
import { Container } from "react-bootstrap";
// import MainContainer from "../../components/container/mainContainer";
import Promo from "./promo/promo";
import AboutUs from "./about-us/aboutUs";
import Hackathon from "./hackathon/hackathon";
import HowHackathonGoes from "./how-hackathon-goes/howHackathonGoes";
import Mentors from "./mentors/mentors";
import Gallery from "./gallery/gallery";
import Reviews from "./reviews/reviews";
import Contacts from "./contacts/contacts";
import Partners from "./partners/partners";
import Faq from "./FAQ/faq";
import LayoutLogin from "../auth/layoutLogin";

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
                <Mentors/>
                <Gallery/>
                <Reviews />
                <Contacts/>
                <Partners/>
                <Faq/>
            </Container>
        </>
    )
}