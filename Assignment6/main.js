function init(MODE) {
     var scene = new THREE.Scene();
     var gui = new dat.GUI();

     if (MODE == 0) {
          var box = getBox(1, 1, 1);
          var plane = getPlane(40);
          var pointLight = getPointLight(3);
          var directionLight = getDirectionLight(3);
          var spotLight = getSpotLight(3);
          var ambientLight = getAmbientLight(3);
          var sphere = getSphere(0.5);
          var boxGrid = getBoxGrid(20, 2);

          plane.name = "plane-1";

          // box.position.y = 0.5;
          box.position.y = box.geometry.parameters.height / 2;
          plane.rotation.x = Math.PI / 2;
          // plane.position.y = 1;
          pointLight.position.y = 3;
          pointLight.intensity = 2;

          gui.add(pointLight, "intensity", 0, 10);
          gui.add(pointLight.position, "y", 0, 10);

          scene.add(plane);
          pointLight.add(sphere);
          scene.add(pointLight);
          scene.add(boxGrid);

          var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

          camera.position.set(1, 3, 4); // Camera's VRP

          camera.lookAt(new THREE.Vector3(0, 1, 1)); // Coordinate position where camera look at

          var renderer = new THREE.WebGLRenderer();

          renderer.shadowMap.enabled = true;

          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor("rgb(120, 120, 120)");
          document.getElementById("webgl").appendChild(renderer.domElement);

          var controls = new THREE.OrbitControls(camera, renderer.domElement);

          update(renderer, scene, camera, controls);
     } else if (MODE == 1) {
          sphereMaterial = getMaterial("standard", "rgb(255, 255, 255)");
          var sphere = getSphere_2(sphereMaterial, 1, 24);

          var planeMaterial = getMaterial("standard", "rgb(255, 255, 255)");
          var plane = getPlane_2(planeMaterial, 30);

          var lightLeft = getSpotLight(1, "rgb(255, 220, 180)");
          var lightRight = getSpotLight(1, "rgb(255, 220, 180)");

          sphere.position.y = sphere.geometry.parameters.radius;
          plane.rotation.x = Math.PI / 2;

          lightLeft.position.set(-5, 2, -4);
          lightRight.position.set(5, 2, -4);

          var reflectionCube = new THREE.CubeTextureLoader().setPath("./cube_map/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

          reflectionCube.format = THREE.RGBFormat;

          scene.background = reflectionCube;

          var loader = new THREE.TextureLoader();
          planeMaterial.map = loader.load("./Concrete.jpg");
          planeMaterial.bumpMap = loader.load("./Concrete.jpg");
          planeMaterial.roughnessMap = loader.load("./Concrete.jpg");
          planeMaterial.bumpScale = 0.08;
          planeMaterial.metalness = 0.1;
          planeMaterial.roughness = 0.7;
          planeMaterial.envMap = reflectionCube;
          sphereMaterial.roughnessMap = loader.load("./Concrete.jpg");
          sphereMaterial.envMap = reflectionCube;

          var maps = ["map", "bumpMap", "roughnessMap"];
          maps.forEach(function (mapName) {
               var texture = planeMaterial[mapName];
               texture.wrapS = THREE.RepeatWrapping;
               texture.wrapT = THREE.RepeatWrapping;
               texture.repeat.set(1.5, 1.5);
          });

          var folder1 = gui.addFolder("light_1");
          folder1.add(lightLeft, "intensity", 0, 10);
          folder1.add(lightLeft.position, "x", -5, 10);
          folder1.add(lightLeft.position, "y", -5, 10);
          folder1.add(lightLeft.position, "z", -5, 10);

          var folder2 = gui.addFolder("light_2");
          folder2.add(lightRight, "intensity", 0, 10);
          folder2.add(lightRight.position, "x", -5, 10);
          folder2.add(lightRight.position, "y", -5, 10);
          folder2.add(lightRight.position, "z", -5, 10);

          var folder3 = gui.addFolder("materials");
          //folder3.add(sphereMaterial, 'shininess', 0, 1000);
          //folder3.add(planeMaterial, 'shininess', 0, 1000);
          folder3.add(sphereMaterial, "roughness", 0, 1);
          folder3.add(planeMaterial, "roughness", 0, 1);
          folder3.add(sphereMaterial, "metalness", 1, 2);
          folder3.add(planeMaterial, "metalness", 0, 1);
          folder3.open();

          scene.add(sphere);
          scene.add(plane);
          scene.add(lightLeft);
          scene.add(lightRight);

          var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

          camera.position.set(7, 3, 4); // Camera's VRP

          camera.lookAt(new THREE.Vector3(0, 0, 0)); // Coordinate position where camera look at

          var renderer = new THREE.WebGLRenderer();
          renderer.shadowMap.enabled = true;
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor("rgb(0, 0, 0)");
          document.getElementById("webgl").appendChild(renderer.domElement);
          var controls = new THREE.OrbitControls(camera, renderer.domElement);
          update(renderer, scene, camera, controls);
     }
     return scene;
}

function getMaterial(type, color) {
     var selectedMaterial;
     var materialOptions = {
          color: color === undefined ? "rgb(255, 255, 255)" : color,
     };

     switch (type) {
          case "basic":
               selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
               break;
          case "lambert":
               selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
               break;
          case "phong":
               selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
               break;
          case "standard":
               selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
               break;
          default:
               selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
               break;
     }
     return selectedMaterial;
}

function getSpotLight(intensity, color) {
     color = color === undefined ? "rgb(255, 255, 255, 255)" : color;
     var light = new THREE.SpotLight(color, intensity);
     light.castShadow = true;
     light.penumbra = 0.5;

     light.shadow.mapSize.width = 1024;
     light.shadow.mapSize.height = 1024;
     light.shadow.bias = 0.001;

     return light;
}

function getBox(w, h, d) {
     var geometry = new THREE.BoxGeometry(w, h, d);
     var material = new THREE.MeshPhongMaterial({
          color: "rgb(120, 120, 120)",
     });

     var mesh = new THREE.Mesh(geometry, material);

     mesh.castShadow = true;

     return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
     var group = new THREE.Group();

     for (var i = 0; i < amount; i++) {
          var obj = getBox(1, 1, 1);
          obj.position.x = i * separationMultiplier;
          obj.position.y = obj.geometry.parameters.height / 2;
          group.add(obj);
          for (var j = 1; j < amount; j++) {
               var obj = getBox(1, 1, 1);
               obj.position.x = i * separationMultiplier;
               obj.position.y = obj.geometry.parameters.height / 2;
               obj.position.z = j * separationMultiplier;
               group.add(obj);
          }
     }

     group.position.x = -(separationMultiplier * (amount - 1)) / 2;
     group.position.z = -(separationMultiplier * (amount - 1)) / 2;

     return group;
}

function getPlane(size) {
     var geometry = new THREE.PlaneGeometry(size, size);
     var material = new THREE.MeshPhongMaterial({
          color: "rgb(120, 120, 120)",
          side: THREE.DoubleSide,
     });

     var mesh = new THREE.Mesh(geometry, material);

     mesh.receiveShadow = true;

     return mesh;
}

function getPlane_2(material, size) {
     var geometry = new THREE.PlaneGeometry(size, size);
     material.side = THREE.DoubleSide;
     var obj = new THREE.Mesh(geometry, material);
     obj.receiveShadow = true;

     return obj;
}

function getPointLight(intensity) {
     var light = new THREE.PointLight(0xffffff, intensity);
     light.castShadow = true;

     light.shadow.bias = 0.005;

     return light;
}

function getDirectionLight(intensity) {
     var light = new THREE.DirectionalLight(0xff00ff, intensity);
     light.castShadow = true;

     light.shadow.bias = 0.005;

     return light;
}

function getSpotLight(intensity) {
     var light = new THREE.SpotLight(0xffffff, intensity);
     light.castShadow = true;

     light.shadow.bias = 0.005;

     return light;
}

function getAmbientLight(intensity) {
     var light = new THREE.AmbientLight("rgb(10, 30, 50)", intensity);
     light.castShadow = true;

     return light;
}

function getSphere(size) {
     var geometry = new THREE.SphereGeometry(size, 24, 24);
     var material = new THREE.MeshBasicMaterial({
          color: "rgb(255, 255, 255)",
     });

     var mesh = new THREE.Mesh(geometry, material);

     return mesh;
}

function getSphere_2(material, size, segments) {
     var geometry = new THREE.SphereGeometry(size, segments, segments);
     var obj = new THREE.Mesh(geometry, material);
     obj.castShadow = true;

     return obj;
}

function update(renderer, scene, camera, controls) {
     renderer.render(scene, camera);

     var plane = scene.getObjectByName("plane-1");

     controls.update();

     requestAnimationFrame(function () {
          update(renderer, scene, camera, controls);
     });
}

const MODE = 0;

var scene = init(MODE);
