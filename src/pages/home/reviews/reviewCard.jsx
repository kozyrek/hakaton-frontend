import { useEffect, createRef, useState } from "react";
import cn from "classnames";

import styles from "./styles/reviewCard.module.css";
import Avatar from "./images/iconAvatar";

export default function ReviewCard({ item, setModalIsOpen, addClass }) {
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const refText = createRef();
  const refVideo = createRef();

  useEffect(() => {
    if (!item.url) {
      const height = refText.current.getBoundingClientRect().height;
      setIsVisibleButton(setModalIsOpen && height > 191);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const playVideo = () => {
    if (refVideo.current.paused) {
      refVideo.current.play();
      setIsPlaying(!isPlaying);
    } 
    else {
      refVideo.current.pause();
      setIsPlaying(!isPlaying);
    }
    refVideo.current.onended = function() {
      setIsPlaying(false);
    };
  }

  const className = cn(styles.reviewWrapper, addClass)

  return (
    <>
      {item.url && (
        <div id={item.id} className={`${styles.videoWrapper} ${isPlaying ? styles.isPlaying : ''}`}>
          <div className={styles.buttonPlay}></div>
          <video ref={refVideo} src={item.url} onClick={playVideo}></video>
        </div>
      )}

      {!item.url && (
      <div className={className}>
        <div className={styles.imageWrapper}>
          {item.user.image ? (
            <img
              src={item.user.image}
              alt="Фотография пользователя"
            ></img>
          ) : (
            <Avatar />
          )}
        </div>
        <div className={styles.user}>
          <p className={`text2 ${styles.userName}`}>
            <span>{item.user.firstName} </span>
            <span>{item.user.lastName}</span>
          </p>
          {item.user.position && (
            <p className={styles.userPosition}>{item.user.position}</p>
          )}
        </div>
        <div className={styles.textWrapper}>
          <p
            ref={refText}
            className={`text4 ${
              isVisibleButton ? styles.isCutText : ""
            }`}
          >
            {item.text}
          </p>

          {isVisibleButton && (
            <button
              className={`text2 ${styles.button}`}
              onClick={() => setModalIsOpen(item)}
            >
              Читать полностью
            </button>
          )}
        </div>
      </div>
      )}
    </>
  );
}
