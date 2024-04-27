import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../client/src/components/Login';


configure({ adapter: new Adapter() });

describe('Login Component Tests', () => {
  it('should render login form', () => {

    const wrapper = shallow(<Login />);

    expect(wrapper.find('form').exists()).toBeTruthy();
  });

  it('should update state on input change', () => {

    const wrapper = shallow(<Login />);

    wrapper.find('#email').simulate('change', { target: { value: 'test1@user.com' } });

    wrapper.find('#password').simulate('change', { target: { value: '123456' } });

    expect(wrapper.state('email')).toEqual('test1@user.com');
    expect(wrapper.state('password')).toEqual('123456');
  });

  it('should render email input field', () => {

    const wrapper = shallow(<Login />);

    expect(wrapper.find('#email').exists()).toBeTruthy();
  });

  it('should render password input field', () => {

    const wrapper = shallow(<Login />);

    expect(wrapper.find('#password').exists()).toBeTruthy();
  });

  it('should render login button', () => {

    const wrapper = shallow(<Login />);

    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});
