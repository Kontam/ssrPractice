import assert from "power-assert";
import { convertCSVToChoiseGroup } from "../convertCSVToChoiseGroup";

describe("CSVで渡されたデータをChoiceGroupオブジェクトに変換する関数", () => {
  let name: string;
  let value: string;
  let groupId: string;
  describe("想定通りのCSVファイルが渡された時", () => {
    describe("ファイルが改行を含む時", () => {
      beforeEach(() => {
        name = "test file name.csv";
        value = "Kontam\r,\nHoge,\r\nFuga";
      });
      test("グループ名がfilename引数の拡張子を除去した文字列の値になっている", () => {
        assert.strictEqual(
          convertCSVToChoiseGroup(name, value)?.groupName,
          "test file name"
        );
      });
      test("CSVの値全てがグループメンバーとして反映されている", () => {
        const actual = convertCSVToChoiseGroup(name, value)?.choiceOptions.map(
          (choice) => choice.choiceName
        );
        const expected = ["Kontam", "Hoge", "Fuga"];
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("ファイルが改行を含まない時", () => {
      beforeEach(() => {
        name = "test file name.csv";
        value = "Kontam,Hoge,Fuga";
      });
      test("グループ名がfilename引数の拡張子を除去した文字列の値になっている", () => {
        assert.strictEqual(
          convertCSVToChoiseGroup(name, value)?.groupName,
          "test file name"
        );
      });
      test("CSVの値全てがグループメンバーとして反映されている", () => {
        const actual = convertCSVToChoiseGroup(name, value)?.choiceOptions.map(
          (choice) => choice.choiceName
        );
        const expected = ["Kontam", "Hoge", "Fuga"];
        assert.deepStrictEqual(actual, expected);
      });
    });

    describe("groupIdが渡された時(update)", () => {
      beforeEach(() => {
        name = "test file name.csv";
        value = "Kontam,\nHoge,\nFuga";
      });
      test("グループIDが空文字列になっている", () => {
        assert.strictEqual(convertCSVToChoiseGroup(name, value)?.groupId, "");
      });
    });

    describe("groupIdが渡されない時(post)", () => {
      beforeEach(() => {
        name = "test file name.csv";
        value = "Kontam,\nHoge,\nFuga";
        groupId = "0001";
      });
      test("グループIDがgroupId引数の値になっている", () => {
        assert.strictEqual(
          convertCSVToChoiseGroup(name, value, groupId)?.groupId,
          groupId
        );
      });
    });
  });

  describe("想定外のファイルが渡された時", () => {
    describe("空のファイルが渡された時", () => {
      beforeEach(() => {
        name = "test file name.csv";
        value = "";
        groupId = "0001";
      });
      test("nullが返却される", () => {
        assert.strictEqual(convertCSVToChoiseGroup(name, value, groupId), null);
      });
    });
    describe("CSV形式ではないファイルが渡された時", () => {
      beforeEach(() => {
        name = "test file name.csv";
        value = '12jf!!";# #?k46a/sd123';
        groupId = "0001";
      });
      test("nullが返却される", () => {
        assert.strictEqual(convertCSVToChoiseGroup(name, value, groupId), null);
      });
    });
  });
});
