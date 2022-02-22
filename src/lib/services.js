import supabase from './supabase';
export function getUser() {
    return supabase.auth.user();
}
export async function signIn(email) {
    const { user, error } = await supabase.auth.signIn({
        email
    });
    return { data: !error, error };
}
export async function signOut() {
    const { error } = await supabase.auth
        .signOut();
    return { data: !error, error };
}
export async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
    });
}
export async function saveGanttProperties({ uid, ganttProperties }) {
    const { columns = 'NULL', categories = 'NULL', props = 'NULL' } = ganttProperties;
    console.log('ADD USER INFOS FUNCTION', uid, 'USER INFOS', ganttProperties, 'COLUMNS', columns, 'categories', categories, 'props', props);
    const { data, error } = await supabase
        .from('gantt_props')
        .update({ columns, categories, props })
        .eq('uid', uid);
    console.log('RESULT UPDATE', data);
    console.log('ERROR UPDATE', error);
    return { data, error };
}
export async function getGanttProperties() {
    let { data, error } = await supabase
        .from('gantt_props')
        .select('*')
        .order('id', { ascending: true });
    return { data, error };
}
//# sourceMappingURL=services.js.map