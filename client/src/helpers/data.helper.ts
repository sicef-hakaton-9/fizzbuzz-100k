export const formatDuration = (value: number) => {
  return value > 120 ? Math.ceil(value / 60) : value;
}

export const formatDurationText = (value: number) => {
  return value > 120 ? "sati" : "minuta";
}