import { useState } from "react";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {
    TeamNameEditor,
    ImportModal
} from 'components/ui/Index'
import {
    SearchInput,
    Button
} from 'components/ui/Common/Index'
import { 
    initTeam, 
    updateTeamName, 
    seachTeamByKey 
} from "store/team/slice"

const Header1 = () => {
    /**
     * variable
     */
    const dispatch = useDispatch()
    const location = useLocation()
    const teamNameStore = useSelector(state => state.team.name)
    const teamStore = useSelector(state => state.team.data)
    const [activeImportModal, setActiveImportModal] = useState(false)
    
    /**
     * method
     */
    const handleTeamName = (obj) => {
        dispatch(updateTeamName(obj))
    }
    const handleSearch = (searchKey) => {
        dispatch(seachTeamByKey(searchKey))
    }
    const handleResetSearch = () => {
        dispatch(seachTeamByKey(null))
    }
    const handleShowImportModal = () => {
        setActiveImportModal(true)
    }
    const handleImport = (data) => {
        dispatch(initTeam(data))
    }
    
    /**
     * render
     */
    return (
        <>
            <div className="flex items-center">
                <TeamNameEditor
                    title="Roster Detail"
                    defaultTeamName={teamNameStore}
                    updateFunc={handleTeamName}
                />
                <div className={`items-center ml-auto gap-x-2 ${location.pathname === "/" ? 'flex' : 'hidden'}`}>
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
            {activeImportModal && 
                <ImportModal 
                    cancelFunc={() => setActiveImportModal(false)}
                    importFunc={handleImport} 
                />
            }
        </>
    )
}

// Header1.propTypes = {
//     cn: PropTypes.string,
// };

export default Header1