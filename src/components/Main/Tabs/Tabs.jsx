import style from './Tabs.module.css';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {assignId} from '../../../utils/generateRandomId';
import {debounceRaf} from '../../../utils/debounce';

import {Text} from '../../../UI/Text';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';

const LIST = [
  {
    value: 'Главная',
    Icon: HomeIcon,
  },
  {
    value: 'Топ',
    Icon: TopIcon,
  },
  {
    value: 'Лучшие',
    Icon: BestIcon,
  },
  {
    value: 'Горячие',
    Icon: HotIcon,
  },
].map(assignId);

export const Tabs = () => {
  const [dropDownTitle, setDropDownTitle] = useState('Меню');
  const [isDropDownOpen, setIsDrowDownOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(true);

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropDown(true);
    } else {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropDown &&
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDrowDownOpen(!isDropDownOpen)}
          >
            <Text
              size={14}
              tsize={16}
              bold
            >
              {dropDownTitle}
            </Text>
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      }

      {(isDropDownOpen || !isDropDown) &&
        <ul className={style.list} onClick={() => setIsDrowDownOpen(false)}>
          {LIST.map(({value, id, Icon}) => (
            <li
              className={style.item}
              key={id}
            >
              <button
                className={style.btn}
                onClick={() => setDropDownTitle(value)}
              >
                <Text
                  size={14}
                  tsize={16}
                  medium
                >
                  {value}
                </Text>
                {Icon && <Icon width={30} height={30} />}
              </button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
};
