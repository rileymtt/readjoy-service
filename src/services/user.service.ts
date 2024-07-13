import profileModel from "models/profile.model";
import userModel from "models/user.model";
import { UserRedis } from "redis/directional";
import { UserService } from "services";

export const findOneByEmail = async (email: string) => {
  const check = await userModel.findOneByEmail(email);
  return check;
};

export const findProfile = async (userId: number) => {
  const user = await userModel.findProfile(userId);
  return user;
};

export const createUser = async (
  email: string,
  password: string,
  type: number = 0,
  ref?: number
) => {
  const resultAddUser = await userModel.createWithEmail(
    email,
    password,
    type,
    ref
  );
  const resultAddProfile = await profileModel.create(resultAddUser.insertId);
  return resultAddProfile;
};

export async function syncUser(userId: number) {
  let data;
  const [result] = await Promise.all([findProfile(userId)]);
  data = {
    ...result,
  };
  UserRedis.set(String(userId), JSON.stringify(data));
  return data;
}

export const getUser = async (userId: number) => {
  let data;
  const store = await UserRedis.get(String(userId));
  if (store) {
    data = JSON.parse(store);
  } else {
    data = await syncUser(userId);
  }
  return data && data.status ? data : null;
};

export const updateRef = async (userId: number, ref: number) => {
  const result = await userModel.update(userId, { ref });
  UserService.syncUser(ref);
  return result;
};

export const updateAccount = async (
  userId: number,
  email: string,
  password: string
) => {
  const result = await userModel.update(userId, { email, password });
  return result;
};

export const disableAccount = async (userId: number) => {
  const result = await userModel.update(userId, { status: 0 });
  UserRedis.del(userId);
  return result;
};
