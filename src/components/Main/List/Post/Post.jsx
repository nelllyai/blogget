import style from './Post.module.css';
import {ReactComponent as DeleteBtn} from './img/delete.svg';
import PropTypes from 'prop-types';
import Content from './Content';
import Rating from './Rating';
import Date from './Date';
import Thumbnail from './Thumbnail';

export const Post = ({postData}) => {
  const {
    id,
    thumbnail,
    title,
    author,
    ups,
    created,
  } = postData;

  return (
    <li className={style.post}>
      <button className={style.delete}>
        <DeleteBtn />
      </button>
      <Thumbnail title={title} source={thumbnail} />
      <Content title={title} author={author} id={id} />
      <Rating ups={ups} />
      <Date date={created} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
