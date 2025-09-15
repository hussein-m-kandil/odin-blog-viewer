import React from 'react';
import { PostsWrapper, PostsWrapperSkeleton } from '@/components/posts-wrapper';
import { getServerAuthData } from '@/lib/auth';
import { H1 } from '@/components/typography/';
import { Header } from '@/components/header';
import { SearchParams } from '@/types';

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
      </Header>
      <main>
        <React.Suspense fallback={<PostsWrapperSkeleton />}>
          <PostsWrapper searchParams={searchParams} authData={authData} />
        </React.Suspense>
      </main>
    </>
  );
}
