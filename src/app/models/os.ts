 import { Server } from "../models/server";

 export interface Os{
  id: number,
  name: string,
  imagemURL: string,
  isExpand: boolean,
  servers: Server[]
}
