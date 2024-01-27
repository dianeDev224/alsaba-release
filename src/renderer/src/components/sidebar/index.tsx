// import Versions from '@components/Versions';
// @ts-nocheck
import Content from './contents';
import Footer from './footer';
import Header from './header';

function Sidebar(): JSX.Element {
  return (
    <div className="flex flex-col w-[200px]  h-full shadow-xl bg-[#29221d]">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default Sidebar
