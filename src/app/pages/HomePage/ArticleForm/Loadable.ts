/**
 *
 * Asynchronously loads the component for ArticleForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ArticleForm = lazyLoad(
  () => import('./index'),
  module => module.ArticleForm,
);
