import { User, BaseAuthData } from '@/types';
import { vi } from 'vitest';

export const dates = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const author: User = {
  ...dates,
  order: 1,
  bio: null,
  isAdmin: false,
  id: crypto.randomUUID(),
  username: 'nowhere_man',
  fullname: 'Nowhere-Man',
};

export const initAuthData: BaseAuthData = {
  authUrl: '/auth',
  backendUrl: 'http://test.com/api/v1',
  token: 'test-token',
  user: author,
};

export const mockDialogContext = () => {
  const dialogMockedMethods = vi.hoisted(() => {
    const showDialog = vi.fn();
    const hideDialog = vi.fn();
    const useDialog = vi.fn(() => ({ showDialog, hideDialog }));
    return { useDialog, showDialog, hideDialog };
  });
  vi.mock('@/contexts/dialog-context', () => ({
    useDialog: dialogMockedMethods.useDialog,
  }));
  return dialogMockedMethods;
};
