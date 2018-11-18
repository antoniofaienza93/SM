

/**
 * ===========================================================================
 * File: Map.js 
 * Author: Antonio Faienza
 * This file contains the settings of map
 * ===========================================================================
 */


function map() {

  // var styles = [
  //   'Road',
  //   'RoadOnDemand',
  //   'Aerial',
  //   'AerialWithLabels',
  //   'collinsBart',
  //   'ordnanceSurvey'
  // ];
  // var layers = [];
  // var i;
  // for (i = 0; i < styles.length; ++i) {
  //   layers.push(new ol.layer.Tile({
  //     visible: false,
  //     preload: Infinity,
  //     source: new ol.source.BingMaps({
  //       key: 'ApzktDln-AM3Y2dIraRcxlKXiQwFmIOgrAZAO5ArG1pnynfl2rzoM61YXmAwxWuc',//'Your Bing Maps Key from http://www.bingmapsportal.com/ here',
  //       imagerySet: styles[i]
  //       // use maxZoom 19 to see stretched tiles instead of the BingMaps
  //       // "no photos at this zoom level" tiles
  //       // maxZoom: 19
  //     })
  //   }));
  // }
  // var map = new ol.Map({
  //   layers: layers,
  //   // Improve user experience by loading tiles while dragging/zooming. Will make
  //   // zooming choppy on mobile or slow devices.
  //   loadTilesWhileInteracting: true,
  //   target: 'map',
  //   view: new ol.View({
  //     center:  ol.proj.fromLonLat([11.327591, 44.498955]), // Longitude and Latitude 
  //     zoom: 13
  //   })
  // });

  // Event when i Select a View of Drop Down
  // $('.selected-layer').on("click",function(){
  //   var style =  $(this).attr("value");  
  //   for (var i = 0; i < layers.length; ++i) {
  //     layers[i].setVisible(styles[i] === style);      
  //   }
  // });







  // STAMEN MAP: https://openlayers.org/en/latest/examples/stamen.html
  //  var map = new ol.Map({
  //     target: 'map',
  //     layers: [
  //       new ol.layer.Tile({
  //         source: new ol.source.Stamen({
  //           layer: 'watercolor'
  //         })
  //       }),
  //       new ol.layer.Tile({
  //         source: new ol.source.Stamen({
  //           layer: 'terrain-labels'
  //         })
  //       })
  //     ],
  //     view: new ol.View({
  //       center: ol.proj.fromLonLat([11.327591, 44.498955]), // Longitude and Latitude 
  //       zoom: 13
  //     })
  //   });


  // layers: [
  //   new ol.layer.Group({
  //     layers: [
  //       new ol.layer.Tile({
  //         source: new ol.source.OSM() // Tiled Layer
  //       })
  //     ]
  //   })
  // ],
  // =======================================================================
   map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM() // Tiled Layer
      })
    ],
    loadTilesWhileAnimating: true, // is used for old smartphone during the animations
    view: new ol.View({
      center: ol.proj.fromLonLat([11.327591, 44.498955]), // Longitude and Latitude 
      zoom: 13
    })
  });

  // https://stackoverflow.com/questions/27658280/layer-switching-in-openlayers-3
  $('.selected-layer').on("click", function () {
    var layerSelected = $(this).attr("value");
  

    if(layerSelected==="stamen"){
      var stamen = stamenMap();
      map.setLayerGroup(stamen);
    }
    if(layerSelected==="osm"){
      var osm = defaultOSM();
      map.setLayerGroup(osm);
    }

    
   

  });

}



/**
 * Based on tutorial: https://openlayers.org/en/latest/examples/bing-maps.html
 * I Define a layer of Bing. For doing this i Set a KEY from http://www.bingmapsportal.com/ 
 */
function bingMaps() {

}

/**
 * This function return a stamen layer
 * REF: https://openlayers.org/en/latest/examples/stamen.html?q=OSM
 * 
 * @method stamenMap
 */
function stamenMap() {

  var stamenLayers = new ol.layer.Group({
    title: 'Stamen',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.Stamen({
          layer: 'watercolor'
        })
      }),
      new ol.layer.Tile({
        source: new ol.source.Stamen({
          layer: 'terrain-labels'
        })
      })
    ]
  });
  // console.log(stamenLayers.values_.title);
  return stamenLayers;
}

/**
 * This function return a default OSM
 * 
 * @method defaultOSM
 */
function defaultOSM() {

  var layersOSM = new ol.layer.Group({
    title: 'OSM',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM() // Tiled Layer
      })
    ]
  });

  return layersOSM;
}