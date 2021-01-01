import React from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Provider } from "react-redux";
import createBrowserhistory from "history/createBrowserHistory";
import { createStore } from "redux";

import ChoiceForm  from "../";
import createReducer from "../../../../redux/modules/reducer";

export default {
  title: "molecules/ChoiceForm",
  component: ChoiceForm,
} as Meta;

// InjectedFormPropsのMock作成が大変なのでany
const Template: Story<any> = (args) => {
  const history = createBrowserhistory();
  const reducer = createReducer(history);
  const store = createStore(reducer);
  return (
    <Container>
      <Provider store={store}>
        <ChoiceForm {...args} />
      </Provider>
    </Container>
  );
};

const Container = styled(Box)({
  width: "500px",
});

export const Primary = Template.bind({});
Primary.args = {
  handleSubmit: () => {},
  initialValues: {
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
