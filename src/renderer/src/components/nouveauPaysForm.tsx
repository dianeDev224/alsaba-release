// @ts-nocheck
import React, {
  useContext,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { LoaderContext } from '@renderer/hooks/loader';
import { supabase } from '@renderer/repository/connection';

const paysData = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

export function NouveauPaysForm({show , setShow}) {

    const [selectedPays, setSelectedPays] = useState(null);
    const [formValid , setFormValid] = useState(false)
    const [paysFormData , setPaysFormData] = useState({
        nom : "" , 
        capital : "" , 
        devise : "" , 
        code : ""  
     })
     const {isLoading , changeLoadingState} = useContext(LoaderContext)


    async function submittForm(){
        changeLoadingState(true)
        if(paysFormData.capital !== "" && paysFormData.nom !== "" && paysFormData.devise !== "" && paysFormData.code !== ""){
            console.log("data is validate")
            const { data : pays, error } = await supabase
                .from('pays')
                .insert([
                { 
                    nom_pays : paysFormData.nom , 
                    nom_capital: paysFormData.capital ,
                    code_pays: paysFormData.code ,
                    devise: paysFormData.devise ,
                    // date_derniere_modif : Date.now()
                }]).select()
            if(!error){
                setPaysFormData({
                    nom : "" , 
                    capital : "" , 
                    devise : "" , 
                    code : ""  
                })
                setFormValid(false)
                setShow(false)
            }
            
        }else{
            setFormValid(true)
        }
        changeLoadingState(false)
    }

    return (
        <div className={classNames('flex flex-1 flex-row space-x-10 py-3')}>
            {/* left side */}
            <div className='flex flex-2 basis-[65%] h-[360px] flex-col items-center py-2 space-y-3 bg-[#fff]  border-[3px] border-[#cecbcb] rounded-md'>
                {/* titre */}
                <p className='text-[#e98033]'>Saisie Manuelle</p>
                {/* nom pays */}
                <div>
                    <InputText
                    placeholder='nom du pays'
                    value={paysFormData.nom}
                    onChange={(e)=>setPaysFormData({...paysFormData , nom : e.target.value})}
                    pt={{
                        root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid , 'border-[#8f1c1c]' : formValid && paysFormData.nom === "" }) } ,
                        }}
                    />
                    {formValid && paysFormData.nom === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le nom est un champ bligatoire</p>}
                </div>
                {/* code pays */}
                <div>
                    <InputText
                    placeholder='code du pays'
                    value={paysFormData.code}
                    onChange={(e)=>setPaysFormData({...paysFormData , code : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid  , 'border-[#8f1c1c]' : formValid && paysFormData.code  ===""}) } , 
        
                    }}/>
                    {formValid && paysFormData.code  ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le code est un champ bligatoire</p>}
                </div>
                {/* devise pays  */}
                <div>
                    <InputText
                    placeholder='devise du pays'
                    value={paysFormData.devise}
                    onChange={(e)=>setPaysFormData({...paysFormData , devise : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid  , 'border-[#8f1c1c]' : formValid && paysFormData.devise === ""}) } , 
        
                    }}
                    />
                    {formValid && paysFormData.devise === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la devise est un champ bligatoire</p>}
                </div>
                {/* capital du pays  */}
                <div>
                    <InputText
                    placeholder='capital du pays'
                    value={paysFormData.capital}
                    onChange={(e)=>setPaysFormData({...paysFormData , capital : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid , 'border-[#8f1c1c]' : formValid && paysFormData.capital ===""}) } , 
        
                    }}
                    />
                    {formValid && paysFormData.capital ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la capitale est un champ bligatoire</p>}
                </div>

                {/* validation button */}
                <div className='flex flex-row space-x-3 self-center'>
                    <Button label="Valider"
                    pt={{
                        root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
                    }}
                    onClick={submittForm}
                    />
                    <Button label="Annuler" 
                    pt={{
                        root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
                    }}
                    onClick={()=>setShow(false)}
                    />
                </div>
            </div>
            {/* right side */}
            <div className='flex flex-1 h-[200px] p-2 space-y-[10px] flex-col bg-[#fff] rounded-md border-[3px] border-[#cecbcb] items-center'>
                <p className='text-[#e98033]'>Saisie Automatique</p>
                <Dropdown 
                    value={selectedPays} 
                    onChange={(e) => setSelectedPays(e.value)} 
                    options={paysData} optionLabel="name" 
                    disabled={true}
                    placeholder="Selectionner un pays" className="w-full md:w-14rem" 
                    pt={{
                        root: { className: 'flex flex-row w-full justify-between px-1 border-[1px] rounded-sm border-[#cecbcb] w-[100px] text-[#838282] ' },
                        item: ({ context }) => ({
                            className: context.selected ? 'bg-[#e98033]' : undefined
                        }) , 
                        panel : {className : 'bg-[#fff] shadow-xl p-4 cursor-pointer'}
                    }}
                    
                    />
            </div>
        </div>
    )
    
}

