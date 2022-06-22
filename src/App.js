import "./tailwind.css"
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import {
  Layout1
} from "components/layout/Index";
import { LoadingSpinner } from 'components/ui/Common/Index';
import { resetTeamFromWStorage } from "store/team/slice"


const App = () => {
  const location = useLocation()
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
        <Layout1 cn={'flex'} />
      }
      
      {/* <span className='absolute top-[100px] left-[50px] text-lg text-green-500 z-50'>{JSON.stringify(activeFormationModal)}</span> */}

    </>
  );
}

export default App
