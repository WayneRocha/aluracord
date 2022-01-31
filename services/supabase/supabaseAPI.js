import { createClient } from '@supabase/supabase-js'
import API from '../supabase/supabase.json';

// Create a single supabase client for interacting with your database
const supabase = createClient(API.URL, API.ANON_PUBLIC_KEY);

export async function getServers(){

    const { data } = await supabase.from('servers')
        .select('*');
        
    return data;
}

export async function getMessages(serverId){

    const { data } = await supabase.from('messages')
        .select('*')
        .eq('server_id', serverId)
        .order('created_at', {ascending: false});
        
    return data;
}

export async function registerMessage(serverId, message){
    const { data, error } = await supabase
        .from('messages')
        .insert([{
            server_id: serverId,
            content: message.content,
            type: message.type,
            from: message.from,
        }]);
    return data[0];
}

export async function updateMessage(messageId, {content, type}){
    const { data, error } = await supabase
        .from('messages')
        .update({
            content: content,
            type: type,
        })
        .match({'message_id': messageId});
    return data[0];
}

export function addMessageListeners(serverId, listeners){
    supabase.from(`messages:server_id=eq.${serverId}`)
        .on('*', (data) => {
            if (listeners.hasOwnProperty('*'))
                listeners['*'](data.new);
        })
        .on('INSERT', (data) => {
            if (listeners.hasOwnProperty('INSERT'))
                listeners['INSERT'](data.new);
        })
        .on('UPDATE', (data) => {
            if (listeners.hasOwnProperty('UPDATE'))
                listeners['UPDATE'](data.new);
        })
        .on('DELETE', (data) => {
            if (listeners.hasOwnProperty('DELETE'))
                listeners['DELETE'](data.new);
        })
        .subscribe();
}
