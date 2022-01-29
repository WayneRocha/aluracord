export async function fetchUser(username){
    const response = await fetch(`https://api.github.com/users/${username.trim()}`);
    return response.json();
}