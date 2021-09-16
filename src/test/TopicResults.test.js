import { mount, shallow } from "enzyme";
import { MockedProvider } from '@apollo/client/testing';

import TopicResult from "../components/TopicResult";
import Title from "../StyledComponents/Title";
 

describe("TopicResult ", () => {
  it("should render TopicResult component", () => {

    const wrapper = shallow(<MockedProvider addTypename={false}>
      <TopicResult />
    </MockedProvider>);
    expect(wrapper).toMatchSnapshot();
  });  
  it('contains props', () => {
    const wrapper = mount(<MockedProvider addTypename={false}><TopicResult  value="react"/></MockedProvider>) ;
    const value = wrapper.find(TopicResult).props().value
    expect(value).toEqual('react')
  })
 
});