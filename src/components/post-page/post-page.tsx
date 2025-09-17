'use client';

import { H1, H2, Lead, Muted } from '@/components/typography';
import { FormattedDate } from '@/components/formatted-date';
import { MutableImage } from '@/components/mutable-image';
import { UsernameLink } from '@/components/username-link';
import { PostPageSkeleton } from './post-page.skeleton';
import { PrivacyIcon } from '@/components/privacy-icon';
import { useAuthData } from '@/contexts/auth-context';
import { QueryError } from '@/components/query-error';
import { useQuery } from '@tanstack/react-query';
import { Comments } from '@/components/comments';
import { notFound } from 'next/navigation';
import { Tags } from '@/components/tags';
import { cn } from '@/lib/utils';
import { Post } from '@/types';

export function PostPage({
  className,
  postUrl,
  postId,
  ...props
}: React.ComponentProps<'div'> & {
  postId: Post['id'];
  postUrl: string;
}) {
  const {
    authData: { authAxios },
  } = useAuthData();

  const {
    data: post,
    error,
    status,
    refetch,
  } = useQuery<Post>({
    queryKey: ['post', postId, postUrl],
    queryFn: async () => (await authAxios(postUrl)).data,
  });

  const titleId = `title-${post?.id}`;

  if (
    status === 'error' &&
    'status' in error &&
    typeof error.status === 'number' &&
    error.status >= 400 &&
    error.status < 500
  ) {
    return notFound();
  }

  return (
    <div {...props} className={cn('max-w-5xl mx-auto', className)}>
      {status === 'error' ? (
        <div className={className}>
          <QueryError className='mt-6' onRefetch={refetch}>
            Sorry, we could not get the post data
          </QueryError>
        </div>
      ) : status === 'pending' ? (
        <div className={className}>
          <PostPageSkeleton />
        </div>
      ) : (
        <>
          <header className='mt-6'>
            <H1 id={titleId} className='text-3xl text-center border-b pb-2'>
              {post.title}
            </H1>
            <div className='flex items-center justify-between mt-1'>
              <Muted className='flex items-center gap-1 leading-0'>
                <PrivacyIcon isPublic={post.published} />
                <UsernameLink user={post.author} prefix='By ' />
              </Muted>
              <Muted>
                <FormattedDate
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                />
              </Muted>
            </div>
          </header>
          <main>
            <article aria-labelledby={titleId}>
              {post.image && (
                <MutableImage image={post.image} className='my-6' />
              )}
              <Lead className='text-foreground font-light mb-6'>
                {post.content}
              </Lead>
              <Tags tags={post.tags} className='justify-end' />
              <section className='my-4'>
                <header>
                  <H2 className='text-center text-xl'>
                    {post._count.comments} Comments
                  </H2>
                </header>
                <main>
                  <Comments initialComments={post.comments} post={post} />
                </main>
              </section>
            </article>
          </main>
        </>
      )}
    </div>
  );
}

export default PostPage;
