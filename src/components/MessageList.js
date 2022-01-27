import { Box } from '@skynexui/components';
import Message from './Message';
import React, { useContext } from 'react';
import appConfig from '../../config.json';

export default function MessageList({ messageList }) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {
                messageList.map(message => {
                    if (!message.content.trim()) return <></>;

                    return (
                        <Message
                            photo={message.user}
                            id={message.id}
                            content={message.content}
                            from={message.from}
                            timestamp={message.timestamp}/>
                    );
                })
            }
        </Box>
    );
}