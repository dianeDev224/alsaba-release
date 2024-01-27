import { Button } from 'primereact/button';
import { FaWallet } from 'react-icons/fa';
import { GrConfigure } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

export default function CaveauxNavBar() {

  const navigator = useNavigate();
  return (
    <div className="flex flex-row ">
        <Button label="Etats des Caveaux" 
            icon={<FaWallet className='text-[#fff] mr-2'/>} 
            pt={{
                root : {className : 'flex flex-row w-[200px] text-[#fff] items-center justify-center border-[2px] border-[#eff3f8] bg-[#c06935]'}
            }}
        onClick={()=>navigator("/caveaux/")}/>
        <Button label="Configuration des caveaux" 
            icon={<GrConfigure className='text-[#fff] mr-2'/>} 
            pt={{
                root : {className : 'flex flex-row w-[230px] text-[#fff] items-center justify-center border-[2px] border-[#eff3f8] bg-[#c06935]'}
            }}
        onClick={()=>navigator("/caveaux/configuration-caveaux/")}/>
    </div>
  )
}
