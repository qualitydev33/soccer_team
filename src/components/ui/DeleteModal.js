import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { deletePlayerById } from 'store/team/slice'
import { CloseIcon } from 'components/Icon/Index'
import { Button } from "components/ui/Common/Index";


const DeleteModal = ({
    playerId,
    title,
    desc,
    closeFun,
}) => {
    /**
     * variable
     */
    const aniVariant = {
        show: { opacity: 1 },
        hidden: { opacity: 0 }
    }
    const dispatch = useDispatch()

    /**
     * method
     */
    const handleCancel = () => {
        closeFun()
    }
    const handleDelete = () => {
        dispatch(deletePlayerById(playerId))
        closeFun()
    }

    /**
     * render
     */
    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-screen flex flex-col bg-black bg-opacity-60">
                <motion.div
                    className="w-auto m-auto min-w-[379px] px-6 pt-[18px] pb-6 flex flex-col gap-y-7 bg-c_bg_2 rounded-lg"
                    variants={aniVariant}
                    initial="hidden"
                    animate="show" 
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-c_text_1">{title}</h3>
                        <button
                            onClick={closeFun}>
                            <CloseIcon />
                        </button>
                    </div>
                    <h5 className="text-c_text_2">{desc}</h5>
                    <div className="flex items-center justify-end gap-x-2">
                        <Button 
                            title='Cancel'
                            type='primary'
                            clickFun={handleCancel}
                        />
                        <Button 
                            title="Delete" 
                            type="danger"
                            clickFun={handleDelete}
                        />
                    </div>
                </motion.div>
            </div>
        </>
    )
}

DeleteModal.prototype = {
    playerId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    closeFun: PropTypes.func.isRequired
}

export default DeleteModal;