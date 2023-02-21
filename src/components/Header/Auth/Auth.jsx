import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState, useContext} from 'react';
import {tokenContext} from '../../../context/tokenContext';
import {authContext} from '../../../context/authContext';

export const Auth = () => {
  const {delToken} = useContext(tokenContext);
  const [showButton, setShowButton] = useState(false);
  const {auth, clearAuth} = useContext(authContext);

  return (
    <div className={style.container}>
      {auth.name ? (
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
                  delToken();
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
