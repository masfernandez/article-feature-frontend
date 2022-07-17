/* --- STATE --- */
export interface ArticleFormState {
  uuid: string;
  name: string;
  path: string;
  loading: boolean;
  formError: LoginErrorType;
  apiError: ApiError;
}

export enum LoginErrorType {
  NO_ERROR,
  WRONG_NAME,
}

export enum ApiError {
  OK = 200,
}

export type ContainerState = ArticleFormState;
