import { useState } from "react";
import PropTypes from 'prop-types'
import CloseIcon from "../Icon/CloseIcon";
import Button from "./Button";
const DeleteModal = ({
    title,
    desc,
    closeFun,
}) => {
    const handleCancel = () => {
        closeFun()
    }
    const handleDelete = () => {
        closeFun()
    }
    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-screen flex bg-black bg-opacity-60">
                <div className="w-auto m-auto max-h-[600px] min-w-[379px] px-6 pt-[18px] pb-6 flex flex-col gap-y-7 bg-[#383838] rounded-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#F8F8F8]">{title}</h3>
                        <button
                            onClick={closeFun}>
                            <CloseIcon />
                        </button>
                    </div>
                    <h5 className="text-[#CBCBCB]">{desc}</h5>
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
                </div>
            </div>
        </>
    )
}

DeleteModal.prototype = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    closeFun: PropTypes.func.isRequired
}

export default DeleteModal;