import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import PropTypes from 'prop-types';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    const { socket, online } = useSocket(`${import.meta.env.REACT_APP_SOCKET_URL}` || 'http://localhost:8080');

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired
};
