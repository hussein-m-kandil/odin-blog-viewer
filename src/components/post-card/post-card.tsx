'use client';

import Link from 'next/link';
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { FormattedDate } from '@/components/formatted-date';
import { UsernameLink } from '@/components/username-link';
import { MutableImage } from '@/components/mutable-image';
import { PrivacyIcon } from '@/components/privacy-icon';
import { Muted, Lead } from '@/components/typography/';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { Tags } from '../tags';

export function PostCard({
  className,
  post,
  ...props
}: React.ComponentProps<'div'> & { post: Post }) {
  const postUrl = `/${post.id}`;

  return (
    <Card
      {...props}
      className={cn('w-full flex-col justify-between gap-4', className)}>
      <CardHeader>
        <CardTitle
          title={post.title}
          className='hover:underline truncate outline-ring-50 dark:outline-foreground outline-offset-3 has-focus-visible:outline-2'>
          <Link href={postUrl} prefetch={false}>
            <PrivacyIcon isPublic={post.published} /> <span>{post.title}</span>
          </Link>
        </CardTitle>
        <CardDescription className='italic truncate'>
          <UsernameLink user={post.author} />
        </CardDescription>
      </CardHeader>
      <CardContent className='mb-auto p-0'>
        <MutableImage image={post.image} />
        <div className='px-6 space-y-4'>
          <Lead className='line-clamp-3 font-light text-lg'>
            {post.content}
          </Lead>
          <Tags tags={post.tags} />
        </div>
      </CardContent>
      <CardFooter className='flex items-center justify-between'>
        <Muted>
          <FormattedDate
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            className='max-[480px]:text-xs'
          />
        </Muted>
        <Button type='button' variant={'outline'} asChild>
          <Link
            href={postUrl}
            prefetch={false}
            title='Read more'
            aria-label={`Read more about ${post.title}`}>
            <BookOpen />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
