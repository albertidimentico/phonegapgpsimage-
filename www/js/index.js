/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



 function onSuccess(position){
    /*alert(position.coords.latitude+ "-" + position.coords.longitude);*/
    var latitud=document.getElementById("lat");
    var longitud=document.getElementById("lon");
    latitud.innerHTML=""+position.coords.latitude;
    longitud.innerHTML=""+position.coords.longitude;

    var coords= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

    var opciones = {center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP};

    var mapa = new google.maps.Map(document.getElementById("map"),opciones);

    var marcador= new google.maps.Marker({
        position:coords,
        map: mapa,
        title: ":D",
        animation: google.maps.Animation.DROP
    });


    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var latitudpasar = position.coords.latitude;
    var longitudpasar = position.coords.longitude;
    geocodeLatLng(geocoder, mapa, infowindow,latitudpasar,longitudpasar);



 }

function onError(err){
    console.log("codigo de err:"+err.code+"  msj="+err.message);
}


function geocodeLatLng(geocoder, map, infowindow,latitudpasar,longitudpasar) {

    /*alert(latitudpasar + "," +longitudpasar);*/
    var input = latitudpasar + "," +longitudpasar;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          /*alert(results[1].formatted_address);*/

          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No hay resultados');
        }
      } else {
        window.alert('Geocoder error ' + status);
      }
    });
 }


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        var tomarimagen = document.getElementById('tomarimagen');
        tomarimagen.addEventListener('click', app.tomarimagen, false);


    },

    tomarimagen: function(){
        navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20,
        allowEdit: false, destinationType: navigator.camera.DestinationType.DATA_URL,saveToPhotoAlbum: false });

    },


    onPhotoDataSuccess: function(imageData) {

        var photo = document.getElementById('photo');

        photo.style.display = 'block';

        photo.src = "data:image/jpeg;base64," + imageData;

        document.getElementById('fichero').innerHTML = imageData;

        navigator.geolocation.getCurrentPosition(onSuccess,onError,{maximunAge: 300000,timeout:10000, enableHighAccuracy:true});

    },



    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
