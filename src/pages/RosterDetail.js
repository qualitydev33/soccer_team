import { useState, useEffect, useContext } from "react"
import { ReactReduxContext, useDispatch, useSelector } from "react-redux"
import CheckIcon from "../components/Icon/CheckIcon"
import DeleteIcon from "../components/Icon/DeleteIcon"
import PenIcon from "../components/Icon/PenIcon"
import ThreeDotIcon from "../components/Icon/ThreeDotIcon"
import ActionList from "../components/ui/ActionList"
import Button from "../components/ui/Button"
import DeleteModal from "../components/ui/DeleteModal"
import EditModal from "../components/ui/EditModal"
import ImportModal from "../components/ui/ImportModal"
import SearchInput from "../components/ui/SearchInput"
import TeamNameEditor from "../components/ui/TeamNameEditor"
import TableData from "../data/table.json"
import { resetTeamFromWStorage, initTeam, updateTeamName } from "../store/team/slice"
import { utilArrToObj } from "../utils/js-func"

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
    const dispatch = useDispatch()
    const {store} = useContext(ReactReduxContext)
    const teamStore = useSelector(state => state.team.data)
    const teamNameStore = useSelector(state => state.team.name)
    const [searchPlayers, setSearchPlayers] = useState([])
    const [activePlayer, setActivePlayer] = useState(null)
    const [activeImportModal, setActiveImportModal] = useState(false)
    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)

    const handleTeamName = (obj) => {
        dispatch(updateTeamName(obj))
    }
    const handleEditModal = (player) => {
        setActiveEditModal(true)
        setActivePlayer(player)
    }
    const handleDeleteModal = (player) => {
        setActiveDeleteModal(true)
        setActivePlayer(player)
    }
    const handleShowImportModal = () => {
        setActiveImportModal(true)
    }
    const handleImport = (data) => {
        dispatch(initTeam(data))
    }
    const handleSearch = (searchKey) => {
        let filterResult = Object.values(searchPlayers).filter(item => String(item.player_name).toLowerCase().includes(searchKey))
        let searchResult = utilArrToObj(filterResult, 'id')
        setSearchPlayers(searchResult)
    }
    const handleResetSearch = () => {
        setSearchPlayers(teamStore)
    }

    useEffect(() => {
        setSearchPlayers(teamStore)
    }, [teamStore])

    useEffect(() => {
        dispatch(resetTeamFromWStorage())
        let teamData = store.getState().team.data
        setSearchPlayers(teamData)
    }, [])
    return (
        <>
            <div className={cn}>
                <div className="flex items-center">
                    <TeamNameEditor
                        title="Roster Detail"
                        defaultTeamName={teamNameStore}
                        updateFunc={handleTeamName}
                    />
                    <div className="flex items-center ml-auto gap-x-2">
                        <SearchInput 
                            placeholder={'Find Player'} 
                            searchFunc={handleSearch}
                            resetFunc={handleResetSearch}
                        />
                        <Button 
                            title={`${Object.values(teamStore).length > 0 ? 'Re-Import Team' : 'Import Team'}`}
                            type={`${Object.values(teamStore).length > 0 ? 'primary' : 'warn'}`}
                            clickFun={handleShowImportModal}
                        />
                    </div>
                </div>

                <div className="relative bg-c_neutral_2 w-full h-full px-5 pt-[17px] pb-[13px] rounded-lg flex flex-col flex-1">
                    <div className="flex justify-between items-center">
                        {TableData.TABLE_FIELD.map((item, idx) => {
                            return(
                                <div key={idx} className="flex-1">
                                    <h6 className={`font-medium text-c_text_2 ${idx === 0 ? 'w-[196px]' : ''}`}>{item}</h6>
                                </div>
                            )
                        })}
                        <h6 className="w-7 invisible">DD</h6>
                    </div>

                    {Object.values(teamStore).length === 0 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-sm">
                        <h5 className="text-c_text_2">You do not have any players on the roster</h5>
                        <button 
                            className="text-c_primary_yellow mt-2"
                            onClick={() => {handleShowImportModal()}}
                        >Import Team</button>
                    </div>}

                    <div className="flex flex-col flex-1 py-5 gap-y-5 overflow-auto h-full">
                        {Object.values(searchPlayers) !== 0 && Object.values(searchPlayers).map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center justify-between">
                                    {TableData.TABLE_FIELD.map((sub_item, sub_idx) => {
                                        return (
                                            <div key={`row_${sub_idx}`} className="flex-1">
                                                {sub_idx === 0 && <div className="flex items-center gap-x-2 w-[196px]">
                                                    <img className="rounded-full border border-c_text_2" src={item.flag_image} alt={`flag-img`} width={24} height={24} />
                                                    <h5 className="font-medium text-c_text_2">{item.player_name}</h5>
                                                </div>}
                                                {sub_idx !== 0 && <h5 className="text-left text-sm font-medium text-c_text_2">{convertTableRow(item, sub_item.toLowerCase().replaceAll(" ", "_"))}</h5>}
                                                
                                            </div>
                                        )
                                    })}
                                    <div className="w-7 relative">
                                        <ActionList actionBtn={<ThreeDotIcon />} title="Actions" list={[
                                            {title: "Edit Player", icon: <PenIcon />, action: () => {handleEditModal(searchPlayers[item.id])}},
                                            {title: "Delete Player", icon: <DeleteIcon />, action: () => {handleDeleteModal(searchPlayers[item.id])}}
                                        ]} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {activeImportModal && 
                <ImportModal 
                    cancelFunc={() => setActiveImportModal(false)}
                    importFunc={handleImport} 
                />
            }
            {activeDeleteModal && 
                <DeleteModal
                    playerId={activePlayer.id} 
                    title="Are you sure?"
                    desc="This action cannot be undone."
                    closeFun={() => {setActiveDeleteModal(false)}}
                />
            }
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