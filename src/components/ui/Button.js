import PropTypes from 'prop-types';
/*
params: type : primary, warn, danger
*/
const Button = ({
    type, 
    title, 
    clickFun
}) => {
    const handleBtnType = (str) => {
        let result = 'primary'
        switch (str) {
            case "primary":
                result = "bg-transparent border border-[#494949] text-[#CBCBCB]"
                break;
            case "warn":
                result = "bg-[#FEA013] text-[#F8F8F8]"
                break;
            case "danger": 
                result = "bg-[#D23131] text-[#F8F8F8]"
            default:
                break;
        }
        return result
    }
    return (
        <>
            <button 
                className={`${handleBtnType(type)} px-5 rounded-lg h-11 flex items-center justify-center text-sm leading-normal font-medium`}
                onClick={() => {clickFun()}}
            >{title}</button>
        </>
    )
}
Button.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    clickFun: PropTypes.func.isRequired
};

export default Button