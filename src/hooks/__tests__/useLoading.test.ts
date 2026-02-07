import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoading } from '../useLoading';

describe('useLoading Hook', () => {
  it('initializes with false by default', () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.isLoading).toBe(false);
  });

  it('starts and stops loading', () => {
    const { result } = renderHook(() => useLoading());
    
    act(() => {
      result.current.startLoading();
    });
    expect(result.current.isLoading).toBe(true);
    
    act(() => {
      result.current.stopLoading();
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('withLoading executes async function', async () => {
    const { result } = renderHook(() => useLoading());
    
    const asyncFn = vi.fn().mockResolvedValue('success');
    
    let returnValue;
    await act(async () => {
      returnValue = await result.current.withLoading(asyncFn);
    });
    
    expect(asyncFn).toHaveBeenCalled();
    expect(returnValue).toBe('success');
    expect(result.current.isLoading).toBe(false);
  });
});
