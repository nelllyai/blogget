import style from './List.module.css';
import Post from './Post';
import Preloader from '../../../UI/Preloader';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {Outlet, useParams} from 'react-router-dom';

export const List = () => {
  const [counter, setCounter] = useState(0);
  const posts = useSelector(state => state.posts.data);
  const loading = useSelector(state => state.posts.loading);

  const endList = useRef(null);
  const dispatch = useDispatch();

  const {page} = useParams();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '100px',
    });

    observer.observe(endList.current);
    setCounter(prev => prev + 1);

    if (counter >= 2) {
      observer.unobserve(endList.current);
    }

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
          loading && !counter ? (
            <Preloader size={150} />
          ) : (
            posts.map(({data}) => (
              <Post key={data.id} postData={data} />
            ))
          )
        }
        <li className={style.end} ref={endList} />
      </ul>
      <Outlet />
    </>
  );
};
