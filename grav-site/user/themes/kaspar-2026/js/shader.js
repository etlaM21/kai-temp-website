import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
#define SCALE 4.
varying vec2 vUv;
uniform vec3 iResolution;
uniform float iTime;
uniform float uIntensity;

vec3 random_perlin( vec3 p ) {
    p = vec3(
            dot(p,vec3(127.1,311.7,69.5)),
            dot(p,vec3(269.5,183.3,132.7)), 
            dot(p,vec3(247.3,108.5,96.5)) 
            );
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise_perlin (vec3 p) {
    vec3 i = floor(p);
    vec3 s = fract(p);
    float a = dot(random_perlin(i),s);
    float b = dot(random_perlin(i + vec3(1, 0, 0)),s - vec3(1, 0, 0));
    float c = dot(random_perlin(i + vec3(0, 1, 0)),s - vec3(0, 1, 0));
    float d = dot(random_perlin(i + vec3(0, 0, 1)),s - vec3(0, 0, 1));
    float e = dot(random_perlin(i + vec3(1, 1, 0)),s - vec3(1, 1, 0));
    float f = dot(random_perlin(i + vec3(1, 0, 1)),s - vec3(1, 0, 1));
    float g = dot(random_perlin(i + vec3(0, 1, 1)),s - vec3(0, 1, 1));
    float h = dot(random_perlin(i + vec3(1, 1, 1)),s - vec3(1, 1, 1));
    vec3 u = smoothstep(0.,1.,s);
    return mix(mix(mix( a, b, u.x),
                mix( c, e, u.x), u.y),
            mix(mix( d, f, u.x),
                mix( g, h, u.x), u.y), u.z);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.x;
    float n = noise_perlin(vec3(SCALE * uv, iTime * 0.25));
    n = n * 0.5 + 0.5;
    n = smoothstep(0.4, 0.6, n);
    
    // Use uIntensity to control how dark the blobs get
    float c = mix(0.005, 0.35 * uIntensity, n);
    
    vec3 color = vec3(c, c, c);
    gl_FragColor = vec4(color, 1.0);
}
`;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);

// Inject into our specific container instead of the raw body
document.getElementById('webgl-container').appendChild(renderer.domElement);

const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
    // Read the variable we set in base.html.twig. 1.0 for Hero, 0.3 for background.
    uIntensity: { value: window.IS_LANDING_PAGE ? 1.0 : 0.3 } 
};

const plane = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
});

scene.add(new THREE.Mesh(plane, material));

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.updateProjectionMatrix();
    uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    uniforms.iTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();