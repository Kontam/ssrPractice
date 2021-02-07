import assert from "assert";
import { Request, Response } from "firebase-functions";
import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import { checkHttpHeaders } from "../checkHttpHeaders";

jest.mock("firebase-functions");
jest.mock("jsonwebtoken");

describe("checkHttpHeaders", () => {
  let mockReq: Request;
  let mockRes: Response;
  beforeEach(() => {
    const VALID_TOKEN = "apikey";
    const mockConfig = {
      general: { apiKey: VALID_TOKEN }
    };
    mockRes = { send: jest.fn(() => {}) } as any;
    // @ts-ignore
    (functions as jest.Mock).config.mockReturnValue(mockConfig);
  });

  describe("APIキーが存在していない時", () => {
    beforeEach(() => {
      mockReq = {
        header: () => undefined
      } as any;
    });

    test("falseが返却される", () => {
      assert.ok(!checkHttpHeaders(mockReq, mockRes));
    });

    test("apiキー不足のエラーが送信される", () => {
      const expect = {
        error: true,
        reason: "missing api key on request"
      };
      checkHttpHeaders(mockReq, mockRes);
      assert.deepStrictEqual(
        (mockRes.send as jest.Mock).mock.calls[0][0],
        expect
      );
    });
  });

  describe("APIキーが存在している時", () => {
    describe("正しいAPIキーが渡された時", () => {
      beforeEach(() => {
        mockReq = {
          header: () => "apikey"
        } as any;
        // @ts-ignore
        (jwt as jest.Mock).verify.mockReturnValue(VALID_TOKEN);
      });

      test("trueが返される", () => {
        assert.ok(checkHttpHeaders(mockReq, mockRes));
      });

      test("クラアントにレスポンスは返さない", () => {
        checkHttpHeaders(mockReq, mockRes);
        assert.strictEqual((mockRes.send as jest.Mock).mock.calls.length, 0);
      });
    });

    describe("間違ったAPIキーが渡された時", () => {
      beforeEach(() => {
        mockReq = {
          header: () => "apikey"
        } as any;
        // @ts-ignore
        (jwt as jest.Mock).verify.mockReturnValue("invalid");
      });

      test("falseが返却される", () => {
        assert(!checkHttpHeaders(mockReq, mockRes));
      });

      test("APIキー不正のエラーが返却される", () => {
        const expect = {
          error: true,
          reason: "invalid api token"
        };
        checkHttpHeaders(mockReq, mockRes);
        assert.deepStrictEqual(
          (mockRes.send as jest.Mock).mock.calls[0][0],
          expect
        );
      });
    });
  });
});
