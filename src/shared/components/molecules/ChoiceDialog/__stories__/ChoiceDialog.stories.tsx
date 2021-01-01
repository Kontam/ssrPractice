import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Provider } from "react-redux";
import createBrowserhistory from "history/createBrowserHistory";
import { createStore } from "redux";

import ChoiceDialog, { ChoiceDialogProps } from "../";
import createReducer from "../../../../redux/modules/reducer";

export default {
  title: "molecules/ChoiceDialog",
  component: ChoiceDialog,
} as Meta;

// InjectedFormPropsのMock作成が大変なのでany
const Template: Story<ChoiceDialogProps> = (args) => {
  const history = createBrowserhistory();
  const reducer = createReducer(history);
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <ChoiceDialog {...args} />
    </Provider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: "新規グループを追加",
  isOpen: true,
  onClose: () => {},
  isDialogLoading: false,
  initialValues: {
    groupId: "0001",
    groupName: "テスト",
    choiceOptions: [
      {
        choiceName: "グループ１",
        choiceEnabled: true,
        choiceId: "0001",
      },
      {
        choiceName: "グループ２",
        choiceEnabled: true,
        choiceId: "0002",
      },
    ],
  },
};
