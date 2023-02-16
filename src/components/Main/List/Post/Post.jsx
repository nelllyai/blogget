import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import {ReactComponent as DeleteBtn} from './img/delete.svg';
import PropTypes from 'prop-types';
import Content from './Content';
import Rating from './Rating';
import Date from './Date';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;

  return (
    <li className={style.post}>
      <button className={style.delete}>
        <DeleteBtn />
      </button>
      <img className={style.img} src={notphoto} alt={title} />
      <Content title={title} author={author} />
      <Rating ups={ups} />
      <Date date={date} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
