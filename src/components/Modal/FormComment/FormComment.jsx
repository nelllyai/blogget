import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateComment} from '../../../store/commentReducer';
import {useAuth} from '../../../Hooks/useAuth';

export const FormComment = () => {
  const value = useSelector(state => state.commentReducer.comment);
  const dispatch = useDispatch();

  const [auth] = useAuth();
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(value);
  };

  const handleChange = event => {
    dispatch(updateComment(event.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text As='h3' tsize={18}>
        {auth.name}
      </Text>
      <textarea
        className={style.textarea}
        value={value}
        ref={textareaRef}
        onChange={handleChange}
      />
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
