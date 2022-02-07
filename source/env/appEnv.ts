export { getSharedAppEnv } from "./core/singleton";

export type AppEnvMapper = <T extends { [key: string]: any }>(template: T) => T;
