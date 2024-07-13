import profileModel from "models/profile.model";

export async function updateAvatar(userId: number, imageUrl: string) {
  const result = await profileModel.update(userId, {
    profilePicture: imageUrl,
  });
  return result;
}

export async function updateCoverPicture(userId: number, imageUrl: string) {
  const result = await profileModel.update(userId, { coverPicture: imageUrl });
  return result;
}
