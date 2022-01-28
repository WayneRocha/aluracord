import { Box, Text} from '@skynexui/components';
import appConfig from '../../config.json';
import 'boxicons';

export default function GithubProfileTag({icon, label, value, link }) {
    if (!value) return (<></>);

    return (
        <>
            <a href={link} target={'_blank'}>
                <Box styleSheet={{
                    display: 'flex',
                    alignItems: 'baseline',
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    marginBottom: '2px',
                    borderRadius: '1000px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}>
                    {((icon.hasOwnProperty('name')) ?
                        <box-icon 
                            name={icon.name}
                            color={appConfig.theme.colors.neutrals[400]}
                            size='.7em'
                            type={icon.type || 'regular'}>
                        </box-icon>
                        :
                        <></>
                    )}
                    <Text
                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[300],
                            marginLeft: '4px'
                        }}
                    > 
                        <Box>{label}: {value}</Box>
                    </Text>
                </Box>
            </a>
            <style jsx>{`
                a {
                    text-decoration: none;
                    margin: 4px;
                }
            `}</style>
        </>
    );
}