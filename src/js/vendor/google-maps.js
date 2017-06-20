function contactMap() {
    var latlng = new google.maps.LatLng(-37.80425,144.9919508);

    var contactMapOptionsGeneral =
    {
    styles : [
    {
      featureType:"water",
      elementType:"geometry",
      stylers: [
        {color:"#e9e9e9"},
        {lightness:17}
      ]
    },
    {
      featureType:"landscape",
      elementType:"geometry",
      stylers: [
        {color:"#f5f5f5"},
        {lightness:20}
      ]
      },
      {
        featureType:"road.highway",
        elementType:"geometry.fill",
        stylers: [
          {color:"#ffffff"},
          {lightness:17}
        ]
      },
      {
        featureType:"road.highway",
        elementType:"geometry.stroke",
        stylers: [
          {color:"#ffffff"},
          {lightness:29},
          {weight:0.2}
        ]
      },
      {
        featureType:"road.arterial",
        elementType:"geometry",
        stylers: [
          {color:"#ffffff"},
          {lightness:18}
        ]
      },
      {
        featureType:"road.local",
        elementType:"geometry",
        stylers: [
          {color:"#ffffff"},
          {lightness:16}
        ]
      },
      {
        featureType:"poi",
        elementType:"geometry",
        stylers: [
          {color:"#f5f5f5"},
          {lightness:21}
        ]
      },
      {
        featureType:"poi.park",
        elementType:"geometry",
        stylers: [
          {color:"#dedede"},
          {lightness:21}
        ]
      },
      {
        elementType:"labels.text.stroke",
        stylers: [
          {visibility:"on"},
          {color:"#ffffff"},
          {lightness:16}
        ]
      },
      {
        elementType:"labels.text.fill",
        stylers: [
          {saturation:36},
          {color:"#333333"},
          {lightness:40}
        ]
      },
      {
        elementType:"labels.icon",
        stylers: [
          {visibility:"off"}
        ]
      },
      {
        featureType:"transit",
        elementType:"geometry",
        stylers: [
          {color:"#f2f2f2"},
          {lightness:19}
        ]
      },
      {
        featureType:"administrative",
        elementType:"geometry.fill",
        stylers: [
          {color:"#fefefe"},
          {lightness:20}
        ]
      },
      {
        featureType:"administrative",
        elementType:"geometry.stroke",
        stylers: [
          {color:"#fefefe"},
          {lightness:17},
          {weight:1.2}
        ]
      }
    ],
    zoom: 16,
    center: latlng,
    main_color: '#007148',
    saturation_value: -1,
    brightness_value: 1,
    disableDefaultUI: true,
    scrollwheel: false
    };

    var contactMapOptions =
    {
        zoom: 15
    };

    var contactMap = new google.maps.Map(document.getElementById("contact-map"), contactMapOptionsGeneral, contactMapOptions);



    var image = 'images/pin.png';
    var contactMarker = new google.maps.Marker(
    {
        position: latlng,
        map: contactMap,
        icon: image
   });
}
