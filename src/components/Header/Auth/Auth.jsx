import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store/tokenReducer';
import {useAuth} from '../../../Hooks/useAuth';
import Preloader from '../../../UI/Preloader';

export const Auth = () => {
  const [showButton, setShowButton] = useState(false);
  const [auth, loading, clearAuth] = useAuth();
  const dispatch = useDispatch();

  return (
    <div className={style.container}>
      {loading ? (
        <Preloader />
      ) : auth.name ? (
        <>
          <button
            className={style.btn}
            onClick={() => setShowButton(!showButton)}
          >
            <img
              className={style.img}
              src={auth.img}
              title={auth.name}
              alt={`Аватар ${auth.name}`}
            />
          </button>

          {
            showButton && (
              <button
                className={style.logout}
                onClick={() => {
                  dispatch(deleteToken());
                  clearAuth();
                }}
              >
                Выйти
              </button>
            )
          }
        </>
      ) : (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>);
};
