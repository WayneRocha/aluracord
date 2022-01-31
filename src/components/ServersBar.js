import { getServers } from '../../services/supabase/supabaseAPI';
import { useState, useEffect, useContext } from 'react' ;
import appConfig from '../../config.json';
import { Box } from '@skynexui/components';
import { ChatContext } from './Contexts';
import ServerCard from "../components/ServerCard";

export default function ServersBar({onServerChange}){
    const { server: currentServer } = useContext(ChatContext);
    const [serversList, setServersList] = useState([]);

    useEffect(async() => {
        const serverlist = await getServers();
        setServersList(serverlist);
    }, []);
    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: 'min-content',
                height: '100%',
                backgroundColor: appConfig.theme.colors.neutrals[600],
                borderRadius: '20px',
                padding: '8px',
                margin: ' auto 16px auto 0px',
            }}
        >
            {
                serversList.map(server => {
                    return (
                        <Box
                            key={server.id}
                            styleSheet={{
                                margin: '4px auto'
                            }}
                            onClick={() => {
                                onServerChange(server);
                            }}
                        >
                            <ServerCard
                                name={server.name}
                                description={server.description}
                                server_thumb={server.server_thumb}
                                isSelected={currentServer.id === server.id}
                            />
                        </Box>
                    );
                })
            }
        </Box>
    );
}