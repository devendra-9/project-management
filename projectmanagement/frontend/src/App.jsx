import {Routes,Route} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Project from './pages/project'
import Notfound from './pages/notfound'
import Auth from './component/authorization'


function App() {

  return (
   <div>
    <Routes>
      <Route path='/' element={< Login />} />
        <Route element={< Auth />}>
          <Route path='/home' element={< Home />} />
          <Route path='/project/:id' element={< Project />} />
          <Route path='*' element={< Notfound />} />
        </Route>
      </Routes>
   </div>
  )
}

export default App
