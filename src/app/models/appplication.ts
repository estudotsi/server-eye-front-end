import { Db } from "./db";
import { Server } from "./server";

export interface Application{
  id: number,
  name: string,
  isExpand: boolean,
  server: Server
  db: Db
}
