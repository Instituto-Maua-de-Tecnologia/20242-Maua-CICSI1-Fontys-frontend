import Login from '@/screens/login/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfessorSchedule from '@/screens/professorSchedule';
import Professor from '@/screens/professor';
import ScheduleTable from '@/screens/schedule';
import NotFound from './screens/notFound';
import { LanguageProvider } from './components/languageProvider';
import ProfessorRegistration from './professorRegistration';
import CoordinatorScreen from '@/screens/coordinator';
import VisualizeSchedule from '@/screens/visualizeSchedule';
import {ProfilePicture} from "@/components/profile/ProfilePicture.tsx";
import ProfilePage from "@/screens/profilePage";

export function App() { 
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='profilepicture' element={<ProfilePicture size={100} className={"rounded-full border-4 border-blue-500 shadow-lg"} />} />
          <Route path='professor' element={<Professor/>}/>
          <Route path="professors_schedule" element={<ProfessorSchedule />} />
          <Route path="schedule" element={<ScheduleTable/>}/>
          <Route path="professor_registration" element={<ProfessorRegistration/>}/>
          <Route path="coordinator" element={<CoordinatorScreen/>}/>
          <Route path="visualize_schedule" element={<VisualizeSchedule/>}/>
          <Route path="profile" element={<ProfilePage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}