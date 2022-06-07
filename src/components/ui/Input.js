import PropTypes from 'prop-types'
const Input = ({
    label,
    defaultValue,
    changeFun
}) => {
    return (
        <>
            <div className="flex flex-col gap-y-2 w-full">
                <h5 className='text-[#FFFFFF] font-medium'>{label}</h5>
                <input
                    type="text"
                    className="h-11 w-full px-2 py-4 text-xs rounded-lg bg-transparent text-[#F8F8F8] border-[#494949] border"
                    defaultValue={defaultValue}
                    onChange={changeFun}
                />
            </div>
        </>
    )
}

Input.prototype = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    changeFun: PropTypes.func
}

export default Input;