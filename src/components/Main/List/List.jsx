import style from './List.module.css';
import {usePosts} from '../../../Hooks/usePosts';
import Post from './Post';
import Preloader from '../../../UI/Preloader';

export const List = () => {
  const [posts, loading] = usePosts();

  return (
      loading ? (
        <Preloader size={150} />
      ) : (
        <ul className={style.list}>
          {
            posts.map(({data}) => (
              <Post key={data.id} postData={data} />
            ))
          }
        </ul>
      )
  );
};
