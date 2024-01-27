// @ts-nocheck
import React, { useState } from 'react';

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

export default function DetailFraisPays({pays}) {
    
    const [expendDetails , setExpendDetails] = useState(true)
    const [activateEdition , setActivateEdition] = useState(false)
    const navigator = useNavigate()
    const fraisData = location.state?.fraisData;
    const [fraisFormData , setFraisFormData] = useState({
        paysDepart : fraisData.paysDepart , 
        paysArriver : fraisData.paysArriver , 
        typeFrais : fraisData.typeFrais , 
        typeOperation : fraisData.typeOperation , 
        borneInf : fraisData.borneInf , 
        borneSup : fraisData.borneSup , 
        valeurFrais : fraisData.valeurFrais   , 
     })

    return (
        <div className='flex h-[470px] flex-col px-[20px] space-y-4 overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
            {/* header */}
            <div className='flex flex-row w-full justify-between items-center'>
                 {/* left side */}
                <div className='flex flex-row w-[200px] space-x-2 items-center h-[60px]'>
                    <FaArrowLeft color={'#7b3535'} onClick={()=>navigator(-1)} className='cursor-pointer' />
                    <h3 className='font-light uppercase text-[#5f6163]'>Détails du Frais</h3>
                </div>
                {/* right side */}
                <div className='flex flex-row w-[150px] h-[60px] items-center justify-end space-x-2'>
                    {expendDetails && <FaRegEyeSlash color={'#7b3535'} onClick={()=>setExpendDetails(false)}/>}
                    {!expendDetails && <FaRegEye color='#7b3535' onClick={()=>setExpendDetails(true)}/>}
                </div>
            </div>
            {/* les détails du pays */}
            {expendDetails && 
            <div className='flex flex-2 basis-[65%] h-[420px] flex-col items-center py-2 space-y-3 bg-[#fff]  border-[3px] border-[#cecbcb] rounded-md'>
                {/* titre */}
                <div className='flex flex-row w-full justify-center items-center'>
                    <p className='flex flex-row text-[#e98033]'>Info Détails <BsFillPencilFill className='mx-2' onClick={()=>setActivateEdition(true)} /> </p>
                    <Button label="convertir dans ma monnaie locale"
                    pt={{
                        root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[300px] h-[40px] rounded-md ' }
                    }}
                    />
                </div>
                {/* nom pays */}
                <div>
                   <div className='flex flex-row space-x-3 items-center'>
                    <p className='text-[#938b8b]'>pays de depart</p>
                    <InputText
                        disabled={!activateEdition}
                        placeholder='pays de depart'
                        value={"Guinnée"}
                        pt={{
                            root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px] text-[#938b8b]') } ,

                            }}
                        />
                   </div>
                    {/* {formValid && paysFormData.nom === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le nom est un champ bligatoire</p>} */}
                </div>
                {/* nom pays */}
                <div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <p className='text-[#938b8b]'>pays d'arrivé</p>
                        <InputText
                        disabled={!activateEdition}
                        placeholder="pays d'arrivé"
                        value={"Mali"}
                        pt={{
                            root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') } ,

                            }}
                        />
                    </div>
                    {/* {formValid && paysFormData.nom === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le nom est un champ bligatoire</p>} */}
                </div>
                {/* code pays */}
                <div>
                    <div className='flex flex-row items-center space-x-2'>
                        <p className='text-[#938b8b]'>borne inférieure(DH)</p>
                        <InputText
                        placeholder='borne inferieure'
                        disabled={!activateEdition}
                        value={"224"}
                        pt={{
                        root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') } , 

            
                        }}/>
                    </div>
                    {/* {formValid && paysFormData.code  ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>le code est un champ bligatoire</p>} */}
                </div>
                {/* devise pays  */}
                <div>
                    <div className='flex flex-row items-center space-x-2'>
                        <p className='text-[#938b8b]'>borne supérieure(DH)</p>
                        <InputText
                        placeholder='borne superieure'
                        disabled={!activateEdition}
                        value={"335"}
                        pt={{
                        root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') } , 
            
                        }}
                        />
                    </div>
                    {/* {formValid && paysFormData.devise === "" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la devise est un champ bligatoire</p>} */}
                </div>
                {/* capital du pays  */}
                <div>
                    <div className='flex flex-row items-center space-x-2'>
                        <p className='text-[#938b8b]'>valeure du frais(DH)</p>
                        <InputText
                        placeholder='valeur du taux'
                        disabled={!activateEdition}
                        value={"10%"}
                        pt={{
                        root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px]') } , 
            
                        }}
                        />
                    </div>
                    {/* {formValid && paysFormData.capital ==="" && <p className='text-[10px] text-[#8f1c1c] font-bold'>la capitale est un champ bligatoire</p>} */}
                </div>

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
        </div>
    )
}
