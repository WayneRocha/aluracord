import { useRouter } from 'next/router';
import React, { useState, useContext } from 'react';
import appConfig from '../config.json';

import { fetchUser } from '../services/githubAPI';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { GithubProfileContext } from '../src/components/Contexts';
import GithubProfileCard from '../src/components/GithubProfileCard';
import Title from '../src/components/Title';


export default function PaginaInicial() {
  const [username, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [cardWrapper, setCardWrapper] = useState(true);
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

                if (username.length > 1) {
                  const userData = await fetchUser(event.target.value);
                  const userExists = userData.hasOwnProperty('login');

                  setUserProfile((userExists) ? userData : {});
                  setDetailsBtnEnable(userExists);
                }
              }}
              placeholder={'Usuario do GitHub'}
              fullWidth
              autoComplete="off"
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
              disabled={!detailsBtnEnable}
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {cardWrapper && (
              <>
                <Box styleSheet={{
                  display: 'flex',
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
                </Box>
                <Button
                  colorVariant="dark"
                  iconName="FaSearch"
                  label="detalhes"
                  rounded="none"
                  variant="tertiary"
                  size="xs"
                  styleSheet={{
                    margin: '10px',
                    color: appConfig.theme.colors.neutrals[200]
                  }}
                  disabled={!detailsBtnEnable}
                  onClick={() => {
                    setCardWrapper(!cardWrapper);
                  }}
                />
              </>
            )}

            {!cardWrapper && (
              <>
                <GithubProfileContext.Provider value={userProfile}>
                  <GithubProfileCard />
                </GithubProfileContext.Provider>
                <Button
                  colorVariant="dark"
                  iconName="FaArrowLeft"
                  label="voltar"
                  rounded="none"
                  variant="tertiary"
                  size="sm"
                  styleSheet={{
                    margin: '5px auto',
                    color: appConfig.theme.colors.neutrals[200]
                  }}
                  onClick={() => {
                    setCardWrapper(!cardWrapper);
                  }}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}