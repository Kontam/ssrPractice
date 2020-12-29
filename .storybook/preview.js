import Globalstyle from '../src/shared/modules/GlobalStyle';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <>
      <Story />
      <Globalstyle />
    </>
  )
];
