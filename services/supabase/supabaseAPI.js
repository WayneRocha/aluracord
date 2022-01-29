import { createClient } from '@supabase/supabase-js'
import API from '../supabase/supabase.json';

// Create a single supabase client for interacting with your database
const supabase = createClient(API.URL, API.ANON_PUBLIC_KEY);

export async function getMessages(serverId){

    const { data } = await supabase.from('messages')
        .select('*')
        .eq('server_id', serverId)
        .order('created_at', {ascending: false});
        
    return data;
}

export async function registerMessage(serverId, message){
    const { data } = await supabase.from('messages')
        .insert([{
            server_id: serverId,
            content: message.content,
            type: message.type,
            from: message.from,
        }]);
    return data[0];
}
