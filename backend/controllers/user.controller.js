import { User } from "../models/index.js";
import {
  getUserById,
  updateUserProfile,
} from "../services/user/userService.js";

export const createUser = async (req, response) => {
  try {
    const user = await User.create(req.body);
    response.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await updateUserProfile(req.user.id, req.body);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
};
