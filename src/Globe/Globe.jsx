import React, { Component } from 'react';

  var width = 960,
      height = 960,
      radius = 228,
      mesh,
      graticule,
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000),
      renderer = new THREE.WebGLRenderer({ alpha: true });

    camera.position.z = 400;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

class Globe extends Component {

  render() {

  }
}

    // All Orders
    let ordersData;
    var allOrdersGeometry = new THREE.Geometry();
    fetch(
      "https://raw.githubusercontent.com/patrickjneel/Year-Data-Visualization/master/src/db/orders.json"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        ordersData = myJson;
        for (var i = 0; i < myJson.features.length; i++) {
          allOrdersGeometry.vertices.push(
            vertex(myJson.features[i].geometry.coordinates)
          );
          if (
            ordersData.features[i].properties.accountNumber
              .toString()
              .startsWith("4")
          ) {
            highlightedGeometry.vertices.push(
              vertex(ordersData.features[i].geometry.coordinates)
            );
          }
        }
      });

    var allOrdersMaterial = new THREE.PointsMaterial({ color: 0xc0c0c0 });
    var allOrdersField = new THREE.Points(allOrdersGeometry, allOrdersMaterial);

    // Highlighted Orders (Passed as props or state?)

    var highlightedGeometry = new THREE.Geometry();

    var highlightedMaterial = new THREE.PointsMaterial({ color: 0xff69b4 });
    var highlightedField = new THREE.Points(
      highlightedGeometry,
      highlightedMaterial
    );

    d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(
      error,
      topology
    ) {
      if (error) throw error;
      scene.add(allOrdersField);
      scene.add(highlightedField);

      scene.add(
        (graticule = wireframe(
          graticule10(),
          new THREE.LineBasicMaterial({ color: 0xd3d3d3 })
        ))
      );
      scene.add(
        (mesh = wireframe(
          topojson.mesh(topology, topology.objects.land),
          new THREE.LineBasicMaterial({ color: 0x4c9e00 })
        ))
      );
      console.log(scene);
      renderer.render(scene, camera);

      d3.timer(function(t) {
        highlightedField.rotation.x = allOrdersField.rotation.x = graticule.rotation.x = mesh.rotation.x =
          (Math.sin(t / 61000) * Math.PI) / 3 - Math.PI / 2;
        highlightedField.rotation.z = allOrdersField.rotation.z = graticule.rotation.z = mesh.rotation.z =
          t / 60000;
        renderer.render(scene, camera);
      });
    });

    // Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
    function vertex(point) {
      var lambda = (point[0] * Math.PI) / 180,
        phi = (point[1] * Math.PI) / 180,
        cosPhi = Math.cos(phi);
      return new THREE.Vector3(
        radius * cosPhi * Math.cos(lambda),
        radius * cosPhi * Math.sin(lambda),
        radius * Math.sin(phi)
      );
    }

    // Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
    function wireframe(multilinestring, material) {
      var geometry = new THREE.Geometry();
      multilinestring.coordinates.forEach(function(line) {
        d3.pairs(line.map(vertex), function(a, b) {
          geometry.vertices.push(a, b);
        });
      });
      return new THREE.LineSegments(geometry, material);
    }

    // See https://github.com/d3/d3-geo/issues/95
    function graticule10() {
      var epsilon = 1e-6,
        x1 = 180,
        x0 = -x1,
        y1 = 80,
        y0 = -y1,
        dx = 10,
        dy = 10,
        X1 = 180,
        X0 = -X1,
        Y1 = 90,
        Y0 = -Y1,
        DX = 90,
        DY = 360,
        x = graticuleX(y0, y1, 2.5),
        y = graticuleY(x0, x1, 2.5),
        X = graticuleX(Y0, Y1, 2.5),
        Y = graticuleY(X0, X1, 2.5);

      function graticuleX(y0, y1, dy) {
        var y = d3.range(y0, y1 - epsilon, dy).concat(y1);
        return function(x) {
          return y.map(function(y) {
            return [x, y];
          });
        };
      }

      function graticuleY(x0, x1, dx) {
        var x = d3.range(x0, x1 - epsilon, dx).concat(x1);
        return function(y) {
          return x.map(function(x) {
            return [x, y];
          });
        };
      }

      return {
        type: "MultiLineString",
        coordinates: d3
          .range(Math.ceil(X0 / DX) * DX, X1, DX)
          .map(X)
          .concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
          .concat(
            d3
              .range(Math.ceil(x0 / dx) * dx, x1, dx)
              .filter(function(x) {
                return Math.abs(x % DX) > epsilon;
              })
              .map(x)
          )
          .concat(
            d3
              .range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy)
              .filter(function(y) {
                return Math.abs(y % DY) > epsilon;
              })
              .map(y)
          )
      };
    }

export default Globe;