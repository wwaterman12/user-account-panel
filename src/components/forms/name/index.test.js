import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import FormName from '.';

it('does not validate incorrect name', () => {
  const form = mount(<FormName onSubmit={() => {}} />);
  form.setState({ firstName: 'wes123', lastName: 'waterman' });
  const input = form.find('input');
  input.first().simulate('change');

  expect(form.state('formValid')).to.equal(false);
});

it('validates correct name', () => {
  const form = mount(<FormName onSubmit={() => {}} />);
  form.setState({ firstName: 'Wes', lastName: 'Waterman' });
  const input = form.find('input');
  input.forEach(node => node.simulate('change'));

  expect(form.state('formValid')).to.equal(true);
});
