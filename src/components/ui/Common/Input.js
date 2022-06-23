import PropTypes from 'prop-types'
const Input = ({
    type,
    label,
    name,
    defaultValue,
    changeFun
}) => {
    /**
     * render
     */
    return (
        <>
            <div className="flex flex-col gap-y-2 w-full">
                <h5 className='text-c_text_5 font-medium'>{label}</h5>
                <input
                    type={type}
                    className="h-11 w-full px-2 py-4 text-xs rounded-lg bg-transparent text-c_text_1 border-c_border border"
                    name={name}
                    defaultValue={defaultValue}
                    onChange={(e) => changeFun({
                        name: e.target.name,
                        value: type === 'number' ? Number(e.target.value) : e.target.value
                    })}
                />
            </div>
        </>
    )
}

Input.prototype = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    changeFun: PropTypes.func.isRequired
}

export default Input;