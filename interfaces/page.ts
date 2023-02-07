import { PATHS } from "@routes/paths/PATHS";
export type layouts = -1 | 0 | 1;
// 0 => unprotected
// 1 => semi protected
// 2 => protected
export type protectedLevels = 0 | 1 | 2
export type Key = keyof typeof PATHS
export interface Page {
    name: "string",
    url: "string"
    protectedLevel: protectedLevels
    layout: layouts
}