import { Component } from 'react';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handlerInput = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const {value} = this.state
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handlerSubmit}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handlerInput}
            className={styles.searchFormInput}
            type="text"
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
