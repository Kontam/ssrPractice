import assert from "assert";
import { Request, Response } from "firebase-functions";
import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import { BaseController } from "../BaseController";

jest.mock("firebase-functions");
jest.mock("jsonwebtoken");

const mockConfig = {
  general: {
    apisecret: "apisecret",
  },
};

// @ts-ignore
(functions as jest.Mock).config.mockReturnValue(mockConfig);

describe("BaseController", () => {
  let baseController = new BaseController();
  let mockReq: Request;
  let mockRes: Response;
  beforeEach(() => {
    mockRes = { send: jest.fn(() => {}) } as any;
  });

  describe.each([
    ["get", baseController.get.bind(baseController)],
    ["post", baseController.post.bind(baseController)],
  ])("%s: APIキーが存在していない時", (_, method) => {
    beforeEach(() => {
      mockReq = {
        header: () => undefined,
      } as any;
    });

    test("APIトークン不正のエラーがクライアントに送信される", () => {
      const expect = { error: true, reason: "missing api key on request" };
      method(mockReq, mockRes);
      assert.deepStrictEqual(
        (mockRes.send as jest.Mock).mock.calls[0][0],
        expect
      );
    });

    test("エラーが1度だけ送信される", () => {
      const expect = { error: true, reason: "missing api key on request" };
      method(mockReq, mockRes);
      assert.deepStrictEqual((mockRes.send as jest.Mock).mock.calls.length, 1);
    });
  });

  describe("要求getパラメーターに不足がある時", () => {
    beforeEach(() => {});
    test("", () => {});
  });
});
