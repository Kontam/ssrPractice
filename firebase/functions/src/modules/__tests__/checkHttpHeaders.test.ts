import assert from "assert";
import { Request } from "firebase-functions";
import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import { checkHttpHeaders } from "../checkHttpHeaders";

jest.mock("firebase-functions");
jest.mock("jsonwebtoken");

describe("checkHttpHeaders", () => {
  let mockReq: Request;
  const VALID_TOKEN = "apikey";
  beforeEach(() => {
    const mockConfig = {
      general: { apikey: VALID_TOKEN }
    };
    // @ts-ignore
    (functions as jest.Mock).config.mockReturnValue(mockConfig);
  });

  describe("APIキーが存在していない時", () => {
    beforeEach(() => {
      mockReq = {
        header: () => undefined
      } as any;
    });

    test("apiキー不足のSuebotAPIExeptionがthrowされる", () => {
      try {
        checkHttpHeaders(mockReq);
      } catch (e) {
        assert.strictEqual(e.reason, "missing api key")
      }
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
        assert.ok(checkHttpHeaders(mockReq));
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

      test("APIキー不正のSuebotAPIExceptionがthrowされる", () => {
        try {
          checkHttpHeaders(mockReq);
        } catch (e) {
          assert.strictEqual(e.reason, "invalid api token")
        }
      });
    });
  });
});
