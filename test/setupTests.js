// src/setupTests.js

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-18'; // Adaptateur React 18

configure({ adapter: new Adapter() });
