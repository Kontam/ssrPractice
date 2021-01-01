// ランダム並び替え関数は他で作る
export function splitArray(array: Array<any>, amount: number): Array<Array<any>> {
  if (amount === 0) return [array];
  if (array.length < amount) return [array];
  const allMemberAmount = array.length;
  let remainder = allMemberAmount % amount;
  const groupAmount = Math.floor(allMemberAmount / amount);

  let addition = 0;
  if (remainder >= groupAmount) {
    addition = Math.floor(remainder / groupAmount);
    remainder = remainder % groupAmount;
  }

  const result: Array<any> = [];
  const deepCopy: Array<any> = JSON.parse(JSON.stringify(array));
  let group: Array<any> = [];
  let memberAmount = 0;
  for (let i = 0; i < groupAmount; i++) {
    group = [];
    result.push(group);
    memberAmount = remainder > 0 ? 1 : 0;
    remainder -= 1;
    memberAmount += amount + addition;
    for (let j = 0; j < memberAmount; j++){
      group.push(deepCopy.pop()); 
    }
  }

  return result;
}
