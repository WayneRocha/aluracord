import React, { useContext } from 'react';
import appConfig from '../../config.json';
import { GithubProfileContext } from './Contexts';
import GithubProfileTag from './GithubProfileTag';
import { Box, Text, Image } from '@skynexui/components';


export default function GithubProfileCard({profileObj}) {
    const profile = (profileObj) ? profileObj : useContext(GithubProfileContext);

    return (
        <Box>
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                    overflowX: 'hidden'
                }}>
                <Box styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px'
                }}>
                    <Image
                        styleSheet={{
                            height: '40px',
                            borderRadius: '50%',
                            marginRight: '6px'
                        }}
                        src={(profile.hasOwnProperty('avatar_url')) ?
                            profile.avatar_url :
                            'https://i.pinimg.com/originals/11/8e/6f/118e6f39fac9344d6589c84d5ee9e667.png'}
                    />
                    <Text
                        variant="body3"
                        tag='strong'
                        htmlFor={`https://github.com/${profile.login}`}
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals["050"],
                            fontSize: '1.1rem'
                        }}
                    >
                        {profile.login || 'User not Found'}
                    </Text>
                </Box>
                <Text
                    variant="body4"
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals[300],
                        marginBottom: '6px'
                    }}
                >
                    {(profile.type) ? `${profile.type} criado em ${new Date(profile.created_at).getFullYear()}` : ''}
                </Text>
                <Text
                    variant="body4"
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals[100],
                        marginBottom: '12px'
                    }}
                >
                    {profile.bio}
                </Text>
                <GithubProfileTag
                    icon={{ name: 'group', type: 'solid' }}
                    label={'Followers'}
                    value={profile.followers}
                    link={`https://github.com/${profile.login}?tab=followers`}
                />
                <GithubProfileTag
                    icon={{ name: 'group' }}
                    label={'Following'}
                    value={profile.following}
                    link={`https://github.com/${profile.login}?tab=following`}
                />
                <GithubProfileTag
                    icon={{ name: 'book-bookmark' }}
                    label={'Repositories'}
                    value={profile.public_repos}
                    link={`https://github.com/${profile.login}?tab=repositories`}
                />
                <GithubProfileTag
                    icon={{ name: 'code-block' }}
                    label={'Gists'}
                    value={profile.public_gists}
                    link={`https://gist.github.com/${profile.login}`}
                />
                <GithubProfileTag
                    icon={{ name: 'mail-send' }}
                    label={'Email'}
                    value={profile.email}
                />
                <GithubProfileTag
                    icon={{ name: 'user-pin' }}
                    label={'Blog'}
                    value={profile.blog}
                    link={`${profile.blog}`}
                />
                <GithubProfileTag
                    icon={{ name: 'map-pin' }}
                    label={'Location'}
                    value={profile.location}
                    link={`https://www.google.com/maps/place/${profile.location}`}
                />
                <GithubProfileTag
                    icon={{ name: 'buildings' }}
                    label={'Company'}
                    value={profile.company}
                />
                <GithubProfileTag
                    icon={{ name: 'twitter', type: 'logo' }}
                    label={'Twitter'}
                    value={profile.twitter_username}
                    link={`https://twitter.com/${profile.twitter_username}`}
                />
            </Box>
        </Box>
    );
}