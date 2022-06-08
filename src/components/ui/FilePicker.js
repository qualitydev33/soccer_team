import PropTypes from 'prop-types';
import { useState } from 'react';
import PapaParse from 'papaparse'
import {v4 as UUID_v4} from 'uuid'
import { utilArrToObj } from '../../utils/js-func';

function dataCheck(item) {
    // if (item.saves === "N/A") item.saves = null
    // if (item.clean_sheets === "N/A") item.clean_sheets = null
    item.id = UUID_v4()
    if (item.starter === "Yes") item.starter = true
    else item.starter = false
    return item
}

function csvToArray(str) {
    const parserOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
    const csvData = PapaParse.parse(
        str,
        Object.assign(parserOptions, {
          error: () => {},
          encoding: 'UTF-8',
        }),
    )
    var filteredData = csvData.data.map(dataCheck) 
    csvData.data = utilArrToObj(filteredData, 'id')
    return csvData
     
}

const FilePicker = ({
    placeholder,
    returnFileData
}) => {
    const [filePath, setFilePath] = useState('')
    const handleFilePicker = (evt) => {
        setFilePath(evt.target.value)
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const result = csvToArray(e.target.result)
            console.log(result)
            returnFileData(result)
        }

        const [file] = evt.target.files
        fileReader.readAsBinaryString(file)
    }

    return (
        <div className="relative max-w-[300px]">
            <input 
                type="text" 
                className={`h-11 w-full py-3 pl-4 pr-28 bg-transparent border rounded-lg placeholder-c_text_3 text-sm text-c_text_1 ${filePath === null ? 'border-c_primary_red' : 'border-c_border'}`} 
                placeholder={placeholder}
                value={filePath === null ? '' : filePath}
                readOnly
            />
            <label 
                htmlFor="file_picker" 
                className={`cursor-pointer absolute top-0 right-0 h-11 py-3 px-4 bg-transparent border rounded-lg text-sm text-c_text_2 ${filePath === null ? 'border-c_primary_red' : 'border-c_border'}`}
                
            >Select File</label>
            <input 
                type="file" 
                className='hidden' 
                id="file_picker"
                accept=".csv"
                onChange={(evt) => {handleFilePicker(evt)}} 
            />
        </div>
    )
}

FilePicker.propTypes = {
    placeholder: PropTypes.string.isRequired,
    returnFileData: PropTypes.func.isRequired
};

export default FilePicker;