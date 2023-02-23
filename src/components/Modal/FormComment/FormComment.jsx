import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useEffect, useRef} from 'react';

export const FormComment = () => {
  const textareaRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault;
    console.log(textareaRef.current.value);
  };

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Text As='h3' tsize={18}>
        Имя авторизованного пользователя
      </Text>
      <textarea className={style.textarea} ref={textareaRef} />
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
