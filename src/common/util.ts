export const classNames = (...classNames: string[]): string => {
  return classNames
    .map((className) => {
      return className;
    })
    .join(' ')
    .trim();
};
