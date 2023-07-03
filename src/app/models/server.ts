import { Application } from "./appplication";
import { Os } from "./os";

export interface Server{
  id: number,
  ip: string,
  name: string,
  isExpand: boolean,
  apps: Application[],
  os: Os
}
