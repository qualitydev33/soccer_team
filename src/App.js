import { useLocation } from 'react-router-dom'
import HugIcon from "./components/Icon/HugIcon";
import TeamIcon from "./components/Icon/TeamIcon";
import LeftSide from "./components/layout/LeftSide"
import MainBoard from "./components/layout/MainBoard";
import "./tailwind.css"

const App = () => {
  const location = useLocation()
  return (
    <>
      <div className="flex">
        <LeftSide routeList={[
            {link: "/detail", icon: <HugIcon color={location.pathname === "/detail" ? '#FEA013' : '#69563A'} />},
            {link: "/formation", icon: <TeamIcon color={location.pathname === "/formation" ? '#FEA013' : '#69563A'} />}
        ]} />
        <MainBoard cn={'flex-1 px-10 bg-c_neutral_1'} />
      </div>
      
    </>
  );
}

export default App
