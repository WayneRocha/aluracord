import React, { useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { getMessages, registerMessage, addNewMessageListener } from '../services/supabase/supabaseAPI';
import { Box, Text, TextField, Button } from '@skynexui/components';
import SkeletonMessage from '../src/components/SkeletonMessage';
import MessageList from '../src/components/MessageList';
import ButtonSendSticker from '../src/components/ButtonSendSticker';
import { UserContext } from '../src/components/Contexts';

export default function ChatPage() {
    const router = useRouter();
    const { username: loggedUser } = router.query;
    const [ currentServer, setCurrentServer ] = useState(1);
    const [ message, setMessage ] = useState('');
    const [ messageList, setMessageList ] = useState([]);
    const [ showSkeletons, setShowSkeletons ] = useState(true);
    const sendMessageHandler = (server, messageContent, messageType) => {
        if (messageContent.length <= 0) return;

        registerMessage(server, {
            from: loggedUser,
            content: messageContent.trim(),
            type: messageType,
        });
    }
    const insertMessageInChat = (message) => {  
        setMessageList((messageList) => {
            return [ message, ...messageList ];
        });
        setMessage('');
    }

    React.useEffect(async() => {
        getMessages(currentServer).then(data => {
            setMessageList([...data]);
            setShowSkeletons(false);
        });
        addNewMessageListener((newMessage) => {
            insertMessageInChat(newMessage);
        });
    }, [currentServer]);
    
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

                    { showSkeletons && (
                        <>
                            <SkeletonMessage/>  
                            <SkeletonMessage/>  
                            <SkeletonMessage/>  
                            <SkeletonMessage/>  
                            <SkeletonMessage/>
                        </>
                    )}

                    { messageList && (
                        <UserContext.Provider value={router.query.username}>
                            <MessageList messageListState={[messageList, setMessageList]} />
                        </UserContext.Provider>
                    )
                    }

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
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
                                if (event.key === 'Enter' && (!event.shiftKey)){
                                    event.preventDefault();
                                    const messageType = 'message';
                                    sendMessageHandler(currentServer, message, messageType);
                                }
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(stickerUrl) => {
                                const messageType = 'sticker';
                                sendMessageHandler(currentServer, stickerUrl, messageType);
                            }}
                        />
                        <Button
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                margin: 'auto 10px'
                            }}
                            iconName="FaPaperPlane"
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                const messageType = 'message';
                                sendMessageHandler(currentServer, message, messageType);
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

