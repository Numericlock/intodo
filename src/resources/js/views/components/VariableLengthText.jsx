const halfCharMap = {
  '0': 0.61,
  '1': 0.44,
  '2': 0.57,
  '3': 0.59,
  '4': 0.6,
  '5': 0.59,
  '6': 0.62,
  '7': 0.55,
  '8': 0.6,
  '9': 0.62,
  '!': 0.27,
  '"': 0.4,
  '#': 0.6,
  $: 0.6,
  '%': 0.81,
  '&': 0.67,
  "'": 0.25,
  '(': 0.32,
  ')': 0.32,
  '*': 0.4,
  '+': 0.6,
  ',': 0.21,
  '-': 0.43,
  '.': 0.21,
  '/': 0.28,
  ':': 0.21,
  ';': 0.21,
  '<': 0.6,
  '=': 0.6,
  '>': 0.6,
  '?': 0.49,
  '@': 0.87,
  A: 0.64,
  B: 0.6,
  C: 0.69,
  D: 0.68,
  E: 0.55,
  F: 0.53,
  G: 0.71,
  H: 0.7,
  I: 0.22,
  J: 0.5,
  K: 0.6,
  L: 0.52,
  M: 0.83,
  N: 0.7,
  O: 0.73,
  P: 0.58,
  Q: 0.73,
  R: 0.6,
  S: 0.59,
  T: 0.58,
  U: 0.7,
  V: 0.63,
  W: 0.92,
  X: 0.63,
  Y: 0.61,
  Z: 0.62,
  '[': 0.32,
  '\\': 0.28,
  ']': 0.32,
  '^': 0.6,
  '`': 0.5,
  a: 0.5,
  b: 0.55,
  c: 0.5,
  d: 0.55,
  e: 0.51,
  f: 0.3,
  g: 0.55,
  i: 0.21,
  j: 0.21,
  k: 0.49,
  l: 0.2,
  m: 0.8,
  n: 0.53,
  o: 0.53,
  p: 0.55,
  q: 0.55,
  r: 0.31,
  s: 0.47,
  t: 0.3,
  u: 0.53,
  v: 0.48,
  w: 0.72,
  x: 0.47,
  y: 0.49,
  z: 0.47,
  '{': 0.32,
  '|': 0.22,
  '}': 0.32,
  '~': 0.6,
  _: 0.53,
}

const textCountByByte = (str) => {
  let count = 0;
  console.log(str);
  if (str) {
    for (let i = 0; i < 4; i++) {
      const halfChar = Object.keys(halfCharMap).find((e) => e === str[i]);

      if (halfChar) {
        count += halfCharMap[halfChar];
      } else {
        count += 1;
      }
    }
  }

  return count
}

const VariableLengthText = (props) => {
  console.log(props);
  return (
    <>
      <p style={{fontSize: `clamp(48px, ${100 / textCountByByte(props.text) / 2}vw, 56px)`}}>{props.text}</p>
    </>
  );
};

export default VariableLengthText;
