import style from './Notification.module.css';
import ReactDOM from 'react-dom';

export const Notification = () => {
  console.log(style);
  return ReactDOM.createPortal(
    <div className={style.notify}>
      Ошибка авторизации пользователя
    </div>,
    document.getElementById('notification'),
  );
};
