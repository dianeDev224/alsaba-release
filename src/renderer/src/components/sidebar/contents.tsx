// @ts-nocheck
import { classNames } from 'primereact/utils';
import { FaRegSquare } from 'react-icons/fa';
import { ImMenu } from 'react-icons/im';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  dashbordRoutes,
  routeContainers,
} from '@renderer/utils/data';
import { mrg } from '@renderer/utils/tailwindMerger';

function Content(): JSX.Element {

  const navigator = useNavigate();
  const currentLocation = useLocation()

  
    return (
    <div className="flex-col  space-y-4 flex-1 overflow-y-scroll p-2 scroll-smooth scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-orange-600 scrollbar-corner-gray-300 ">
      {
        routeContainers.map((item)=>{
          if(item.id === 1){
            return (
                <div key={item.id}  className={mrg('flex flex-row items-center space-x-2   cursor-pointer' , currentLocation.pathname === "/" ? 'rounded-md bg-[#2cda91]' : '' )}  onClick={()=>navigator("/")}>
                  <ImMenu size={25} color='#eff3f8'/>
                  <p className='uppercase font-extrabold text-[12px] text-[#eff3f8]'>{item.name}</p>
                </div>
             )
          }else{
            return (
              <div key={item.id} className='flex flex-col'>
                <div className='flex flex-row items-center space-x-2  cursor-help'>
                  <FaRegSquare size={20} color='#eff3f8'/>
                  <p className='uppercase font-extrabold text-[12px] text-[#eff3f8]'>{item.name}</p>
                </div>
                <div className='flex flex-col ml-3 p-1 space-y-1'>
                  {
                    dashbordRoutes.map((subItem)=>{
                      if(subItem.container == item.id){
                        return (
                          <div key={subItem.id} className={classNames('flex flex-row items-center cursor-pointer space-x-2 p-1' , {'bg-[#2cda91] rounded-md' : currentLocation.pathname.includes(subItem.route)  } )} onClick={()=>navigator("/"+subItem.route)}>
                            <subItem.logo color='#eff3f8'/>
                            <p className={classNames('font-bold' , {'text-[#ea580c]' : currentLocation.pathname.includes(subItem.route)  , 'text-[#ca8d6c]' : !currentLocation.pathname.includes(subItem.route)})}>{subItem.name}</p>
                          </div>
                        )
                      }
                    })
                  }
                </div>
						</div>
             )
          }
          
        })
      }
    </div>
    )
  }
  
  export default Content
  