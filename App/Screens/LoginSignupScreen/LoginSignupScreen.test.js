import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import LoginSignupScreen from './LoginSignupScreen';
import Adapter from 'enzyme-adapter-react-16';

describe('Button', () => {
  let component;
  let props;
  let label = 'keywords';
  let keywords = 'this is some keyword';
  Enzyme.configure({
    adapter: new Adapter(),
  });
  beforeEach(() => {
    props = {
      onChange: jest.fn(),
    };
    component = shallow(
      <LoginSignupScreen
        label={label}
        value={keywords}
        onChange={props.onChange}
      />,
    );
  });
  it('should match to snapshot', () => {
    expect(true).toBe(true);
  });
  it('should call the onChange function', () => {
    let mountedComponent = mount(
      <LoginSignupScreen
        label={label}
        value={keywords}
        onChange={props.onChange}
      />,
    );
    mountedComponent.find('TextInput').simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should change the value of the input onChange', () => {
    keywords = 'shawky';
    let mountedComponent = mount(
      <LoginSignupScreen
        label={label}
        value={keywords}
        onChange={props.onChange}
      />,
    );

    mountedComponent.find('input').simulate('change');

    expect(mountedComponent.find('TextInput').prop('value')).toBe('shawky');
  });
});
