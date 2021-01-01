import { ChoiceGroup } from "../../../../firebase/functions/src/types";
import { omitFileExtension } from "./omitFileExtension";

// input要素のacceptが.csvのみなので、基本他形式ファイルは混入しないはずである
export function convertCSVToChoiseGroup(
  filename: string,
  value: string,
  groupId?: string
): ChoiceGroup | null {
  const name = omitFileExtension(filename);
  const array = value.replace(/(\n|\r\n|\r)/g, "").split(",");
  // パース後に要素が1以下の場合はCSV形式ではないと見なす
  // 異常ファイル混入が問題になったら条件を強化する
  if (array.length <= 1) return null;

  return {
    groupId: groupId || "",
    groupName: name,
    choiceOptions: array.map((str, index) => ({
      choiceId: index.toString(),
      choiceName: str,
      choiceEnabled: true,
    })),
  };
}
