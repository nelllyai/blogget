import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';

export const Auth = ({auth}) => (
  <button className={style.button}>
    {auth ? auth : <LoginIcon className={style.svg} />}
  </button>
);

Auth.propTypes = {
  auth: PropTypes.bool,
};
