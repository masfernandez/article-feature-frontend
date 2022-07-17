import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { articleFormSaga } from './saga';
import { ApiError, ArticleFormState, LoginErrorType } from './types';

export const initialState: ArticleFormState = {
  uuid: '',
  name: '',
  path: '',
  loading: false,
  formError: LoginErrorType.NO_ERROR,
  apiError: ApiError.OK,
};

const slice = createSlice({
  name: 'articleForm',
  initialState,
  reducers: {
    changeUuid(state, action: PayloadAction<string>) {
      state.uuid = action.payload;
    },
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    changePath(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
    onErrorForm(state, action: PayloadAction<LoginErrorType>) {
      state.formError = action.payload;
    },
    onErrorResponse(state, action: PayloadAction<ApiError>) {
      state.apiError = action.payload;
      state.loading = false;
    },
    createArticle(state) {
      state.loading = true;
    },
    articleCreated(state) {
      state.loading = false;
    },
  },
});

export const { actions: articleFormActions } = slice;

export const useArticleFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: articleFormSaga });
  return { actions: slice.actions };
};
