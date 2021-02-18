import { BaseModel } from './BaseModel';
import { ChoiceOption } from '../../types';
import { CollectionReference } from '@google-cloud/firestore';

export class ChoiceGroupsModel extends BaseModel {
  CHOICE_GROUPS = "ChoiceGroups" as const;
  CHOICE_OPTIONS = "ChoiceOptions" as const;
  groupRef: CollectionReference<any>
  optionRef: CollectionReference<any>

  constructor() {
    super();
    this.groupRef = this.firestore.collection(this.CHOICE_GROUPS)
    this.optionRef = this.firestore.collection(this.CHOICE_OPTIONS)
  }

  async getChoiceGroups() {
    //TODO: process
    return {};
  }

  async getOptionsByGroupName(groupName: string) {
    const snapshot = await this.groupRef.where('groupName', '==', groupName).get(); 
    if (snapshot.empty) return null;

    const groupIds = snapshot.docs.map((doc) => doc.id);
    const optionSnap = await this.optionRef.where('groupId', '==', groupIds[0]).get();
    const choiceOptions :ChoiceOption[] = optionSnap.docs.map((doc) => {
      const data = doc.data();
      return ({
        choiceId: doc.id,
        choiceName: data.choiceName,
        choiceEnabled: data.choiceEnabled,
      });
    });

    return choiceOptions;
  }
}
