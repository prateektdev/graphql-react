import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it("should render App", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
