import bcrypt from "bcrypt";
import User, { UserAttributes } from "../models/User";
import Person from "../models/Person";

/**
 * Creates a new user.
 * Hashes the password before saving.
 * If there is no person with the same email, creates one associated with the user.
 * @param userData - The user data to create.
 * @returns The created user.
 */
export const createUser = async (
  userData: UserAttributes & { full_name?: string; phone?: string }
): Promise<User> => {
  try {
    if (userData.password_hash) {
      const salt = await bcrypt.genSalt(10);
      userData.password_hash = await bcrypt.hash(userData.password_hash, salt);
    }

    const newUser = await User.create(userData);

    const existingPerson = await Person.findOne({
      where: { email: newUser.email },
    });

    if (existingPerson) {
      await existingPerson.update({ user_id: newUser.user_id });
    } else {
      await Person.create({
        full_name: userData.full_name || newUser.email.split("@")[0],
        phone_number: userData.phone || null,
        email: newUser.email,
        user_id: newUser.user_id,
      });
    }

    return newUser;
  } catch (error) {
  console.error("Error creating user:", error);
  throw new Error("Could not create user.");
  }
};

/**
 * Gets all users from the database.
 * Excludes the password for security.
 * @returns An array of users.
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
    });
    return users;
  } catch (error) {
  console.error("Error getting users:", error);
  throw new Error("Could not get users.");
  }
};

/**
 * Gets a user by their ID.
 * @param userId - The user ID.
 * @returns The found user or null.
 */
export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password_hash"] },
    });
    return user;
  } catch (error) {
  console.error("Error getting user by ID:", error);
  throw new Error("Could not get user.");
  }
};

/**
 * Updates a user's data by their ID.
 * @param userId - The user ID to update.
 * @param updatedData - The new data for the user.
 * @returns The updated user or null if not found.
 */
export const updateUser = async (
  userId: number,
  updatedData: Partial<UserAttributes>
): Promise<User | null> => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }

    if (updatedData.password_hash) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password_hash = await bcrypt.hash(
        updatedData.password_hash,
        salt
      );
    }

    await user.update(updatedData);
    return user;
  } catch (error) {
  console.error("Error updating user:", error);
  throw new Error("Could not update user.");
  }
};

/**
 * Deletes a user by their ID.
 * @param userId - The user ID to delete.
 * @returns A boolean indicating if the deletion was successful.
 */
export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    const deletedRows = await User.destroy({
      where: { user_id: userId },
    });
    return deletedRows > 0;
  } catch (error) {
  console.error("Error deleting user:", error);
  throw new Error("Could not delete user.");
  }
};
