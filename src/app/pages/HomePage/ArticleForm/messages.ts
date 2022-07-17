/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  title: () => _t(translations.HomePage.title, 'Create article'),
  submit: () => _t(translations.HomePage.submit, 'Submit'),
  unexpectedError: () =>
    _t(
      translations.HomePage.errors.unexpected,
      'An error has occurred! Try again later...',
    ),
  wrongName: () =>
    _t(translations.HomePage.errors.name, 'There is an error in Name'),
};
