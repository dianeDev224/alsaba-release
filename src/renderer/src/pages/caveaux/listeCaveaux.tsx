// @ts-nocheck
import {
  useContext,
  useEffect,
  useState,
} from 'react';

import { TableCaveaux } from '@renderer/components/tables/tableCaveaux';
import { LoaderContext } from '@renderer/hooks/loader';

export default function ListeCaveaux(){

    const [openNewForm ,  setOpenNewForm ] = useState(false)
    const [caveauxData , setCaveauxData] = useState()
    const {isLoading , changeLoadingState} = useContext(LoaderContext)
    useEffect(()=>{
        changeLoadingState(true)
        setTimeout(()=>{
            changeLoadingState(false)
            const data = [
                {
                    id : 1 , 
                    nom : "banque" , 
                    entrees : 1200 , 
                    sorties : 300 , 
                    solde : 900
                }
            ]
            setCaveauxData(data)
        } , 800)
    } , [])

    function toggleForm(){
        setOpenNewForm(!openNewForm)
    }

    return(
        <div className='flex flex-col h-[470px] space-y-4  overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
            <h3 className='flex flex-row w-full font-light px-[20px] uppercase text-[#5f6163]'>Etat des caveaux</h3>
            {/* table*/}
            <div className='flex flex-row px-[20px]'>
                <TableCaveaux  data={caveauxData}/>
            </div>
        </div>
    )
}