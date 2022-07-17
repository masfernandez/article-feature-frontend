import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { TextButton } from './components/TextButton';
import { Input } from './components/Input';
// import { FormLabel } from '../../../components/FormLabel';
import { Title } from './components/Title';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectName,
  selectPath,
  selectUuid,
} from './slice/selectors';
import { useArticleFormSlice } from './slice';
import { LoginErrorType } from './slice/types';
import { ButtonLoader } from '../../../components/ButtonLoader';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Radio } from 'app/components/Radio';
const { v4: uuidv4 } = require('uuid');

export function ArticleForm() {
  const { t } = useTranslation();

  const { actions } = useArticleFormSlice();
  const dispatch = useDispatch();

  const name = useSelector(selectName);
  const uuidField = useSelector(selectUuid);
  const path = useSelector(selectPath);
  const formError = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (uuidField === '') {
      dispatch(actions.changeUuid(uuidv4()));
    }
    const hubUrl = 'http://localhost:52839/.well-known/mercure';
    const hub = new URL(hubUrl, window.origin);
    hub.searchParams.append('topic', 'https://example.com/books/{id}');
    const eventSource = new EventSource(hub);
    eventSource.onmessage = event => console.log(event);
  }, []);

  const onSubmit = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (isWrongName(name)) {
      dispatch(actions.onErrorForm(LoginErrorType.WRONG_NAME));
      return;
    }

    dispatch(actions.onErrorForm(LoginErrorType.NO_ERROR));
    dispatch(actions.createArticle());
  };

  const changeUuid = () => {
    dispatch(actions.changeUuid(uuidv4()));
  };

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeName(evt.currentTarget.value));
  };

  function isWrongName(name: string) {
    // todo
    return false;
  }

  const onBlurName = (evt: React.FocusEvent<HTMLInputElement>) => {
    const input = evt.currentTarget;
    const name = evt.currentTarget.value;
    if (isWrongName(name)) {
      input.setAttribute('style', 'color:red; border: 1px solid red;');
    } else {
      input.setAttribute('style', 'color:none; border: 1px solid green;');
    }
  };

  const formErrorMessage = (formError: LoginErrorType) => {
    switch (formError) {
      case LoginErrorType.NO_ERROR:
        return '';
      case LoginErrorType.WRONG_NAME:
        return t(...messages.wrongName());
      default:
        return t(...messages.unexpectedError());
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const path = event.target.value;
    dispatch(actions.changePath(path));
  };

  return (
    <Wrapper>
      <Title>{t(...messages.title())}</Title>
      {/*<FormGroup onSubmit={onSubmit}>*/}
      <InputWrapper>
        <Input
          disabled={true}
          type="text"
          placeholder="uuid"
          value={uuidField}
        />
        <button className="button" onClick={changeUuid}>
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </InputWrapper>

      <InputWrapper>
        <Input
          type="text"
          placeholder="name"
          onChange={onChangeName}
          onBlur={onBlurName}
        />
      </InputWrapper>

      <Radio
        id="service"
        label="/articles-domain-service"
        className="radio"
        name="language"
        onChange={handleLanguageChange}
        value="articles-domain-service"
        isSelected={path === 'articles-domain-service'}
      />
      <Radio
        id="repository"
        label="/articles-repository"
        className="radio"
        name="language"
        onChange={handleLanguageChange}
        value="articles-repository"
        isSelected={path === 'articles-repository'}
      />
      <Radio
        id="specification"
        label="/articles-specification"
        className="radio"
        name="language"
        onChange={handleLanguageChange}
        value="articles-specification"
        isSelected={path === 'articles-specification'}
      />

      {/*<InputWrapper>*/}
      {/*  <SubmitInput type="submit" value={t(...messages.submit())} />*/}
      {/*</InputWrapper>*/}
      <ButtonLoader
        onClick={onSubmit}
        loading={loading}
        text={t(...messages.submit())}
      ></ButtonLoader>
      {/*</FormGroup>*/}
      <ErrorText>{formErrorMessage(formError)}</ErrorText>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;

  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 400px;

  ${Input} {
    width: ${100}%;
    margin-right: 0.5rem;
  }
`;

// const FormGroup = styled.form`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 1rem;
//
//   ${FormLabel} {
//     margin-bottom: 0.25rem;
//     margin-left: 0.125rem;
//   }
// `;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

export const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0.625rem 0 1.5rem 0;
`;

// const SubmitInput = styled(Input)`
//   &:focus {
//     border-color: ${p => p.theme.textSecondary};
//     box-shadow: 0 0 0 0;
//   }
// `;
