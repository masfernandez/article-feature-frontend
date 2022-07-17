import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state.articleForm || initialState;

export const selectName = createSelector(
  [selectDomain],
  articleForm => articleForm.name,
);

export const selectUuid = createSelector(
  [selectDomain],
  articleForm => articleForm.uuid,
);

export const selectPath = createSelector(
  [selectDomain],
  articleForm => articleForm.path,
);

export const selectError = createSelector(
  [selectDomain],
  articleForm => articleForm.formError,
);

export const selectLoading = createSelector(
  [selectDomain],
  articleForm => articleForm.loading,
);
