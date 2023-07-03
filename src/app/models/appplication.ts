import { Server } from "./server";

export interface Application{
  id: number,
  nome: string,
  isExpand: boolean,
  server: Server
}
