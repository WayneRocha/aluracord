import { Box, Text, Image, Icon } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../../config.json';

export default function Message({id, content, from, timestamp, photo}) {
    const [messageHover, setmessageHover] = useState(false);

    return (
        <Text
            key={id}
            tag="li"
            styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                }
            }}
            onMouseOver={() => setmessageHover(true)}
            onMouseLeave={() => setmessageHover(false)}
        >
            <Box
                styleSheet={{
                    display: 'flex',
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
                    src={`https://github.com/${photo}.png`}
                />
                <Text tag="strong">
                    {from}
                </Text>
                <Text
                    styleSheet={{
                        fontSize: '10px',
                        marginLeft: '8px',
                        color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                >
                    {(new Date(timestamp).toLocaleDateString())}
                </Text>
                <Icon 
                    name='FaPlus'
                    styleSheet={{
                        marginLeft: 'auto',
                        crossAxisAlignment: 'flex-start',
                        transform: 'rotate(45deg)',
                        color: (messageHover) ? appConfig.theme.colors.neutrals['400'] : 'transparent',
                        hover: {
                            color: appConfig.theme.colors.neutrals['300'],
                            cursor: 'pointer'
                        }
                    }}
                    onClick={(id) => {
                        
                    }}/>
            </Box>
            {content}
        </Text>
    );
}