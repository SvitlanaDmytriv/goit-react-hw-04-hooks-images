import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

function Modal({ largeImage, toggleModall }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleEscape = e => {
    if (e.code === 'Escape') {
      toggleModall();
    }
  };

  const handleClose = e => {
    if (e.currentTarget === e.target) {
      toggleModall();
    }
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleClose}>
      <div className={s.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>,
    document.querySelector('#modalRoot'),
  );
}
// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscape);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEscape);
//   }

//   handleEscape = e => {
//     if (e.code === 'Escape') {
//       this.props.toggleModall();
//     }
//   };

//   handleClose = e => {
//     if (e.currentTarget === e.target) {
//       this.props.toggleModall();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleClose}>
//         <div className={s.Modal}>
//           <img src={this.props.largeImage} alt="" />
//         </div>
//       </div>,
//       document.querySelector('#modalRoot'),
//     );
//   }
// }

export default Modal;
