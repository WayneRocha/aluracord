import { Box, Text, TextField, Button } from '@skynexui/components';
import MessageList from '../src/components/MessageList';
import { useRouter } from 'next/router';
import React, { useState , useContext } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessageHandler = () => {
        if (message.length <= 0) return;
        const { username } = router.query;

        setMessageList([
            {
                id: messageList.length + 1,
                user: username,
                content: message.trim(),
                from: username,
                timestamp: Date.now(),
            },
            ...messageList
        ]);
        setMessage('');
    };
    

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.ytimg.com/vi/VRMLxozIvv4/maxresdefault.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px'
                    }}
                >

                    <MessageList messageList={messageList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            value={message}
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            onChange={(event) => {
                                setMessage(event.target.value)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter'){
                                    event.preventDefault();
                                    sendMessageHandler()
                                }
                            }}
                        />
                        <Button
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            iconName="FaPaperPlane"
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                sendMessageHandler();
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

