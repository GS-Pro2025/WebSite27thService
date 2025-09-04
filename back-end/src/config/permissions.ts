import { UserRole } from "../enums/enums";

export const permissions: { [key: string]: UserRole[] } = {
"GET /api/moves/my-moves": [UserRole.ADMIN, UserRole.USER],
"GET /api/moves/:id": [UserRole.ADMIN, UserRole.USER]

};
