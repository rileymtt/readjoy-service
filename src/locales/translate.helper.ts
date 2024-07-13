import jpLocale from "./jp.locale";

export default (text: string) => {
  const check = jpLocale[text as keyof typeof jpLocale];
  if (check) return check;
  return text;
};
