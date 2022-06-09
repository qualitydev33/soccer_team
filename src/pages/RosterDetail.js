import { useState, useEffect, useContext } from "react"
import { ReactReduxContext, useDispatch, useSelector } from "react-redux"
import {
    ActionList,
    Button,
    LoadingSpinner,
    SearchInput
} from 'components/ui/Common/Index'
import {
    DeleteIcon,
    PenIcon,
    ThreeDotIcon,
} from 'components/Icon/Index'
import {
    DeleteModal,
    EditModal,
    ImportModal,
    TeamNameEditor
} from 'components/ui/Index'
import TableData from "../data/table.json"
import { initTeam, updateTeamName } from "store/team/slice"
import { utilArrToObj } from "utils/js-func"

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
    const [loading, setLoading] = useState(true)
    const [searchPlayers, setSearchPlayers] = useState({})
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
        let filterResult = Object.values(searchPlayers).filter(item => String(item.player_name).toLowerCase().includes(searchKey) || String(item.position).toLowerCase().includes(searchKey))
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
       let teamData = store.getState().team.data
        setSearchPlayers(teamData)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])
    return (
        <>
            {loading && <LoadingSpinner />}

            {!loading && <div className={cn}>
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

                    {Object.values(teamStore).length === 0 && 
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-sm">
                            <h5 className="text-c_text_2">You do not have any players on the roster</h5>
                            <button 
                                className="text-c_primary_yellow mt-2"
                                onClick={() => {handleShowImportModal()}}
                            >Import Team</button>
                        </div>
                    }

                    {Object.values(searchPlayers).length !== 0 &&
                        <div className="relative flex flex-col flex-1">
                            <div className="absolute inset-0 flex flex-col flex-1 py-5 gap-y-5 overflow-auto h-full">
                                {Object.values(searchPlayers).map((item, idx) => {
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
                                                <ActionList 
                                                    actionBtn={<ThreeDotIcon />} 
                                                    title="Actions" 
                                                    list={[
                                                        {title: "Edit Player", icon: <PenIcon />, action: () => {handleEditModal(searchPlayers[item.id])}},
                                                        {title: "Delete Player", icon: <DeleteIcon />, action: () => {handleDeleteModal(searchPlayers[item.id])}}
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    }
                    

                    
                </div>
            </div>}

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
        </>
    )
}

export default RosterDetail