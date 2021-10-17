import { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    const { value } = this.state;
    e.preventDefault();
    if (value.trim() === '') {
      toast('Enter a query');
      return;
    }
    this.props.onSubmit(value);
    // this.resetForm();
  };

  // resetForm = () => {
  //   this.setState({ value: '' });
  // };

  render() {
    const { handleChange, handleSubmit } = this;
    const { value } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.Button}>
            <span className={s.Label}>Search</span>
          </button>
          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
