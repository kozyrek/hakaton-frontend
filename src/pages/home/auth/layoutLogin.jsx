import React from "react";
import { Container } from "react-bootstrap";

import styles from "./styles/layoutLogin.module.css";
import SvgBigLogo from "../../../assests/images/svg/SvgBigLogo";

export default function LayoutLogin({ children }) {
  return (
    <Container
      fluid
      className={styles.main}
    >
      <div className={styles.bigLogo}>
        <SvgBigLogo />
      </div>
      <Container
        fluid="xl"
        className=""
      >
        {children}
      </Container>
    </Container>
  );
}
