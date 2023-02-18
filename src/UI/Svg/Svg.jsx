// import style from './Svg.module.css';
import PropTypes from 'prop-types';

export const Svg = ({name}) => {
  let directory = '';

  if (name.includes('--')) {
    const parts = name.split('--');
    directory = `${parts[0]}/`;
    name = parts[1];
  }

  let icon = require(`../../assets/icons/${directory}${name}.svg?sprite`);

  if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
    icon = icon.default;
  }

  icon.href = `#${icon.id}`;

  return icon;
};

Svg.propTypes = {
  path: PropTypes.string,
};
