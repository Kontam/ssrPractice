import assert from "assert";
import { splitArray } from "../splitArray";

/**
 * ランダム性についてはテストをせず、要素数にのみ着目する
 */
describe("配列分割関数 x人組を作成する", () => {
  let amount: number;
  let array: Array<any>;

  describe("余りが発生しない時", () => {
    beforeEach(() => {
      amount = 2;
      array = [1, 1, 1, 1];
    });
    test("メンバー数ごとのグループに分けられる", () => {
      assert.deepStrictEqual(splitArray(array, amount), [
        [1, 1],
        [1, 1]
      ]);
    });
  });

  describe("余りが発生する時", () => {
    describe("余りが1の時", () => {
      beforeEach(() => {
        amount = 2;
        array = [1, 1, 1, 1, 1, 1, 1];
      });
      test("どこかの1グループが1要素多くなるように分けられる", () => {
        assert.deepStrictEqual(splitArray(array, amount), [
          [1, 1, 1],
          [1, 1],
          [1, 1],
        ]);
      });
    });

    describe("余りが2以上の時", () => {
      describe("分けられた後のグループ数よりも余りが少ない時", () => {
        beforeEach(() => {
          amount = 3;
          array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        });
        test("余りの数分グループが1要素多くなるように分けられる", () => {
          assert.deepStrictEqual(splitArray(array, amount), [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1]
          ]);
        });
      });

      describe("分けられた後のグループ数よりも余りが多い時", () => {
        beforeEach(() => {
          amount = 4;
          array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        });
        test(
          "各グループの人数が「余り/グループ数」だけ多くなり、" +
            "その余りの数分グループが1要素多くなるように分けられる",
          () => {
            assert.deepStrictEqual(splitArray(array, amount), [
              [1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1]
            ]);
          }
        );
      });
    });
  });

  describe("メンバー数が全体の数より多い時", () => {
    beforeEach(() => {
      amount = 6;
      array = [1, 1, 1, 1];
    });
    test("元の配列を１グループとして返却する", () => {
      assert.deepStrictEqual(splitArray(array, amount), [[1, 1, 1, 1]]);
    });
  });

  describe("メンバー数として0が渡された時", () => {
    beforeEach(() => {
      amount = 0;
      array = [1, 1, 1, 1];
    });
    test("元の配列を１グループとして返却する", () => {
      assert.deepStrictEqual(splitArray(array, amount), [[1, 1, 1, 1]]);
    });
  });
});
