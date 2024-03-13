import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


// 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // Adjust light position
scene.add(directionalLight);



const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

const gui = new dat.GUI();
const options = {
    // self Rotation
    sunSpeed: 0.004,
    mercurySpeed: 0.004,
    venusSpeed: 0.002,
    earthSpeed: 0.02,
    marsSpeed: 0.018,
    jupiterSpeed: 0.04,
    saturnSpeed: 0.038,
    uranusSpeed: 0.03,
    neptuneSpeed: 0.032,
    plutoSpeed: 0.008,

    // Rotation Around Sun
    mercuryOrbitSpeed: 0.04,
    venusOrbitSpeed: 0.015,
    earthOrbitSpeed: 0.01,
    marsOrbitSpeed: 0.008,
    jupiterOrbitSpeed: 0.002,
    saturnOrbitSpeed: 0.0009,
    uranusOrbitSpeed: 0.0004,
    neptuneOrbitSpeed: 0.0001,
    plutoOrbitSpeed: 0.00007

};
// Add controls to dat.GUI for Self Rotation
gui.add(options, 'sunSpeed', 0, 0.1);
gui.add(options, 'mercurySpeed', 0, 0.1);
gui.add(options, 'venusSpeed', 0, 0.1);
gui.add(options, 'earthSpeed', 0, 0.1);
gui.add(options, 'marsSpeed', 0, 0.1);
gui.add(options, 'jupiterSpeed', 0, 0.1);
gui.add(options, 'saturnSpeed', 0, 0.1);
gui.add(options, 'uranusSpeed', 0, 0.1);
gui.add(options, 'neptuneSpeed', 0, 0.1);
gui.add(options, 'plutoSpeed', 0, 0.1);

// Add controls to dat.GUI for Rotation Around Sun

gui.add(options, 'mercuryOrbitSpeed', 0, 0.1);
gui.add(options, 'venusOrbitSpeed', 0, 0.1);
gui.add(options, 'earthOrbitSpeed', 0, 0.1);
gui.add(options, 'marsOrbitSpeed', 0, 0.1);
gui.add(options, 'jupiterOrbitSpeed', 0, 0.1);
gui.add(options, 'saturnOrbitSpeed', 0, 0.1);
gui.add(options, 'uranusOrbitSpeed', 0, 0.1);
gui.add(options, 'neptuneOrbitSpeed', 0, 0.1);
gui.add(options, 'plutoOrbitSpeed', 0, 0.1);

function animate() {
    // Self-rotation
    sun.rotateY(options.sunSpeed);
    mercury.mesh.rotateY(options.mercurySpeed);
    venus.mesh.rotateY(options.venusSpeed);
    earth.mesh.rotateY(options.earthSpeed);
    mars.mesh.rotateY(options.marsSpeed);
    jupiter.mesh.rotateY(options.jupiterSpeed);
    saturn.mesh.rotateY(options.saturnSpeed);
    uranus.mesh.rotateY(options.uranusSpeed);
    neptune.mesh.rotateY(options.neptuneSpeed);
    pluto.mesh.rotateY(options.plutoSpeed);


      // Around-sun-rotation
      mercury.obj.rotateY(options.mercuryOrbitSpeed);
      venus.obj.rotateY(options.venusOrbitSpeed);
      earth.obj.rotateY(options.earthOrbitSpeed);
      mars.obj.rotateY(options.marsOrbitSpeed);
      jupiter.obj.rotateY(options.jupiterOrbitSpeed);
      saturn.obj.rotateY(options.saturnOrbitSpeed);
      uranus.obj.rotateY(options.uranusOrbitSpeed);
      neptune.obj.rotateY(options.neptuneOrbitSpeed);
      pluto.obj.rotateY(options.plutoOrbitSpeed);
    

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});