import style from './Thumbnail.module.css';
import notphoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';

export const Thumbnail = ({title, source}) => (<img
  className={style.img}
  src={
    source && source.includes('https') ?
      source :
      notphoto
  }
  alt={title}
/>);

Thumbnail.propTypes = {
  title: PropTypes.string,
  source: PropTypes.string,
};
