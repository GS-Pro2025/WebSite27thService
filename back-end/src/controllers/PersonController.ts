import { Request, Response } from "express";
import {
  createOrFindPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
} from "../services/PersonService";

export const handleCreatePerson = async (req: Request, res: Response) => {
  try {
    const person = await createOrFindPerson(req.body);
    res.status(201).json(person);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllPersons = async (req: Request, res: Response) => {
  try {
    const persons = await getAllPersons();
    res.status(200).json(persons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetPersonById = async (req: Request, res: Response) => {
  try {
    const personId = parseInt(req.params.id);
    if (isNaN(personId)) {
      return res.status(400).json({ message: "Invalid ID." });
    }
    const person = await getPersonById(personId);
    if (!person) {
      return res.status(404).json({ message: "Person not found." });
    }
    res.status(200).json(person);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdatePerson = async (req: Request, res: Response) => {
  try {
    const personId = parseInt(req.params.id);
    const updated = await updatePerson(personId, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Person not found." });
    }
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeletePerson = async (req: Request, res: Response) => {
  try {
    const personId = parseInt(req.params.id);
    const deleted = await deletePerson(personId);
    if (!deleted) {
      return res.status(404).json({ message: "Person not found." });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
