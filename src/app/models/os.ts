 import { Server } from "../models/server";

 export interface Os{
  id: number,
  name: string,
  imageUrl: string,
  isExpand: boolean,
  servers: Server[]
}
