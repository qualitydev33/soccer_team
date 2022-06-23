import { useState, useEffect, useContext } from "react"
import { useSelector, ReactReduxContext, useDispatch } from "react-redux"
import {
    ActionList,
    LoadingSpinner,
} from 'components/ui/Common/Index'
import {
    DeleteIcon,
    PenIcon,
    ThreeDotIcon,
} from 'components/Icon/Index'
import {
    DeleteModal,
    EditModal,
    ImportModal
} from 'components/ui/Index'
import { TABLE_FIELD } from "utils/types"
import { 
    initTeam
} from "store/team/slice"

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
    /**
     * variable
     */
    const {store} = useContext(ReactReduxContext)
    const dispatch = useDispatch()
    const teamStore = useSelector(state => state.team.data)
    const [loading, setLoading] = useState(true)
    const [searchPlayers, setSearchPlayers] = useState({})
    const [activePlayer, setActivePlayer] = useState(null)
    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [activeImportModal, setActiveImportModal] = useState(false)

    /**
     * method
     */
    const handleShowImportModal = () => {
        setActiveImportModal(true)
    }
    const handleImport = (data) => {
        dispatch(initTeam(data))
    }

    const handleEditModal = (player) => {
        setActiveEditModal(true)
        setActivePlayer(player)
    }
    const handleDeleteModal = (player) => {
        setActiveDeleteModal(true)
        setActivePlayer(player)
    }

    /**
     * hooks
     */
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

    /**
     * render
     */
    return (
        <>
            {loading && <LoadingSpinner />}

            {!loading && <div className={cn}>
                <div className="relative bg-c_neutral_2 w-full h-full px-5 pt-[17px] pb-[13px] rounded-lg flex flex-col flex-1">
                    <div className="flex justify-between items-center">
                        {TABLE_FIELD.map((item, idx) => {
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
                                            {TABLE_FIELD.map((sub_item, sub_idx) => {
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