import React from "react";
import { Container } from "react-bootstrap";

import styles from "./styles/layoutSmall.module.css";

import SvgBigLogo from "../../assests/images/svg/SvgBigLogo";

export default function LayoutSmall({ children }) {
  return (
    <Container
      fluid
      className={styles.main}
    >
      <div className={styles.bigLogo}>
        <SvgBigLogo />
      </div>
      <Container fluid="xl">{children}</Container>
    </Container>
  );
}
