import Left from './left';
import Right from './right';

function Topbar(): JSX.Element {
  return (
    <div className="flex flex-row h-[60px] w-full bg-[#29221d]">
      <Left/>
      <Right/>
    </div>
  )
}

export default Topbar 
