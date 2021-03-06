window.onload = init;

function init(){

  //make openstreetmap tile
  var OSM = new ol.layer.Tile({
    title : 'OSM',
    type : 'base',
    visible: true,
    source: new ol.source.OSM()
  })

  //make satellite map Tile
  var satellite = new ol.layer.Tile({
    title: 'satellite',
    type: 'base',
    visible: true,
    source: new ol.source.XYZ({
      attributions: [ 'Powered by Esri', 'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID,IGN, and the GIS User Community'],
      attributionsCollapsible: false,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom:23    
    })
  })

  //basemap group
  var base_maps = new ol.layer.Group({
    title: 'Tiles',
    layers: [satellite,OSM]
  })

  //make map in html where id:Map is
  //make views
  var view = new ol.View({
    projection: 'EPSG:4326',
    center: [9.5,48.3],
    zoom: 9
  });

  var map = new ol.Map({
    target: 'map',
    view: view,
  })

  map.addLayer(base_maps)

  //add layerswitcher on map
  //layerswitcher options: https://openbase.com/js/ol-layerswitcher/documentation#groupselectstyle
  var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    label: '',
    collapseLabel: 'X',
    tipLabel: 'Layers',
    collapseTipLabel: 'Collapse legend',
    groupSelectStyle: 'children',
    reverse: true
  })
  map.addControl(layerSwitcher)
  layerSwitcher.renderPanel();

  ////////////////////////
  //style for polygons////
  ////////////////////////

  //decluttering https://www.giserdqy.com/wp-content/guids/ol-v4.6.5/examples/vector-label-decluttering.html == prevent labels overlapped.

  //find a widest geometry for label
  var labelStyle = new ol.style.Style({
    text: new ol.style.Text({
      font: '20px sans-serif',
      overflow: true,
    }),
    geometry: function(feature){
      var geomtr = feature.getGeometry();
      if (geomtr.getType() == 'MultiPolygon'){
        var polygons = geomtr.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i< ii; ++i){
          var polygon = polygons[i];
          var width = ol.extent.getWidth(polygon.getExtent());
          if(width > widest){
            widest = width;
            geomtr = polygon;
          }
        }
      }
      return geomtr;
    },
  })

  // all polygons for polygon style
  var polygonStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(100,100,100,1)',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(150,150,150,0.5)'
    })
  })


  var style = [labelStyle,polygonStyle]

  /////////////////////////////
  //Add landkreis shape files//
  /////////////////////////////

  //add alb-donau-kreis shape
  var adk = new ol.layer.Vector({
    title: 'alb-donau-kreis',
    source: new ol.source.Vector({
      url: 'Polygons/ADK4326.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      //labelstyle.getText() == new ol.style.Text
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetX(0)
      return style;
    },
    declutter: true
  })

  //add biberach shape
  var bib = new ol.layer.Vector({
    title: 'biberach',
    source: new ol.source.Vector({
      url: 'Polygons/BIBPolygon4326.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(30)
      labelStyle.getText().setOffsetX(20)
      return style;
    },
    declutter: true,
  })
  //add Bodelshausen shape
  var bodelshausen = new ol.layer.Vector({
    title: 'bodelshausen',
    source: new ol.source.Vector({
      url: 'Polygons/BodelsPolygon.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(0)
      labelStyle.getText().setOffsetX(20)
      return style;
    },
    declutter: true
  })
  
  //add bodenseekreis shape
  var bsk = new ol.layer.Vector({
    title: 'bodenseekreis',
    source: new ol.source.Vector({
      url: 'Polygons/BSK4326Polygon.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(10)
      return style;
    },
    declutter: true
  })

  //add Hirringen shape
  var hirringen = new ol.layer.Vector({
    title: 'hirringen',
    source: new ol.source.Vector({
      url: 'Polygons/HirringenPoly.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(5)
      labelStyle.getText().setOffsetX(20)
      return style;
    },
    declutter: true
  })
    
  //add ostalbkreis shape
  var oak = new ol.layer.Vector({
    title: 'ostalbkreis',
    source: new ol.source.Vector({
      url: 'Polygons/OAK4326polygon1.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      return style;
    },
    declutter: true
  })

  //add reutlingen shape
  var reu = new ol.layer.Vector({
    title: 'reutlingen',
    source: new ol.source.Vector({
      url: 'Polygons/REU4326Polygon.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(0)
      labelStyle.getText().setOffsetX(-40)
      return style;
    },
    declutter: true
  })

  //add zollernalbkreis shape
  var zak = new ol.layer.Vector({
    title: 'zollernalbkreis',
    source: new ol.source.Vector({
      url: 'Polygons/ZAK4326Polygon.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(0)
      labelStyle.getText().setOffsetX(0)
      return style;
    },
    declutter: true
  })

  //add Freudenstadt shape
  var fds = new ol.layer.Vector({
    title: 'freudenstadt',
    source: new ol.source.Vector({
      url: 'Polygons/FDS.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(0)
      labelStyle.getText().setOffsetX(-50)
      return style;
    },
    declutter: true
  })

  //add Ravensburg shape
  var rv = new ol.layer.Vector({
    title: 'ravensburg',
    source: new ol.source.Vector({
      url: 'Polygons/RV4326.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature){
      labelStyle.getText().setText(feature.get('NAME_3'))
      labelStyle.getText().setOffsetY(0)
      labelStyle.getText().setOffsetX(0)
      return style;
    },
    declutter: true
  })


  //landkreis group
  var landkreis = new ol.layer.Group({
    title: 'landkreis',
    layers: [adk,bib, bodelshausen,bsk,hirringen,oak,reu,zak,fds,rv]
  })
  
  map.addLayer(landkreis)

  //highlight when mouse-over
  //MouseOver label style
  var labelStyleMO = new ol.style.Style({
    text: new ol.style.Text({
      font: '20px sans-serif',
      overflow: true,
      fill: new ol.style.Fill({
        color: 'white'
      })
    }),
    geometry: function(feature){
      var geomtr = feature.getGeometry();
      if (geomtr.getType() == 'MultiPolygon'){
        var polygons = geomtr.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i< ii; ++i){
          var polygon = polygons[i];
          var width = ol.extent.getWidth(polygon.getExtent());
          if(width > widest){
            widest = width;
            geomtr = polygon;
          }
        }
      }
      return geomtr;
    },
    
  })

  ///////////////////////
  //Mouseover Highlight//
  ///////////////////////

  //MouseOver polygonstyle
  var polygonStyleMO = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'white',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0,0,255,0.6)'
    }),
  })
  
  var styleMO = [labelStyleMO,polygonStyleMO]

  var selectPointerMove = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    style: function(feature){
      // labelStyleMO.getText().setText(feature.get('Name'))
      return styleMO;
    }
  });
  // add interaction
  map.addInteraction(selectPointerMove)

  ////////////////////////////////
  //Show Polygon Info on sidebar//
  ////////////////////////////////

  var name = document.getElementById('name')
  var residents = document.getElementById('residents')


  map.on('click', function(e){
    name.innerHTML = '&nbsp;'
    residents.innerHTML = '&nbsp;'
    map.forEachFeatureAtPixel(e.pixel, function(feature){
      let clickedFeatureName = feature.get('NAME_3')
      let clickedFeatureResidents = feature.get('Residents')
      name.innerHTML = clickedFeatureName;
      residents.innerHTML = clickedFeatureResidents;
    })
  })

  var zoom = map.getView().getZoom();
  console.log(zoom)
}
