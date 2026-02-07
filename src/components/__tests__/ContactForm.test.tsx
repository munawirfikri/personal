import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

describe('ContactForm Component', () => {
  it('shows validation errors for empty fields', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={onSubmit} />);
    
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
    
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
    await user.type(screen.getByPlaceholderText(/your email/i), 'john@example.com');
    await user.type(screen.getByPlaceholderText(/your message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
      });
    });
  });
});
