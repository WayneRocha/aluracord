import { useContext } from 'react';
import { UserContext } from './Contexts';
import { updateMessage } from '../../services/supabase/supabaseAPI';
import { Box } from '@skynexui/components';
import Message from './Message';
import appConfig from '../../config.json';

export default function MessageList({ messageListState }) {
    const [messageList, setMessageList] = messageListState;
    const currentUser = useContext(UserContext);

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
                            isMine={message.from.toLowerCase() === currentUser.toLowerCase()}
                            key={message.message_id}
                            id={message.message_id}
                            content={message.content}
                            from={message.from}
                            timestamp={message.created_at}
                            messageType={message.type}
                            onDelete={(id) => {
                                const messageIndex = messageList.findIndex((message => message.message_id === id));

                                messageList[messageIndex].content = '*`Mensagem Deletada`*';
                                messageList[messageIndex].type = 'markdown';
                                updateMessage(messageList[messageIndex].message_id, {
                                    content: messageList[messageIndex].content,
                                    type: messageList[messageIndex].type
                                });
                                setMessageList([...messageList]);
                            }}
                        />
                    );
                })
            }
        </Box>
    );
}
