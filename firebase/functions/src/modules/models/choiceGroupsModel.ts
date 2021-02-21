import { BaseModel } from './BaseModel';
import { CollectionReference } from '@google-cloud/firestore';
import {
  ChoiceGroup,
  ChoiceOption,
} from "../../types";

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
      const snapshot = await this.groupRef.get();
      if (snapshot.empty) {
        console.log(this.CHOICE_GROUPS, "empty");
        return [];
      }

      const promises = snapshot.docs.map(
        async (doc): Promise<ChoiceGroup> => ({
          ...(doc.data() as ChoiceGroup),
          groupId: doc.id,
          choiceOptions: await this.getOptionsByGroupId(doc.id)
        })
      );

      const data = await Promise.all(promises);
      const responseData: ChoiceGroup[] = data.map(group => ({
        groupId: group.groupId,
        groupName: group.groupName,
        choiceOptions: group.choiceOptions
      }));

      return responseData;
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

  async getOptionsByGroupId(groupId: string) {
    const snapshot = await this.optionRef.where('groupId', '==', groupId).get(); 
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
}
