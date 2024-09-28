import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

// Door Texture
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Floor Textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorArmTexture = textureLoader.load('./floor/cobblestone_floor_13_2k/cobblestone_floor_13_arm_2k.jpg')
const floorBumpTexture = textureLoader.load('./floor/cobblestone_floor_13_2k/cobblestone_floor_13_bump_2k.jpg')
const floorColorTexture = textureLoader.load('./floor/cobblestone_floor_13_2k/cobblestone_floor_13_diff_2k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/cobblestone_floor_13_2k/cobblestone_floor_13_disp_2k.jpg')
const floorNormalTexture = textureLoader.load('./floor/cobblestone_floor_13_2k/cobblestone_floor_13_nor_gl_2k.jpg')
const floorSpecTexture = textureLoader.load('./floor/cobblestone_floor_13_2k/cobblestone_floor_13_spec_2k.jpg')

floorColorTexture.repeat.set(8, 8)
floorColorTexture.colorSpace = THREE.SRGBColorSpace
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorArmTexture.repeat.set(8, 8)
floorArmTexture.wrapS = THREE.RepeatWrapping
floorArmTexture.wrapT = THREE.RepeatWrapping

floorSpecTexture.repeat.set(8, 8)
floorSpecTexture.wrapS = THREE.RepeatWrapping
floorSpecTexture.wrapT = THREE.RepeatWrapping

floorBumpTexture.repeat.set(8, 8)
floorBumpTexture.wrapS = THREE.RepeatWrapping
floorBumpTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

// Wall Texture
const wallArmTexture = textureLoader.load('./wall/brick_wall_006_2k/brick_wall_006_arm_2k.jpg')
const wallColorTexture = textureLoader.load('./wall/brick_wall_006_2k/brick_wall_006_diff_2k.jpg')
const wallNormalTexture = textureLoader.load('./wall/brick_wall_006_2k/brick_wall_006_nor_gl_2k.jpg')

wallArmTexture.colorSpace = THREE.SRGBColorSpace
wallArmTexture.repeat.set(1.75, 1)
wallArmTexture.wrapS = THREE.RepeatWrapping
wallArmTexture.wrapT = THREE.RepeatWrapping

wallColorTexture.repeat.set(1.75, 1)
wallColorTexture.wrapS = THREE.RepeatWrapping
wallColorTexture.wrapT = THREE.RepeatWrapping

wallNormalTexture.repeat.set(1.75, 1)
wallNormalTexture.wrapS = THREE.RepeatWrapping
wallNormalTexture.wrapT = THREE.RepeatWrapping

// Roof Texture
const roofArmTexture = textureLoader.load('./roof/roof_3_2k/roof_3_arm_2k.jpg')
const roofColorTexture = textureLoader.load('./roof/roof_3_2k/roof_3_diff_2k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_3_2k/roof_3_nor_gl_2k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofArmTexture.repeat.set(6, 1)
roofArmTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.repeat.set(6, 1)
roofColorTexture.wrapS = THREE.RepeatWrapping

roofNormalTexture.repeat.set(6, 1)
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush Texture
const bushArmTexture = textureLoader.load('./bush/forest_leaves_03_2k/forest_leaves_03_arm_2k.jpg')
const bushColorTexture = textureLoader.load('/bush/forest_leaves_03_2k/forest_leaves_03_diff_2k.jpg')
const bushNormalTexture = textureLoader.load('/bush/forest_leaves_03_2k/forest_leaves_03_nor_gl_2k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

// Grave Texture
const graveArmTexture = textureLoader.load('./grave/plastered_stone_wall_2k/plastered_stone_wall_arm_2k.jpg')
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_2k/plastered_stone_wall_diff_2k.jpg')
const graveNormalTexture = textureLoader.load('./ grave/plastered_stone_wall_2k/plastered_stone_wall_nor_gl_2k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveArmTexture.repeat.set(0.3, 0.4)
graveColorTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * House
 */

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorArmTexture,
        roughnessMap: floorArmTexture,
        metalnessMap: floorArmTexture,
        bumpMap: floorBumpTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.14,
        normalMap: floorNormalTexture,
        
    })
)
floor.rotation.x += - Math.PI / 2
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')
// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallArmTexture,
        roughness: wallArmTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += 2.5 / 2
house.add(walls)

// Roof 
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofArmTexture,
        roughnessMap: roofArmTexture,
        metalnessMap: roofArmTexture,
        normalMap: roofNormalTexture
    })
)
roof.rotation.y = Math.PI * .25
roof.position.y = 2.5 + 0.75
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture

    })
)
door.position.z = 2 + 0.01
door.position.y = 1.1
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushArmTexture,
    roughnessMap: bushArmTexture,
    metalnessMap: bushArmTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75
house.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveArmTexture,
    roughnessMap: graveArmTexture,
    metalnessMap: graveArmTexture,
    normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 30; i++){
    // Coordinates
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    // Graves group
    graves.add(grave)
}
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door Light
const pointLight = new THREE.PointLight('#ff7d46', 5)
pointLight.position.set(0, 2.2, 2.5)
scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

// Ghosts
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and Receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.top = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.top = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.top = 10

/**
 * Sky
 */

const sky = new Sky()
sky.scale.set(100, 100, 100)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
scene.add(sky)

/**
 * Fog
 */

scene.fog = new THREE.FogExp2("#08343f", 0.1)
/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.43) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.43) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.43) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()