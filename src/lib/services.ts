import supabase from './supabase';

export function getUser(){
    return supabase.auth.user();
}

export async function signIn(email:string){
    const { user, error } = await supabase.auth.signIn({
        email
    })

    return {data:!error, error}
}

export async function signOut(){
    const {error} = await supabase.auth
        .signOut()
    return {data: !error, error}
}

export async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
    })
}

export async function saveGanttProperties({uid, ganttProperties}){
    const {columns='NULL', categories='NULL', props='NULL'} = ganttProperties;
    const { data, error } = await supabase
    .from('gantt_props')
    .update({columns, categories, props})
    .eq('uid', uid )
    return {data, error}
}

export async function getGanttProperties(){
    let {data, error} = await supabase
    .from('gantt_props')
    .select('*')
    .order('id', {ascending:true})
    return {data,error}
}