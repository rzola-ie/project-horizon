varying vec2 vUv;

uniform sampler2D feed;
uniform float uSensetivity;

void main() {
  vec3 color = vec3(0.0);

  // if (vUv.x>=0.0 && vUv.y>=0.0 && vUv.x<1.0 && vUv.y<1.0) color = texture2D(feed, vUv).rgb;

  color = texture2D(feed, vUv).rgb;

  if(color.r > 0.05 && color.g > 0.05 && color.b > 0.05) {
    color += mix(color, vec3(uSensetivity), color);
  }

  gl_FragColor = vec4(color, 1.0);
}

// uniform sampler2D feed;
// varying highp vec2 vUv;

// uniform lowp float shadows;
// uniform lowp float highlights;

// const mediump vec3 luminanceWeighting = vec3(0.2, 0.2, 0.2);

// void main()
// {
//     lowp vec4 source = texture2D(feed, vUv);
//     mediump float luminance = dot(source.rgb, luminanceWeighting);

//     //(shadows+1.0) changed to just shadows:
//     mediump float shadow = clamp((pow(luminance, 1.0/shadows) + (-0.76)*pow(luminance, 2.0/shadows)) - luminance, 0.0, 1.0);
//     mediump float highlight = clamp((1.0 - (pow(1.0-luminance, 1.0/(2.0-highlights)) + (-0.8)*pow(1.0-luminance, 2.0/(2.0-highlights)))) - luminance, -1.0, 0.0);
//     lowp vec3 result = vec3(0.0, 0.0, 0.0) + ((luminance + shadow + highlight) - 0.0) * ((source.rgb - vec3(0.0, 0.0, 0.0))/(luminance - 0.0));

//     // blend toward white if highlights is more than 1
//     mediump float contrastedLuminance = ((luminance - 0.5) * 1.5) + 0.5;
//     mediump float whiteInterp = contrastedLuminance*contrastedLuminance*contrastedLuminance;
//     mediump float whiteTarget = clamp(highlights, 1.0, 2.0) - 1.0;
//     result = mix(result, vec3(1.0), whiteInterp*whiteTarget);

//     // blend toward black if shadows is less than 1
//     mediump float invContrastedLuminance = 1.0 - contrastedLuminance;
//     mediump float blackInterp = invContrastedLuminance*invContrastedLuminance*invContrastedLuminance;
//     mediump float blackTarget = 1.0 - clamp(shadows, 0.0, 1.0);
//     result = mix(result, vec3(0.0), blackInterp*blackTarget);

//     gl_FragColor = vec4(result, 1.0);
// }