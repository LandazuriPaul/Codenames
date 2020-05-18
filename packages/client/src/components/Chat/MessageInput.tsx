import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
} from 'react';
import { IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import {
  MessageInputContainer,
  MessageInputField,
  MessageInputForm,
} from './messageInput.styles';

export const MessageInput: FC<{}> = () => {
  const [message, setMessage] = useState<string>('');

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setMessage(event.target.value);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      onMessageSubmit();
    }
  }

  function onMessageSubmit(event?: FormEvent<HTMLFormElement>): void {
    if (event) {
      event.preventDefault();
    }
    // TODO: send message
    setMessage('');
  }

  return (
    <MessageInputContainer elevation={2} square>
      <MessageInputForm onSubmit={onMessageSubmit}>
        <MessageInputField
          multiline
          value={message}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          placeholder="Send a message..."
          inputProps={{ style: { overflow: 'auto' } }}
        />
        <IconButton color="primary" type="submit" size="small">
          <Send fontSize="inherit" />
        </IconButton>
      </MessageInputForm>
    </MessageInputContainer>
  );
};
