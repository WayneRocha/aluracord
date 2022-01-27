import { Box, Text, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../../config.json';

export default function MessageList({ messageList }) {
    console.log('MessageList', messageList);

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
                    if (!message) return <></>;

                    return (
                        <Text
                            key={message.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/vanessametonini.png`}
                                />
                                <Text tag="strong">
                                    {message.from}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date(message.timestamp).toLocaleDateString())}
                                </Text>
                            </Box>
                            {message.content}
                        </Text>
                    );
                })
            }
        </Box>
    );
}