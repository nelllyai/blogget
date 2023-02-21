import {useContext} from 'react';
import {postsContext} from '../../../context/postsContext';
import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const {posts} = useContext(postsContext);

  return (
    <ul className={style.list}>
      {
        posts.map(postData => (
          <Post key={postData.id} postData={postData} />
        ))
      }
    </ul>
  );
};
