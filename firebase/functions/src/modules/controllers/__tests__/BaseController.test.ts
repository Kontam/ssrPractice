import { Request, Response } from "firebase-functions";
import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import { BaseController } from "../BaseController";

jest.mock("firebase-functions");
jest.mock("jsonwebtoken");

const VALID_TOKEN = "apikey"
const mockConfig = {
  general: {
    apikey: VALID_TOKEN
  },
};

// @ts-ignore
(functions as jest.Mock).config.mockReturnValue(mockConfig);

describe("BaseController", () => {
  let baseController = new BaseController();
  let mockReq: Request;
  let mockRes: Response;
  beforeEach(() => {
    mockRes = {} as any;
  });

  describe.each([
    ["get", baseController.get.bind(baseController)],
    ["post", baseController.post.bind(baseController)],
    ["patch", baseController.post.bind(baseController)],
    ["delete", baseController.post.bind(baseController)],
  ])("%s: APIキーが存在していない時", (_, method) => {
    beforeEach(() => {
      mockReq = {
        header: () => undefined,
      } as any;
    });

    test("APIキー不足のExceptionがthrowされる", () => {
      expect.assertions(1);
      try {
        method(mockReq, mockRes);
      } catch (e) {
        expect(e.reason).toStrictEqual("missing api key");
      }
    });
  });

  describe.each([
    ["get", baseController.get.bind(baseController)],
    ["post", baseController.post.bind(baseController)],
    ["patch", baseController.post.bind(baseController)],
    ["delete", baseController.post.bind(baseController)],
  ])("%s: 想定されたリクエストが渡された時", (_, method) => {
    beforeEach(() => {
      baseController.paramTypes.set("get", [['param1', 'string']])
      baseController.paramTypes.set("post", [['param1', 'string']])
      baseController.paramTypes.set("patch", [['param1', 'string']])
      baseController.paramTypes.set("delete", [['param1', 'string']])
      mockReq = {
        header: () => 'apikey',
        query: { param1: 'test' },
      } as any

      //@ts-ignore
      (jwt.verify as jest.Mock).mockReturnValue(VALID_TOKEN);
    });

    test("例外が発生しない", () => {
      method(mockReq, mockRes);
    });
  });

  describe.each([
    ["get", baseController.get.bind(baseController)],
    ["post", baseController.post.bind(baseController)],
    ["patch", baseController.post.bind(baseController)],
    ["delete", baseController.post.bind(baseController)],
  ])("%s: 要求getパラメーターに不足がある時", (_, method) => {
    beforeEach(() => {
      baseController.paramTypes.set("get", [['param1', 'string']])
      baseController.paramTypes.set("post", [['param1', 'string']])
      baseController.paramTypes.set("patch", [['param1', 'string']])
      baseController.paramTypes.set("delete", [['param1', 'string']])
      mockReq = {
        header: () => 'apikey',
        query: {},
      } as any

      //@ts-ignore
      (jwt.verify as jest.Mock).mockReturnValue(VALID_TOKEN);
    });

    test("パラメータ不正のExceptionがthrowされる", () => {
      expect.assertions(1);
      try {
        method(mockReq, mockRes);
      } catch (e) {
        expect(e.reason).toStrictEqual("invalid: param1");
      }
    });
  });
});
