import { SocketProvider } from "./context/SocketContext"
import { MapPage } from "./pages/MapPage"

export const MapsApp = () => {
    return (
        <SocketProvider>
            <div><MapPage /></div>
        </SocketProvider>
    )
}