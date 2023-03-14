export const useHuggableToRange = function (input: string) {
  switch (input) {
    case 'snake':
      return { color: 'red', value: 0 };
      break;
    case 'cat':
      return {
        color: 'orange',
        value: 0.25,
        labelStyles: {
          color: '#ffffff',
        },
      };
      break;
    case 'dog':
      return { color: 'yellow', value: 0.7 };
      break;
    case 'friend':
      return { color: 'lime', value: 0.95 };
      break;
    default:
      return { color: '#444444', value: 1 };
      break;
  }
};
