import { App } from "./app";
import { Os } from "./os";

export interface Server{
  id: number,
  ip: string,
  name: string,
  isExpand: boolean,
  apps: App[],
  os: Os
}
