import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux'

import CloseIcon from "../Icon/CloseIcon";
import Button from './Button';
import FilePicker from "./FilePicker";


const ImportModal = ({
    cancelFunc,
    importFunc
}) => {
    const [summary, setSummary] = useState(null)
    const [teamData, setTeamData] = useState({})

    const handleDataFromFilePicker = (fileData) => {
        setTeamData(fileData.data)
        setSummary({
            "Total Players": Object.keys(fileData.data).length,
            "Goalkeepers": Object.values(fileData.data).filter(item => item.position === "Goalkeeper").length,
            "Defenders": Object.values(fileData.data).filter(item => item.position === "Defender").length,
            "Midfielders": Object.values(fileData.data).filter(item => item.position === "Midfielder").length,
            "Forwards": Object.values(fileData.data).filter(item => item.position === "Forward").length,
        })
    }
    const handleImport = () => {
        if (teamData !== {}) {
            cancelFunc()
            importFunc(teamData)
        }
    }
    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex bg-black bg-opacity-60">
            <div className="w-full m-auto max-w-[800px] max-h-[600px] px-6 pt-[18px] pb-6 flex flex-col bg-c_bg_2">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-c_text_1">Importer</h3>
                    <button onClick={cancelFunc}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="h-px w-full bg-c_border mt-[15px]"></div>
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
                                <div key={idx} className="text-c_text_2">
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
    cancelFunc: PropTypes.func,
    importFunc: PropTypes.func
}

export default ImportModal;