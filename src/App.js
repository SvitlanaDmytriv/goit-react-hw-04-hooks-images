import { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem';
import fetchImg from './API';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!value) return;
    setIsLoading(true);
    setShowMessage(false);

    fetchImg(value, page)
      .then(data => {
        if (data.data.hits.length === 0) {
          this.setState({ images: [], showMessage: true });
        }
        setImages(prevImg => [...prevImg, ...data.data.hits]);
      })
      .catch(err => setShowMessage(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [value, page]);

  const onClickBtn = () => {
    setPage(prevPage => prevPage + 1);

    scrollOnLoadButton();
  };

  const handleFormSubmit = valueInput => {
    setImages([]);
    setValue(valueInput);
    setPage(1);
  };

  const handleGalleryItem = fullImageUrl => {
    setLargeImage(fullImageUrl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const scrollOnLoadButton = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 130,
        behavior: 'smooth',
      });
    }, 500);
  };

  const showButton = images.length > 0 && images.length >= 12;

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {showMessage ? (
        <h2 className="text">
          Nothing was found for your query. Try another query!
        </h2>
      ) : (
        <ImageGallery>
          <ImageGalleryItem imagesArr={images} onClickImg={handleGalleryItem} />
        </ImageGallery>
      )}
      <div className="containerBtn">
        {showButton && <Button handleCick={onClickBtn} />}
      </div>
      {showModal && (
        <Modal toggleModall={toggleModal} largeImage={largeImage} />
      )}
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}
// class App extends Component {
//   state = {
//     images: [],
//     value: '',
//     showModal: false,
//     largeImage: '',
//     isLoading: false,
//     page: 1,
//     showMessage: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.page !== 2) {
//       this.scrollOnLoadButton();
//     }
//     if (prevState.value !== this.state.value) {
//       this.fetchData();
//     }
//   }

//   fetchData = () => {
//     this.setState({ isLoading: true, showMessage: false });

//     const { value, page } = this.state;
//     fetchImg(value, page)
//       .then(data => {
//         if (data.data.hits.length === 0) {
//           this.setState({ images: [], showMessage: true });
//         }
//         this.setState(prevState => ({
//           images: [...prevState.images, ...data.data.hits],
//           page: prevState.page + 1,
//         }));
//       })
//       .catch(err => this.setState({ showMessage: true }))
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   handleGalleryItem = fullImageUrl => {
//     this.setState({
//       largeImage: fullImageUrl,
//     });
//     this.toggleModal();
//   };

//   handleFormSubmit = valueInput => {
//     this.setState({ images: [], value: valueInput, page: 1 });
//   };

//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   scrollOnLoadButton = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { handleFormSubmit, toggleModal, handleGalleryItem, fetchData } =
//       this;
//     const { images, showModal, largeImage, isLoading, showMessage } =
//       this.state;
//     const showButton = images.length > 0 && images.length >= 12;
//     return (
//       <>
//         <Searchbar onSubmit={handleFormSubmit} />
//         {showMessage ? (
//           <h2 className="text">
//             Nothing was found for your query. Try another query!
//           </h2>
//         ) : (
//           <ImageGallery>
//             <ImageGalleryItem
//               imagesArr={images}
//               onClickImg={handleGalleryItem}
//             />
//           </ImageGallery>
//         )}
//         <div className="containerBtn">
//           {showButton && <Button handleCick={fetchData} />}
//         </div>
//         {showModal && (
//           <Modal toggleModall={toggleModal} largeImage={largeImage} />
//         )}
//         {isLoading && <Loader />}
//         <ToastContainer />
//       </>
//     );
//   }
// }

export default App;
