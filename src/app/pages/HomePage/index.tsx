import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../../components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { ArticleForm } from './ArticleForm';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Article feature examples" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <ArticleForm />
      </PageWrapper>
    </>
  );
}
