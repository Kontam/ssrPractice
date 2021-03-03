import assert from "assert";
import { ParamTypeMap, filterValidParametors } from "../filterValidParametors";

describe("filterValidParametors", () => {
  let mockParams: any;
  let typeMap: ParamTypeMap[];
  let result: ParamTypeMap[];
  describe("パラメーターが存在する時", () => {
    beforeEach(() => {
      mockParams = {
          id: "0001",
          info: {
            name: "john"
          },
          tags: ["sports", "videos"]
      };
      typeMap = [
        ["id", "string"],
        ["info", "object"],
        ["tags", "array"]
      ];
      result = filterValidParametors(mockParams, typeMap);
    });

    test("invalidなパラメーターは0になる(空配列が返される）", () => {
      assert.deepStrictEqual(result, []);
    });
  });

  describe("型が違うパラメーターが含まれている時", () => {
    beforeEach(() => {
      mockParams = {
          id: "0001",
          info: 1,
          tags: "not array"
      };
      typeMap = [
        ["id", "string"],
        ["info", "object"],
        ["tags", "array"]
      ];
      result = filterValidParametors(mockParams, typeMap);
    });
    test("infoが結果に含まれている", () => {
      assert.ok(result.includes(typeMap[1]));
    });
    test("tagsが結果に含まれている", () => {
      assert.ok(result.includes(typeMap[2]));
    });
  });

  describe("期待するパラメーターが存在しない時", () => {
    beforeEach(() => {
      mockParams = {
          info: {
            name: "john"
          },
          tags: ["sports", "videos"]
      };
      typeMap = [
        ["id", "string"],
        ["info", "object"],
        ["tags", "array"]
      ];
      result = filterValidParametors(mockParams, typeMap);
    });
    test("idが結果に含まれている", () => {
      assert.ok(result.includes(typeMap[0]));
    });
  });
});
