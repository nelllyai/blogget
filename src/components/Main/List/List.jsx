import style from './List.module.css';
import Post from './Post';
import Preloader from '../../../UI/Preloader';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequest} from '../../../store/posts/postsAction';
import {Outlet, useParams} from 'react-router-dom';

export const List = () => {
  const posts = useSelector(state => state.posts.data);
  const loading = useSelector(state => state.posts.loading);

  const endList = useRef(null);
  const dispatch = useDispatch();

  const {page} = useParams();

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    dispatch(postsRequest(page));
  }, [page]);

  useEffect(() => {
    if (!endList.current) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setCount(count => count + 1);
        dispatch(postsRequest());
      }
    }, {
      rootMargin: '100px',
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      <ul className={style.list}>
        {
          posts.map(({data}) => (
            <Post key={data.id} postData={data} />
          ))
        }
        {count < 3 && <li className={style.end} ref={endList} />}
      </ul>

      <div className={style.container}>
        {
        loading ?
            <Preloader size={150} /> :
            posts.length ? <button
              onClick={() => dispatch(postsRequest())}
              className={style.btn}
            >
              Загрузить еще
            </button> : <></>
        }
      </div>
      <Outlet />
    </>
  );
};
