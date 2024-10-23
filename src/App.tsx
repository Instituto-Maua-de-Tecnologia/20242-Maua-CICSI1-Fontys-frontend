import Login from './login/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfessorSchedule from './professorSchedule';
import Professor from './professor';
import ScheduleTable from './schedule';
import NotFound from './screens/notFound';

export function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='professor' element={<Professor/>}/>
        <Route path="professors_schedule" element={<ProfessorSchedule />} />
        <Route path="schedule" element={<ScheduleTable/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}