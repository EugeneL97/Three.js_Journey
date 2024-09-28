import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: false
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
