import { author, initAuthData, mockDialogContext } from '@/test-utils';
import { UserProfileSkeleton } from './user-profile.skeleton';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AuthProvider } from '@/contexts/auth-context';
import { UserProfile } from './user-profile';

const randomUUID = crypto.randomUUID();

const { showDialog } = mockDialogContext();

const getAuthDataMock = vi.fn(() => initAuthData);

const UserProfileWrapper = (
  props: React.ComponentProps<typeof UserProfile>
) => {
  return (
    <AuthProvider initAuthData={getAuthDataMock()}>
      <UserProfile {...props} />
    </AuthProvider>
  );
};

afterEach(vi.clearAllMocks);

describe('<UserProfile />', () => {
  it('should display an uppercase abbreviation of the user fullname', () => {
    const name = author.fullname;
    const abbrev = `${name[0]}${
      (name.includes(' ') && name.split(' ').at(-1)?.[0]) || ''
    }`.toUpperCase();
    render(<UserProfileWrapper owner={author} />);
    expect(screen.getByText(abbrev)).toBeInTheDocument();
  });

  it('should display user fullname', () => {
    render(<UserProfileWrapper owner={author} />);
    expect(screen.getByText(author.fullname)).toBeInTheDocument();
  });

  it('should display user username', () => {
    render(<UserProfileWrapper owner={author} />);
    expect(screen.getByText(new RegExp(author.username))).toBeInTheDocument();
  });

  it('should display user bio', () => {
    const bio = 'Test bio...';
    render(<UserProfileWrapper owner={{ ...author, bio }} />);
    expect(screen.getByText(bio)).toBeInTheDocument();
  });

  it('should show edit profile button', () => {
    render(<UserProfileWrapper owner={author} />);
    expect(
      screen.getByRole('button', { name: /edit profile/i })
    ).toBeInTheDocument();
  });

  it('should show a dialog after clicking on edit profile button', async () => {
    const user = userEvent.setup();
    render(<UserProfileWrapper owner={author} />);
    await user.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(showDialog).toHaveBeenCalledOnce();
  });

  it('should show edit avatar button', () => {
    render(<UserProfileWrapper owner={author} />);
    expect(
      screen.getByRole('button', { name: /edit avatar/i })
    ).toBeInTheDocument();
  });

  it('should show a dialog after clicking on edit avatar button', async () => {
    const user = userEvent.setup();
    render(<UserProfileWrapper owner={author} />);
    await user.click(screen.getByRole('button', { name: /edit avatar/i }));
    expect(showDialog).toHaveBeenCalledOnce();
  });

  it('should show delete profile button', () => {
    render(<UserProfileWrapper owner={author} />);
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should show a dialog after clicking on delete profile button', async () => {
    const user = userEvent.setup();
    render(<UserProfileWrapper owner={author} />);
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(showDialog).toHaveBeenCalledOnce();
  });

  it('should not show edit profile button for users other than the owner', () => {
    getAuthDataMock.mockImplementationOnce(() => ({
      ...initAuthData,
      user: { ...author, id: randomUUID },
    }));
    render(<UserProfileWrapper owner={author} />);
    expect(screen.queryByRole('button', { name: /edit profile/i })).toBeNull();
  });

  it('should not show edit avatar button for users other than the owner', () => {
    getAuthDataMock.mockImplementationOnce(() => ({
      ...initAuthData,
      user: { ...author, id: randomUUID },
    }));
    render(<UserProfileWrapper owner={author} />);
    expect(screen.queryByRole('button', { name: /edit avatar/i })).toBeNull();
  });

  it('should not show delete profile button for users other than the owner', () => {
    getAuthDataMock.mockImplementationOnce(() => ({
      ...initAuthData,
      user: { ...author, id: randomUUID },
    }));
    render(<UserProfileWrapper owner={author} />);
    expect(screen.queryByRole('button', { name: /delete/i })).toBeNull();
  });
});

describe('<UserProfileSkeleton />', () => {
  it('should have the given class', () => {
    const className = 'test-class';
    render(<UserProfileSkeleton className={className} />);
    expect(screen.getByLabelText(/loading/i)).toHaveClass(className);
  });

  it('should have the given id', () => {
    const id = 'test-id';
    render(<UserProfileSkeleton id={id} />);
    expect(screen.getByLabelText(/loading/i)).toHaveAttribute('id', id);
  });
});
