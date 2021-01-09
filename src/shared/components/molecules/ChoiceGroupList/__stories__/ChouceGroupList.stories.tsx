import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ChoiceGroupList, { ChoiceGroupListProps } from "../";

export default {
  title: "molecules/ChoiceGroupList",
  component: ChoiceGroupList,
} as Meta;

// InjectedFormPropsのMock作成が大変なのでany
const Template: Story<ChoiceGroupListProps> = (args) => (
  <ChoiceGroupList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  choiceGroups: [
    {
      groupId: "0001",
      groupName: "group name 1",
      choiceOptions: [
        {
          choiceId: "0001",
          choiceName: "option1",
          choiceEnabled: true,
        },
        {
          choiceId: "0002",
          choiceName: "option2",
          choiceEnabled: true,
        },
      ],
    },
    {
      groupId: "0002",
      groupName: "group name 2",
      choiceOptions: [
        {
          choiceId: "0001",
          choiceName: "option1",
          choiceEnabled: true,
        },
      ],
    },
    {
      groupId: "0003",
      groupName: "group name 3",
      choiceOptions: [
        {
          choiceId: "0001",
          choiceName: "option1",
          choiceEnabled: true,
        },
      ],
    },
    {
      groupId: "0004",
      groupName: "group name 4",
      choiceOptions: [
        {
          choiceId: "0001",
          choiceName: "option1",
          choiceEnabled: true,
        },
      ],
    },
  ],
};
