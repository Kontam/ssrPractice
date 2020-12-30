import {ChoiceGroup} from "../../../../firebase/functions/src/types";

export function convertChoiseGroupToCSV(choiceGroup: ChoiceGroup) {
  let result = '';
  choiceGroup.choiceOptions.forEach(choice => {
    result+=`,${choice.choiceName}`
  });
  return result
}
