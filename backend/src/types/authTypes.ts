import { Player } from "@prisma/client"

export type authData = Omit<Player, "id">;