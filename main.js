import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three'

// orbit controls to move around the scene with mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// add shape
// const x = 0, y = 0;

// const heartShape = new THREE.Shape();

// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// const geometry = new THREE.ShapeGeometry( heartShape );
const geometry = new THREE.TorusGeometry (10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFFDED7});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

// add a light to reflect
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(5, 5, 5);

// ambient light is much bigger and lights up the whole room
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(pointLight, ambientLight);

// // light helper to see where the light is
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.gridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// listens to events on the mouse and updates camera position
const controls = new OrbitControls(camera, renderer.domElement);

// add stars to the background
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// add background image
const spaceTexture = new THREE.TextureLoader().load('cloud.png');
scene.background = spaceTexture;

// texture mapping
const jewelTexture = new THREE.TextureLoader().load('jewel.jpg');
const jewel = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: jewelTexture })
);
scene.add(jewel)

// animate function
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update()
  renderer.render(scene, camera);
}

animate()