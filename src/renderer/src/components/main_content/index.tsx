// @ts-nocheck
// import Versions from '@components/Versions';

import { Outlet } from 'react-router-dom';

import Topbar from '@renderer/components/topbar';

function Maincontent(): JSX.Element {
  return (
    <div className="flex flex-col flex-1 bg-[#F5F5F5]">
      <Topbar/>
      <Outlet/>
    </div>
  )
}

export default Maincontent
