import rippleFoundation from '@materialr/ripple';
import { mount, shallow } from 'enzyme';
import React from 'react';

import FAB from './index';

const ICON = 'ICON';

test('Renders only default className', () => {
  const wrapper = shallow(<FAB icon={ICON} />);
  const expected = 'material-icons mdc-fab';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders all classNames based on props', () => {
  const wrapper = shallow(<FAB exited icon={ICON} mini />);
  const expected = 'material-icons mdc-fab mdc-fab--exited mdc-fab--mini';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders extra classNames that are passed in', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(<FAB className={CLASS_NAME} icon={ICON} />);
  const expected = `material-icons mdc-fab ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Adds icon as a string', () => {
  const wrapper = shallow(<FAB icon={ICON} />);
  const expected = ICON;

  const actual = wrapper.text();

  expect(actual).toBe(expected);
});

test('Does not add a ripple when it is disabled', () => {
  const wrapper = mount(<FAB icon={ICON} />);
  const expected = undefined;

  const actual = wrapper.instance().rippleFoundation;

  expect(actual).toBe(expected);
});

test('Adds a ripple when it is enabled', () => {
  const wrapper = mount(<FAB icon={ICON} rippleEnabled />);
  const { disabled, rippleCentered } = wrapper.props();
  const instance = wrapper.instance();
  const { button, updateClassNames, updateCssVariables } = instance;
  const expected = rippleFoundation({
    centered: rippleCentered,
    disabled,
    element: button,
    self: instance,
    updateClassNames,
    updateCssVariables,
  });

  const actual = instance.rippleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Adds the ripple if the prop changes', () => {
  const wrapper = mount(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  instance.rippleCreate = jest.fn();

  wrapper.setProps({ rippleEnabled: true });

  expect(instance.rippleCreate).toHaveBeenCalledTimes(1);
});

test('Removes the ripple if the prop changes', () => {
  const wrapper = mount(<FAB icon={ICON} rippleEnabled />);
  const instance = wrapper.instance();
  const expected = undefined;

  wrapper.setProps({ rippleEnabled: false });
  const actual = instance.rippleFoundation;

  expect(actual).toBe(expected);
});

test('Centers the ripple if it was previously uncentered', () => {
  const wrapper = mount(<FAB icon={ICON} rippleEnabled />);
  const { disabled } = wrapper.props();
  const instance = wrapper.instance();
  const { button, updateClassNames, updateCssVariables } = instance;
  const expected = rippleFoundation({
    centered: true,
    disabled,
    element: button,
    self: instance,
    updateClassNames,
    updateCssVariables,
  });

  wrapper.setProps({ rippleCentered: true });
  const actual = instance.rippleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Updates classNames in state when \'updateClassNames()\' is called', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = mount(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  const expected = CLASS_NAMES;

  instance.updateClassNames(CLASS_NAMES);
  const actual = instance.state.classNames;

  expect(actual).toEqual(expected);
});

test('Does not update classNames in state when \'updateClassNames()\' is called on an unmounted component', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = shallow(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateClassNames(CLASS_NAMES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Updates cssVariables in state when \'updateCssVariables()\' is called', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  const expected = CSS_VARIABLES;

  instance.updateCssVariables(CSS_VARIABLES);
  const actual = instance.state.cssVariables;

  expect(actual).toEqual(expected);
});

test('Does not update cssVariables in state when \'updateCssVariables()\' is called on an unmounted component', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateCssVariables(CSS_VARIABLES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Destroys the ripple when the component unmounts', () => {
  const wrapper = mount(<FAB icon={ICON} rippleEnabled />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(1);
});

test('Does not detroy the ripple when the component unmounts without a ripple', () => {
  const wrapper = mount(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(0);
});

test('Does not detroy the ripple when the component unmounts', () => {
  const wrapper = shallow(<FAB icon={ICON} />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(0);
});
