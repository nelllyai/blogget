import style from './Comments.module.css';
import PropTypes from 'prop-types';
import Date from '../../Main/List/Post/Date';
import {Text} from '../../../UI/Text';

export const Comments = ({comments}) => (
  comments && comments.length ?
  <ul className={style.list}>
    {
      comments.map(comment => comment.body && (
        <li key={comment.id} className={style.item}>
          <Text As='h3' size={18} tsize={22}>{comment.author}</Text>
          <Text As='p' size={14} tsize={18} className={style.comment}>
            {comment.body}
          </Text>
          <Date date={comment.created} />
        </li>
      ))
    }
  </ul> :
  <Text As='p' size={14} tsize={18}>Нет комментариев</Text>
);

Comments.propTypes = {
  comments: PropTypes.array,
};
