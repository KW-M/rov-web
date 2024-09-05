<script lang="ts">
  import { onMount } from "svelte";
  import environmentTexture from "./af888358-6071-48e8-95d0-2337b456cd68.jpg";
  import tinyRovModel from "./Tiny_ROV_Color.glb?url";

  // Import Three.js dependencies
  import * as THREE from "three";
  import { PerspectiveCamera } from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { rovDrivingVector } from "../../js/globalContext";
  import { Vector3 } from "../../js/shared/libraries/ThreeJS/Vector3";
  import { showToastMessage, ToastSeverity } from "../../js/toastMessageManager";
  const modelLoader = new GLTFLoader();

  export let canvasClass = "block absolute top-2 left-2 rounded-full";
  export let showEnvironment = false;
  const canvasSize = 200;
  const rovSpeed = 0.6;
  const rovTurnSpeed = (1.2 * Math.PI) / 180;
  const dustParticleCount = 40;
  const dustVolumeSize = 50;
  const dustVolumesPerSide = 4;

  let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: PerspectiveCamera, rovModel: THREE.Group<THREE.Object3DEventMap>;
  let baseDustVolumeGeometry: THREE.BufferGeometry = computeDustVolume();
  let dustVolumes = [];
  let dustVolumeOffsets = [];
  let toDispose = [];
  let threeCanvas;

  const addAndDispose = (object) => {
    scene.add(object);
    toDispose.push(object);
  };

  function computeDustVolume() {
    const positions = [];
    const n = dustVolumeSize;
    const n2 = n / 2; //midpoint of the cube

    // Generate random scatter of particles
    for (let i = 0; i < dustParticleCount; i++) {
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;
      positions.push(x, y, z);
    }

    // Make a THREE.js geometry from those points
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();
    return geometry;
  }

  function addDustVolumes(scene) {
    // const material = new THREE.PointsMaterial({ size: 0.6, vertexColors: false });
    const material = new THREE.ShaderMaterial({
      uniforms: {},
      transparent: true,
      vertexShader: `
        varying float vOpacity;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = 0.3 * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
          // vOpacity = 1.0 - (-mvPosition.z / 80.0);
          vOpacity = 1.0 - (-mvPosition.z / 80.0) - max(1.0 - ((mvPosition.z * mvPosition.z - 20.) / 40.0), 0.0);
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
        }
      `,
    });
    const centerOffset = dustVolumeSize * dustVolumesPerSide * 0.5;

    // construct a 3D grid of dust volumes based on the number of dust volumes per side and the size of each dust volume
    for (let x = 0; x < dustVolumesPerSide; x++) {
      for (let y = 0; y < dustVolumesPerSide; y++) {
        for (let z = 0; z < dustVolumesPerSide; z++) {
          const volume = new THREE.Points(baseDustVolumeGeometry, material);
          const pos = { x: x * dustVolumeSize - centerOffset, y: y * dustVolumeSize - centerOffset, z: z * dustVolumeSize - centerOffset };
          volume.position.set(pos.x, pos.y, pos.z);
          dustVolumeOffsets.push(pos);
          dustVolumes.push(volume);
          scene.add(volume);
          toDispose.push(volume.geometry);
        }
      }
    }
  }

  const updateDustVolumes = () => {
    // const positions = baseDustVolumeGeometry.attributes.position.array;
    // for (let i = 0; i < positions.length; i += 3) {
    //   positions[i] += Math.random() * 0.001 - 0.0005;
    //   positions[i + 1] -= Math.random() * 0.0001;
    //   positions[i + 2] += Math.random() * 0.001 - 0.0005;
    // }
    // baseDustVolumeGeometry.attributes.position.needsUpdate = true;

    const rovRoundedPosition = new THREE.Vector3(rovModel.position.x / dustVolumeSize, rovModel.position.y / dustVolumeSize, rovModel.position.z / dustVolumeSize).round().multiplyScalar(dustVolumeSize);
    for (let i = 0; i < dustVolumes.length; i++) {
      const volume = dustVolumes[i];
      const offset = dustVolumeOffsets[i];
      volume.position.set(rovRoundedPosition.x + offset.x, rovRoundedPosition.y + offset.y, rovRoundedPosition.z + offset.z);
    }
  };

  onMount(() => {
    // Create a renderer
    renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, antialias: true });
    renderer.setSize(canvasSize, canvasSize);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    toDispose.push(renderer);

    // Create a scene
    scene = new THREE.Scene();
    addDustVolumes(scene);

    // Create a camera
    camera = new PerspectiveCamera(
      75,
      1 / 1, // window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Create an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    addAndDispose(ambientLight);

    // Create a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 1, 0);
    directionalLight.rotation.set(Math.PI * 2, Math.PI * 2, 0);
    addAndDispose(directionalLight);

    if (showEnvironment) {
      // Add an environment texture
      const textureLoader = new THREE.TextureLoader();
      const environmentMap = textureLoader.load(environmentTexture, () => {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = environmentMap;
      });
      toDispose.push(environmentMap);
    }

    modelLoader.load(
      tinyRovModel,
      (gltf) => {
        if (renderer === null) return;
        rovModel = gltf.scene;
        scene.add(rovModel);

        console.log("ROV Model", rovModel);
        const headLight = new THREE.PointLight(0xffffff, 0, 100);
        headLight.position.set(0, 8.5, 18);
        rovModel.add(headLight);

        const propellerR = rovModel.children.find((child) => child.name === "Prop_R");
        const propellerL = propellerR.clone();
        propellerL.position.x = -propellerR.position.x;
        rovModel.add(propellerL);

        const clawR = rovModel.children.find((child) => child.name === "Claw_R");
        const clawL = clawR.clone();
        clawL.rotation.z = Math.PI;
        rovModel.add(clawL);

        let cameraOffset = new THREE.Vector3(0, 25, -50);

        // Animation loop
        function animate() {
          if (renderer === null) return;
          requestAnimationFrame(animate);

          const drivingVector = rovDrivingVector.get();
          const moveZ = drivingVector.VelocityX * rovSpeed;
          const moveX = -1 * drivingVector.VelocityY * rovSpeed;
          const moveY = drivingVector.VelocityZ * rovSpeed;
          const yaw = -drivingVector.AngularVelocityYaw * rovTurnSpeed;
          rovModel.translateX(moveX);
          rovModel.translateY(moveY);
          rovModel.translateZ(moveZ);
          rovModel.rotation.y += yaw;

          propellerL.rotation.z += moveZ * 0.25 - yaw * 2;
          propellerR.rotation.z += moveZ * 0.25 + yaw * 2;

          clawL.rotation.y = moveY;
          clawR.rotation.y = -moveY;

          headLight.intensity = 500 * Math.max(-moveY, 0);

          if (drivingVector.ButtonBitmask !== 0) {
            cameraOffset = new THREE.Vector3(0, 20, 50);
          } else if (moveZ > 0) {
            cameraOffset = new THREE.Vector3(0, 25, -50);
          }

          // camera follows the cube
          const camTarget = new Vector3().copy(cameraOffset).applyMatrix4(rovModel.matrixWorld);
          camera.position.lerp(camTarget, 0.1);
          camera.lookAt(rovModel.position);

          // updateDust(dust);
          updateDustVolumes();

          // Render the scene with the camera
          renderer.render(scene, camera);
        }

        animate();
      },
      (xhr) => {},
      (error) => {
        showToastMessage("Error loading ROV model", 1000, false, ToastSeverity.error);
        console.error("Error loading ROV model", error);
      },
    );

    // Cleanup event listeners on component unmount
    return () => {
      for (const obj of toDispose) {
        if (obj.dispose) obj.dispose();
        else if (obj.destroy) obj.destroy();
        else console.error("Unknown object to dispose", obj);
      }
      renderer = null;
      toDispose = [];
      dustVolumes = [];
      dustVolumeOffsets = [];
    };
  });
</script>

<canvas class={canvasClass} width={canvasSize} height={canvasSize} bind:this={threeCanvas} />
