import { ArticleFormState } from 'app/pages/HomePage/ArticleForm/slice/types';
import { ThemeState } from '../styles/theme/slice/types';
// [IMPORT NEW CONTAINER STATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  articleForm?: ArticleFormState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
