(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{257:function(e,t,n){"use strict";n.r(t);var a=n(16),o=n(3),r=n(2),i=n(158),c=n(52),u=n(103),l=n(184),s=n(30),d=n(185),v=n(97),p=n(151),f=n(9),m=n(10),g=n(5),w=n(19),b=n(55),y=document.getElementById("tileCoordZ"),h=document.getElementById("tileCoordX"),E=document.getElementById("tileCoordY"),B=function(e){function t(){e.call(this,{featureClass:a.a})}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.readFeatures=function(t,n){return n.extent=Object(b.b)().getTileCoordExtent([parseInt(y.value),parseInt(h.value),parseInt(E.value)]),e.prototype.readFeatures.call(this,t,n)},t}(u.a),I=new i.a({formatConstructors:[B,l.a,s.a,d.a,v.a,p.a]}),x=new o.a({interactions:Object(c.a)().extend([I]),layers:[new g.a({source:new f.b})],target:"map",view:new r.a({center:[0,0],zoom:2})});I.on("addfeatures",(function(e){var t=new m.a({features:e.features});x.addLayer(new w.a({source:t})),x.getView().fit(t.getExtent())}));var C=function(e){var t=[];if(x.forEachFeatureAtPixel(e,(function(e){t.push(e)})),t.length>0){var n,a,o=[];for(n=0,a=t.length;n<a;++n){var r=t[n].get("name")||t[n].get("_name")||t[n].get("layer");r&&o.push(r)}document.getElementById("info").innerHTML=o.join(", ")||"&nbsp"}else document.getElementById("info").innerHTML="&nbsp;"};x.on("pointermove",(function(e){if(!e.dragging){var t=x.getEventPixel(e.originalEvent);C(t)}})),x.on("click",(function(e){C(e.pixel)}));var L=document.getElementById("download");document.getElementById("download-mvt").addEventListener("click",(function(){!function(e,t){fetch(e).then((function(e){return e.blob()})).then((function(e){navigator.msSaveBlob?navigator.msSaveBlob(e,t):(L.href=URL.createObjectURL(e),L.download=t,L.click())}))}("https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/"+y.value+"/"+E.value+"/"+h.value+".pbf",y.value+"-"+h.value+"-"+E.value+".mvt")}))}},[[257,0]]]);
//# sourceMappingURL=drag-and-drop-custom-mvt.js.map