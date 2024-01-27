

import { Button } from 'primereact/button';
import { CiMoneyBill } from 'react-icons/ci';
import {
  FaChartBar,
  FaFlag,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function PaysNavBar() {

  const navigator = useNavigate();
  return (
    <div className="flex flex-row ">
        <Button label="Liste des pays" icon={<FaFlag className='text-[#fff] mr-2'/>} 
            pt={{
                root : {className : 'flex flex-row w-[200px] text-[#fff] items-center justify-center border-[2px] border-[#eff3f8] bg-[#c06935]'}
            }}
        onClick={()=>navigator("/pays/")}/>
        <Button label="Taux Par Pays" 
            icon={<FaChartBar className='text-[#fff] mr-2'/>} 
            pt={{
                root : {className : 'flex flex-row w-[200px] text-[#fff] items-center justify-center border-[2px] border-[#eff3f8] bg-[#c06935]'}
            }}
        onClick={()=>navigator("/pays/devise-pays/")}/>
        <Button label="Frais Par Pays" 
            icon={<CiMoneyBill className='text-[#fff] mr-2'/>} 
            pt={{
                root : {className : 'flex flex-row w-[200px] text-[#fff] items-center justify-center border-[2px] border-[#eff3f8] bg-[#c06935]'}
            }}
        onClick={()=>navigator("/pays/frais-pays/")}/>
    </div>
  )
}
