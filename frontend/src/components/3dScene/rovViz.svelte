<script lang="ts">
  import { onMount } from "svelte";
  import environmentTexture from "./environment.jpg";
  import tinyRovModel from "./Tiny_ROV_Color.glb?url";

  // Import js dependencies
  import { PerspectiveCamera, Vector3, WebGLRenderer, Scene, BufferGeometry, Float32BufferAttribute, ShaderMaterial, Points, PCFShadowMap, TextureLoader, AmbientLight, DirectionalLight, PointLight, EquirectangularReflectionMapping, type Group, type Object3DEventMap } from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { rovDrivingVector } from "../../js/globalContext";

  import { showToastMessage, ToastSeverity } from "../../js/toastMessageManager";
  import { rovHeading, rovPitch, rovRoll } from "../../js/sensors";
  const modelLoader = new GLTFLoader();

  export let canvasClass = "block absolute top-2 left-2 rounded-full";
  export let showEnvironment = false;
  export let useRovOrientationData = false;
  const canvasSize = 200;
  const rovSpeed = 0.6;
  const rovTurnSpeed = (1.2 * Math.PI) / 180;
  const dustParticleCount = 40;
  const dustVolumeSize = 50;
  const dustVolumesPerSide = 4;

  let renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera, rovModel: Group<Object3DEventMap>;
  let baseDustVolumeGeometry: BufferGeometry = computeDustVolume();
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

    // Make a js geometry from those points
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();
    return geometry;
  }

  function addDustVolumes(scene) {
    // const material = new PointsMaterial({ size: 0.6, vertexColors: false });
    const material = new ShaderMaterial({
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
          const volume = new Points(baseDustVolumeGeometry, material);
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
    const rovRoundedPosition = new Vector3(rovModel.position.x / dustVolumeSize, rovModel.position.y / dustVolumeSize, rovModel.position.z / dustVolumeSize).round().multiplyScalar(dustVolumeSize);
    for (let i = 0; i < dustVolumes.length; i++) {
      const volume = dustVolumes[i];
      const offset = dustVolumeOffsets[i];
      volume.position.set(rovRoundedPosition.x + offset.x, rovRoundedPosition.y + offset.y, rovRoundedPosition.z + offset.z);
    }
  };

  onMount(() => {
    // Create a renderer
    renderer = new WebGLRenderer({ canvas: threeCanvas, antialias: true, alpha: true, failIfMajorPerformanceCaveat: true });
    renderer.setSize(canvasSize, canvasSize);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    toDispose.push(renderer);

    // Create a scene
    scene = new Scene();
    addDustVolumes(scene);

    // Create a camera
    camera = new PerspectiveCamera(75, 1 / 1, 0.1, 1000);
    camera.position.z = 5;

    // Create an ambient light
    const ambientLight = new AmbientLight(0xffffff, 0.8);
    addAndDispose(ambientLight);

    // Create a directional light
    const directionalLight = new DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 1, 0);
    directionalLight.rotation.set(Math.PI * 2, Math.PI * 2, 0);
    addAndDispose(directionalLight);

    if (showEnvironment) {
      // Add an environment texture
      const textureLoader = new TextureLoader();
      const environmentMap = textureLoader.load(environmentTexture, () => {
        environmentMap.mapping = EquirectangularReflectionMapping;
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

        const headLight = new PointLight(0xffffff, 0, 100);
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

        const _cameraOffset = new Vector3(0, 25, -50);
        let cameraOffsetNorm = _cameraOffset.clone().normalize();
        let cameraOffsetLength = _cameraOffset.length();

        // Animation loop
        function animate() {
          if (renderer === null) return;
          requestAnimationFrame(animate);
          rovPitch.set(rovPitch.get() + 0.003);
          rovRoll.set(rovRoll.get() + 0.001);
          rovHeading.set(rovHeading.get() + 0.001);

          const drivingVector = rovDrivingVector.get();
          const moveZ = drivingVector.VelocityX * rovSpeed;
          const moveX = -1 * drivingVector.VelocityY * rovSpeed;
          const moveY = drivingVector.VelocityZ * rovSpeed;

          rovModel.translateX(moveX);
          rovModel.translateY(moveY);
          rovModel.translateZ(moveZ);

          const moveYaw = -drivingVector.AngularVelocityYaw * rovTurnSpeed;
          propellerL.rotation.z += moveZ * 0.15 - moveYaw * 8;
          propellerR.rotation.z += moveZ * 0.15 + moveYaw * 8;

          if (useRovOrientationData) {
            rovModel.rotation.x = rovPitch.get();
            rovModel.rotation.z = rovRoll.get();
            rovModel.rotation.y = rovHeading.get();
          } else if (moveZ > 0) {
            rovModel.rotation.y += moveYaw;
          }

          clawL.rotation.y = moveY;
          clawR.rotation.y = -moveY;

          headLight.intensity = 500 * Math.max(-moveY, 0);

          // console.log(drivingVector.ButtonBitmask);
          if (drivingVector.ButtonBitmask !== 0) {
            const _cameraOffset = new Vector3(0, 20, 50);
            cameraOffsetLength = _cameraOffset.length();
            cameraOffsetNorm = _cameraOffset.normalize();
          } else {
            const _cameraOffset = new Vector3(0, 25, -50);
            cameraOffsetLength = _cameraOffset.length();
            cameraOffsetNorm = _cameraOffset.normalize();
          }

          // camera smooth follows the rov from behind witout pitching or rolling
          const camTarget = new Vector3().copy(cameraOffsetNorm).applyQuaternion(rovModel.quaternion);
          camTarget.setY(0).normalize().setY(cameraOffsetNorm.y).multiplyScalar(cameraOffsetLength).add(rovModel.position);
          camera.position.lerp(camTarget, 0.1);
          camera.lookAt(rovModel.position);

          // Render the scene with the camera
          updateDustVolumes();
          renderer.render(scene, camera);
        }

        animate();
      },
      (xhr) => {},
      (error) => {
        showToastMessage("Error loading ROV model", 1000, false, ToastSeverity.error);
        console.error("Error loading ROV model", error);
      }
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
