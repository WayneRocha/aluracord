import { useState, useEffect, useContext } from 'react';
import appConfig from '../../config.json';
import SkeletonMessage from '../components/SkeletonMessage';
import MessageList from '../components/MessageList';
import ButtonSendSticker from '../components/ButtonSendSticker';
import { ChatContext, UserContext } from '../components/Contexts';
import { getMessages, registerMessage, addMessageListeners } from '../../services/supabase/supabaseAPI';
import { Box, Text, TextField, Button } from '@skynexui/components';

export default function ChatContainer(){
    const chatContext = useContext(ChatContext);
    const loggedUser = chatContext.username;
    const currentServer = chatContext.server;
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [sendButtonEnable, setSendButtonEnable] = useState(message.length > 0);
    const [showSkeletons, setShowSkeletons] = useState(true);

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
            return [message, ...messageList];
        });
    }

    useEffect(async() => {
        setShowSkeletons(true);
        getMessages(currentServer.id).then(data => {
            setMessageList([...data]);
            setShowSkeletons(false);
        });

        addMessageListeners(currentServer.id, {
            "INSERT": newMessage => {
                insertMessageInChat(newMessage);
            },
            "UPDATE": messageUpdate => {
                setMessageList((liveMessageList) => {
                    const messageIndex = liveMessageList.findIndex((message => message.message_id === messageUpdate.message_id));
                    liveMessageList[messageIndex] = messageUpdate;
                    return [...liveMessageList];
                });
            }
        });
    }, [currentServer.id]);

    return (
        <Box
            styleSheet={{
                position: 'relative',
                display: 'flex',
                flex: 1,
                height: '100%',
                backgroundColor: appConfig.theme.colors.neutrals[600],
                flexDirection: 'column',
                borderRadius: '20px',
                padding: '16px'
            }}
        >
            <Box>
                <Text 
                    tag='strong'
                    variant="heading4"
                    styleSheet={{fontFamily: "'Open Sans', sans-serif", padding: '12px'}}
                >
                    {currentServer.name}
                </Text>
            </Box>
            <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flex: 1,
                    height: '100%',
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                    flexDirection: 'column',
                    borderRadius: '20px',
                    padding: '16px'
                }}
            >
                {showSkeletons && (
                    <>
                        <SkeletonMessage />
                        <SkeletonMessage />
                        <SkeletonMessage />
                        <SkeletonMessage />
                        <SkeletonMessage />
                    </>
                )}

                {messageList && (
                    <UserContext.Provider value={loggedUser}>
                        <MessageList messageListState={[messageList, setMessageList]} />
                    </UserContext.Provider>
                )}

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
                            fontFamily: "'Open Sans', sans-serif"
                        }}
                        onChange={(event) => {
                            setMessage(event.target.value);
                            setSendButtonEnable(event.target.value.length > 0);
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter' && (!event.shiftKey)) {
                                event.preventDefault();
                                const messageType = 'message';
                                sendMessageHandler(currentServer.id, message, messageType);
                                setMessage('');
                            }
                        }}
                    />
                    <ButtonSendSticker
                        onStickerClick={(stickerUrl) => {
                            const messageType = 'sticker';
                            sendMessageHandler(currentServer.id, stickerUrl, messageType);
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
                            margin: 'auto 10px',
                            borderRadius: '50%',
                            minWidth: '50px',
                            minHeight: '50px',
                            fontSize: '20px',
                            lineHeight: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        iconName="FaPaperPlane"
                        type="button"
                        disabled={!sendButtonEnable}
                        onClick={(event) => {
                            event.preventDefault();
                            const messageType = 'message';
                            sendMessageHandler(currentServer.id, message, messageType);
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}