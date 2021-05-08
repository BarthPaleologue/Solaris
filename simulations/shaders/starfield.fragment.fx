precision highp float;

varying vec2 vUV;

uniform vec3 cameraPosition;
uniform float cameraNear;
uniform float cameraFar;

uniform mat4 view;
uniform mat4 projection;

uniform vec4[1000] starData;

uniform sampler2D textureSampler;
uniform sampler2D depthSampler;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 worldFromUV(vec2 pos) {
    vec4 ndc = vec4(pos.xy * 2.0 - 1.0, -1.0, 1.0); // get ndc position -1 because i want every point in the near camera plane
    vec4 posVS = inverse(projection) * ndc; // unproject the ndc coordinates : we are now in view space if i understand correctly
    vec4 posWS = inverse(view) * vec4((posVS.xyz / posVS.w), 1.0); // then we use inverse view to get to world space, division by w to get actual coordinates
    return posWS.xyz; // the coordinates in world space
}

// remap a value comprised between low1 and high1 to a value between low2 and high2
float remap(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

bool rayIntersectSphere(vec3 rayOrigin, vec3 rayDir, vec3 spherePosition, float sphereRadius) {
    vec3 relativeOrigin = rayOrigin - spherePosition; // rayOrigin in sphere space

    float a = 1.0;
    float b = 2.0 * dot(relativeOrigin, rayDir);
    float c = dot(relativeOrigin, relativeOrigin) - sphereRadius*sphereRadius;
    
    float d = b*b - 4.0*a*c;

    return d >= 0.0;
}

void main(void) {
    vec3 color = texture2D(textureSampler, vUV).rgb;
    float depth = texture2D(depthSampler, vUV).r;

    vec3 pixelWorldPosition = worldFromUV(vUV);

    // closest physical point from the camera in the direction of the pixel (occlusion)
    vec3 closestPoint = (pixelWorldPosition - cameraPosition) * remap(depth, 0.0, 1.0, cameraNear, cameraFar);
    float maximumDistance = length(closestPoint); // the maxium ray length due to occlusion

    vec3 rayDir = normalize(pixelWorldPosition - cameraPosition); // normalized direction of the ray

    for(int i = 0; i < 1000; i++) {
        if(rayIntersectSphere(cameraPosition, rayDir, starData[i].rgb, starData[i].a) && maximumDistance > cameraFar) {
            color = vec3(rand(vUV)/2.0 + 0.5);
        }
    }

    gl_FragColor = vec4(color, 1.0);
}