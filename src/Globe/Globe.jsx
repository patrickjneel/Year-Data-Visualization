
import React, { Component } from 'react';
import * as d3 from "d3";
import * as THREE from 'three';
import * as topojson from "topojson-client";

const radius = 228;
const renderer = new THREE.WebGLRenderer({ alpha: true })
let width = 750;
let height = 750;
//ADD SCENE
const scene = new THREE.Scene()
//ADD CAMERA
const camera = new THREE.PerspectiveCamera(
  70,
  width / height,
  1,
  1000
)
camera.position.z = 400
let highlightedGeometry = new THREE.Geometry();
let highlightedMaterial = new THREE.PointsMaterial({ color: 0xff69b4, size: 2.2 })
let highlightedField = new THREE.Points(highlightedGeometry, highlightedMaterial)

const vertex = (point) => {
  var lambda = (point[0] * Math.PI) / 180,
      phi = (point[1] * Math.PI) / 180,
      cosPhi = Math.cos(phi);
  return new THREE.Vector3(
      radius * cosPhi * Math.cos(lambda),
      radius * cosPhi * Math.sin(lambda),
      radius * Math.sin(phi)
  );
}

let locationArr;

class Globe extends Component{
  state = {
    topology: {},
  };


    // ours
  wireframe(multilinestring, material) {
    const geometry = new THREE.Geometry();
      multilinestring.coordinates.forEach(function(line) {
        d3.pairs(line.map(vertex), function(a, b) {
          geometry.vertices.push(a, b);
        });
      });
    return new THREE.LineSegments(geometry, material);
  }

  graticule10() {
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

  shouldComponentUpdate(nextProps, nextState) {
    scene.remove(highlightedField)
    highlightedField.geometry.dispose()
    highlightedField = null;
    highlightedGeometry = null;
    highlightedGeometry = new THREE.Geometry();
    highlightedField = new THREE.Points(highlightedGeometry, highlightedMaterial)
    const { selectedDate, summaryData } = nextProps;
    locationArr = selectedDate(summaryData.date);
    if(locationArr && locationArr.length) {
      for (var i = 0; i < locationArr.length; i++) {

          highlightedField.geometry.verticesNeedUpdate = true;
          highlightedGeometry.vertices.push(
          vertex(locationArr[i].geometry.coordinates)
        );
      }
    scene.add(highlightedField)
    console.log(highlightedField)
    }
    return true;
  }

  async componentWillMount(){
    const { orders, summaryData, selectedDate } = this.props;

    const topology = await d3.json("https://unpkg.com/world-atlas@1/world/50m.json");
    this.setState({topology});
    width = this.mount.clientWidth
    height = this.mount.clientHeight
    let mesh;
    let graticule;
    //ADD RENDERER
    renderer.setSize(width, height)
    this.mount.appendChild(renderer.domElement)
    //ADD Globe here
    // create geometry
    const allOrdersGeometry = new THREE.Geometry();
    const allOrdersMaterial = new THREE.PointsMaterial({ color: 0xc0c0c0 });
    const allOrdersField = new THREE.Points(allOrdersGeometry, allOrdersMaterial);
    
      // Add actual coord points to geometry layers
    // for (var i = 0; i < orders.features.length; i++) {
    //     allOrdersGeometry.vertices.push(
    //     vertex(orders.features[i].geometry.coordinates)
    //   );
    // }
      // add fields/layers to scene
    scene.add(allOrdersField);
    scene.add(highlightedField);
    scene.add(
      (graticule = this.wireframe(
          this.graticule10(),
          new THREE.LineBasicMaterial({ color: 0xd3d3d3 })
        ))
      );
    scene.add(
      (mesh = this.wireframe(
        topojson.mesh(this.state.topology, this.state.topology.objects.land),
        new THREE.LineBasicMaterial({ color: 0x4c9e00 })
      ))
    );

    d3.timer(function(t) {
      allOrdersField.rotation.x = highlightedField.rotation.x = graticule.rotation.x = mesh.rotation.x =
        (Math.sin(t / 61000) * Math.PI) / 3 - Math.PI / 2;
      allOrdersField.rotation.z = highlightedField.rotation.z = graticule.rotation.z = mesh.rotation.z =
        t / 60000;
      renderer.render(scene, camera);
    });
  }

render(){
    return(
      <div
        style={{ width: '750px', height: '750px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default Globe

