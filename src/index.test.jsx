import * as ripple from '@material/ripple';
import { mount, shallow } from 'enzyme';
import React from 'react';

import Fab from './index';

const ICON = 'ICON';

test('Renders the default classNames', () => {
  const wrapper = shallow(<Fab icon={ICON} />, { disableLifecycleMethods: true });
  const expected = 'material-icons mdc-fab';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <Fab className={CLASS_NAME} icon={ICON} />,
    { disableLifecycleMethods: true },
  );
  const expected = `material-icons mdc-fab ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders an exited fab', () => {
  const wrapper = shallow(<Fab exited icon={ICON} />, { disableLifecycleMethods: true });
  const expected = 'material-icons mdc-fab mdc-fab--exited';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders a mini fab', () => {
  const wrapper = shallow(<Fab mini icon={ICON} />, { disableLifecycleMethods: true });
  const expected = 'material-icons mdc-fab mdc-fab--mini';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Passes through the correct props', () => {
  const ON_CLICK = () => 'ON_CLICK';
  const wrapper = shallow(
    <Fab icon={ICON} onClick={ON_CLICK} />,
    { disableLifecycleMethods: true },
  );
  const expectedIcon = ICON;
  const expectedOnClick = ON_CLICK;

  const actualIcon = wrapper.find('.mdc-fab__icon').props().children;
  const actualOnClick = wrapper.props().onClick;

  expect(actualIcon).toBe(expectedIcon);
  expect(actualOnClick).toBe(expectedOnClick);
});

test('Creates the MDCRipple component on mount if enabled', () => {
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  const wrapper = mount(<Fab icon={ICON} ripple />);
  const instance = wrapper.instance();
  const expected = instance.elementRoot;

  const actual = MDCRipple.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('does not create the MDCRipple component on mount if disabled', () => {
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  mount(<Fab icon={ICON} />);
  const expected = 0;

  const actual = MDCRipple.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Destroys the ripple on unmount if enabled', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Fab icon={ICON} ripple />);
  const instance = wrapper.instance();
  const expected = 1;
  instance.ripple = { destroy };

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Does not destroy the ripple on unmount if disabled', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Fab icon={ICON} />);
  const instance = wrapper.instance();
  const expected = 0;
  instance.ripple = { destroy };

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Creates the MDCRipple component on update if enabled', () => {
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  const wrapper = mount(<Fab icon={ICON} />);
  const instance = wrapper.instance();
  const expected = instance.elementRoot;

  wrapper.setProps({ ripple: true });
  const actual = MDCRipple.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('Destroys the ripple on update if disabled', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Fab icon={ICON} ripple />);
  const instance = wrapper.instance();
  const expected = 1;
  instance.ripple = { destroy };

  wrapper.setProps({ ripple: false });
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Makes no change when the ripple prop doesn\'t change', () => {
  const destroy = jest.fn();
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  const wrapper = mount(<Fab icon={ICON} />);
  const instance = wrapper.instance();
  const expectedDestroy = 0;
  const expectedMDCRipple = 0;
  instance.ripple = { destroy };

  wrapper.setProps({ ripple: false });
  const actualDestroy = destroy.mock.calls.length;
  const actualMDCRipple = MDCRipple.mock.calls.length;

  expect(actualDestroy).toBe(expectedDestroy);
  expect(actualMDCRipple).toBe(expectedMDCRipple);
});
