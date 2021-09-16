import { MockedProvider } from "@apollo/client/testing";
import { mount, shallow } from "enzyme";
import Title from "../StyledComponents/Title";
import Topic from "../components/Topic";

describe("Topic ", () => {
  it("should render Topic component", () => {
    const wrapper = shallow(<MockedProvider   addTypename={false}><Topic /></MockedProvider>);
    expect(wrapper).toMatchSnapshot();
  });
  it('contains Title', () => {
    const wrapper = mount(<MockedProvider  addTypename={false}><Topic /></MockedProvider>);
    const value = wrapper.find(Title).text()
    expect(value).toEqual('Test task GraphQL')
  })
  it('contains props', () => {
    const wrapper = mount(<MockedProvider  addTypename={false}><Topic searchValue="react" /></MockedProvider>);  
    expect(wrapper.find(Topic).props().searchValue).toEqual('react')
  })
});