export const SearchForm = ({ value, onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
                <input value={value} onChange={onChange} className="search__input" />
                <button type="submit" className="search__button">Search</button>
        </form>
    )
};
