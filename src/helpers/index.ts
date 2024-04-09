export function formatTemperature(temperature: number): number {
  // A la temperatura le restamos los grados Kelvin para convertirla a grados Celsius
  return Math.round(temperature - 273.15);
}
