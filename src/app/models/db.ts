import { Server } from "./server";

export interface Db{
  id: number,
  name: string,
  ip: string,
  isExpand: boolean,
  server: Server
}
