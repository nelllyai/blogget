import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState} from 'react';
import {useAuth} from '../../../Hooks/useAuth';

export const Auth = ({token, delToken}) => {
  const [auth, clearAuth] = useAuth(token);
  const [showButton, setShowButton] = useState(false);

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

Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func,
};
