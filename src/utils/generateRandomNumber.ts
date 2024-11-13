export default function generateRandomNumber() {
  return Number(Math.random().toString().slice(2, 8));
}
