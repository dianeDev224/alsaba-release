// import Versions from '@components/Versions';
// @ts-nocheck
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';

function Header(): JSX.Element {
  return (
    
    <div className="flex flex-row w-full h-[60px]  items-center shadow-xl border-b-[1px] border-b-[#eff3f8]">
      <Tooltip target=".custom-target-avatar" mouseTrack mouseTrackLeft={10} />
      <Avatar
        image="src/assets/images/logo_alsaba.jpg"
        pt={{ image: { className: 'w-[50px] h-[50px] rounded-full' } }}
      />
      <h2 className='uppercase font-bold ml-3 text-[#eff3f8]'>alsaba</h2>
    </div>
  )
}

export default Header;
