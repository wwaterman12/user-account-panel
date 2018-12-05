import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import FormEmail from '.';

it('does not validate incorrect email address', () => {
  const form = mount(<FormEmail onSubmit={() => {}} />);
  form.setState({ email: 'improperemail@' });
  const input = form.find('input');
  input.first().simulate('change');

  expect(form.state('formValid')).to.equal(false);
});

it('validates correct email address', () => {
  const form = mount(<FormEmail onSubmit={() => {}} />);
  form.setState({ email: 'test@gmail.com' });
  const input = form.find('input');
  input.first().simulate('change');

  expect(form.state('formValid')).to.equal(true);
});
