import { Box } from '@skynexui/components';
import Message from './Message';
import React from 'react';
import appConfig from '../../config.json';

export default function MessageList({ messageListState }) {

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
                messageListState[0].map(message => {
                    if (!message.content.trim()) return <></>;

                    return (
                        <Message
                            isMine={true}
                            isDeleted={false}
                            key={message.id}
                            id={message.id}
                            content={message.content}
                            from={message.from}
                            timestamp={message.timestamp}
                            messageListState={messageListState}/>
                    );
                })
            }
        </Box>
    );
}