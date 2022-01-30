import { Box, Text, Image, Icon } from '@skynexui/components';
import { fetchUser } from '../../services/githubAPI';
import GithubProfileCard from '../components/GithubProfileCard';
import ReactMarkdown from 'react-markdown';
import React, { useState } from 'react';
import appConfig from '../../config.json';
import markdownCSS from '../styleSheets/markdown';

function getMessageContentComponent(type, data) {
    const types = {
        'message': content => {
            return (
                <>
                    <ReactMarkdown className='markdown-body'>{content}</ReactMarkdown>
                    <style jsx>{markdownCSS}</style>
                    <style jsx>{`
                        .markdown-body {
                            background-color: ${appConfig.theme.colors.neutrals[600]};
                        }
                        .markdown-body:hover {
                            background-color: ${appConfig.theme.colors.neutrals[700]};
                        }
                    `}</style>
                </>
            );
        },
        'sticker': content => {
            return <img src={content} style={{width: '250px', maxWidth: '50vw'}}></img>
        },
        'photo': ({ url }) => {
            return <Image src={url}></Image>
        },
        'document': () => {
            return <></>
        }
    }

    return types[type](data);
}

export default function Message(props) {
    const {
        id,
        content,
        messageType,
        from,
        timestamp,
        isMine,
        onDelete
    } = props;
    const [wrapCard, setWrapCard] = useState(false);
    const [githubProfile, setGithubProfile] = useState({});
    const [messageHover, setmessageHover] = useState(false);
    const handleClick = async() => {
        if (wrapCard) {
            setGithubProfile({});
            setWrapCard(!wrapCard);
            return;
        }
        const profile = await fetchUser(from);
        setGithubProfile(profile);
        setWrapCard(!wrapCard);
    }

    return (
        <>
            <Text
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
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                            hover: {
                                filter: 'brightness(.4)',
                            }
                        }}
                        src={`https://github.com/${from}.png`}
                        onMouseOver={()=>{}}
                        onMouseLeave={()=>{}}
                        onClick={handleClick}
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

                    {(isMine && content != '*`Mensagem Deletada`*') && (
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
                            onClick={() => onDelete(id)} />
                    )}
                </Box>

                {getMessageContentComponent(messageType, content)}

            </Text>
            {wrapCard && (
                <Box styleSheet={{display: 'absolute', top: 0, left: 0}}>
                    <Box
                        styleSheet={{
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            minHeight: 'min-content',
                            minWidth: 'min-content',
                            maxWidth: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                        >
                        <GithubProfileCard profileObj={githubProfile}/>
                    </Box>
                </Box>
            )}
        </>
    );
}