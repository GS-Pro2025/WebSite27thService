import Person, { PersonAttributes } from "../models/Person";

/**
 * Create a new person
 * @param data - The data of the person to create
 * @returns The created person
 */
/**
 * Create or find a person by email
 * @param data - The data of the person to create or update
 * @returns The existing or newly created person
 */
export const createOrFindPerson = async (
  data: PersonAttributes
): Promise<Person> => {
  try {
    let person = await Person.findOne({ where: { email: data.email } });

    if (person) {
      await person.update({
        full_name: data.full_name,
        phone_number: data.phone_number,
        additional_info: data.additional_info,
        address: data.address,
      });
      return person;
    }

    // Si no existe, la creamos
    const newPerson = await Person.create(data);
    return newPerson;
  } catch (error) {
    console.error("Error creating or finding person:", error);
    throw new Error("Could not create or find person.");
  }
};

/**
 * Get all persons.
 * @returns List of persons
 */
export const getAllPersons = async (): Promise<Person[]> => {
  try {
    return await Person.findAll({ include: ["userAccount"] });
  } catch (error) {
    console.error("Error getting persons:", error);
    throw new Error("Could not get persons.");
  }
};

/**
 * Get person by ID.
 * @param id - The ID of the person to get
 * @returns The found person or null
 */
export const getPersonById = async (id: number): Promise<Person | null> => {
  try {
    return await Person.findByPk(id, { include: ["userAccount"] });
  } catch (error) {
    console.error("Error getting person:", error);
    throw new Error("Could not get person.");
  }
};

/**
 * Update person.
 * @param id - The ID of the person to update
 * @param updatedData - The new data for the person
 * @returns The updated person or null
 */
export const updatePerson = async (
  id: number,
  updatedData: Partial<PersonAttributes>
): Promise<Person | null> => {
  try {
    const person = await Person.findByPk(id);
    if (!person) return null;
    await person.update(updatedData);
    return person;
  } catch (error) {
    console.error("Error updating person:", error);
    throw new Error("Could not update person.");
  }
};

/**
 * Delete person.
 * @param id - The ID of the person to delete
 * @returns true if the person was deleted, false if not found
 */
export const deletePerson = async (id: number): Promise<boolean> => {
  try {
    const deletedRows = await Person.destroy({ where: { person_id: id } });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw new Error("Could not delete person.");
  }
};
