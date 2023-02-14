export const LoadMore = ({ onClick, isDisabled }) => {
  if (isDisabled) {
    return null;
  }

  return (
    <button type="button" className="load__button" onClick={onClick}>
      See more
    </button>
  );
};
