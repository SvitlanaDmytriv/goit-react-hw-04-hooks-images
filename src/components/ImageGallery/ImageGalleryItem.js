import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imagesArr, onClickImg }) => {
  return imagesArr.map(imgObj => {
    const fullImage = () => onClickImg(imgObj.largeImageURL);
    return (
      <li className={s.ImageGalleryItem} key={imgObj.id} onClick={fullImage}>
        <img src={imgObj.webformatURL} alt={imgObj.tags} className={s.Image} />
      </li>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imagesArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }),
  ),
  onClickImg: PropTypes.func.isRequired,
};
