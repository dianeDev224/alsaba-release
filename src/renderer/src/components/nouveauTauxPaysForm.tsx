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

type PaysPourTaux= {
    nom: string;
    id: number;
};

export const NouveauTauxPaysForm = React.memo(({show , setShow}) => {

    console.log("RERENDERING : nouveau taux pays executed ")

    const [paysData , setPaysData] = useState<PaysPourTaux[]>(null)
    const [selectedPaysDepart, setSelectedPaysDepart] = useState<PaysPourTaux>(null);
    const [selectedPays, setSelectedPays] = useState(null);
    const [selectedPaysArriver, setSelectedPaysArriver] = useState(null);
    const [formValid , setFormValid] = useState(false)
    const {isLoading , changeLoadingState} = useContext(LoaderContext)
    const [TauxFormData , setTauxFormData] = useState({
        paysDepart : "" , 
        paysArriver : "" , 
        valeurTaux : ""   , 
     })
    
    const getPays =  useCallback(async ()=>{
        let { data: pays, error } = await supabase
        .from('pays')
        .select('*')
        const tempData : PaysPourTaux[] = []
        pays.map((value)=>{
            tempData.push({
                nom : value.nom_pays ,
                id : value.id , 
            })
            if(value.nom_pays.toLowerCase() === "maroc"){
                setSelectedPaysDepart({
                    nom : value.nom_pays ,
                    id : value.id , 
                })
                setTauxFormData({
                    ...TauxFormData , 
                    paysDepart : value.id
                })
            }
        })
        setPaysData(tempData)
    } , [])

    const insertRow = useCallback(async (tauxData) => {
        const { data : taux_echange , error } = await supabase
            .from('taux_echange')
            .select("*")
            .eq("id_pays_base" , tauxData.paysDepart)
            .eq("id_pays_destination" , tauxData.paysArriver)
            .limit(1);
            console.log("INSERT_ERROR : " , taux_echange)
        if(!error){
            if(taux_echange.length > 0){
                const { data  , error } = await supabase
                .from('taux_echange')
                .update({
                    taux: tauxData.valeurTaux,
                })
                .eq("id" , taux_echange[0].id )
                .select()
                console.log("INSERT_ERROR2 : " , error)
            }else{
                const { data : taux_echange , error } = await supabase
                .from('taux_echange')
                .insert({
                    id_pays_base: tauxData.paysDepart,
                    id_pays_destination: tauxData.paysArriver,
                    taux: tauxData.valeurTaux,
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
        if(TauxFormData.paysDepart !== "" && TauxFormData.paysArriver !== ""  && TauxFormData.valeurTaux !== ""){
            console.log("data is validate")
            await insertRow(TauxFormData)
            setTauxFormData({
                paysDepart : "" , 
                paysArriver : "" , 
                valeurTaux : ""   , 
             })
            setSelectedPaysArriver(null)
            setFormValid(false)
        }else{
            setFormValid(true)
        }
        changeLoadingState(false)
        setShow(false)
    }

    
    return (
        <div className={classNames('flex flex-1 flex-row space-x-8 py-3')}>
            {/* left side */}
            <div className='flex flex-2 basis-[65%] h-[350px] flex-col items-center py-5 space-y-10 bg-[#fff]  border-[3px] border-[#cecbcb] rounded-md'>
                {/* titre */}
                <p className='text-[#e98033]'>Nouveau Taux</p>
                {/* pays de base  */}
                <div className='flex flex-row space-x-5'>
                    <div className='flex flex-row space-x-2'>
                        <p>depart</p>
                        <Dropdown 
                            value={selectedPaysDepart} 
                            onChange={(e) => {
                                console.log(e.value)
                                setSelectedPaysDepart(e.value)
                                setTauxFormData({...TauxFormData , paysDepart : e.value.id})
                            }} 
                            options={paysData} optionLabel="nom" 
                            disabled={true}
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
                    <div className='flex flex-col'>
                        <div className='flex flex-row space-x-2'>
                            <p>arrivé</p>
                            <Dropdown 
                                value={selectedPaysArriver} 
                                onChange={(e) => {
                                    setSelectedPaysArriver(e.value)
                                    setTauxFormData({...TauxFormData , paysArriver : e.value.id})
                                }} 
                                options={paysData} optionLabel="nom" 
                                placeholder="selectionner" className="w-full md:w-14rem" 
                                pt={{
                                    root: { className: classNames('flex flex-row w-full justify-between px-1 border-[1px] rounded-sm w-[150px] text-[#838282]' ,  {'border-[#cecbcb]' :!formValid , 'border-[#8f1c1c]' : formValid && TauxFormData.paysArriver === ""}) },
                                    item: ({ context }) => ({
                                        className: context.selected ? 'bg-[#e98033]' : undefined
                                    }) , 
                                    panel : {className : 'bg-[#fff] shadow-xl p-4 cursor-pointer'}
                                }}
                                
                            />
                        </div>
                        {formValid && TauxFormData.paysArriver === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le pays d'arriver est un champ bligatoire</p>}
                    </div>
                </div>
                {/* Valeur du taux  */}
                <div>
                    <p>Valeur du taux(DH)</p>
                    <InputText
                    placeholder='valeur du taux'
                    value={TauxFormData.valeurTaux}
                    onChange={(e)=>setTauxFormData({...TauxFormData , valeurTaux : e.target.value})}
                    pt={{
                    root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]' , {'border-[#cecbcb]' : !formValid , 'border-[#8f1c1c]' : formValid && TauxFormData.valeurTaux ===""}) } , 
        
                    }}
                    keyfilter="money"
                    />
                    {formValid && TauxFormData.valeurTaux ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la valeur du taux est un champ bligatoire</p>}
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
                <p className='text-[#e98033]'>Recuperer le taux du marché</p>
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
})
