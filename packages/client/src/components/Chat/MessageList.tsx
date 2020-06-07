import React, {
  FC,
  MutableRefObject,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import { ChatMessage } from '~/domain';

import { Message } from './Message';
import { MessageListContainer } from './messageList.styles';

interface MessageListProps {
  forwardRef: MutableRefObject<HTMLDivElement>;
  messageList: ChatMessage[];
}

export const MessageList: FC<MessageListProps> = ({
  messageList,
  forwardRef,
}) => {
  const [isBottomScrolled, setIsBottomScrolled] = useState<boolean>(false);

  useEffect(() => {
    const messageContainer = forwardRef.current;
    function detectBottomScroll(this: HTMLDivElement): void {
      if (this.scrollTop + this.clientHeight === this.scrollHeight) {
        setIsBottomScrolled(true);
      } else {
        setIsBottomScrolled(false);
      }
    }
    messageContainer.addEventListener('scroll', detectBottomScroll);
    return () => {
      messageContainer.removeEventListener('scroll', detectBottomScroll);
    };
  }, [forwardRef]);

  useEffect(() => {
    if (isBottomScrolled) {
      forwardRef.current.scrollTop = forwardRef.current.scrollHeight;
    }
  }, [forwardRef, isBottomScrolled, messageList]);

  function renderMessage({ ...chatMessage }: ChatMessage): ReactElement {
    return <Message key={chatMessage.message.timestamp} {...chatMessage} />;
  }

  return (
    <MessageListContainer forwardRef={forwardRef}>
      <ul>{messageList.map(renderMessage)}</ul>
    </MessageListContainer>
  );
};
