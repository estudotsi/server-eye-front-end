 import { Server } from "../models/server";

 export interface Os{
  id: number,
  name: string,
  isExpand: boolean,
  servers: Server[]
}
