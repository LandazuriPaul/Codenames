import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { useStores } from '~/hooks';

import {
  MessageInputContainer,
  MessageInputField,
  MessageInputForm,
  MessageInputProps,
} from './messageInput.styles';

export const MessageInput: FC<{}> = observer(() => {
  const [message, setMessage] = useState<string>('');
  const { uiStore } = useStores();

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setMessage(event.target.value);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.keyCode === 13 && !event.shiftKey && message.length > 0) {
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
          inputProps={MessageInputProps}
          userColor={uiStore.userColor}
        />
        <IconButton
          disabled={message.length === 0}
          color={uiStore.userColor}
          type="submit"
          size="small"
        >
          <Send fontSize="inherit" />
        </IconButton>
      </MessageInputForm>
    </MessageInputContainer>
  );
});
