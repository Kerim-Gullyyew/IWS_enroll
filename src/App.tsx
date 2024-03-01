import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Parent1 from './pages/Parent1';
import Parent2 from './pages/Parent2';
import DashLayout from './components/layout/DashLayout';
import Timetable from './pages/Timetable';
import Count from './pages/Count';
import Student from './pages/Student';
import Year from './pages/Year';
import Qualification from './pages/Qualification';
import SubjectOption from './pages/SubjectOption';
import { useTypedSelector } from './hooks/useTypedSelector';
import Package from './pages/Package';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function App() {

  const [count, setCount] = useState<any>(useTypedSelector((state: any) => state.count.count));
  const studentRoutes = [];
  // for (let i = 1; i <= count; i++) {
  //   studentRoutes.push(
  //     <React.Fragment key={i}>
  //       <Route path={`student/${i}/year`} element={<Year studentId={i} />} />
  //       <Route path={`student/${i}/package`} element={<Package studentId={i} />} />
  //     </React.Fragment>
  //   );
  // }


  return (
    <Router>
      <Routes>

        <Route path="/" element={<DashLayout />}>
          <Route index element={<Parent1 />} />
          <Route path="parent" element={<Parent2 />} />
          {/* <Route path="parent1/change" element={<Parent1 />} /> */}

          <Route path="count" element={<Count />} />
      
          <Route path="student/:id" element={<Student />} />
          <Route path="student/:id/year" element={<Year />} />
          <Route path={`student/:id/package`} element={<Package />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Checkout />} />


          <Route path="success" element={<Success />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
