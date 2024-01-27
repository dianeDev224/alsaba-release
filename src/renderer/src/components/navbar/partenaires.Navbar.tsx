import { Button } from 'primereact/button';
import { HiMiniBuildingOffice2 } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function PartenaireNavBar() {

  const navigator = useNavigate();
  return (
    <div className="flex flex-row ">
        <Button label="Partenaires Alsaba" 
            icon={<HiMiniBuildingOffice2 className='text-[#fff] mr-2'/>} 
            pt={{
                root : {className : 'flex flex-row w-[200px] text-[#fff] items-center justify-center border-[2px] border-[#eff3f8] bg-[#c06935]'}
            }}
        onClick={()=>navigator("/partenaires/")}/>
    </div>
  )
}
