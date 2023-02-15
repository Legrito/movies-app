import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Loader from 'react-loader-spinner';

export const MovieLoader = () => {
  return (
    <div className="Loader">
      <Loader
        type="Rings"
        color="#24a9a9"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};
