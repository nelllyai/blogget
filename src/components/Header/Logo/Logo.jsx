import style from './Logo.module.css';
import logo from './img/logo.svg';
import {useNavigate} from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <button className={style.link} onClick={() => navigate('/')}>
      <img className={style.logo} src={logo} alt="Логотип Blogget" />
    </button>
  );
};
