import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import {useContext, useEffect, useRef} from 'react';
import {authContext} from '../../../context/authContext';
import {useDispatch, useSelector} from 'react-redux';
import {updateComment} from '../../../store';

export const FormComment = () => {
  const value = useSelector(state => state.comment);
  const dispatch = useDispatch();

  const {auth} = useContext(authContext);
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
