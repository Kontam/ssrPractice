import { Request } from "firebase-functions";

type ParamType = "string" | "object" | "array";
export type ParamTypeMap = [string, ParamType];

export function filterValidParametors(req: Request, paramMap: ParamTypeMap[]) {
  return paramMap.filter(map => {
    const [key, type] = map;
    const param = req.query[key];
    if (!param) return true;
    if (type === "array" && typeof param === "object" && param.length !== 0) return false;
    return typeof param !== type;
  });
}
