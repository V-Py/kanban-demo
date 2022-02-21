import supabase from './supabase';
export function getUser() {
    return supabase.auth.user();
}
export async function signIn(email) {
    const { user, error } = await supabase.auth.signIn({
        email
    });
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
// export async function saveGanttProperties(){
//     const {first_name, last_name, gender='undefined', birth_date='1901-01-01'} = userInfos;
//     const full_name = `${first_name} ${last_name}`;
//     console.log('ADD USER INFOS FUNCTION', uid, 'USER INFOS', userInfos);
//     const { data, error } = await supabase
//     .from('profiles')
//     .update({ first_name, last_name, full_name, birth_date, gender})
//     .eq('uid', uid )
//     console.log('RESULT UPDATE', data);
//     console.log('ERROR UPDATE', error);
//     return {data, error}
// }
export async function getGanttProperties() {
    let { data, error } = await supabase
        .from('gantt_props')
        .select('*')
        .order('id', { ascending: true });
    return { data, error };
}
//# sourceMappingURL=services.js.map