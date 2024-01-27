// @ts-nocheck
import { Outlet } from 'react-router-dom';

import PaysNavBar from '@renderer/components/navbar/paysNavbar';

export default function Pays() {


  return (
   <div className='flex flex-col'>
     <div className='flex w-full h-[100px] justify-center items-center'>
      <PaysNavBar/>
     </div>
     <Outlet/>
   </div>
  )
}
