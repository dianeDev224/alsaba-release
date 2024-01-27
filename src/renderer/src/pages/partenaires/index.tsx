// @ts-nocheck
import { Outlet } from 'react-router-dom';

import PartenaireNavBar from '@renderer/components/navbar/partenaires.Navbar';

export default function Partenaires() {
  return (
   <div className='flex flex-col flex-1'>
     <div className='flex w-full h-[40px] justify-center items-center mt-2'>
      <PartenaireNavBar/>
     </div>
     <Outlet/>
   </div>
  )
}
