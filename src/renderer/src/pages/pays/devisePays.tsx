// @ts-nocheck
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { IoChevronDownSharp } from 'react-icons/io5';

import { TauxEchange } from '@renderer/components/graphiques/paysTauxEchange';
import { NouveauTauxPaysForm } from '@renderer/components/nouveauTauxPaysForm';
import { LoaderContext } from '@renderer/hooks/loader';
import { supabase } from '@renderer/repository/connection';

export default function DevisePays() {
  const [showNouveau , setShowNouveau] = useState(false)
  const {isLoading , changeLoadingState} = useContext(LoaderContext)
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    scales: {
        y: {
            beginAtZero: true
        }
    }
  });

  const getTauxData = async () => {
    try {
        const { data: taux_echange, error } = await supabase
            .from('taux_echange')
            .select('*');

        if (error) {
            console.error("Error fetching taux_echange data:", error);
            return;
        }

        const promises = taux_echange.map(async (value) => {
            const { data: pays, error } = await supabase
                .from('pays')
                .select('*')
                .eq("id", value.id_pays_destination)
                .limit(1);

            if (error) {
                console.error("Error fetching pays data:", error);
                return null;
            }

            return { paysData: pays[0], tauxData: value };
        });

        const result = await Promise.all(promises);

        const tempPaysData = result.map(({ paysData }) => paysData.nom_pays + '(' + paysData.devise + ')');
        const tempTauxData = result.map(({ tauxData }) => tauxData.taux);

        setChartData((chartData)=>{
          console.log("Data after state change: ", chartData);
          return {
            labels: tempPaysData,
            datasets: [
                {
                    label: 'Taux(DH)',
                    data: tempTauxData ,
                    backgroundColor: '#7b3535',
                    borderColor: '#877777',
                    borderWidth: 1,
                }
            ]
        }
        });

        console.log("Data after state change: ", chartData);
    } catch (error) {
        console.error("Error in getTauxData:", error);
    }
};


  useEffect(()=>{
    supabase.channel('custom-get-taux-echange-channel').on( 'postgres_changes', { event: '*', schema: 'public', table: 'taux_echange' },
        (payload) => {
            console.log("paylload : " , payload)
            getTauxData()
        }
    ).subscribe()
  } , [])

  useEffect(()=>{
    changeLoadingState(true)
    console.log("en cours d'execution")
    getTauxData()
  } , [])

  useEffect(()=>{
    if(chartData){
        changeLoadingState(false)
    }
} , [chartData])

  const toggleForm = ()=>{
    setShowNouveau(!showNouveau)
  }

  return (
    <div className='flex  flex-col px-[20px] h-[470px] w-full space-y-4 overflow-y-scroll  scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300'>
      <h3 className='font-light uppercase text-[#5f6163]'>Gestion des Taux Déchange</h3>
      {/* nouveau pays header */}
      <div className="flex flex-row w-full h-[30px]" onClick={toggleForm}>
              <div className='flex flex-row w-full justify-between items-center bg-[#7b3535] px-2 '>
                  <p className='text-lg font-light text-[#eff3f8]'>Enregistrer un nouveau taux </p>
                  <IoChevronDownSharp size={25} color={'#eff3f8'} className={classNames({'rotate-180' : showNouveau})}/>
              </div>
      </div>
          {/* formulaire de nouveau pays */}
          {showNouveau && <NouveauTauxPaysForm  show={showNouveau} setShow={setShowNouveau} />}
      {/* pays de base */}
      <div className='flex flex-col w-[280px] h-[120px]  bg-[#fff] border-[3px] border-[#cecbcb] justify-center items-center'>
        <h2 className='font-light uppercase text-[#5f6163]'>Pays de base</h2>
        <InputText
              placeholder='code du pays'
              value={"Maroc(devise en DH)"}
              disabled={true}
              pt={{
              root: { className: classNames('rounded-sm border-[2px]  w-[250px] h-[40px] border-[#cecbcb]') } , 
          
        }}/>
      </div>
      {/* graphique */}
      <TauxEchange chartData={chartData}  chartOptions={chartOptions}/>
    </div>
  )
}
