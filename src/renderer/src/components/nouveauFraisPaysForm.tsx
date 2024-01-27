// @ts-nocheck

import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { LoaderContext } from '@renderer/hooks/loader';
import { supabase } from '@renderer/repository/connection';

const typeFrais = [
    { nom: 'Valeur Fixe', code: 0 },
    { nom: 'Pourcentage', code: 1 }
    
];

const typeOperation = [
    { nom: 'Dépôt', code: 0 },
    { nom: 'Transfert', code: 1 } , 
    { nom: 'Code Money', code: 2 } , 
    { nom: 'Code QR', code: 3 } , 
    { nom: 'Retrait', code: 4 } , 
    { nom: 'Virement', code: 5 }  
];

type PaysPourFrais= {
    nom: string;
    id: number;
};

export function NouveauFraisPaysForm({show , setShow}) {

    const [selectedPaysDepart, setSelectedPaysDepart] = useState(null);
    const [paysData , setPaysData] = useState<PaysPourFrais>()
    const [selectedPaysArriver, setSelectedPaysArriver] = useState(null);
    const [selectedTypeTaux, setSelectedTypeTaux] = useState(null);
    const [selectedTypeOperation, setSelectedTypeOperation] = useState(null);
    const [formValid , setFormValid] = useState(false)
    const {isLoading , changeLoadingState} = useContext(LoaderContext)
    const [fraisFormData , setFraisFormData] = useState({
        paysDepart : "" , 
        paysArriver : "" , 
        typeFrais : "" , 
        typeOperation : "" , 
        borneInf : "" , 
        borneSup : "" , 
        valeurFrais : ""   , 
     })

     const getPays =  useCallback(async ()=>{
        let { data: pays, error } = await supabase
        .from('pays')
        .select('*')
        const tempData : PaysPourFrais[] = []
        console.log("yes : " , pays)
        pays.map((value)=>{
            tempData.push({
                nom : value.nom_pays ,
                id : value.id , 
            })
        })
        setPaysData(()=>{
            console.log("data : " , tempData)
            return tempData
        })
    } , [])

    const insertRow = useCallback(async (fraisData) => {
        console.log("input inside insert : " , fraisData)
        const { data : frais_alsaba , error } = await supabase
            .from('frais_alsaba')
            .select("*")
            .eq("id_pays_depart" , fraisData.paysDepart)
            .eq("id_pays_arriver" , fraisData.paysArriver)
            .limit(1);
            console.log("INSERT_ERROR : " , error)
        if(!error){
            if(frais_alsaba.length > 0){
                const { data  , error } = await supabase
                .from('frais_alsaba')
                .update({
                    born_inf: fraisData.borneInf,
                    born_sup: fraisData.borneSup,
                    type_frais: fraisData.typeFrais,
                    type_operation: fraisData.typeOperation,
                    frais: fraisData.valeurFrais,
                })
                .eq("id" , frais_alsaba[0].id )
                .select()
                console.log("INSERT_ERROR : " , error)
            }else{
                const { data : frais_alsaba , error } = await supabase
                .from('frais_alsaba')
                .insert({
                    born_inf: fraisData.borneInf,
                    born_sup: fraisData.borneSup,
                    type_frais: fraisData.typeFrais,
                    type_operation: fraisData.typeOperation,
                    frais: fraisData.valeurFrais,
                    id_pays_depart : fraisData.paysDepart , 
                    id_pays_arriver : fraisData.paysArriver
                }).select()
                console.log("INSERT_ERROR : " , error)
            }
        }    

    } , [])

    useEffect(()=>{
        getPays()
    } , [])

    async function submittForm(){
        changeLoadingState(true)
        if(fraisFormData.paysDepart !== "" && fraisFormData.paysArriver !== "" && fraisFormData.typeFrais !== "" && fraisFormData.borneInf !== "" && fraisFormData.borneSup !=="" && fraisFormData.valeurFrais !== "" ){
            console.log("data is validate : " , fraisFormData)
            await insertRow(fraisFormData)
            setFraisFormData({
                paysDepart : "" , 
                paysArriver : "" , 
                typeFrais : "" , 
                type_operation : "" , 
                borneInf : "" , 
                borneSup : "" , 
                valeurFrais : ""   , 
             })
            setSelectedPaysDepart(null)
            setSelectedPaysArriver(null)
            setSelectedTypeTaux(null)
            setSelectedTypeOperation(null)
            setFormValid(false)
            
        }else{
            setFormValid(true)
        }
        changeLoadingState(false)
        setShow(false)
    }

    const TypeOperation = ()=>{
        return(
            <div className='flex flex-col '>
                <p>type d'opération</p>
                <Dropdown 
                    value={selectedTypeOperation} 
                    onChange={(e) => {
                        setSelectedTypeOperation(e.value)
                        setFraisFormData({...fraisFormData , typeOperation : e.value.code })
                    }} 
                    options={typeOperation} optionLabel="nom" 
                    placeholder="Selectionner un type" className="w-full md:w-14rem" 
                    pt={{
                        root: { className: classNames('flex flex-row w-full justify-between px-1 border-[1px] rounded-sm w-[150px] text-[#838282]' ,  {'border-[#cecbcb]' :!formValid , 'border-[#8f1c1c]' : formValid && fraisFormData.typeFrais === ""}) },
                        item: ({ context }) => ({
                            className: context.selected ? 'bg-[#e98033]' : undefined
                        }) , 
                        panel : {className : 'bg-[#fff] shadow-xl p-4 cursor-pointer'}
                    }}
                            
                />
                {formValid && fraisFormData.typeOperation  ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le type d'opération est un champ bligatoire</p>}
            </div>
        )
    }

    const TypeFrais = ()=>{
        return(
            <div className='flex flex-col '>
                <p>type de frais</p>
                <Dropdown 
                    value={selectedTypeTaux} 
                    onChange={(e) => {
                        setSelectedTypeTaux(e.value)
                        setFraisFormData({...fraisFormData , typeFrais : e.value.code })
                    }} 
                    options={typeFrais} optionLabel="nom" 
                    placeholder="Selectionner un type" className="w-full md:w-14rem" 
                    pt={{
                        root: { className: classNames('flex flex-row w-full justify-between px-1 border-[1px] rounded-sm w-[150px] text-[#838282]' ,  {'border-[#cecbcb]' :!formValid , 'border-[#8f1c1c]' : formValid && fraisFormData.typeFrais === ""}) },
                        item: ({ context }) => ({
                            className: context.selected ? 'bg-[#e98033]' : undefined
                        }) , 
                        panel : {className : 'bg-[#fff] shadow-xl p-4 cursor-pointer'}
                    }}
                            
                />
                {formValid && fraisFormData.typeFrais  ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le type du taux est un champ bligatoire</p>}
            </div>
        )
    }
    
    return (
        <div className={classNames('flex flex-1 flex-row space-x-8 py-3')}>
            {/* left side */}
            <div className='flex flex-1 h-[500px] flex-col items-center py-2 space-y-3 bg-[#fff]  border-[3px] border-[#cecbcb] rounded-md'>
                {/* titre */}
                <p className='text-[#e98033]'>Nouveau Frais</p>
                {/* pays de base  */}
                <div className='flex flex-row space-x-12'>
                    <div className='flex flex-col'>
                        <div className='flex flex-row space-x-2'>
                            <p>depart</p>
                            <Dropdown 
                                value={selectedPaysDepart} 
                                onChange={(e) => {
                                    console.log(e.value)
                                    setSelectedPaysDepart(e.value)
                                    setFraisFormData({...fraisFormData , paysDepart : e.value.id})
                                }} 
                                options={paysData}
                                optionLabel="nom" 
                                placeholder="selectionner" className="w-full md:w-14rem" 
                                pt={{
                                    root: { className: 'flex flex-row w-full justify-between px-1 border-[1px] rounded-sm border-[#cecbcb] w-[100px] text-[#838282] ' },
                                    item: ({ context }) => ({
                                        className: context.selected ? 'bg-[#e98033]' : undefined
                                    }) , 
                                    panel : {className : 'bg-[#fff] shadow-xl p-4 cursor-pointer'}
                                }}
                                
                            />
                        </div>
                        {formValid && fraisFormData.paysDepart === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le pays de depart est un champ bligatoire</p>}
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row space-x-2'>
                            <p>arrivé</p>
                            <Dropdown 
                                value={selectedPaysArriver} 
                                onChange={(e) => {
                                    setSelectedPaysArriver(e.value)
                                    setFraisFormData({...fraisFormData , paysArriver : e.value.id})
                                }} 
                                options={paysData} optionLabel="nom" 
                                placeholder="selectionner" className="w-full md:w-14rem" 
                                pt={{
                                    root: { className: classNames('flex flex-row w-full justify-between px-1 border-[1px] rounded-sm w-[150px] text-[#838282]' ,  {'border-[#cecbcb]' :!formValid , 'border-[#8f1c1c]' : formValid && fraisFormData.paysArriver === ""}) },
                                    item: ({ context }) => ({
                                        className: context.selected ? 'bg-[#e98033]' : undefined
                                    }) , 
                                    panel : {className : 'bg-[#fff] shadow-xl p-4 cursor-pointer'}
                                }}
                                
                            />
                        </div>
                        {formValid && fraisFormData.paysArriver === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le pays d'arriver est un champ bligatoire</p>}
                    </div>
                </div>
                <div className="flex flex-row space-x-12">
                    <TypeFrais/>
                    <TypeOperation/>
                </div>
                
                {/* born sup  */}
                <div>
                    <p>Borne inferieur(DH)</p>
                    <InputText
                    placeholder='valeur de la borne'
                    value={fraisFormData.borneInf}
                    onChange={(e)=>setFraisFormData({...fraisFormData , borneInf : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid , 'border-[#8f1c1c]' : formValid && fraisFormData.borneInf ===""}) } , 
        
                    }}
                    keyfilter="money"
                    />
                    {formValid && fraisFormData.borneInf ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la valeur du taux est un champ bligatoire</p>}
                </div>
                {/* born inf  */}
                <div>
                    <p>Borne superieur(DH)</p>
                    <InputText
                    placeholder='valeur de la borne'
                    value={fraisFormData.borneSup}
                    onChange={(e)=>setFraisFormData({...fraisFormData , borneSup : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid , 'border-[#8f1c1c]' : formValid && fraisFormData.borneSup ===""}) } , 
        
                    }}
                    keyfilter="money"
                    />
                    {formValid && fraisFormData.borneSup ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la borne supeireure est un champ bligatoire</p>}
                </div>
                {/* Valeur du Frais  */}
                <div>
                    <p>Valeur du Frais(DH)</p>
                    <InputText
                    placeholder='valeur du taux'
                    value={fraisFormData.valeurFrais}
                    onChange={(e)=>setFraisFormData({...fraisFormData , valeurFrais : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid , 'border-[#8f1c1c]' : formValid && fraisFormData.valeurFrais ===""}) } , 
        
                    }}
                    keyfilter="money"
                    />
                    {formValid && fraisFormData.valeurFrais ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la valeur du taux est un champ bligatoire</p>}
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

        </div>
    )
}
