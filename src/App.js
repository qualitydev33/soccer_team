import "./tailwind.css"
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import {
  Layout1
} from "components/layout/Index";
import {
  RosterDetail,
  RosterFormation
} from 'pages/Index'
import { LoadingSpinner } from 'components/ui/Common/Index';
import { resetTeamFromWStorage } from "store/team/slice"


const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    dispatch(resetTeamFromWStorage())
    setLoading(false)
  }, [])
  return (
    <>
      {loading && 
        <LoadingSpinner />
      }
      {!loading && 
        <Layout1 cn={'flex'}>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route 
                path="/" 
                exact 
                element={<RosterDetail cn='flex flex-col h-full' />}
            ></Route>
            <Route 
                path="/formation" 
                exact 
                element={<RosterFormation cn='flex flex-col h-full' />}
            ></Route>
        </Routes>
        </Layout1>
      }
      
      {/* <span className='absolute top-[100px] left-[50px] text-lg text-green-500 z-50'>{JSON.stringify(activeFormationModal)}</span> */}

    </>
  );
}

export default App
