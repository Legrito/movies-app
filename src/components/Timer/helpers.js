const pad = (value) => {
  return String(value).padStart(2, '0');
};

// const padDays = (value) => {
//   return String(value).padStart(3, '0');
// };

const getTimeComponents = (time) => {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
};

export const timeCounter = (popularMovie) => {
  const targetTime = new Date(popularMovie.release_date).getTime();
  const currentTime = Date.now();
  const deltaTime = targetTime - currentTime;
  return getTimeComponents(deltaTime);
};
