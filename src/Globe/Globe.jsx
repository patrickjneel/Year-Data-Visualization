import React, { Component } from 'react';
import * as d3 from "d3";
import * as THREE from 'three';
import * as topojson from "topojson-client";

  let mesh;
  let graticule;
    // renderer.setPixelRatio(window.devicePixelRatio);
    // Highlighted Orders (Passed as props or state?)
class Globe extends Component {
  // Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
  componentDidMount() {
    const height = 960;
    const width = 960;
    const radius = 228;

    //ADD SCENE
    this.scene = new THREE.Scene()

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
    this.camera.position.z = 400;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

     d3.json("https://unpkg.com/world-atlas@1/world/50m.json", (error, topology) => {
      if (error) throw error;
      // this.scene.add(allOrdersField);
      // this.scene.add(highlightedField);
      this.scene.add(
        (graticule = this.wireframe(
          this.graticule10(),
          new THREE.LineBasicMaterial({ color: 0xd3d3d3 })
        ))
      );
      this.scene.add(
        (mesh = this.wireframe(
          topojson.mesh(topology, topology.objects.land),
          new THREE.LineBasicMaterial({ color: 0x4c9e00 })
        ))
      );
      this.renderer.render(this.scene, this.camera);

      d3.timer(function(t) {
        graticule.rotation.x = mesh.rotation.x =
          (Math.sin(t / 61000) * Math.PI) / 3 - Math.PI / 2;
        graticule.rotation.z = mesh.rotation.z =
          t / 60000;
        this.renderer.render(this.scene, this.camera);
      });
    });

    //ADD WORLD
    // const highlightedGeometry = new THREE.Geometry();
    // const highlightedMaterial = new THREE.PointsMaterial({ color: 0xff69b4 })
    // const highlightedField = new THREE.Points(highlightedGeometry, highlightedMaterial)
  }

    vertex = point => {
      var lambda = (point[0] * Math.PI) / 180,
        phi = (point[1] * Math.PI) / 180,
        cosPhi = Math.cos(phi);
      return new THREE.Vector3(
        this.radius * cosPhi * Math.cos(lambda),
        this.radius * cosPhi * Math.sin(lambda),
        this.radius * Math.sin(phi)
      );
    }

    // Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
    wireframe = (multilinestring, material) => {
      const geometry = new THREE.Geometry();
      multilinestring.coordinates.forEach(function(line) {
        d3.pairs(line.map(this.vertex), function(a, b) {
          geometry.vertices.push(a, b);
        });
      });
      return new THREE.LineSegments(geometry, material);
    }

   graticule10 = () => {
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

        // All Orders
    // allOrders = () => {
    //   let ordersData;
    // var allOrdersGeometry = new THREE.Geometry();
    //     ordersData = this.props.orders;
    //     for (var i = 0; i < this.props.orders.features.length; i++) {
    //       allOrdersGeometry.vertices.push(
    //         this.vertex(this.props.orders.features[i].geometry.coordinates)
    //       );
    //       if (
    //         ordersData.features[i].properties.accountNumber
    //           .toString()
    //           .startsWith("4")
    //       ) {
    //         highlightedGeometry.vertices.push(
    //           this.vertex(ordersData.features[i].geometry.coordinates)
    //         );
    //       }
    //     }
    //     // const allOrdersMaterial = new THREE.PointsMaterial({ color: 0xc0c0c0 });
    //     // const allOrdersField = new THREE.Points(allOrdersGeometry, allOrdersMaterial);
    // }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px'}}
        ref={(mount) => this.mount = mount}
      />
    )
  }
}

export default Globe;