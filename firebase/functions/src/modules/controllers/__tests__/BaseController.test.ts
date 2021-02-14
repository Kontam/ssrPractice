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
  let mockReq: Request;
  let mockRes: Response;
  beforeEach(() => {
    mockRes = {} as any;
  });

  describe("APIKey 異常系", () => {
    let baseController = new BaseController();
    describe.each([
      ["get", baseController.get.bind(baseController)],
      ["post", baseController.post.bind(baseController)],
      ["patch", baseController.patch.bind(baseController)],
      ["delete", baseController.delete.bind(baseController)],
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
  });

  describe("Queryチェック 正常系", () => {
    let baseController = new BaseController();
    describe.each([
      ["get", baseController.get.bind(baseController)],
      ["post", baseController.post.bind(baseController)],
      ["patch", baseController.patch.bind(baseController)],
      ["delete", baseController.delete.bind(baseController)],
    ])("%s: 想定されたリクエストが渡された時", (_, method) => {
      beforeEach(() => {
        baseController.paramTypes.set("get", [['param1', 'string']])
        baseController.paramTypes.set("post", [['param1', 'string']])
        baseController.paramTypes.set("patch", [['param1', 'string']])
        baseController.paramTypes.set("delete", [['param1', 'string']])
        baseController.bodyTypes.set("post", [['body1', 'string']])
        baseController.bodyTypes.set("patch", [['body1', 'string']])
        mockReq = {
          header: () => 'apikey',
          query: { param1: 'test' },
          body: { body1: 'body' }
        } as any

        //@ts-ignore
        (jwt.verify as jest.Mock).mockReturnValue(VALID_TOKEN);
      });

      test("例外が発生しない", () => {
        method(mockReq, mockRes);
      });
    });
  });

  describe("Queryチェック 異常系", () => {
    let baseController = new BaseController();
    describe.each([
      ["get", baseController.get.bind(baseController)],
      ["post", baseController.post.bind(baseController)],
      ["patch", baseController.patch.bind(baseController)],
      ["delete", baseController.delete.bind(baseController)],
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

  describe("Bodyチェック 異常系", () => {
    let baseController = new BaseController();
    describe.each([
      ["post", baseController.post.bind(baseController)],
      ["patch", baseController.patch.bind(baseController)],
    ])("%s: 要求bodyパラメーターに不足がある時", (_, method) => {
      beforeEach(() => {
        baseController.bodyTypes.set("post", [['body1', 'string']])
        baseController.bodyTypes.set("patch", [['body1', 'string']])
        mockReq = {
          header: () => 'apikey',
          query: {},
          body: {},
        } as any

        //@ts-ignore
        (jwt.verify as jest.Mock).mockReturnValue(VALID_TOKEN);
      });

      test("パラメータ不正のExceptionがthrowされる", () => {
        expect.assertions(1);
        try {
          method(mockReq, mockRes);
        } catch (e) {
          expect(e.reason).toStrictEqual("invalid body: body1");
        }
      });
    });
  });
});
