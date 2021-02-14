import { Request } from "firebase-functions";

type ParamType = "string" | "object" | "array";
export type ParamTypeMap = [string, ParamType];

export function filterValidParametors(params: Request["query"] | Request["body"], paramMap: ParamTypeMap[]) {
  return paramMap.filter(map => {
    const [key, type] = map;
    const param = params[key];
    if (!param) return true;
    if (type === "array" && typeof param === "object" && param.length !== 0) return false;
    return typeof param !== type;
  });
}
