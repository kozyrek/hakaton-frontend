import React, {useState} from "react";
import styles from "./teamHeader.module.css";
import profilePhoto from "../../../../../../assests/images/photo/ivanIvanovProfile.png";
import Pencil from "../../../personal-info/images/Pencil";
import { useResize } from "../../../../../../hooks/useResize";
import { Modal4 } from "../../../profileModals/ModalsList"

const TeamHeader = ({ teamName }) => {
  const [isModal4Open, setIsModal4Open] = useState(false);
  const width = useResize();
  return (
    <>
    <div className={styles.userInfoBlock}>
      <div className={styles.responsiveUserNameContainer} onClick={() => setIsModal4Open(true)}>
        <h1 className={styles.userNameResponsive}>Команда {teamName}</h1>
        <Pencil
          width={width < 360 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
          height={width < 360 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
          aria-hidden="true" 
       
        />
      </div>
      <div className={styles.userNameContainer}>
        <h1 className={styles.userName}>Команда {teamName}</h1>
        <div  onClick={() => setIsModal4Open(true)}>
        <Pencil
          width={width < 480 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
          height={width < 480 ? 12 : width < 768 ? 14 : width < 1024 ? 16 : 20}
          aria-hidden="true"
         
        />
        </div>
      </div>

      <div className={styles.userInfoHeader}>
        <img
          src={profilePhoto}
          alt="avatar"
          className={styles.profilePhotoPlaceholder}
        />
        <div className={styles.textContent}>
          <p className={styles.details}>Ментор команды</p>
          <p className={styles.nameMentor}>Иванов Иван Иванович</p>
        </div>
      </div>
    </div>
     <Modal4 isOpen={isModal4Open} onClose={() => setIsModal4Open(false)} />
     </>
  );
};

export default TeamHeader;
