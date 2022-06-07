import { useState } from "react"
import { useSelector } from "react-redux"
import DeleteIcon from "../components/Icon/DeleteIcon"
import PenIcon from "../components/Icon/PenIcon"
import ThreeDotIcon from "../components/Icon/ThreeDotIcon"
import ActionList from "../components/ui/ActionList"
import Button from "../components/ui/Button"
import DeleteModal from "../components/ui/DeleteModal"
import EditModal from "../components/ui/EditModal"
import ImportModal from "../components/ui/ImportModal"
import SearchInput from "../components/ui/SearchInput"
import TableData from "../data/table.json"

function convertTableRow(rowData, field) {
    let result;
    if (String(rowData[field]).toLowerCase() === "unknown") return '--'
    switch (field) {
        case "height":
            result = `${rowData[field] / 100} m`
            break;
        case "weight":
            result = `${rowData[field]} kg`
            break
        default:
            result = rowData[field]
            break;
    }
    return result
}

const RosterDetail = ({cn}) => {
    const teamData = useSelector((state) => state.team.data)
    const [activePlayer, setActivePlayer] = useState(null)
    const [activeImportModal, setActiveImportModal] = useState(false)
    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)

    const handleEditModal = (player) => {
        setActiveEditModal(true)
        setActivePlayer(player)
    }
    const handleShowImportModal = () => {
        setActiveImportModal(true)
    }
    return (
        <>
            <div className={cn}>
                <div className="flex items-center">
                    <div className="flex flex-col">
                        <h6 className="text-[#FEA013] leading-normal font-medium">Roster Detail</h6>
                        <div className="flex items-center gap-x-3">
                            <h3 className="text-white leading-tight font-semibold">My Team</h3>
                            <PenIcon />
                        </div>
                    </div>
                    <div className="flex items-center ml-auto gap-x-2">
                        <SearchInput placeholder={'Find Player'} />
                        <Button 
                            title='Import Team'
                            type='warn'
                            clickFun={handleShowImportModal}
                        />
                    </div>
                </div>

                <div className="relative bg-[#2D2D2D] w-full h-full px-5 pt-[17px] pb-[13px] rounded-lg flex flex-col flex-1">
                    <div className="flex justify-between items-center">
                        {TableData.TABLE_FIELD.map((item, idx) => {
                            return(
                                <div key={idx} className="flex-1">
                                    <h6 className={`font-medium text-[#CBCBCB] ${idx === 0 ? 'w-[196px]' : ''}`}>{item}</h6>
                                </div>
                            )
                        })}
                        <h6 className="w-7 invisible">DD</h6>
                    </div>

                    {teamData.length === 0 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-sm">
                        <h5 className="text-[#CBCBCB]">You do not have any players on the roster</h5>
                        <button 
                            className="text-[#FEA013] mt-2"
                            onClick={() => {handleShowImportModal()}}
                        >Import Team</button>
                    </div>}

                    <div className="flex flex-col flex-1 py-5 gap-y-5 overflow-auto h-full">
                        {teamData.length !== 0 && teamData.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center justify-between">
                                    {TableData.TABLE_FIELD.map((sub_item, sub_idx) => {
                                        return (
                                            <div key={`row_${sub_idx}`} className="flex-1">
                                                {sub_idx === 0 && <div className="flex items-center gap-x-2 w-[196px]">
                                                    <img className="rounded-full border border-[#CBCBCB]" src={item.flag_image} alt={`flag-img`} width={24} height={24} />
                                                    <h5 className="font-medium text-[#CBCBCB]">{item.player_name}</h5>
                                                </div>}
                                                {sub_idx !== 0 && <h5 className="text-left text-sm font-medium text-[#CBCBCB]">{convertTableRow(item, sub_item.toLowerCase().replaceAll(" ", "_"))}</h5>}
                                                
                                            </div>
                                        )
                                    })}
                                    <div className="w-7 relative">
                                        <ActionList actionBtn={<ThreeDotIcon />} title="Actions" list={[
                                            {title: "Edit Player", icon: <PenIcon />, action: () => {handleEditModal(teamData[idx])}},
                                            {title: "Delete Player", icon: <DeleteIcon />, action: () => {setActiveDeleteModal(true)}}
                                        ]} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {activeImportModal && <ImportModal closeEvent={() => setActiveImportModal(false)} />}
            {activeDeleteModal && 
            <DeleteModal 
                title="Are you sure?"
                desc="This action cannot be undone."
                closeFun={() => {setActiveDeleteModal(false)}}
            />}
            {activeEditModal &&
            <EditModal
                player={activePlayer}
                closeFun={() => {setActiveEditModal(false)}}    
            />
            }

            {/* <div className="absolute top-10 left-10 w-[200px] h-[500px] bg-gray-200 flex flex-col">
                <div className="w-full h-[50px] bg-green-700"></div>
                <div className="w-full h-full bg-red-500"></div>
            </div> */}

            {/* <span className=" absolute top-[100px] left-0 text-green-500 text-sm">{JSON.stringify(teamData)}</span> */}
        </>
    )
}

export default RosterDetail