import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux'

import CloseIcon from "../Icon/CloseIcon";
import Button from './Button';
import FilePicker from "./FilePicker";
import { initTeam, resetTeam } from "../../store/team/slice"


const ImportModal = ({
    closeEvent
}) => {
    const [summary, setSummary] = useState(null)
    const [teamData, setTeamData] = useState([])
    const dispatch = useDispatch()

    const handleDataFromFilePicker = (fileData) => {
        setTeamData(fileData.data)
        setSummary({
            "Total Players": fileData.data.length,
            "Goalkeepers": fileData.data.filter(item => item.position === "Goalkeeper").length,
            "Defenders": fileData.data.filter(item => item.position === "Defender").length,
            "Midfielders": fileData.data.filter(item => item.position === "Midfielder").length,
            "Forwards": fileData.data.filter(item => item.position === "Forward").length,
        })
    }
    const handleImport = () => {
        dispatch(initTeam(teamData))
        closeEvent()
    }
    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex bg-black bg-opacity-60">
            <div className="w-full m-auto max-w-[800px] max-h-[600px] px-6 pt-[18px] pb-6 flex flex-col bg-[#383838]">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#F8F8F8]">Importer</h3>
                    <button onClick={closeEvent}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="h-px w-full bg-[#494949] mt-[15px]"></div>
                <div className="mt-6">
                    <h5 className="mb-3 text-white leading-normal font-medium">Roster File</h5>
                    <FilePicker 
                        placeholder={'No file selected'}
                        returnFileData={handleDataFromFilePicker}
                    />
                    
                </div>
                {summary !== null && <div className='mt-8'>
                    <h5 className="mb-3 text-white leading-normal font-medium">File Summary</h5>
                    <div className={`flex items-center justify-between`}>
                        {Object.keys(summary).map((item, idx) => {
                            return (
                                <div key={idx} className="text-[#CBCBCB]">
                                    <h5 className='text-sm font-normal'>{item}</h5>
                                    <h4 className='font-semibold'>{summary[item]}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>}
                <div className='mt-[208px] flex justify-end'>
                    <Button 
                        title='Import'
                        type="warn"
                        clickFun={handleImport}
                    />
                </div>
            </div>
        </div>
    )
}

ImportModal.prototype = {
    closeEvent: PropTypes.func
}

export default ImportModal;