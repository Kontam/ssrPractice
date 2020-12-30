import { ChoiceGroup } from "../../../../firebase/functions/src/types";

export function convertChoiseGroupToCSV(choiceGroup: ChoiceGroup) {
  let result = "";
  choiceGroup.choiceOptions
    .filter((choice) => choice.choiceName)
    .forEach((choice) => {
      if (!result) return (result += choice.choiceName);
      result += `,${choice.choiceName}`;
    });
  return result;
}
