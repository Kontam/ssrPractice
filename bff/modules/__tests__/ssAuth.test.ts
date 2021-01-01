import assert from 'power-assert';
import { Request } from 'express';
import ssAuth, { SSAuth } from '../ssAuth';
import * as admin from 'firebase-admin';

jest.mock('firebase-admin');

describe("サーバーサイド認証のテスト", () => {
  const mockReq = {
    cookies: {
      token: "restToken",
    }
  } as Request;

  const mockReqWithoutCookies = { cookies: {} } as Request;
  
  test("requestのクッキーにtokenが存在しない場合は認証を行わなず、isAuthed:falseのデータが帰る", async () => {
    const expected: SSAuth = { isAuthed: false };
    const result = await ssAuth(mockReqWithoutCookies);

    assert.deepEqual(result, expected);
  });
});
