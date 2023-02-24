import style from './List.module.css';
import Post from './Post';
import Preloader from '../../../UI/Preloader';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/postsAction';

export const List = () => {
  const posts = useSelector(state => state.posts.data);
  const loading = useSelector(state => state.posts.loading);
  const after = useSelector(state => state.comments.after);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '100px',
    });

    console.log(endList.current);
    observer.observe(endList.current);
  }, [endList.current]);

  return (
    <ul className={style.list}>
      {
        loading && after ? (
          <Preloader size={150} />
        ) : (
          posts.map(({data}) => (
            <Post key={data.id} postData={data} />
          ))
        )
      }
      <li className={style.end} ref={endList} />
    </ul>
  );
};
