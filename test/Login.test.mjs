const { shallow } = require('enzyme');
const Login = require('../client/src/components/Login');
const React = require('react');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require("./setupTests");

configure({ adapter: new Adapter() });
describe('Login Component Tests', () => {
  it('should render login form', () => {
    const wrapper = shallow(<Login />);
    console.log("[DEBUG] Rendu du formulaire de connexion :", wrapper.debug());
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should update state on input change', () => {
    const wrapper = shallow(<Login />);
    console.log("[DEBUG] Rendu du formulaire avant la simulation des changements :", wrapper.debug());
    wrapper.find('#email').simulate('change', { target: { value: 'test1@user.com' } });
    wrapper.find('#password').simulate('change', { target: { value: '123456' } });
    console.log("[DEBUG] État après la simulation des changements :", wrapper.state());
    expect(wrapper.state('email')).toEqual('test1@user.com');
    expect(wrapper.state('password')).toEqual('123456');
  });

  it('should render email input field', () => {
    const wrapper = shallow(<Login />);
    console.log("[DEBUG] Rendu du champ email :", wrapper.debug());
    expect(wrapper.find('#email').length).toEqual(1);
  });

  it('should render password input field', () => {
    const wrapper = shallow(<Login />);
    console.log("[DEBUG] Rendu du champ password :", wrapper.debug());
    expect(wrapper.find('#password').length).toEqual(1);
  });

  it('should render login button', () => {
    const wrapper = shallow(<Login />);
    console.log("[DEBUG] Rendu du bouton de connexion :", wrapper.debug());
    expect(wrapper.find('button').length).toEqual(1);
  });

});
