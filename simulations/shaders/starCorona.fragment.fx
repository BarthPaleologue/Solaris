precision highp float;

#define PI 3.1415926535897932
#define POINTS_FROM_CAMERA 10 // number sample points along camera ray
#define OPTICAL_DEPTH_POINTS 10 // number sample points along light ray

// varying
varying vec2 vUV; // screen coordinates

// uniforms
uniform sampler2D textureSampler; // the original screen texture
uniform sampler2D depthSampler; // the depth map of the camera

uniform vec3 sunPosition; // position of the sun in world space
uniform vec3 cameraPosition; // position of the camera in world space

uniform mat4 projection; // camera's projection matrix
uniform mat4 view; // camera's view matrix

uniform float cameraNear; // camera minZ
uniform float cameraFar; // camera maxZ

uniform vec3 planetPosition; // planet position in world space
uniform float planetRadius; // planet radius for height calculations
uniform float atmosphereRadius; // atmosphere radius (calculate from planet center)

uniform float falloffFactor; // controls exponential opacity falloff
uniform float sunIntensity; // controls atmosphere overall brightness
uniform float scatteringStrength; // controls color dispersion
uniform float densityModifier; // density of the atmosphere

uniform float redWaveLength; // the wave length for the red part of the scattering
uniform float greenWaveLength; // same with green
uniform float blueWaveLength; // same with blue

// remap a value comprised between low1 and high1 to a value between low2 and high2
float remap(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

// eventually will be useful to remove some artefacts
float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// compute the world position of a pixel from its uv coordinates
vec3 worldFromUV(vec2 pos) {
    vec4 ndc = vec4(pos.xy * 2.0 - 1.0, -1.0, 1.0); // get ndc position -1 because i want every point in the near camera plane
    vec4 posVS = inverse(projection) * ndc; // unproject the ndc coordinates : we are now in view space if i understand correctly
    vec4 posWS = inverse(view) * vec4((posVS.xyz / posVS.w), 1.0); // then we use inverse view to get to world space, division by w to get actual coordinates
    return posWS.xyz; // the coordinates in world space
}

// returns whether or not a ray hits a sphere, if yes out intersection points
// a good explanation of how it works : https://viclw17.github.io/2018/07/16/raytracing-ray-sphere-intersection/
bool rayIntersectSphere(vec3 rayOrigin, vec3 rayDir, vec3 spherePosition, float sphereRadius, out float t0, out float t1) {
    vec3 relativeOrigin = rayOrigin - spherePosition; // rayOrigin in sphere space

    float a = 1.0;
    float b = 2.0 * dot(relativeOrigin, rayDir);
    float c = dot(relativeOrigin, relativeOrigin) - sphereRadius*sphereRadius;
    
    float d = b*b - 4.0*a*c;

    if(d < 0.0) return false; // no intersection

    float r0 = (-b - sqrt(d)) / (2.0*a);
    float r1 = (-b + sqrt(d)) / (2.0*a);

    t0 = min(r0, r1);
    t1 = max(r0, r1);

    return (t1 >= 0.0);
}

vec3 scatter(vec3 originalColor, vec3 rayOrigin, vec3 rayDir, float maximumDistance) {
    float distanceToSun = length(rayOrigin - sunPosition);
    
    float impactPoint, escapePoint;
    if (!(rayIntersectSphere(rayOrigin, rayDir, planetPosition, atmosphereRadius * distanceToSun/100000.0, impactPoint, escapePoint))) {
        return originalColor; // if not intersecting with atmosphere, return original color
    } else {
        if(!(rayIntersectSphere(rayOrigin, rayDir, planetPosition, planetRadius, impactPoint, escapePoint))) {
            vec3 actualPoint = rayOrigin + impactPoint * rayDir;
            float height = length(actualPoint - planetPosition) - planetRadius;
            float height01 = height / (atmosphereRadius * distanceToSun/100000.0 - planetRadius);
            float decay = exp(-height01) * (1.0 - height01);
            return vec3(1.0);
        } else {
            return originalColor;
        }
    }

    //return originalColor * (1.0 - light) + light; // blending scattered color with original color
}


void main() {
    vec3 screenColor = texture2D(textureSampler, vUV).rgb; // the current screen color

    float depth = texture2D(depthSampler, vUV).r; // the depth corresponding to the pixel in the depth map
    
    vec3 pixelWorldPosition = worldFromUV(vUV); // the pixel position in world space (near plane)

    // closest physical point from the camera in the direction of the pixel (occlusion)
    vec3 closestPoint = (pixelWorldPosition - cameraPosition) * remap(depth, 0.0, 1.0, cameraNear, cameraFar);
    float maximumDistance = length(closestPoint); // the maxium ray length due to occlusion

    vec3 rayDir = normalize(pixelWorldPosition - cameraPosition); // normalized direction of the ray

    vec3 finalColor = scatter(screenColor, cameraPosition, rayDir, maximumDistance); // the color to be displayed on the screen

    gl_FragColor = vec4(finalColor, 1.0); // displaying the final color
}

//#define NUM_SAMPLES 20

/*void main(float2 texCoord : TEXCOORD0) : COLOR0 {   
    // Calculate vector from pixel to light source in screen space.    
    vec2 deltaTexCoord = (vUV - ScreenLightPos.xy);   // Divide by number of samples and scale by control factor.   
    deltaTexCoord *= 1.0 / NUM_SAMPLES * Density;   // Store initial sample.    
    
    vec3 color = tex2D(textureSampler, vUV).rgb;   // Set up illumination decay factor.    
    
    float illuminationDecay = 1.0;   // Evaluate summation from Equation 3 NUM_SAMPLES iterations.    
    
    for (int i = 0; i < NUM_SAMPLES; i++)   {     // Step sample location along ray.     
        texCoord -= deltaTexCoord;     // Retrieve sample at new location.    
        
        vec3 sample = tex2D(textureSampler, texCoord).rgb;     // Apply sample attenuation scale/decay factors.     
        sample *= illuminationDecay * Weight;     // Accumulate combined color.     
        color += sample;     // Update exponential decay factor.     
        illuminationDecay *= Decay;   
    }   // Output final color with a further scale control factor.    
    return float4( color * Exposure, 1); 
}*/
