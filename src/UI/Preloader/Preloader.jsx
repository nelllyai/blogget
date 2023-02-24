import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

export const Preloader = ({size = 30}) => (
  <ClipLoader
    color='#cc6633'
    css={{display: 'block'}}
    size={size}
  />
);

Preloader.propTypes = {
  size: PropTypes.number,
};
