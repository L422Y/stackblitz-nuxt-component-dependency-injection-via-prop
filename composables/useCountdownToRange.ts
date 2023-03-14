export const useCountdownToRange = function (input: Date) {
  const now = new Date();
  const secondsRemaining = (input.getTime() - now.getTime()) / 1000;
  const hoursRemaining = secondsRemaining / 60 / 60;

  const numHours = secondsRemaining / 3600;
  const hours = Math.floor(numHours).toString();
  const minutes = Math.floor((secondsRemaining % 3600) / 60).toString();
  const seconds = Math.floor(secondsRemaining % 60).toString();

  let color = '#666666';
  let timeOfDay = '';
  let hour = 24 - numHours;
  switch (true) {
    case hour > 6 && hour < 12: // morning
      timeOfDay = 'morning';
      color = 'apricot';
      break;
    case hour > 12 && hour < 13: // noon
      timeOfDay = 'afternoon';
      color = 'yellow';
      break;
    case hour > 13 && hour < 16: // afternoon
      timeOfDay = 'afternoon';
      color = 'orange';
      break;
    case hour > 16 || hour < 20: // evening
      timeOfDay = 'evening';
      color = 'gold';
      break;
    default:
      timeOfDay = 'night';
      color = '#444444';
      break;
  }
  return {
    color,
    value: hoursRemaining / 24,
    text: `good ${timeOfDay} - ${hours}h${minutes}m${seconds}s`,
  };
};
