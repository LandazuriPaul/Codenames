import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useContext,
  useState,
} from 'react';
import { IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { chatControlsContext } from '~/contexts';

import {
  MessageInputContainer,
  MessageInputField,
  MessageInputForm,
  MessageInputProps,
} from './messageInput.styles';

export const MessageInput: FC<{}> = () => {
  const [message, setMessage] = useState<string>('');
  const { activeTab, userColor } = useContext(chatControlsContext);

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
          userColor={activeTab === 0 ? 'default' : userColor}
        />
        <IconButton
          disabled={message.length === 0}
          color={activeTab === 0 ? 'default' : userColor}
          type="submit"
          size="small"
        >
          <Send fontSize="inherit" />
        </IconButton>
      </MessageInputForm>
    </MessageInputContainer>
  );
};
