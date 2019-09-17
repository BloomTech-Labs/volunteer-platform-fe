import React from 'react';
import * as rtl from '@testing-library/react';
import FunComponent from '../components/FunComponent';

describe('Login Page', () => {
  it('properly renders', () => {
    const login = rtl.render(<h2>Testing</h2>);
    const element = login.getByText(/Testing/)
    expect(element).toBeVisible();
  });
});
