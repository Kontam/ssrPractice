/**
 * 渡されたidのデータが存在するかをチェックする
 * @param ref チェック対象のcollectionのref
 * @param id チェック対象データのid
 * @return {boolean} 存在すればfalse
 */
export async function checkIsEmptyById(ref :FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>, id: string) {
    return (await ref.doc(id).get()).exists;
}

/**
 * ランダムな数値を取得する
 * @param {number} min 最小値 
 * @param {number} max 最大値
 */
export function getRandomNumber(min: number, max: number){
    return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}

/**
 * 配列の中からランダムに複数要素を選出して返す
 * @param options 選ばれる候補となるデータの配列 
 * @param amount 抽出するデータの数 0か省略された場合は全要素
 */
export function chooseItemsRandomly<T = any>(options: T[], amount?: number) {
    const leftOptions = [...options];
    const choosenOptions = [];
    if (!amount) amount = leftOptions.length;
    while (leftOptions.length !== 0 && choosenOptions.length !== amount) {
        const num = getRandomNumber(0, leftOptions.length-1);
        choosenOptions.push(leftOptions[num]);
        leftOptions.splice(num, 1);
    }
    return choosenOptions;
}
