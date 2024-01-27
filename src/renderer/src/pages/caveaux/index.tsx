// @ts-nocheck
import { Outlet } from 'react-router-dom';

import CaveauxNavBar from '@renderer/components/navbar/caveauxNavbar';

export default function Caveaux() {
  return (
   <div className='flex flex-col flex-1'>
     <div className='flex w-full h-[40px] justify-center items-center mt-2'>
      <CaveauxNavBar/>
     </div>
     <Outlet/>
   </div>
  )
}
