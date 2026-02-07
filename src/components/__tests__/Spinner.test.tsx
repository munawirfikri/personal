import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import Spinner from '../Spinner';

describe('Spinner Component', () => {
  it('renders spinner with default size', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('div');
    expect(spinner).toHaveClass('h-8', 'w-8');
  });

  it('renders spinner with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.querySelector('div');
    expect(spinner).toHaveClass('h-4', 'w-4');
  });

  it('renders spinner with large size', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.querySelector('div');
    expect(spinner).toHaveClass('h-12', 'w-12');
  });
});
