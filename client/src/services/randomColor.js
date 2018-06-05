import colors from './colors';

export default () => {
  const choice = Math.floor(Math.random() * colors.length);
  return colors[choice];
};
