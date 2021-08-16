precision highp float;

// attributes
attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;


// varying
varying vec2 vUV; // screen coordinates
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec3 vPosition;
varying vec3 vPositionW;

uniform mat4 worldViewProjection;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 worldView;
uniform mat4 world;



void main() {
    vec4 outPosition = worldViewProjection * vec4(position, 1.0);
    gl_Position = outPosition;
	
	vPosition = position;
	vPositionW = vec3(world * vec4(position, 0.0));

    vNormal = normal;
    vNormalW = normalize(vec3(world * vec4(normal, 0.0)));
	


    vUV = uv;
}