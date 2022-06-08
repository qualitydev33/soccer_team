import { useState } from "react"
import PropTypes from 'prop-types';
import {
    SearchIcon,
    CloseIcon
} from "../../Icon"


const SearchInput = ({
    placeholder,
    searchFunc,
    resetFunc
}) => {
    const [searchKey, setSearchKey] = useState('')
    const [searched, setSearched] = useState(false)
    const handleCancel = () => {
        setSearched(false);
        setSearchKey('')
        resetFunc()
    }
    const handleSearch = () => {
        setSearched(true); 
        searchFunc(String(searchKey).toLowerCase())
    }
    const handleKeyboardAction = (e) => {
        if (e.keyCode === 13) handleSearch()
        else if (e.keyCode === 27) handleCancel()
    }
    return (
        <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <SearchIcon />
            </div>
            <input
                type='text'
                className="h-11 w-full pl-10 pr-14 py-4 text-xs rounded-lg bg-transparent text-c_text_1 border-c_border border placeholder-c_text_3" placeholder={placeholder} value={searchKey}
                onChange={(evt) => {setSearchKey(evt.target.value)}}
                onKeyDown={(e) => {handleKeyboardAction(e)}}
            />
            {
                searchKey.length !== 0 && !searched && 
                <button 
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-c_primary_yellow"
                    onClick={() => handleSearch()}
                >Search</button>
            }
            {
                searched && 
                <button 
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-c_primary_yellow"
                    onClick={() => handleCancel()}
                >
                    <CloseIcon />
                </button>
            }
        </div>
    )
}

SearchInput.prototype = {
    placeholder: PropTypes.string.isRequired,
    searchFunc: PropTypes.func.isRequired,
    resetFunc: PropTypes.func.isRequired
}

export default SearchInput