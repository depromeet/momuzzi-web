export const exhaustiveCheck = (param: never) => {
  throw new Error(`지원하지 않는 값: ${param}`);
};
