export default async () => {
  const result = await fetch(`https://picsum.photos/200/300`);
  const { url } = result;
  return url;
};
