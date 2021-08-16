precision highp float;

// varying
varying vec2 vUV; // screen coordinates
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec3 vPositionW;

uniform vec3 planetPosition;
uniform vec3 sunPosition; // position of the sun in world space

uniform vec3 cameraPosition;

uniform float time;

uniform sampler2D diffuseTexture;
uniform sampler2D cloudTexture;
uniform sampler2D emissiveTexture;
uniform sampler2D specularTexture;

void main() {

    vec3 diffuseColor = texture2D(diffuseTexture, vUV).rgb;

    vec3 cloudColor = texture2D(cloudTexture, vUV + vec2(-time/20.0, 0.0)).rgb;
    float cloudAlpha = texture2D(cloudTexture, vUV + vec2(-time/20.0, 0.0)).r;

    diffuseColor = cloudAlpha * cloudColor + (1.0 - cloudAlpha) * diffuseColor;

    vec3 emissiveColor = texture2D(emissiveTexture, vUV).rgb;

    vec3 sunDirW = normalize(sunPosition - planetPosition);

    float ndl = max(dot(vNormalW, sunDirW), 0.03);

    float emissiveLevel = 0.3;

    // specular
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    vec3 angleW = normalize(viewDirectionW + sunDirW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, 32.0);

    float specularFactor = texture2D(specularTexture, vUV).r;
    specComp *= max(specularFactor, cloudAlpha);

    diffuseColor = ndl * diffuseColor + (1.0 - ndl) * emissiveColor * emissiveLevel;

    diffuseColor += vec3(specComp);

    gl_FragColor = vec4(diffuseColor, 1.0); // displaying the final color
}