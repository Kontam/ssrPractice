import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import HeaderMenuItem, { HeaderMenuItemProps } from "../";
import { Router } from "react-router-dom";
import createBrowserhistory from "history/createBrowserHistory";

export default {
  title: "Atoms/HeaderMenuItem",
  component: HeaderMenuItem,
} as Meta;

const Template: Story<HeaderMenuItemProps> = (args) => (
  <Router history={createBrowserhistory()}>
    <HeaderMenuItem {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {
  menu: {
    text: "MenuItem",
    href: "",
    description: "This is item description",
  },
};
