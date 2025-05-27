export default function getTimestamp() {
  const now = new Date();
  const currentTime = now.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    hour12: true,
  });
  return currentTime;
}
