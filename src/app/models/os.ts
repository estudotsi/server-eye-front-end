 import { Server } from "../models/server";

 export interface Os{
  id: number,
  name: string,
  servers: Server[]
}
