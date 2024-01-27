// @ts-nocheck
import {
  Pays,
  supabase,
} from '@renderer/repository/connection';

export async function getPays(){
    let { data: pays , error } = await supabase
    .from('pays')
    .select('*')
    return pays
}

export async function insertPays(data : Pays){
        
    const { data : pays, error } = await supabase
        .from('pays')
        .insert([
    { 
        nom_pays : data.nom , 
        nom_capital: data.capital ,
        code_pays: data.code ,
        devise: data.devise ,
        date_derniere_modif : Date.now()
    },
])
        .select()
    return pays
        
}