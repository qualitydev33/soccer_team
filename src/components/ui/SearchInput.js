import { useState } from "react"
import PropTypes from 'prop-types';
import SearchIcon from "../Icon/SearchIcon"
import CloseIcon from "../Icon/CloseIcon";

const SearchInput = ({
    placeholder,
    searchFunc,
    resetFunc
}) => {
    const [searchKey, setSearchKey] = useState('')
    const [searched, setSearched] = useState(false)
    return (
        <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <SearchIcon />
            </div>
            <input
                type='text'
                className="h-11 w-full pl-10 pr-14 py-4 text-xs rounded-lg bg-transparent text-[#F8F8F8] border-[#494949] border placeholder-[#999999]" placeholder={placeholder} value={searchKey}
                onChange={(evt) => {setSearchKey(evt.target.value)}}
            />
            {
                searchKey.length !== 0 && !searched && 
                <button 
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#FEA013]"
                    onClick={() => {
                        setSearched(true); 
                        searchFunc(String(searchKey).toLowerCase())}
                    }
                >Search</button>
            }
            {
                searched && 
                <button 
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#FEA013]"
                    onClick={() => {
                        setSearched(false);
                        setSearchKey('')
                        resetFunc()
                    }}
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