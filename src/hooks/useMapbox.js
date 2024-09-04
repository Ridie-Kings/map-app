import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';

// mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;
mapboxgl.accessToken = 'pk.eyJ1IjoiZWdyYW5lcm9mMSIsImEiOiJjbHk4cHFrOWYwZmE5MmpzYmlnZGc5NW0zIn0.ZmtZljg63yCbHkaowaZIGg';

export const useMapbox = (startingPoint) => {

    // Referencia al DIV del mapa
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;

    }, [])

    // Referencia a los marcadores
    const marcadores = useRef({});

    // Observar marcadores
    const movementMarker = useRef(new Subject());
    const newMarker = useRef(new Subject())

    // Mapa y coords
    const mapa = useRef();
    const [coords, setCoords] = useState(startingPoint)

    // función para agregar marcadores
    const addMarker = useCallback((e, id) => {
        const { lng, lat } = e.lngLat || e;

        const marker = new mapboxgl.Marker();
        marker.id = id ?? crypto.randomUUID();

        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true);

        marcadores.current[marker.id] = marker;

        if (!id) {
            newMarker.current.next({
                id: marker.id,
                lng,
                lat
            })
        }

        // escuchar movimientos del marcador
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            movementMarker.current.next({
                id,
                lng,
                lat
            })
        })
    }, []);

    // funcion que actualiza la ubicación del marcador
    const updatePosition = useCallback(({ id, lng, lat }) => {
        marcadores.current[id].setLngLat([lng, lat])
    }, [])

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [startingPoint.lng, startingPoint.lat],
            zoom: startingPoint.zoom,
        });

        mapa.current = map;

    }, [startingPoint])

    // Cuando se mueve el mapa

    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })
    }, [])

    // Agregar un marcador al hacer click
    useEffect(() => {
        mapa.current?.on('click', addMarker);
    }, [addMarker])



    return {
        addMarker,
        coords,
        marcadores,
        movementMarker$: movementMarker.current,
        newMarker$: newMarker.current,
        updatePosition,
        setRef
    }
}