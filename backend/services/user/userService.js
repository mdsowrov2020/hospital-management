import User from "../../models/user.model";
const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (updateData.role || updateData.email) {
    throw new Error("Cannot update role or email through this endpoint");
  }

  await user.update(updateData);

  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};

export { getUserById, updateUserProfile };
