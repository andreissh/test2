export const getWindDirection = (deg: number): string => {
  if (deg >= 0 && deg < 22.5) return "Северный";
  if (deg >= 22.5 && deg < 67.5) return "Северо-восточный";
  if (deg >= 67.5 && deg < 112.5) return "Восточный";
  if (deg >= 112.5 && deg < 157.5) return "Юго-восточный";
  if (deg >= 157.5 && deg < 202.5) return "Южный";
  if (deg >= 202.5 && deg < 247.5) return "Юго-западный";
  if (deg >= 247.5 && deg < 292.5) return "Западный";
  if (deg >= 292.5 && deg < 337.5) return "Северо-западный";
  return "Северный";
};

export default getWindDirection;
