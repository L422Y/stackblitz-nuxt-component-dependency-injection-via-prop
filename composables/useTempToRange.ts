export const useTempToRange = function (input: string) {
  switch (input) {
    case 'cold':
      return { color: 'blue', value: 0 };
      break;
    case 'cool':
      return {
        color: 'lightblue',
        value: 0.25,
        labelStyles: {
          color: '#ffffff',
        },
      };
      break;
    case 'warm':
      return { color: 'yellow', value: 0.5 };
      break;
    case 'hot':
      return { color: 'orange', value: 0.75 };
      break;
    case 'overheating':
      return {
        color: 'red',
        value: 1,
        styles: {
          animation: 'fade 1s linear infinite',
        },
        labelStyles: {
          textTransform: 'uppercase',
          mixBlendMode: 'initial',
        },
      };
      break;
    default:
      return { color: '#444444', value: 1 };
      break;
  }
};
