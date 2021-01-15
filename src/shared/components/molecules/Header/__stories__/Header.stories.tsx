import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AddIcon from "@material-ui/icons/Add";
import Header, { HeaderProps } from "../Header";
import { Router } from "react-router-dom";
import createBrowserhistory from "history/createBrowserHistory";

export default {
  title: "molecules/Header",
  component: Header,
} as Meta;

// InjectedFormPropsのMock作成が大変なのでany
const Template: Story<HeaderProps> = (args) => (
  <Router history={createBrowserhistory()}>
    <Header {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {
  navMenus: [
    {
      text: "Item1",
      href: "",
      description: "説明",
    },
    {
      text: "Long Name Item",
      href: "",
      description: "とても長いアイテムの説明",
    },
    {
      text: "Item3",
      href: "",
      description: "とても長いアイテムの説明",
    },
  ],
  headerLoading: false,
  appButtons: [
    {
      name: "button name",
      color: "default",
      onClick: () => {},
      IconComponent: <AddIcon />,
      description: "description",
    },
  ],
};
