/* global google */

initGoogleMaps();

function createHtmlMapMarker({
  OverlayView = google.maps.OverlayView,
  ...args
}) {
  class HtmlMapMarker extends OverlayView {
    constructor() {
      super();
      this.position = args.position;
      this.html = args.html;
      this.setMap(args.map);
    }

    createDiv() {
      this.div = document.createElement('div');
      this.div.style.position = 'absolute';
      if (this.html) {
        this.div.innerHTML = this.html;
      }
      google.maps.event.addDomListener(this.div, 'click', (event) => {
        google.maps.event.trigger(this, 'click');
      });
    }

    appendDivToOverlay() {
      const panes = this.getPanes();
      panes.overlayLayer.appendChild(this.div);
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.position);
      if (point) {
        this.div.style.left = `${point.x}px`;
        this.div.style.top = `${point.y}px`;
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }

    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }

    getPosition() {
      return this.position;
    }

    getDraggable() {
      return false;
    }
  }

  return new HtmlMapMarker();
}

function initGoogleMaps() {
  // create script
  const script = document.createElement('script');
  const key = 'AIzaSyBUg7IvVOeUYZunT0DEEaVRwYi8Tx7fc-8';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMaps`;
  script.defer = true;
  script.async = true;

  // callback function after script is loaded
  window.initMaps = function () {
    const maps = [...document.querySelectorAll('.map')];

    if (maps.length) {
      maps.forEach((el) => {
        // extract map data from DOM element
        const center = JSON.parse(el.getAttribute('data-center'));
        const lat = parseFloat(center.lat);
        const lng = parseFloat(center.lng);
        const zoom = parseInt(el.getAttribute('data-zoom'), 10);
        const markers = JSON.parse(el.getAttribute('data-markers'));

        // instantiate map
        const styles = [
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                saturation: '-100',
              },
            ],
          },
          {
            featureType: 'administrative.province',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 65,
              },
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: '50',
              },
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [
              {
                saturation: '-100',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'all',
            stylers: [
              {
                lightness: '30',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'all',
            stylers: [
              {
                lightness: '40',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
              {
                saturation: -100,
              },
              {
                visibility: 'simplified',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                hue: '#ffff00',
              },
              {
                lightness: -25,
              },
              {
                saturation: -97,
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels',
            stylers: [
              {
                lightness: -25,
              },
              {
                saturation: -100,
              },
            ],
          },
        ];
        const options = {
          disableDefaultUI: true,
          center: new google.maps.LatLng({ lat, lng }),
          zoom,
          styles,
        };

        // instantiate map and plot markers on map
        const map = new google.maps.Map(el, options);
        markers.forEach((marker) => {
          const lat = parseFloat(marker.lat);
          const lng = parseFloat(marker.lng);
          createHtmlMapMarker({
            position: new google.maps.LatLng({ lat, lng }),
            map,
            html: `
              <div class="map__marker">
                <div class="map__marker-label">
                  ${marker.title}
                </div>
                <img
                  class="map__marker-pin"
                  src="${marker.pin.src}"
                  alt="${marker.pin.alt || marker.title}">
              </div>`,
          });
        });
      });
    }
  };

  // append tag to DOM to request for script
  document.head.appendChild(script);
}
