import { Box } from '@skynexui/components';
import Message from './Message';
import React, { useContext } from 'react';
import appConfig from '../../config.json';
import userContext from './UserContext';

export default function MessageList({ messageListState }) {
    const [messageList, setMessageList] = messageListState;
    const currentUser = useContext(userContext);

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {
                messageList.map(message => {
                    return (
                        <Message
                            isMine={message.from === currentUser}
                            key={message.message_id}
                            id={message.message_id}
                            content={message.content}
                            from={message.from}
                            timestamp={message.created_at}
                            messageType={message.type}
                            onDelete={(id) => {
                                const messageIndex = messageList.findIndex((message => message.message_id === id));
                                messageList[messageIndex].content = '*`Mensagem Deletada`*';

                                setMessageList([...messageList]);
                            }}
                        />
                    );
                })
            }
        </Box>
    );
}