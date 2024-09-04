import { useContext, useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import { SocketContext } from '../context/SocketContext';

const startingPoint = {
    lng: -3.9513,
    lat: 36.7550,
    zoom: 12
}

export const MapPage = () => {

    const { coords, setRef, newMarker$, movementMarker$, addMarker, updatePosition } = useMapbox(startingPoint);
    const { socket } = useContext(SocketContext)

    // Escuchar los marcadores existentes
    useEffect(() => {
        socket.on('active-markers', (markers) => {
            for (const key of Object.keys(markers)) {
                addMarker(markers[key], key)
            }
        })
    }, [socket, addMarker])

    // Nuevo marcador
    useEffect(() => {
        newMarker$.subscribe(marker => {
            socket.emit('new-marker', marker)

        })
    }, [newMarker$, socket])

    // Movimiento marcador
    useEffect(() => {
        movementMarker$.subscribe(marker => {
            socket.emit('update-marker', marker)
        })
    }, [movementMarker$, socket])

    // Mover marcador mediante sockets

    useEffect(() => {
        socket.on('update-marker', (marker) => {
            updatePosition(marker)
        })
    }, [socket, updatePosition])

    // Escuchar nuevos marcadores

    useEffect(() => {
        socket.on('new-marker', (marker) => {
            addMarker(marker, marker.id)
        })
    }, [socket, addMarker])



    return (
        <>
            <div className='info'>
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div ref={setRef} className='mapContainer'>
            </div>
        </>
    )
}