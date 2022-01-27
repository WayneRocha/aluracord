import { Router, useRouter } from 'next/router';
import Title from '../src/components/Title';
import { Button, Box, Text} from '@skynexui/components';
import appConfig from '../config.json';

export default function page404() {
  const router = useRouter();

  return (
    <>
      <video autoPlay muted loop>
        <source src={'https://github.com/WayneRocha/aluracord/blob/main/assets/404bg.mp4?raw=true'} type="video/mp4" />
      </video>
      <Box styleSheet={{margin: 'auto auto', zIndex: '2'}}>
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'space-around',
            flexDirection: 'column',
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: 'auto auto',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          <Title tag="h1">Oops! Parece que nos perdemos na neve!</Title>
          <Text variant="body2" styleSheet={{ marginBottom: '32px', marginTop: '4px', color: appConfig.theme.colors.neutrals[100] }}>
            Infelizmente a pagina que você procura não existe
          </Text>
          <Box styleSheet={{width: '50%'}}>
            <Button
                rounded="md"
                size="sm"
                type='submit'
                label='Página Inicial'
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
                onClick={() => {
                  router.push('/');
                }}
              />
          </Box>
        </Box>
      </Box>

      <style jsx>{`
        video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }        
        video::-webkit-media-controls {
            display: none !important;
        }
      `}</style>
    </>
  );
}