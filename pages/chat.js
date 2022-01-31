import { useRouter } from 'next/router';
import { useState } from 'react';
import appConfig from '../config.json';
import { ChatContext } from '../src/components/Contexts';
import ChatContainer from '../src/components/ChatContainer';
import ServersBar from "../src/components/ServersBar";
import { Box, Image, Button, Text } from '@skynexui/components';

export default function ChatPage() {
    const router = useRouter();
    const { username: loggedUser } = router.query;
    const [currentServer, setCurrentServer] = useState({id: 1, name: 'ImersãoReact'});

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
                    justifyContent: 'space-between',
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
                <Header username={loggedUser}
                    style={{
                        height: '10%'
                    }}/>
                <ChatContext.Provider value={{username: loggedUser, server: currentServer}}>
                    <Box
                        styleSheet={{
                            height: '90%',
                            display: 'flex',
                        }}>
                            <ServersBar
                                onServerChange={(server) => {
                                    setCurrentServer(server);
                                }}/>
                            <ChatContainer />
                    </Box>
                </ChatContext.Provider>
            </Box>
        </Box>
    )
}

function Header({username}) {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box styleSheet={{display: 'flex', alignItems: 'center'}} title='Seu perfil'>
                    <Image
                        styleSheet={{
                            height: '50px',
                            borderRadius: '50%',
                            marginRight: '16px'
                        }}
                        src={`https://github.com/${username}.png`}
                    />
                    <Text
                        variant="heading3"
                        tag='strong'
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals["050"],
                        }}
                    >
                        {username}
                    </Text>
                </Box>
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

