const notificationSounds = {
    default: new Audio('../sounds/notifications/default.mp3'),
}

export async function notify({soundName, volume = 0.3, onFail, onSucess}){
    const sound = notificationSounds[soundName];
    sound.volume = volume;

    try {
        sound.play();
        onSucess();
    } catch (DOMException){
        onFail();
    }
}