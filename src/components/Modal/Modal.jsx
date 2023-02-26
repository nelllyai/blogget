import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef, useState} from 'react';
import {useComments} from '../../Hooks/useComments';
import Comments from './Comments';
import FormComment from './FormComment';
import {Text} from '../../UI/Text';
import {useNavigate, useParams} from 'react-router-dom';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const [post, comments, status] = useComments(id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const overlayRef = useRef(null);

  const handleClick = e => {
    const target = e.target;

    if (target === overlayRef.current) {
      navigate(`/category/${page}`);
    }
  };

  const handleKeydown = e => {
    if (e.keyCode === 27) {
      navigate(`/category/${page}`);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && 'Загрузка...'}
        {status === 'error' && 'Произошла ошибка!'}
        {status === 'loaded' && (
          <>
            <Text As='h2' className={style.title}>
              {post.title}
            </Text>

            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    },
                  },
                },
              }}>
                {post.selftext}
              </Markdown>
            </div>

            <Text As='p' className={style.author}>
              {post.author}
            </Text>

            <button
              onClick={() => setIsFormOpen(true)}>
              Написать комментарий
            </button>

            {
              isFormOpen && <FormComment />
            }

            <Comments comments={comments} />

            <button
              className={style.close}
              onClick={() => navigate(`/category/${page}`)}
            >
              <CloseIcon />
            </button>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
