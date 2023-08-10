import { Application } from "./appplication";
import { Db } from "./db";
import { Os } from "./os";

export interface Server{
  id: number,
  ip: string,
  name: string,
  rede: string,
  isExpand: boolean,
  apps: Application[],
  dBs: Db[],
  os: Os
}

export interface ServerAdd{
  ip: string,
  name: string,
  rede: string,
  osId: number
}

export interface Rede{
  nomeRede: string
}
