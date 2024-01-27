// @ts-nocheck
// import Versions from '@components/Versions';
import { TiInfoLarge } from 'react-icons/ti';

function Footer(): JSX.Element {
    return (
      <div className="flex-col w-full h-[40px] border-t-[1px] border-t-[#eff3f8]">
        <div className='flex flex-row justify-center items-center'>
          <TiInfoLarge  size={25} color='#eff3f8'/>
        </div>
      </div>
    )
  }
  
  export default Footer
  