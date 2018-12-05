import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import FormPassword from '.';

it('does not validate weak password', () => {
  const form = mount(<FormPassword onSubmit={() => {}} />);
  form.setState({ password: 'test' });
  const input = form.find('input');
  input.first().simulate('change');

  expect(form.state('formValid')).to.equal(false);
});

it('sets proper password error message', () => {
  const form = mount(<FormPassword onSubmit={() => {}} />);
  form.setState({ password: 'test' });
  const input = form.find('input');
  input.first().simulate('change');

  expect(form.state('passwordError')).to.equal('Password is very weak');

  form.setState({ password: '4my5' });
  input.first().simulate('change');

  expect(form.state('passwordError')).to.equal('Password is weak');

  form.setState({ password: '4my5683' });
  input.first().simulate('change');

  expect(form.state('passwordError')).to.equal('Password is ok');

});

it('validates strong password', () => {
  const form = mount(<FormPassword onSubmit={() => {}} />);
  form.setState({ password: 'fdsafdasf244r1fq2' });
  const input = form.find('input');
  input.first().simulate('change');

  expect(form.state('formValid')).to.equal(true);
});
