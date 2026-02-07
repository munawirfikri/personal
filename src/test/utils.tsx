import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { DataProvider } from '../contexts/DataContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <DataProvider>{children}</DataProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
