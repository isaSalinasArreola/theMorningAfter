import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/NavBar/Sidebar';
import AccessibilityChloropleth from './components/AccessibilityMap/accessibilityChloropleth';
import PharmacyTable from './components/PharmacyTable/pharmacyTable';
import FreeOrgsTable from './components/FreeOptions/FreeOrgsTable';
import ECLocator from './components/ContraceptionMap/ECLocator';
import MajorChloropleth from './components/PharmacyData/majorChloropleth';
import ShowFAQ from './components/Background/showFAQ';
function App() {
return (
  <div>
	<Router>
  <Sidebar />
	<Routes>
    <Route path='/' element={<ShowFAQ />} />
    <Route path='/find-the-pill/directory' element={<PharmacyTable />} />
    <Route path='/stats/accessibility' element={<AccessibilityChloropleth />} />
    <Route path='/find-the-pill/freeplanB' element={<FreeOrgsTable />} />
    <Route path='/find-the-pill/findEC' element={<ECLocator/>} />
    <Route path='/stats/major-pharmacies' element={<MajorChloropleth/>} />
    <Route path='/more/faqs' element={<ShowFAQ/>} />
	</Routes>
	</Router>
  </div>
);
}

export default App;