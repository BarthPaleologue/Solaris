precision highp float;

// varying
varying vec2 vUV; // screen coordinates
varying vec3 vNormal;
varying vec3 vNormalW;

uniform vec3 planetPosition;
uniform vec3 sunPosition; // position of the sun in world space

uniform sampler2D diffuseTexture; 
uniform sampler2D cloudTexture;

void main() {

    vec3 diffuseColor = texture2D(diffuseTexture, vUV).rgb;

    vec3 cloudColor = texture2D(diffuseTexture, vUV).rgb;
    float cloudAlpha = texture2D(diffuseTexture, vUV).a;

    diffuseColor = cloudAlpha * cloudColor + (1.0 - cloudAlpha) * diffuseColor;

    diffuseColor = cloudColor;

    vec3 sunDirW = normalize(sunPosition - planetPosition);

    float ndl = max(dot(vNormalW, sunDirW), 0.05);

    diffuseColor = ndl * diffuseColor;

    gl_FragColor = vec4(diffuseColor, 1.0); // displaying the final color
}