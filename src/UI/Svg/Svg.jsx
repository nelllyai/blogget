import style from './Svg.module.css';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

export const Svg = ({path}) => {
  console.log(path);
  const [element, setElement] = useState(null);

  useEffect(() => {
    import(path).then(res => {
      const Icon = res.ReactComponent;
      setElement(<Icon className={style.svg} />);
    });
  }, []);

  return element;
};

Svg.propTypes = {
  path: PropTypes.string,
};
