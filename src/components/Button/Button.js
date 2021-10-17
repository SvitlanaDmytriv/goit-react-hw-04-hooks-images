import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ handleCick }) => (
  <div>
    <button type="button" className={s.Button} onClick={handleCick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  handleCick: PropTypes.func.isRequired,
};

export default Button;
