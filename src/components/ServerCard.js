import appConfig from '../../config.json';
import { Text, Box, Image } from "@skynexui/components";

export default function ServerCard({name, description, server_thumb, isSelected}){
    return (
        <Box
            title={description}
            styleSheet={{
                width: '50px',
                height: '50px',
                backgroundColor: appConfig.theme.colors.neutrals["900"],
                border: `3px solid ${appConfig.theme.colors.neutrals[(isSelected) ? "200" : "900"]}`,
                borderRadius: (isSelected) ? '15px' : '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                transition: 'ease-out .2s',
                hover: {
                    filter: 'brightness(.4)'
                }
            }}>

            { server_thumb && <Image src={server_thumb} styleSheet={{objectFit: 'cover'}}></Image> }
            { !server_thumb && (
                <Text src={server_thumb} tag='strong' styleSheet={{fontSize: '1rem'}}>
                    {name.split(' ').map((word) => word.substring(0, 1)).join(' ')}
                </Text>
            )}
        </Box>
    );
}