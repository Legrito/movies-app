const SearchForm = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} id={value}>
      <input value={value} onChange={onChange} className="search__input" placeholder="Enter movie title here" />
      <button type="submit" className="search__button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
