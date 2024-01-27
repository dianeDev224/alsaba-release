// @ts-nocheck
import {
  useContext,
  useEffect,
  useState,
} from 'react';

import { classNames } from 'primereact/utils';
import { IoChevronDownSharp } from 'react-icons/io5';

import { NouveauCaveauxForm } from '@renderer/components/nouveauCaveauxForm';
import { TablePartenaire } from '@renderer/components/tables/tablePartenaire';
import { LoaderContext } from '@renderer/hooks/loader';

export default function PartenairesAlsaba(){
  
      const [openNewForm ,  setOpenNewForm ] = useState(false)
      const [showNouveau ,  setShowNouveau ] = useState(false)
      const [caveauxData , setCaveauxData] = useState()
      const {isLoading , changeLoadingState} = useContext(LoaderContext)
  
      useEffect(()=>{
          changeLoadingState(true)
          setTimeout(()=>{
              const data = [
                  {
                      id : 1 , 
                      nom : "Orange Money" , 
                      pseudo: "OM" , 
                  } , 
                  {
                      id : 2 , 
                      nom : "Mobile Money" , 
                      pseudo: "MoMo" , 
                  } , 
              ]
              setCaveauxData(data)
              changeLoadingState(false)
          } , 800)
      } , [])
  
      function toggleForm(){
          setShowNouveau(!showNouveau)
      }
  
      return(
          <div className='flex flex-col h-[470px] space-y-4  overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
              <h3 className='flex flex-row w-full font-light px-[20px] uppercase text-[#5f6163]'>Les Partenaires Alsaba</h3>
  
              <div className='flex flex-col px-[20px]'>
                  {/* nouveau pays header */}
                  <div className="flex flex-row w-full h-[30px]" onClick={toggleForm}>
                      <div className='flex flex-row w-full justify-between items-center bg-[#7b3535] px-2 '>
                          <p className='text-lg font-light text-[#eff3f8]'>Ajouter un nouveau partenaire </p>
                          <IoChevronDownSharp size={25} color={'#eff3f8'} className={classNames({'rotate-180' : openNewForm})}/>
                      </div>
                  </div>
                  {/* formulaire de nouveau pays */}
                  {showNouveau && <NouveauCaveauxForm  show={showNouveau} setShow={setShowNouveau} />}
              </div>
              {/* table*/}
              <div className='flex flex-row px-[20px]'>
                  <TablePartenaire  data={caveauxData}/>
              </div>
          </div>
      )
  }