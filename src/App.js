import LeftSide from "./components/layout/LeftSide"
import MainBoard from "./components/layout/MainBoard";
import "./tailwind.css"

const App = () => {
  return (
    <>
      <div className="flex">
        <LeftSide />
        <MainBoard cn={'flex-1 px-10 bg-[#222222]'} />
      </div>
      
    </>
  );
}

export default App
