import React from 'react';
import { PostsWrapper, PostsWrapperSkeleton } from '@/components/posts-wrapper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getServerAuthData } from '@/lib/auth';
import { H1 } from '@/components/typography/';
import { Header } from '@/components/header';
import { SearchParams } from '@/types';
import { Bell } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const authData = await getServerAuthData();

  return (
    <>
      <Header>
        <H1>{process.env.NEXT_PUBLIC_APP_NAME || 'Home Page'}</H1>
        <Alert className='w-fit max-w-2xl mx-auto my-4 text-start'>
          <Bell />
          <AlertTitle>This is a Read & Comment Only Website!</AlertTitle>
          <AlertDescription>
            <p>
              You can read posts and add comments here, but new posts can be
              created on the{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://odin-blog-author.hussein-kandil.vercel.app/'
                className={`font-medium decoration-muted-foreground/75
                  underline underline-offset-2 decoration-0 decoration-dotted
                  hover:decoration-muted-foreground active:text-foreground`}>
                author site
              </a>
              .
            </p>
          </AlertDescription>
        </Alert>
      </Header>
      <main>
        <React.Suspense fallback={<PostsWrapperSkeleton />}>
          <PostsWrapper searchParams={searchParams} authData={authData} />
        </React.Suspense>
      </main>
    </>
  );
}
