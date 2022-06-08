import PropTypes from 'prop-types';
/*
params: type : primary, warn, danger
*/
const Button = ({
    type,
    title, 
    disabled,
    clickFun
}) => {
    const handleBtnType = (str) => {
        let result = 'primary'
        switch (str) {
            case "primary":
                result = "bg-transparent border border-c_border text-c_text_2 hover:text-c_text_1"
                break;
            case "warn":
                result = "bg-c_primary_yellow text-c_text_1 hover:bg-c_primary_brown"
                break;
            case "danger": 
                result = "bg-c_primary_red text-c_text_1"
            default:
                break;
        }
        return result
    }
    return (
        <>
            <button 
                className={`${disabled ? 'bg-transparent text-c_text_4' : handleBtnType(type)} px-5 rounded-lg h-11 flex items-center justify-center text-sm leading-normal font-medium`}
                disabled={disabled}
                onClick={() => {clickFun()}}
            >{title}</button>
        </>
    )
}
Button.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    clickFun: PropTypes.func.isRequired
};

export default Button