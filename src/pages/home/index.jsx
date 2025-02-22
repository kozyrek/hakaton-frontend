import { Container } from "react-bootstrap";

export default function Home() {
 return (
    <>
        <div style={{background: 'blue', height: '50px'}}>
            <Container fluid='lg'>
                Главная
            </Container>
            
        </div>
        <Container fluid='lg'>
            О нас
        </Container>
    </>
    
 )
}