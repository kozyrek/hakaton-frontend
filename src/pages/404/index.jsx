import { Container } from "react-bootstrap";
import LayoutLogin from "../auth/layoutLogin";
import Button from "../../components/button/button";
import { ROUTES } from "../../utils/constants";

import styles from "./index.module.css";

const NOT_FOUND_NUMBER = "404";
const PAGE_NOT_FOUND = "Такой страницы не существует.";
const BUTTON_TEXT = "Главная страница";

/**
 * Компонент ErrorPage отображает страницу ошибки 404.
 * Используется для информирования пользователя о том, что запрашиваемая страница не найдена.
 *
 * @returns {JSX.Element} Возвращает элемент страницы ошибки, включающий номер ошибки, текст сообщения и кнопку для перехода на главную страницу.
 */

export default function ErrorPage() {
  return (
    <LayoutLogin>
      <Container className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.notFound}>{NOT_FOUND_NUMBER}</div>
          <div className={styles.text}>{PAGE_NOT_FOUND}</div>
          <div>
            <Button
              text={BUTTON_TEXT}
              path={ROUTES.MAIN}
              white
            />
          </div>
        </div>
      </Container>
    </LayoutLogin>
  );
}
