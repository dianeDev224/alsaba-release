// @ts-nocheck
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { classNames } from 'primereact/utils';
import { IoChevronDownSharp } from 'react-icons/io5';

import {
  NouveauFraisPaysForm,
} from '@renderer/components/nouveauFraisPaysForm';
import { TableFraisPays } from '@renderer/components/tables/tablePays';
import { LoaderContext } from '@renderer/hooks/loader';
import { supabase } from '@renderer/repository/connection';

export default function FraisPays() {
    const [showNouveau, setShowNouveau] = useState(false);
    const [fraisData  , setFraisData] = useState<[]>(null)
    const {isLoading , changeLoadingState} = useContext(LoaderContext)

    const toggleForm = ()=>{
        setShowNouveau(!showNouveau)
    }
    useEffect(()=>{
        changeLoadingState(true)
        setTimeout(()=>{
            changeLoadingState(false)
        } , 800)
      } , [])

    const getFraisData = async () => {
        const getPaysData = async(id_pays)=>{
            const { data: pays, error } = await supabase
                    .from('pays')
                    .select('*')
                    .eq("id", id_pays)
                    .limit(1);
    
                if (error) {
                    console.error("Error fetching pays data:", error);
                    return [];
                }
                return pays
        }
        try {
            const { data: frais_alsaba, error } = await supabase
                .from('frais_alsaba')
                .select('*');
    
            if (error) {
                console.error("Error fetching taux_echange data:", error);
                return;
            }
            
    
            const promises = frais_alsaba.map(async (value) => {
                let pays_depart = null
                let pays_arriver = null
                pays_depart = await getPaysData(value.id_pays_depart)
                pays_arriver = await getPaysData(value.id_pays_arriver)
                return { paysDepart: pays_depart[0] , pays_arriver : pays_arriver[0] ,   fraisData: value };
            });
    
            const result = await Promise.all(promises);
    
            const tempPaysData = result.map((data) => {
                return {
                    id : data.fraisData.id , 
                    paysDepart : data.paysDepart.nom_pays , 
                    paysArriver : data.pays_arriver.nom_pays , 
                    typeFrais : data.fraisData.type_frais , 
                    typeOperation : data.fraisData.type_operation , 
                    borneInf : data.fraisData.born_inf , 
                    borneSup : data.fraisData.born_sup , 
                    valeurFrais : data.fraisData.frais
                }
            });
    
            setFraisData((fraisData)=>{
              return tempPaysData
            });
        } catch (error) {
            console.error("Error in getTauxData:", error);
        }
    };

    useEffect(()=>{
        supabase.channel('custom-get-frais-channel').on( 'postgres_changes', { event: '*', schema: 'public', table: 'frais_alsaba' },
            (payload) => {
                console.log("paylload : " , payload)
                getFraisData()
            }
        ).subscribe()
    } , [])

    useEffect(()=>{
        changeLoadingState(true)
        console.log("en cours d'execution")
        getFraisData()
      } , [])

    useEffect(()=>{
        if(fraisData){
            console.log("Data after state change: ", fraisData);
            changeLoadingState(false)
        }
    } , [fraisData])
    
    
  

    
    return (
        <div className='flex flex-col h-[470px] space-y-4  overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
            <h3 className='flex flex-row w-full font-light px-[20px] uppercase text-[#5f6163]'>Gestion des Frais</h3>

            <div className='flex flex-col px-[20px]'>
                {/* nouveau pays header */}
                <div className="flex flex-row w-full h-[30px]" onClick={toggleForm}>
                    <div className='flex flex-row w-full justify-between items-center bg-[#7b3535] px-2 '>
                        <p className='text-lg font-light text-[#eff3f8]'>ajout d'un nouveau Frais</p>
                        <IoChevronDownSharp size={25} color={'#eff3f8'} className={classNames({'rotate-180' : showNouveau})}/>
                    </div>
                </div>
                {/* formulaire de nouveau pays */}
                {showNouveau && <NouveauFraisPaysForm  show={showNouveau} setShow={setShowNouveau} />}
            </div>
            {/* table*/}
            <div className='flex flex-row px-[20px]'>
                <TableFraisPays data={fraisData}  />
            </div>
            {/* ville */}
        </div>
    )
}
