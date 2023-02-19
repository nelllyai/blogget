import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useEffect, useState} from 'react';
import {URL_API} from '../../../api/const';

export const Auth = ({token, delToken}) => {
  const [auth, setAuth] = useState({});
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!token) return;


    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch((err) => {
        if (err.message === '401') {
          delToken();
        }

        setAuth({});
        console.error(err);
      });
  }, [token]);

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
                  setAuth({});
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
