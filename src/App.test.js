import React from 'react';
import { render } from '@testing-library/react';
import DashboardView from './app/modules/dashboardView';

test('renders learn react link', () => {
  const { getByText } = render(<DashboardView />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
