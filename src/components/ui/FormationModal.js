import PropTypes from 'prop-types'
import { FORMATION_MODAL_CONTENT } from '../../utils/constants';
import { TeamStatusForEntry } from '../../utils/types';
import TriangleWarnIcon from '../Icon/TriangleWarnIcon'


function checkModalType(type) {
    let result;
    switch (type) {
        case TeamStatusForEntry[2]:
            result = FORMATION_MODAL_CONTENT.TOO_MANY_STARTER
            break;

        case TeamStatusForEntry[1]:
            result = FORMATION_MODAL_CONTENT.NOT_ENOUGH_STARTER
            break;
        case TeamStatusForEntry[0]:
            result = FORMATION_MODAL_CONTENT.NO_DATA
            break;
    }
    return result
}

const FormationModal = ({
    type
}) => {
    const modalContent = checkModalType(type)
    return (
        <>
            <div className="box-shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto max-h-[600px] w-[379px] p-6 flex flex-col gap-y-2 bg-c_neutral_2 rounded-lg">
                <div className='flex items-center gap-x-2 justify-center'>
                    <TriangleWarnIcon />
                    <h3 className='text-c_text_1 font-semibold'>{modalContent.title}</h3>
                </div>
                <h5 className='text-c_text_2 font-normal text-center'>{modalContent.desc}</h5>
            </div>
        </>
    )
}

FormationModal.prototype = {
    type: PropTypes.oneOf(TeamStatusForEntry),
}

export default FormationModal