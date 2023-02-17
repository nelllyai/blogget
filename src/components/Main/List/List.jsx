import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const postsData = [
    {
      thumbnail: '',
      title: 'Title1',
      author: 'Nickname1',
      ups: 24,
      date: '2023-02-15T00:45:00.000Z',
      id: '342',
    },
    {
      thumbnail: '',
      title: 'Title2',
      author: 'Nickname2',
      ups: 77,
      date: '2023-01-15T12:45:00.000Z',
      id: '216',
    },
    {
      thumbnail: '',
      title: 'Title3',
      author: 'Nickname3',
      ups: 12,
      date: '2023-02-16T11:00:00.000Z',
      id: '783',
    },
    {
      thumbnail: '',
      title: 'Title4',
      author: 'Nickname4',
      ups: 65,
      date: '2023-01-03T06:05:00.000Z',
      id: '796',
    },
  ];

  return (
    <ul className={style.list}>
      {
        postsData.map(postData => (
          <Post key={postData.id} postData={postData} />
        ))
      }
    </ul>
  );
};
