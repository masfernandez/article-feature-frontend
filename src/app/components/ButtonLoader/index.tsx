import * as React from 'react';
import styled from 'styled-components/macro';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  onClick: any;
  loading: boolean;
  text?: string;
}

export function ButtonLoader({ onClick, loading, text = 'Enviar' }: Props) {
  return (
    <div style={{ marginTop: '60px' }}>
      <Button onClick={onClick} className="button" disabled={loading}>
        {text + ' '}
        {loading && <FontAwesomeIcon icon={faRefresh} spin={loading} />}
      </Button>
    </div>
  );
}

const Button = styled.button`
  background-color: #008cba; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
