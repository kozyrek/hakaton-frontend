import React, { useState } from "react";
import styles from "./teamMembers.module.css";
import leaderLogo from "./leaderLogo"

import Pagination from "../../../../ui/pagination/pagination";
import DeleteButton from "../../../../ui/deleteBtn/deleteButton";
import ModalWindow from "../../../../../../components/modalWindow";
import Button from "../../../../../../components/button/button";


const TeamMembers = ({}) => {






  return (
    <div className={styles.participantsList}>
      <h2 className={styles.profileTabTitle}> Участники команды</h2>
    

      <ul className={styles.participantsListContainer}>
    
          <li className={styles.participantItemActive}>
            <div className={styles.participantInfo}>
              <p className={styles.participantName}>Петров Иван Иванович</p>
              <p className={styles.participantRole}>Капитан команды</p>
            </div>
            <div className={styles.rightZone}>
          
            <leaderLogo/>
            <DeleteButton
              className={styles.removeButton}
            >
              Удалить участника
            </DeleteButton>
            </div>
          </li>
          <li className={styles.participantItem}>
            <div className={styles.participantInfo}>
              <p className={styles.participantName}>Петров Иван Иванович</p>
              <p className={styles.participantRole}>Капитан команды</p>
            </div>
            <div className={styles.rightZone}>
          
            <DeleteButton>Сделать капитаном</DeleteButton>
            <DeleteButton
              className={styles.removeButton}
            >
              Удалить участника
            </DeleteButton>
            </div>
          </li>
          <li className={styles.participantItem}>
            <div className={styles.participantInfo}>
              <p className={styles.participantName}>Петров Иван Иванович</p>
              <p className={styles.participantRole}>Капитан команды</p>
            </div>
            <div className={styles.rightZone}>
          
            <DeleteButton>Сделать капитаном</DeleteButton>
            <DeleteButton
              className={styles.removeButton}
            >
              Удалить участника
            </DeleteButton>
            </div>
          </li>
      
      </ul>

            <Button text="Добавить участника" />


    </div>
  );
};

export default TeamMembers;