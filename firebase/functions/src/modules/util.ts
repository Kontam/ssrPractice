/**
 * 渡されたidのデータが存在するかをチェックする
 * @param ref チェック対象のcollectionのref
 * @param id チェック対象データのid
 * @return {boolean} 存在すればfalse
 */
export async function checkIsEmptyById(ref :FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>, id: string) {
    return (await ref.doc(id).get()).exists;
}
