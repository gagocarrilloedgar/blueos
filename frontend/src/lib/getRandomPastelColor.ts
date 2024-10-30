export function getRandomPastelColor() {
  const pastelColors = [
    "bg-blue-100",
    "bg-blue-200",
    "bg-green-100",
    "bg-green-200",
    "bg-red-100",
    "bg-red-200",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-purple-100",
    "bg-purple-200",
    "bg-pink-100",
    "bg-pink-200",
    "bg-teal-100",
    "bg-teal-200",
    "bg-indigo-100",
    "bg-indigo-200"
  ];

  const randomIndex = Math.floor(Math.random() * pastelColors.length);

  return pastelColors[randomIndex];
}
