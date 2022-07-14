// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random#erzeugt_eine_zufallszahl_zwischen_zwei_zahlen
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
