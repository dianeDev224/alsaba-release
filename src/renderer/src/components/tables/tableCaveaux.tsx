// @ts-nocheck

import React, {
  useCallback,
  useContext,
  useState,
} from 'react';

import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { BsExclamationTriangle } from 'react-icons/bs';
import {
  FaEye,
  FaTrash,
} from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { LoaderContext } from '@renderer/hooks/loader';
import { supabase } from '@renderer/repository/connection';

// tableau de etats des caveaux 
export  const TableCaveaux = React.memo(({data = []})=>{


    const [showDeleteMany , setShowDeleteMany] = useState(false)
    const [showDeleteOne , setShowDeleteOne] = useState(false)
    const [currentPays , setCurrentPays] = useState(null)
    const navigator = useNavigate()
    const [filters, setFilters] = useState({global: { value: null, matchMode: FilterMatchMode.CONTAINS },});
  
    
    const  deleteRow = useCallback(
      async(data : string)=>{
        const { error } = await supabase
        .from('pays')
        .delete()
        .eq('nom_pays', data.nom)  
        console.log("error : " , error)
      } , [])
  
    function ActionBodyTemplate(rowData){
      return(
        <div className='flex flex-row justify-center items-center space-x-3'>
          <FaEye className='cursor-pointer' color={'#7b3535'} onClick={()=>{
            navigator('/caveaux/details-liste-caveaux' , { state : {paysData : rowData} })
            }}/>
        </div>
      )
    }
  
    function tableHeader(){
      return(
          <div className='flex flex-row w-full items-center justify-between '>
            
          <div className="p-inputgroup">
              <InputText placeholder={"Chercher un caveaux"}
              value={filters.value}
              onChange={(e)=>{
                const value = e.target.value;
                let _filters = { ...filters };
  
                _filters['global'].value = value;
  
                setFilters(_filters);
                console.log("hello : " , filters)
              }}
              pt={{
                root: { className: 'w-[220px] h-[40px] text-[#838282]' }
              }}
              />
              <Button icon={<IoIosSearch />} 
                pt={{
                  root: { className: 'bg-[#c06935] :bg-[#c06935] text-[#fff] w-[40px] h-[40px] rounded-sm flex flex-row justify-center items-center' } , 
                  icon : {className : 'font-bold'} , 
                }}
              />
          </div>

        </div>
      )
    }
    
    return (
      <div className='flex flex-col flex-1 space-y-3 '>
        {/* table header */}
        <DataTable
          header={tableHeader} 
          value={data} 
          paginator 
          rows={10}
          filters={filters}
          stateStorage="session" stateKey="dt-state-demo-local"
          emptyMessage={<div className="flex flex-row w-full justify-center items-center"><p className="font-light text-[#827c7c]">aucun pays n'est trouvé</p></div>}
          pt={{
            table : {className : 'w-full border-[2px] border-[#e1dfd8] text-[#383838]'} , 
            thead : {className : 'w-full bg-[#aeaca4] text-[#eff3f8] rounded-sm border-[2px] border-[#e1dfd8] '} , 
            paginator : {
              root : {
                className : "flex flex-row justify-center" , 
              }  , 
              current : {
                className : "bg-[#7b3535]"
              }
  
            }
            
          }}
        >
            <Column field="nom" header="nom"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'} , 
                // filter : {className : 'bg-[#ff5]'}
              }}
            />
            <Column field="entrees" header="entrées"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
            <Column field="sorties" header="sorties"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
            <Column field="solde" header="solde"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'},
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
            <Column 
            header="Actions"
            pt={{
              headerCell : {className : 'border-[2px] border-[#e1dfd8]'},
              bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
            }}
            body={ActionBodyTemplate}
            />
        </DataTable>
        
        <DeleteManyConfirmation visible={showDeleteMany} setVisible={setShowDeleteMany}/>
        <DeleteOneConfirmation data={currentPays} deleteRow={deleteRow} visible={showDeleteOne} setVisible={setShowDeleteOne}/>
      </div>
    )
  
  })

