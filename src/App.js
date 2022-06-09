import "./tailwind.css"
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  HugIcon,
  TeamIcon
} from "components/Icon/Index";
import LeftSide from "components/layout/LeftSide"
import MainBoard from "components/layout/MainBoard";
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
        <div className="flex">
          <LeftSide routeList={[
              {link: "/", icon: <HugIcon color={location.pathname === "/" ? '#FEA013' : '#69563A'} />},
              {link: "/formation", icon: <TeamIcon color={location.pathname === "/formation" ? '#FEA013' : '#69563A'} />}
          ]} />
          <MainBoard cn={'flex-1 px-10 bg-c_neutral_1'} />
        </div>
      }
      
      {/* <span className='absolute top-[100px] left-[50px] text-lg text-green-500 z-50'>{JSON.stringify(activeFormationModal)}</span> */}

    </>
  );
}

export default App
