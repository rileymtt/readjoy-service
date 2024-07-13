export async function get(key: string) {
  const result = await RedisClient.get("User", key);
  return JSON.parse(result);
}

export async function set(key: string, value: any) {
  RedisClient.set("User", key, JSON.stringify(value));
}

export async function del(key?: number | null) {
  if (!key) return;
  RedisClient.del("User", key.toString());
}

export async function getAll() {
  const result = await RedisClient.getAll("User");
  return result;
}
