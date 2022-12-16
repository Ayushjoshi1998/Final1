mapboxgl.accessToken = 'pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ'
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-v9', // style URL
center: [85, 32], // starting position [lng, lat]
zoom:4, // starting zoom
pitch: 10,
bearing: 0,
projection: 'globe',
});

map.on('load', () => {
    // Load an image from an external URL.
    map.loadImage(
    'icon.png',
    (error, image) => {
    if (error) throw error;
     
    // Add the image to the map style.
    map.addImage('cat', image);
    }
    )})


map.on('load', () => {
    map.addSource('glaciers', {
        type: 'geojson',
        data: 'glacierpoints.geojson'
    });

    map.addLayer({
      'id': 'glaciers',
      'type': 'symbol',
      'source': 'glaciers',
      'layout': {
        'icon-image': 'cat',
        'icon-size': 0.05
      }
    });
    
    
  });

map.on('load', function () {
    map.addSource('mapbox-dem', {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        'tileSize': 512,
        'maxzoom': 14
    });
     map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.0});
     map.setFog({
        'range': [1, 2],
        'horizon-blend': 0.2,
        'color': 'white',
        'high-color': '#add8e6',
        'space-color': '#d8f2ff',
        'star-intensity': 0.0
    });

    


 });
 const navControl = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map.addControl(navControl, 'top-right');



map.on('mouseenter', 'glaciers', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'glaciers', () => {
    map.getCanvas().style.cursor = '';
})

map.on('click', 'glaciers', (e) => {
    const coordinates = e.lngLat;
    map.flyTo({
        center: coordinates,
        zoom: 14,
        speed: 1,
        curve:1,
        pitch:70,
    })

    map.on('click', 'glaciers', (e) => {
        const coordinates = e.lngLat;
            let feature = e.features[0].properties
            const description = "<b>Total area </b>" + feature. total_area + "<br><b>Mean Elevation </b>" + feature. mean_elev + "<br><b>Geometry </b>" + feature.geometry 
            
            new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map)
    })
});