export const getInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("");
};
