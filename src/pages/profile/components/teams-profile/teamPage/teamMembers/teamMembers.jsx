import React, { useState } from "react";
import styles from "./teamMembers.module.css";
import LeaderLogo from "./leaderLogo";
import DeleteButton from "../../../../ui/deleteBtn/deleteButton";
import Button from "../../../../../../components/button/button";
import Pencil from "../../../personal-info/images/Pencil";
import data from "../../../../data.json";
import { useResize } from "../../../../../../hooks/useResize";
import { Modal1, Modal2, Modal3 } from "../../../profileModals/ModalsList"

const availableRoles = [
  "участник",
  "аналитик",
  "разработчик",
  "дизайнер",
  "тестировщик",
  "менеджер",
  "HR",
];

const TeamMembers = () => {

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  const [members, setMembers] = useState(data.mebersTeam);

  const handleDelete = (index, e) => {
    e.stopPropagation();
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMakeCaptain = (index, e) => {
    e.stopPropagation();
    setMembers((prev) =>
      prev.map((member, i) => ({
        ...member,
        role: i === index ? "капитан" : (member.role === "капитан" ? "участник" : member.role),
      }))
    );
  };

  const handleRoleChange = (index, e) => {
    e.stopPropagation();
    setMembers((prev) =>
      prev.map((member, i) => {
        if (i === index) {
          const currentIndex = availableRoles.indexOf(member.role);
          const nextIndex = (currentIndex + 1) % availableRoles.length;
          return { ...member, role: availableRoles[nextIndex] };
        }
        return member;
      })
    );
  };

  const handleAddMember = () => {

  };

  const width = useResize();

  return (
    <div className={styles.participantsList}>
      <h2 className={styles.profileTabTitle}>Участники команды</h2>
      <ul className={styles.participantsListContainer}>
        {members.map((member, index) => (
          <li
            key={index}
            className={
              member.role === "капитан"
                ? styles.participantItemActive
                : styles.participantItem
            }
          >
            <div className={styles.participantInfo}>
              <p className={styles.participantName}>{member.full_name}</p>
              <div
                className={styles.roleContainer}
                onClick={() => setIsModal1Open(true)}
              >
                <p className={styles.participantRole}>{member.role}</p>
                <Pencil 
                
                width={width < 769 ? 12 : 18}
                height={width < 769 ? 12 : 18}
                aria-hidden="true"
                
                />
              </div>
            </div>
            <div className={styles.rightZone}>
              {member.role === "капитан" && <LeaderLogo />}
              {member.role !== "капитан" && (
                <DeleteButton onClick={(e) => handleMakeCaptain(index, e)}>
                  Сделать капитаном
                </DeleteButton>
              )}
              <DeleteButton
                className={styles.removeButton}
                onClick={() => setIsModal2Open(true)}
              >
                Удалить участника
              </DeleteButton>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.buttonsContainer}>
        <Button text="Добавить участника" onClick={() => setIsModal3Open(true)}/>
      </div>
      <Modal1 isOpen={isModal1Open} onClose={() => setIsModal1Open(false)} />
      <Modal2 isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} />
      <Modal3 isOpen={isModal3Open} onClose={() => setIsModal3Open(false)} />
    </div>
  );
};

export default TeamMembers;
