import { useState } from "react"
import PropTypes from 'prop-types';
import SearchIcon from "../Icon/SearchIcon"

const SearchInput = ({
    placeholder
}) => {
    const [searchStr, setSearchStr] = useState('')
    return (
        <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <SearchIcon />
            </div>
            <input className="h-11 w-full pl-10 pr-14 py-4 text-xs rounded-lg bg-transparent text-[#F8F8F8] border-[#494949] border placeholder-[#999999]" placeholder={placeholder} value={searchStr}
                onChange={(evt) => {setSearchStr(evt.target.value)}}/>
            {searchStr.length !== 0 && <button className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#FEA013]">Search</button>}
        </div>
    )
}

SearchInput.prototype = {
    placeholder: PropTypes.string.isRequired
}

export default SearchInput