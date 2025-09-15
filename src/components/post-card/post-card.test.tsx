import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { post, mockDialogContext, initAuthData } from '@/test-utils';
import { render, screen } from '@testing-library/react';
import { PostCardSkeleton } from './post-card.skeleton';
import { AuthProvider } from '@/contexts/auth-context';
import { describe, expect, it } from 'vitest';
import { PostCard } from './post-card';

mockDialogContext();

const PostCardWrapper = (props: React.ComponentProps<typeof PostCard>) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider initAuthData={initAuthData}>
        <PostCard {...props} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('<PostCard />', () => {
  it('should render some of the post data', () => {
    render(<PostCardWrapper post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
    const readLinks = screen.getAllByRole('link', {
      name: /read/i,
    }) as HTMLAnchorElement[];
    expect(readLinks.length).toBeTruthy();
    for (const readLink of readLinks) {
      expect(readLink.href).toMatch(new RegExp(`/${post.id}$`));
    }
    const authorLink = screen.getByRole('link', {
      name: new RegExp(`${post.author.username}|${post.author.fullname}`, 'i'),
    }) as HTMLAnchorElement;
    expect(authorLink.href).toMatch(
      new RegExp(`/profile/(${post.author.username}|${post.author.id})$`)
    );
  });
});

describe('<PostCardSkeleton />', () => {
  it('should have the given className', () => {
    const className = 'test-class';
    render(<PostCardSkeleton className={className} />);
    expect(screen.getByLabelText(/loading .* post/i)).toHaveClass(className);
  });
});
