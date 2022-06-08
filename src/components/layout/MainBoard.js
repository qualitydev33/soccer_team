import { Route, Routes, Navigate } from "react-router-dom"
import PropTypes from 'prop-types';
import RosterDetail from "../../pages/RosterDetail"
import RosterFormation from "../../pages/RosterFormation"

const MainBoard = ({
    cn
}) => {
    return (
        <>
            <div className={cn}>
                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route 
                        path="/" 
                        exact 
                        element={<RosterDetail cn='flex flex-col h-screen py-10 gap-y-6' />}
                    ></Route>
                    <Route 
                        path="/formation" 
                        exact 
                        element={<RosterFormation cn='flex flex-col py-10 gap-y-6' />}
                    ></Route>
                </Routes>
            </div>
        </>
    )
}

MainBoard.propTypes = {
    cn: PropTypes.string,
};

export default MainBoard