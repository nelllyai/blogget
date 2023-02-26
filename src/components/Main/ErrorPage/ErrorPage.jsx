import style from './ErrorPage.module.css';
import {Text} from '../../../UI/Text';
import sadEmoji from './img/sad-emoji.png';

export const ErrorPage = () => (
  <div className={style.container}>
    <img src={sadEmoji} className={style.icon} />
    <Text As='h2' size={22} tsize={26} color='orange' center>
      Упс, ошибка 404...
    </Text>
    <Text As='h2' size={22} tsize={26} color='orange' center>
      Вы зашли куда-то не туда :(
    </Text>
  </div>
);
