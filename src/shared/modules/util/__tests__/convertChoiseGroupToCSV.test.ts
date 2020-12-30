import assert from 'power-assert';
import {ChoiceGroup} from '../../../../../firebase/functions/src/types';
import {convertChoiseGroupToCSV} from '../convertChoiseGroupToCSV';

describe('チョイスグループをダウンロード用CSVに変換する', () => {
  let mockGroup: ChoiceGroup;
  describe('メンバーが存在する時', () => {
    beforeEach(() => {
      mockGroup = {
        groupId: 'groupId1',
        groupName: 'groupName',
        choiceOptions: [
          {
            choiceId: '1',
            choiceName: 'Name1',
            choiceEnabled: true,
          },
          {
            choiceId: '2',
            choiceName: 'Name2',
            choiceEnabled: true,
          },
        ],
      };
    });
    test('choiceNameを抽出したカンマ区切りの文字列が返される', () => {
      assert(convertChoiseGroupToCSV(mockGroup), 'Name1,Name2'); 
    });
  });
  describe('メンバーが存在しない時', () => {
    beforeEach(() => {
      mockGroup = {
        groupId: 'groupId1',
        groupName: 'groupName',
        choiceOptions: [],
      };
    });
    test('空文字列が返却される', () => {
      assert.strictEqual(convertChoiseGroupToCSV(mockGroup), ''); 
    });
  });
});
