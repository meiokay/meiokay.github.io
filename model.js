let isFocused = false;
const labelNames = ["About Me", "Experience", "Resume", "Writings"];

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdde5b6);

  size = 12.5;
  aspect = window.innerWidth / window.innerHeight;

  /* OrthographicCamera */
  camera = new THREE.OrthographicCamera(-size * aspect, size * aspect, size, -size, 0.1, 1000);
  camera.position.set(0, 12.5, 12.5);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: modelCanvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 25, 50);
  spotLight.castShadow = true;
  scene.add(spotLight);

  /* Raycaster */
  raycaster = new THREE.Raycaster();
  selected = null;
  mouse = new THREE.Vector2();
  document.addEventListener("mousemove", onMouseMove, false);

  /* MTLLoader */
  const mtlLoader = new THREE.MTLLoader();

  mtlLoader.load("three/desk/website1.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/desk/website1.vox.obj", function (object) {
      object.position.x = 0;
      object.position.y = -15;
      object.position.z = -2;
      scene.add(object);
      renderer.render(scene, camera);
    });
  });

  mtlLoader.load("three/main/website2.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/main/website2.vox.obj", function (object) {
      object.position.x = 0;
      object.position.y = -15;
      object.position.z = -2;
      scene.add(object);
      renderer.render(scene, camera);
    });
  });

  mtlLoader.load("three/chair/website3.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/chair/website3.vox.obj", function (object) {
      object.position.x = 0;
      object.position.y = -14;
      object.position.z = 0;
      scene.add(object);
      renderer.render(scene, camera);
    });
  });

  pivot = new THREE.Group();
  scene.add(pivot);

  mtlLoader.load("three/chair/website4.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/chair/website4.vox.obj", function (object) {
      object.position.x = 0;
      object.position.y = -14;
      object.position.z = 0;
      pivot.add(object);
      renderer.render(scene, camera);
    });
  });

  links = new THREE.Group();
  scene.add(links);

  mtlLoader.load("three/deco/website5.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/deco/website5.vox.obj", function (object) {
      object.position.x = -10;
      object.position.y = -15;
      object.position.z = -2;
      object.name = labelNames[0];
      links.add(object);
      renderer.render(scene, camera);
    });
  });

  mtlLoader.load("three/deco/website6.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/deco/website6.vox.obj", function (object) {
      object.position.x = -9.5;
      object.position.y = -15;
      object.position.z = -2;
      object.name = labelNames[1];
      links.add(object);
      renderer.render(scene, camera);
    });
  });

  mtlLoader.load("three/deco/website7.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/deco/website7.vox.obj", function (object) {
      object.position.x = 9.5;
      object.position.y = -15;
      object.position.z = -2;
      object.name = labelNames[2];
      links.add(object);
      renderer.render(scene, camera);
    });
  });

  mtlLoader.load("three/deco/website8.vox.mtl", function (materials) {
    materials.preload();
    /* OBJLoader */
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("three/deco/website8.vox.obj", function (object) {
      object.position.x = 10;
      object.position.y = -15;
      object.position.z = -2;
      object.name = labelNames[3];
      links.add(object);
      renderer.render(scene, camera);
    });
  });

  labels = new THREE.Group();
  scene.add(labels);
  makeLabel(labelNames[0], -16.15, 0, -3.5);
  makeLabel(labelNames[1], -12.65, 0, -3.5);
  makeLabel(labelNames[2], 13.25, 0, -3.5);
  makeLabel(labelNames[3], 16.95, 0, -3.5);
}

function makeLabel(s, x, y, z) {
  const ctx = document.createElement("canvas").getContext("2d");
  const font = `${55}px arial`;
  ctx.font = font;
  ctx.canvas.width = 300;
  ctx.canvas.height = 55;

  // fonts need to be reset after canvas resize
  ctx.font = font;
  ctx.textBaseline = "top";

  ctx.fillStyle = "black";
  ctx.fillText(s, 0, 0);

  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const labelMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });

  const root = new THREE.Object3D();
  root.position.x = x;
  root.position.y = y;
  root.position.z = z;

  const label = new THREE.Sprite(labelMaterial);
  root.add(label);

  // makes size of the label into centimeters
  const labelBaseScale = 0.01;
  label.scale.x = ctx.canvas.width * labelBaseScale;
  label.scale.y = ctx.canvas.height * labelBaseScale;

  root.name = s;
  root.visible = false;
  labels.add(root);
}

function handleHover() {
  if (isFocused || selected) {
    if (selected) labels.getObjectByName(selected.parent.name).visible = false;
    selected = null;
    document.body.style.cursor = "auto";
  }

  if (isFocused) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(links, true);

  if (intersects.length > 0) {
    const res = intersects.filter(function (res) {
      return res && res.object;
    })[0];
    if (res && res.object) {
      selected = res.object;
      labels.getObjectByName(selected.parent.name).visible = true;
      document.body.style.cursor = "pointer";
    }
  }
}

function handleClick() {
  if (isFocused) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(links, true);

  if (intersects.length > 0) {
    const res = intersects.filter(function (res) {
      return res && res.object;
    })[0];
    if (res && res.object) {
      selected = res.object;
      const ids = {
        [labelNames[0]]: 4,
        [labelNames[1]]: 3,
        [labelNames[2]]: 2,
        [labelNames[3]]: 1,
      };
      const id = ids[selected.parent.name];
      const nav = document.getElementById(`nav-${id}`);
      const tab = document.getElementById(`tab-${id}`);
      nav.style.top = "calc(90vh - 22px)";
      tab.style.top = "0";
      nav.style.zIndex = 999;
      tab.style.zIndex = 998;
      isFocused = true;
    }
  }
}

function animate() {
  pivot.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  handleHover();
}

function render() {
  renderer.render(scene, camera);
}

function onMouseMove(event) {
  rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
}

function onWindowResize() {
  aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.left = -size * aspect;
  camera.right = size * aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

init();
animate();

window.addEventListener("resize", onWindowResize);
window.addEventListener("mousedown", handleClick);
