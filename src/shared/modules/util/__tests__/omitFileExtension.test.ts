import assert from "power-assert";
import { omitFileExtension } from "../omitFileExtension";

describe("ファイル拡張子除去関数", () => {
  describe("ファイルが拡張子を含む時", () => {
    let filename: string;
    beforeEach(() => {
      filename = "testfile.csv";
    });
    test("拡張子が除去されたファイル名が返却される", () => {
      assert.strictEqual(omitFileExtension(filename), "testfile");
    });
  });

  describe("ファイルが拡張子を含まない時", () => {
    let filename: string;
    beforeEach(() => {
      filename = "testfile";
    });
    test("ファイル名がそのまま返却される", () => {
      assert.strictEqual(omitFileExtension(filename), filename);
    });
  });

  describe("ファイル名に.を含み、拡張子も含む場合", () => {
    let filename: string;
    beforeEach(() => {
      filename = "testfile.new.csv";
    });
    test("最初の.以降が除去された文字列が返却される", () => {
      assert.strictEqual(omitFileExtension(filename), "testfile");
    });
  });
});
