import bcrypt from "bcrypt";
import User, { UserAttributes } from "../models/User";

/**
 * Crea un nuevo usuario.
 * Hashea la contraseña antes de guardarla.
 * @param userData - Los datos del usuario a crear.
 * @returns El usuario creado.
 */
export const createUser = async (userData: UserAttributes): Promise<User> => {
  try {
    if (userData.password_hash) {
      const salt = await bcrypt.genSalt(10);
      userData.password_hash = await bcrypt.hash(userData.password_hash, salt);
    }
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("No se pudo crear el usuario.");
  }
};

/**
 * Obtiene todos los usuarios de la base de datos.
 * Excluye la contraseña por seguridad.
 * @returns Un arreglo de usuarios.
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
    });
    return users;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw new Error("No se pudieron obtener los usuarios.");
  }
};

/**
 * Obtiene un usuario por su ID.
 * @param userId - El ID del usuario.
 * @returns El usuario encontrado o null.
 */
export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password_hash"] },
    });
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    throw new Error("No se pudo obtener el usuario.");
  }
};

/**
 * Actualiza los datos de un usuario por su ID.
 * @param userId - El ID del usuario a actualizar.
 * @param updatedData - Los nuevos datos para el usuario.
 * @returns El usuario actualizado o null si no se encontró.
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
    console.error("Error al actualizar el usuario:", error);
    throw new Error("No se pudo actualizar el usuario.");
  }
};

/**
 * Elimina un usuario por su ID.
 * @param userId - El ID del usuario a eliminar.
 * @returns Un booleano indicando si la eliminación fue exitosa.
 */
export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    const deletedRows = await User.destroy({
      where: { user_id: userId },
    });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error("No se pudo eliminar el usuario.");
  }
};