// tableau de des infos du caveaux
export  const TableInfosCaveaux = React.memo(({data = []})=>{


    const [showDeleteMany , setShowDeleteMany] = useState(false)
    const [showDeleteOne , setShowDeleteOne] = useState(false)
    const [currentPays , setCurrentPays] = useState(null)
    const navigator = useNavigate()
    const [filters, setFilters] = useState({global: { value: null, matchMode: FilterMatchMode.CONTAINS },});
  
    
    const  deleteRow = useCallback(
      async(data : string)=>{
        const { error } = await supabase
        .from('pays')
        .delete()
        .eq('nom_pays', data.nom)  
        console.log("error : " , error)
      } , [])
  
    function ActionBodyTemplate(rowData){
      return(
        <div className='flex flex-row justify-center items-center space-x-3'>
          <FaTrash className='cursor-pointer' color={'#7b3535'} onClick={()=>{
            setCurrentPays(rowData)
            setShowDeleteOne(true)}
            }/>
        </div>
      )
    }
  
    function tableHeader(){
      return(
          <div className='flex flex-row w-full items-center justify-between '>
            
          <div className="p-inputgroup">
              <InputText placeholder={"Chercher un caveaux"}
              value={filters.value}
              onChange={(e)=>{
                const value = e.target.value;
                let _filters = { ...filters };
  
                _filters['global'].value = value;
  
                setFilters(_filters);
                console.log("hello : " , filters)
              }}
              pt={{
                root: { className: 'w-[220px] h-[40px] text-[#838282]' }
              }}
              />
              <Button icon={<IoIosSearch />} 
                pt={{
                  root: { className: 'bg-[#c06935] :bg-[#c06935] text-[#fff] w-[40px] h-[40px] rounded-sm flex flex-row justify-center items-center' } , 
                  icon : {className : 'font-bold'} , 
                }}
              />
          </div>
  
          <div className=''>
            <Button
            label = {"Supprimer tous" }
            icon = {<MdDelete/>}
            pt={{
                root : {
                    className : "flex flex-row items-center justify-center space-x-1  bg-[#7b3535] w-[150px] h-[45px] text-[#fff] font-light rounded-md"
                } , 
            }}
            onClick={()=>''}/>
          </div>
        </div>
      )
    }
    
    return (
      <div className='flex flex-col flex-1 space-y-3 '>
        {/* table header */}
        <DataTable
          header={tableHeader} 
          value={data} 
          paginator 
          rows={10}
          filters={filters}
          stateStorage="session" stateKey="dt-state-demo-local"
          emptyMessage={<div className="flex flex-row w-full justify-center items-center"><p className="font-light text-[#827c7c]">aucun pays n'est trouvé</p></div>}
          pt={{
            table : {className : 'w-full border-[2px] border-[#e1dfd8] text-[#383838]'} , 
            thead : {className : 'w-full bg-[#aeaca4] text-[#eff3f8] rounded-sm border-[2px] border-[#e1dfd8] '} , 
            paginator : {
              root : {
                className : "flex flex-row justify-center" , 
              }  , 
              current : {
                className : "bg-[#7b3535]"
              }
  
            }
            
          }}
        >
            <Column field="nom" header="nom"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'} , 
                // filter : {className : 'bg-[#ff5]'}
              }}
            />
            <Column field="pseudo" header="Nom abrégé"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
            <Column 
            header="Actions"
            pt={{
              headerCell : {className : 'border-[2px] border-[#e1dfd8]'},
              bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
            }}
            body={ActionBodyTemplate}
            />
        </DataTable>
        
        <DeleteManyConfirmation visible={showDeleteMany} setVisible={setShowDeleteMany}/>
        <DeleteOneConfirmation data={currentPays} deleteRow={deleteRow} visible={showDeleteOne} setVisible={setShowDeleteOne}/>
      </div>
    )
  
  })

// tableau de des historiques des caveaux 
export  const TableHistoriquesCaveaux = React.memo(({data = []})=>{


    const [showDeleteMany , setShowDeleteMany] = useState(false)
    const [showDeleteOne , setShowDeleteOne] = useState(false)
    const [currentPays , setCurrentPays] = useState(null)
    const navigator = useNavigate()
    const [filters, setFilters] = useState({global: { value: null, matchMode: FilterMatchMode.CONTAINS },});
  
    
    const  deleteRow = useCallback(
      async(data : string)=>{
        const { error } = await supabase
        .from('pays')
        .delete()
        .eq('nom_pays', data.nom)  
        console.log("error : " , error)
      } , [])

  
    function tableHeader(){
      return(
          <div className='flex flex-row w-full items-center justify-between '>
            
          <div className="p-inputgroup">
              <InputText placeholder={"Chercher une historique"}
              value={filters.value}
              onChange={(e)=>{
                const value = e.target.value;
                let _filters = { ...filters };
  
                _filters['global'].value = value;
  
                setFilters(_filters);
                console.log("hello : " , filters)
              }}
              pt={{
                root: { className: 'w-[220px] h-[40px] text-[#838282]' }
              }}
              />
              <Button icon={<IoIosSearch />} 
                pt={{
                  root: { className: 'bg-[#c06935] :bg-[#c06935] text-[#fff] w-[40px] h-[40px] rounded-sm flex flex-row justify-center items-center' } , 
                  icon : {className : 'font-bold'} , 
                }}
              />
          </div>
  
          <div className=''>
            <Button
            label = {"Supprimer tous" }
            icon = {<MdDelete/>}
            pt={{
                root : {
                    className : "flex flex-row items-center justify-center space-x-1  bg-[#7b3535] w-[150px] h-[45px] text-[#fff] font-light rounded-md"
                } , 
            }}
            onClick={()=>''}/>
          </div>
        </div>
      )
    }
    
    return (
      <div className='flex flex-col flex-1 space-y-3 '>
        {/* table header */}
        <DataTable
          header={tableHeader} 
          value={data} 
          paginator 
          rows={10}
          filters={filters}
          stateStorage="session" stateKey="dt-state-demo-local"
          emptyMessage={<div className="flex flex-row w-full justify-center items-center"><p className="font-light text-[#827c7c]">aucun pays n'est trouvé</p></div>}
          pt={{
            table : {className : 'w-full border-[2px] border-[#e1dfd8] text-[#383838]'} , 
            thead : {className : 'w-full bg-[#aeaca4] text-[#eff3f8] rounded-sm border-[2px] border-[#e1dfd8] '} , 
            paginator : {
              root : {
                className : "flex flex-row justify-center" , 
              }  , 
              current : {
                className : "bg-[#7b3535]"
              }
  
            }
            
          }}
        >
            <Column field="date" header="date"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'} , 
              }}
            />
            <Column field="entrees" header="entrées"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
            <Column field="soties" header="sorties"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
            <Column field="soldes" header="soldes"
              pt={{
                headerCell : {className : 'border-[2px] border-[#e1dfd8]'} , 
                bodyCell : {className : 'border-[2px] border-[#e1dfd8] text-center'}
              }}
            />
        </DataTable>
        
        <DeleteManyConfirmation visible={showDeleteMany} setVisible={setShowDeleteMany}/>
        <DeleteOneConfirmation data={currentPays} deleteRow={deleteRow} visible={showDeleteOne} setVisible={setShowDeleteOne}/>
      </div>
    )
  
  })



