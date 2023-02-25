import style from './StartPage.module.css';
import {Text} from '../../../UI/Text';

export const StartPage = () => (
  <div className={style.container}>
    <Text As='h2' size={22} tsize={26} center className={style.space}>
      Стартовая страница
    </Text>
    <Text As='p' size={20} tsize={22} center className={style.space}>
      Добро пожаловать!
    </Text>
    <Text As='p' size={14} tsize={16} center>
      Выберите категорию
    </Text>
  </div>
);
