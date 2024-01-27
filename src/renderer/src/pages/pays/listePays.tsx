// @ts-nocheck
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { classNames } from 'primereact/utils';
import { IoChevronDownSharp } from 'react-icons/io5';

import { NouveauPaysForm } from '@renderer/components/nouveauPaysForm';
import { TablePays } from '@renderer/components/tables/tablePays';
import { LoaderContext } from '@renderer/hooks/loader';
import {
  Pays,
  supabase,
} from '@renderer/repository/connection';

// eslint-disable-next-line react/prop-types
export default function ListePays() :JSX.Element {
    const [showNouveau, setShowNouveau] = useState(false);
    const [paysData  , setPaysData] = useState<Pays[]>(null)
    const {isLoading , changeLoadingState} = useContext(LoaderContext)

    const getPays =  useCallback(
        async ()=>{
            let { data: pays, error } = await supabase
            .from('pays')
            .select('*')
            const tempData : Pays[] = []
            pays.map((value)=>{
                tempData.push({
                    capital : value.nom_capital , 
                    code : value.code_pays ,
                    devise : value.devise , 
                    nom : value.nom_pays ,
                })
            })
            setPaysData(tempData)
        }  , [])


    useEffect(()=>{
        supabase.channel('custom-get-pays-channel').on( 'postgres_changes', { event: '*', schema: 'public', table: 'pays' },
            (payload) => {
                console.log("paylload : " , payload)
                getPays()
            }
        ).subscribe()
    } , [])

    useEffect(()=>{
        changeLoadingState(true)
        console.log("en cours d'execution")
        getPays()
    } , [])

    useEffect(()=>{
        if(paysData){
            changeLoadingState(false)
        }
    } , [paysData])

    const toggleForm = ()=>{
        setShowNouveau(!showNouveau)
    }

    
    return (
        <div className='flex flex-col h-[470px] space-y-4  overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
            <h3 className='flex flex-row w-full font-light px-[20px] uppercase text-[#5f6163]'>Gestion des paramètres du pays</h3>

            <div className='flex flex-col px-[20px]'>
                {/* nouveau pays header */}
                <div className="flex flex-row w-full h-[30px]" onClick={toggleForm}>
                    <div className='flex flex-row w-full justify-between items-center bg-[#7b3535] px-2 '>
                        <p className='text-lg font-light text-[#eff3f8]'>Enregistrer un nouveau pays </p>
                        <IoChevronDownSharp size={25} color={'#eff3f8'} className={classNames({'rotate-180' : showNouveau})}/>
                    </div>
                </div>
                {/* formulaire de nouveau pays */}
                {showNouveau && <NouveauPaysForm  show={showNouveau} setShow={setShowNouveau} />}
            </div>
            {/* table*/}
            <div className='flex flex-row px-[20px]'>
                <TablePays  data={paysData}/>
            </div>
        </div>
    )
}