const DeleteOneConfirmation = React.memo(({deleteRow , data ,  visible=false , setVisible}) : JSX.Element=>{

    console.log("data setted : " , data)
    const {isLoading , changeLoadingState} = useContext(LoaderContext)
    
    const DialogFooter = () : JSX.Element =>{
        return(
            <div className='flex flex-row space-x-[20px] w-full justify-center'>
                <Button label="Valider"
                type="button"
                  pt={{
                      root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' } , 
                  }}
                  onClick={()=>{
                    changeLoadingState(true)
                    deleteRow(data)
                    setVisible(false)
                    setTimeout(()=>{
                      changeLoadingState(false)
                    } , 8000)
                  }}
                />
                <Button label="Annuler" 
                  pt={{
                      root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
                  }}
                  onClick={()=>setVisible(false)}
                />
            </div>
        )
    }
    const DialogHeader = () : JSX.Element=>{
        return(
            <div className='flex flex-row h-[30px] items-center space-x-2'>
                <BsExclamationTriangle color='red'/>
                <h6 className='font-bold'>Suppression En Cours</h6>
            </div>
        )
    }
    return(
        <Dialog header={DialogHeader} 
         visible={visible} 
         pt={{
          root : {className : 'flex flex-col bg-[#fff] shadow-xl w-[400px] h-[150px] justify-center items-center'} , 
          header : {className : 'flex flex-row space-x-3'}
         }}
         onHide={() => setVisible(false)} className=''>
            <form className="flex flex-col space-y-[10px]">
               <p className='font-semibold'>voulez vous supprimer cette ligne ? </p>
                <DialogFooter/>
            </form>
        </Dialog>
    )
  })



  function DeleteManyConfirmation({visible=false , setVisible} ) : JSX.Element{

    const DialogFooter = () : JSX.Element =>{
        return(
            <div className='flex flex-row space-x-[20px] w-full justify-center'>
                <Button label="Valider"
                  pt={{
                      root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' } , 
                  }}
                />
                <Button label="Annuler" 
                  pt={{
                      root: { className: 'bg-[#7b3535] text-[#cecbcb]  w-[100px] h-[40px] rounded-md' }
                  }}
                  onClick={()=>setVisible(false)}
                />
            </div>
        )
    }
    const DialogHeader = () : JSX.Element=>{
        return(
            <div className='flex flex-row h-[30px] items-center space-x-2'>
                <BsExclamationTriangle color='red'/>
                <h6 className='font-bold'>Suppression En Cours</h6>
            </div>
        )
    }
    return(
        <Dialog header={DialogHeader} 
         visible={visible} 
         pt={{
          root : {className : 'flex flex-col bg-[#fff] shadow-xl w-[400px] h-[150px] justify-center items-center'} , 
          header : {className : 'flex flex-row space-x-3'}
         }}
         onHide={() => setVisible(false)} className=''>
            <form className="flex flex-col space-y-[10px]">
               <p className='font-semibold'>voulez vous supprimer toute la selection ? </p>
                <DialogFooter/>
            </form>
        </Dialog>
    )
  }