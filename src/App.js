import { HashRouter, Route, Routes } from "react-router-dom";

import About from "./modules/About";
import EnforcementDatabase from "./modules/EnforcementDatabase";
import Finidngs from "./modules/Findings";
import Methodology from "./modules/Methodology";
 
function App() {
  return (
    <>
        <HashRouter>
          <Routes>
            <Route path="*" element={<EnforcementDatabase />} />
            <Route path="/about" element={<About/>}/>
            <Route path='/findings' element={<Finidngs/>}/>
            <Route path='/methodology' element={<Methodology/>}/>
            {/* <Route path="/" element={<AppLayout/>}/> */}
          </Routes>
        </HashRouter>
    </>
  );
}

export default App;
