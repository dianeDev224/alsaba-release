// @ts-nocheck
// import Versions from '@components/Versions';

import Maincontent from '@renderer/components/main_content';
import Sidebar from '@renderer/components/sidebar';

function App(): JSX.Element {
  
  return (
    <div className="flex h-screen w-scren">
      <Sidebar/>
      <Maincontent/>
    </div>
  )
}

export default App



