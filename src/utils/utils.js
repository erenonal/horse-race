export const horseNames = [
  'Thunder',
  'Lightning',
  'Storm',
  'Blaze',
  'Shadow',
  'Spirit',
  'Majesty',
  'Comet',
  'Rocket',
  'Flash',
  'Duke',
  'Ace',
  'King',
  'Prince',
  'Knight',
  'Ranger',
  'Scout',
  'Hunter',
  'Champion',
  'Hero',
];

export const horseColors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#FF8C33',
  '#33FFF5',
  '#8C33FF',
  '#FF3333',
  '#BBDD8C',
  '#AA5711',
  '#FF33FF',
  '#33FF33',
  '#5733FF',
  '#33A1FF',
  '#8CFF33',
  '#FF338C',
  '#BBAAFF',
  '#BB9933',
  '#33AA57',
  '#AA5733',
];

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
