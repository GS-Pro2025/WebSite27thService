import { UserRole } from "../enums/enums";

export const permissions: { [key: string]: UserRole[] } = {
  "GET /api/moves": [UserRole.ADMIN],
  "POST /api/moves": [UserRole.ADMIN, UserRole.USER],
  "PUT /api/moves/:id": [UserRole.ADMIN],
  "DELETE /api/moves/:id": [UserRole.ADMIN],
  "POST /api/persons": [UserRole.ADMIN, UserRole.USER]
};
