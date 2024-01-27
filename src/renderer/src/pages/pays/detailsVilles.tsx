// @ts-nocheck
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { BsFillPencilFill } from 'react-icons/bs';
import {
  FaArrowLeft,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { TableQuartier } from '@renderer/components/tables/tablePays';
import { LoaderContext } from '@renderer/hooks/loader';

export default function DetailVille({pays}) {
    
    const [expendDetails , setExpendDetails] = useState(true)
    const [activateEdition , setActivateEdition] = useState(false)
    const navigator = useNavigate()
    const {isLoading , changeLoadingState} = useContext(LoaderContext)

    useEffect(()=>{
        changeLoadingState(true)
        setTimeout(()=>{
            changeLoadingState(false)
        } , 800)
        
    } , [])

    return (
        <div className='flex h-[470px] flex-col px-[20px] flex-1 space-y-4 overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
            {/* header */}
            <div className='flex flex-row w-full justify-between items-center'>
                 {/* left side */}
                <div className='flex flex-row w-[200px] space-x-2 items-center h-[60px]'>
                    <FaArrowLeft color={'#7b3535'} onClick={()=>navigator(-1)} className='cursor-pointer' />
                    <h3 className='font-light uppercase text-[#5f6163]'>Détails de la ville</h3>
                </div>
                {/* right side */}
                <div className='flex flex-row w-[150px] h-[60px] items-center justify-end space-x-2'>
                    {expendDetails && <FaRegEyeSlash color={'#7b3535'} onClick={()=>setExpendDetails(false)}/>}
                    {!expendDetails && <FaRegEye color='#7b3535' onClick={()=>setExpendDetails(true)}/>}
                </div>
            </div>
            {/* les détails du pays */}
            {expendDetails && 
            <div className='flex flex-2 basis-[65%] h-[360px] flex-col items-center py-2 space-y-3 bg-[#fff]  border-[3px] border-[#cecbcb] rounded-md'>
                {/* titre */}
                <p className='flex flex-row text-[#e98033]'>Info Détails <BsFillPencilFill className='mx-2' onClick={()=>setActivateEdition(true)} /> </p>
                {/* nom pays */}
                <div>
                    <InputText
                    disabled={!activateEdition}
                    placeholder='nom de la ville'
                    value={"Kindia"}
                    pt={{
                        root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') } ,

                        }}
                    />
                    {/* {formValid && paysFormData.nom === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le nom est un champ bligatoire</p>} */}
                </div>
                {/* code pays */}
                
                {/* validation button */}
                {activateEdition &&
                    <div className='flex flex-row space-x-3 self-center'>
                    <Button label="Valider"
                    pt={{
                        root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
                    }}
                    />
                    <Button label="Annuler" 
                    onClick={()=>setActivateEdition(false)}
                    pt={{
                        root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
                    }}
                    />
                </div>
                }
            </div>
            }
            <h3 className='font-light uppercase text-[#5f6163] w-full text-center'>Les Quartiers de cette ville</h3>
            {/* les quartiers de cette ville */}
            <TableQuartier/>
        </div>
    )
}
