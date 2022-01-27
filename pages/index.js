import { useRouter } from 'next/router';
import React, { useState } from 'react';
import appConfig from '../config.json';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import Title from '../src/components/Title';
import GithubProfileTag from '../src/components/GithubProfileTag';


export default function PaginaInicial() {
  const [username, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [avatarCardVisible, setAvatarCardVisible] = useState(true);
  const [detailsCardVisible, setDetailsCardVisible] = useState(false);
  const [detailsBtnEnable, setDetailsBtnEnable] = useState(userProfile.hasOwnProperty('login'));

  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://i.ytimg.com/vi/VRMLxozIvv4/maxresdefault.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            onSubmit={(event) => {
              event.preventDefault();
              router.push(`/chat?username=${userProfile.login}`);
            }}
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={async (event) => {
                setUserName(event.target.value)

                if (username.length > 2) {
                  const response = await fetch(`https://api.github.com/users/${event.target.value}`);
                  const userData = await response.json();
                  const userExists = userData.hasOwnProperty('login');

                  setUserProfile((userExists) ? userData : {});
                  setDetailsBtnEnable(userExists);
                }
              }}
              placeholder={'Usuario do GitHub'}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              minHeight: '240px',
            }}
          >
            <Box styleSheet={{
              display: (avatarCardVisible) ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                  transition: '1s easy-in-out'
                }}
                src={(userProfile.hasOwnProperty('avatar_url')) ?
                  userProfile.avatar_url :
                  'https://i.pinimg.com/originals/11/8e/6f/118e6f39fac9344d6589c84d5ee9e667.png'
                }
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {userProfile.login || ''}
              </Text>
              <Button
                colorVariant="dark"
                iconName="FaSearch"
                label="detalhes"
                rounded="none"
                variant="tertiary"
                size="xs"
                styleSheet={{
                  marginTop: '10px'
                }}
                disabled={!detailsBtnEnable}
                onClick={() => {
                  setAvatarCardVisible(false);
                  setDetailsCardVisible(true);
                }}
              />
            </Box>
            <Box
              styleSheet={{
                display: (detailsCardVisible) ? 'flex' : 'none',
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
                    height: '28px',
                    borderRadius: '50%',
                    marginRight: '6px'
                  }}
                  src={(userProfile.hasOwnProperty('avatar_url')) ?
                    userProfile.avatar_url :
                    'https://i.pinimg.com/originals/11/8e/6f/118e6f39fac9344d6589c84d5ee9e667.png'}
                />
                <Text
                  variant="body3"
                  htmlFor={`https://github.com/${userProfile.login}`}
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals["050"],
                  }}
                >
                  {userProfile.login || 'User not Found'}
                </Text>
              </Box>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[300],
                  marginBottom: '6px'
                }}
              >
                {(userProfile.type) ? `${userProfile.type} criado em ${new Date(userProfile.created_at).getFullYear()}` : ''}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[100],
                  marginBottom: '12px'
                }}
              >
                {userProfile.bio}
              </Text>
              <GithubProfileTag
                icon={{name: 'group', type: 'solid'}}
                label={'Followers'}
                value={userProfile.followers}
                link={`https://github.com/${userProfile.login}?tab=followers`}
              />
              <GithubProfileTag
                icon={{name: 'group', type: 'regular'}}
                label={'Following'}
                value={userProfile.following}
                link={`https://github.com/${userProfile.login}?tab=following`}
              />
              <GithubProfileTag
                icon={{name: 'book-bookmark', type: 'regular'}}
                label={'Repositories'}
                value={userProfile.public_repos}
                link={`https://github.com/${userProfile.login}?tab=repositories`}
              />
              <GithubProfileTag
                icon={{name: 'code-block', type: 'regular'}}
                label={'Gists'}
                value={userProfile.public_gists}
                link={`https://gist.github.com/${userProfile.login}`}
              />
              <GithubProfileTag
                icon={{name: 'mail-send', type: 'regular'}}
                label={'Email'}
                value={userProfile.email}
              />
              <GithubProfileTag
                icon={{name: 'user-pin', type: 'regular'}}
                label={'Blog'}
                value={userProfile.blog}
                link={`${userProfile.blog}`}
              />
              <GithubProfileTag
                icon={{name: 'map-pin', type: 'regular'}}
                label={'Location'}
                value={userProfile.location}
                link={`https://www.google.com/maps/place/${userProfile.location}`}
              />
              <GithubProfileTag
                icon={{name: 'buildings', type: 'regular'}}
                label={'Company'}
                value={userProfile.company}
              />
              <GithubProfileTag
                icon={{name: 'twitter', type: 'logo'}}
                label={'Twitter'}
                value={userProfile.twitter_username}
                link={`https://twitter.com/${userProfile.twitter_username}`}
              />
              <Button
                colorVariant="dark"
                iconName="FaArrowLeft"
                label="voltar"
                rounded="none"
                variant="tertiary"
                size="sm"
                styleSheet={{
                  margin: '5px auto'
                }}
                onClick={() => {
                  setAvatarCardVisible(true);
                  setDetailsCardVisible(false);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}