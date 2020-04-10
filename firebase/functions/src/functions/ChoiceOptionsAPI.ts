import * as admin from 'firebase-admin';
import { ChoiceOption } from './ChoiceGroupsAPI';


export const getOptionsByGroupId = async (groupId: string, groupRef:admin.firestore.CollectionReference): Promise<ChoiceOption[]> => {
  const snapshot = await groupRef.where('groupId', '==', groupId).get(); 
  const choiceOptions :ChoiceOption[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return ({
      choiceId: doc.id,
      choiceName: data.choiceName,
      choiceEnabled: data.choiceEnabled,
    });
  });

  return choiceOptions;
}
