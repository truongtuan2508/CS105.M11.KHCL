function init() {
     var scene = new THREE.Scene();

     //scene.fog = new THREE.FogExp2(0xffffff, 0.2); // Thay đổi thông số camera LookAt, VRP của camera.

     var box = getBox(1, 1, 1);
     var plane = getPlane(4);

     box.position.y = box.geometry.parameters.height / 2;
     plane.rotation.x = Math.PI / 2;

     /* // Thiết lập mối quan hệ cha-con giữa các đối tượng dùng để thực hiện các phép biến đổi
    plane.name = 'plane-1';
    plane.position.y = 1;
    plane.add(box); */

     scene.add(box);

     scene.add(plane);

     var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
     camera.position.x = 1;
     camera.position.y = 2;
     camera.position.z = 5;

     camera.lookAt(new THREE.Vector3(0, 0, 0));

     var renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight);

     //renderer.setClearColor(0xffffff);
     //renderer.setClearColor('rbg(255, 255, 255)');

     document.getElementById("webgl").appendChild(renderer.domElement);
     update(renderer, scene, camera);

     return scene;
}

function getBox(w, h, d) {
     var geometry = new THREE.BoxGeometry(w, h, d);

     var meterial = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
     });
     var mesh = new THREE.Mesh(geometry, meterial);
     return mesh;
}

function getPlane(size) {
     var geometry = new THREE.PlaneGeometry(size, size);

     var meterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          side: THREE.DoubleSide,
     });
     var mesh = new THREE.Mesh(geometry, meterial);
     return mesh;
}

function update(renderer, scene, camera) {
     renderer.render(scene, camera);

     //Quay, tỉ lệ và tịnh tiến đối tượng
     var plane = scene.getObjectByName("plane-1");
     plane.rotation.y += 0.001; // Phép quay Object
     plane.rotation.z += 0.001; // Phép quay Object

     scene.traverse(function (child) {
          child.scale.x += 0.001;
     });

     requestAnimationFrame(function () {
          update(renderer, scene, camera);
     });
}

var scene = init();
