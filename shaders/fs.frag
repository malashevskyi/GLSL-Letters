#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

#define S(a, b, c) smoothstep(a, b, c);
// vec3 bgColor = vec3(0.05, 0.22, 0.47);
// vec3 lColor = vec3(0.62, 0.68, 0.79);
// vec3 bgColor = vec3(0.12, 0.404, 0.651);
// vec3 lColor = vec3(0.45, 0.76, 0.95);
vec3 bgColor = vec3(.18);
vec3 lColor = vec3(1., .44, .15);
// vec3 bgColor = vec3(0.18);
// vec3 lColor = vec3(1.0);
// vec3 bgColor = vec3(0.13, 0.0, 0.44);
// vec3 lColor = vec3(0.48, 0.85, 0.77);

vec3 Rect(vec2 uv, vec2 size, float fw) {
  float rect =
      (smoothstep(-fw, fw, uv.x) - smoothstep(size.x - fw, size.x + fw, uv.x)) *
      (smoothstep(-fw, fw, uv.y) - smoothstep(size.y - fw, size.y + fw, uv.y));

  return vec3(rect);
}

vec3 A(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);
  float edge = .2;
  float edge2 = edge + fw * 2.;
  float x = uv.x + sin(time + uv.y * 5.) * .025;
  float y = uv.y + sin(time) * .02;
  float trslSin = sin(time) * .03;

  vec3 shape;
  shape = color * S(edge, edge2, max(abs(x * 2.) + y, abs(y)));

  shape += S(edge2, edge, max(abs(x * 3. + trslSin) + y * 1.5, abs(y)));
  shape -= S(edge2, edge, max(abs(x * (2.4 + trslSin * 10.)), abs(uv.y * 15.)));

  color = mix(color, lColor, clamp(1. - shape, 0., 1.));
  return color;
}

vec3 B(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);

  float x = uv.x + sin(time + uv.y * 5.) * .025;
  float y = uv.y + sin(time) * .01;
  float trslSin = sin(time) * .03;

  vec3 shapeO;
  shapeO = color * S(.08 - fw, .08 + fw, length(vec2(x * .7, y - 0.065)));
  shapeO *= S(.1 - fw, .1 + fw, length(vec2(x * .65, uv.y + .1)));
  shapeO += S(-.04 + fw, -.04 - fw, max(x, uv.y - .2));

  vec3 shapeI;
  shapeI = color * S(.065 - fw, .065 + fw, length(vec2(x * .8, y - .07)));
  shapeI *= S(.08 - fw, .08 + fw, length(vec2(x * .75, y + .1)));
  shapeI += S(-.02 + fw, -.02 - fw, max(x, y - .2));
  shapeI = clamp(shapeI, 0., 1.);

  vec3 shape = clamp((1. - shapeO) * shapeI, .0, 1.);
  color = mix(color, lColor, shape);
  return color;
}
vec3 C(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);

  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 2.) * .01;

  vec3 shape;
  shape = color * S(.13 + fw, .13 - fw, length(vec2(x, y * .8)));
  shape *= S(.11 - fw, .11 + fw, length(vec2(x, uv.y * .8)));

  shape -= S(.15 + fw, .15 - fw, max(abs(x - .11) + abs(y), abs(uv.y)));
  shape = clamp(shape, 0., 1.);

  color = mix(color, lColor, shape);

  return color;
}
vec3 D(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);
  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 2.) * .01;

  vec3 shape = color * S(.1 + fw, .1 - fw, length(vec2(x * .55, y * .8)));
  shape *= S(.08 - fw, .08 + fw, length(vec2(x * .6, uv.y * .8)));

  shape *= S(.1 - fw, .1 + fw, max(x + .13, y - .2));
  shape += Rect(vec2(x + .0299, y + .124), vec2(.02, .235), fw);

  color = mix(color, lColor, clamp(shape, .0, 1.));

  return color;
}
vec3 E(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 40.) * .01;

  vec3 shape = color * Rect(vec2(x + .04, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + .04, y + .15), vec2(.19, .04), fw);
  shape += Rect(vec2(x + .04, y - .15), vec2(.19, .04), fw);
  shape += Rect(vec2(x + .04, y), vec2(.19, .04), fw);

  color = mix(color, lColor, clamp(shape, 0.0, 1.0));

  return color;
}
vec3 F(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);
  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 40.) * .01;

  vec3 shape = color * Rect(vec2(x + .04, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + .04, y - .15), vec2(.19, .04), fw);
  shape += Rect(vec2(x + .04, y), vec2(.19, .04), fw);

  color = mix(color, lColor, clamp(shape, .0, 1.));

  return color;
}
vec3 G(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 7.) * .04;
  float y = uv.y + sin(time + uv.x * 20.) * .01;
  float x2 = uv.x + sin(time + uv.y * 3.) * .04;
  float y2 = uv.y + sin(time + uv.x * 15.) * .01;

  vec3 shape = color * S(.1 + fw, .1 - fw, length(vec2(x, y * .8)));
  shape -= S(.07 + fw, .07 - fw, length(vec2(x2, y2 * .7)));
  shape += Rect(vec2(x + .02, y + .04), vec2(.1, .03), fw);
  shape = clamp(shape, 0., 1.);
  shape -= Rect(vec2(x + .03, y + .012), vec2(.2, .08), fw);
  color = mix(color, lColor, clamp(shape, .0, 1.));
  return color;
}
vec3 H(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 40.) * .01;

  vec3 shape = color * Rect(vec2(x + .1, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x - .1, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + .075, y), vec2(.19, .04), fw);

  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 I(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);
  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 40.) * .01;

  vec3 shape = color * Rect(vec2(x, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + .04, y - .14), vec2(.12, .04), fw);
  shape += Rect(vec2(x + .04, y + .15), vec2(.12, .04), fw);

  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 J(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);
  float x = uv.x + sin(time + uv.y * 7.) * .04;
  float y = uv.y + sin(time + uv.x * 20.) * .01;

  vec3 shape = color * smoothstep(.102, .1, length(vec2(x, y * .5)));
  shape -= smoothstep(.072, .07, length(vec2(x, y * .5)));
  shape = clamp(shape, 0., 1.);
  shape -= Rect(vec2(x + .1, y - .11), vec2(.3, .3), fw);
  shape -= Rect(vec2(x + .2, y + .1), vec2(.2, .3), fw);
  shape = clamp(shape, .0, 1.0);
  shape += Rect(vec2(x - .02, y - .1), vec2(.1, .03), fw);
  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 L(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);
  float x = uv.x + sin(time + uv.y * 10.) * .04;
  float y = uv.y + sin(time + uv.x * 40.) * .01;
  float edge = .1;
  float edge2 = edge + .002;

  vec3 shape = color * Rect(vec2(x + .1, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + .08, y + .15), vec2(.17, .04), fw);
  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 K(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);

  float x = uv.x + sin(time + uv.y * 7.) * .04;
  float y = uv.y + sin(time + uv.x * 20.) * .01;
  float x2 = uv.x + sin(time + uv.y * 3.) * .04;
  float y2 = uv.y + sin(time + uv.x * 15.) * .01;
  float edge = .1;
  float edge2 = edge + .002;

  vec3 shape = color * Rect(vec2(x + .1, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + y + .07, y + .16), vec2(.04, .18), fw);
  shape += Rect(vec2(x - y + .09, y + .01), vec2(.04, .15), fw);

  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 M(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);

  float x = uv.x + sin(time + uv.y * 7.) * .04;
  float y = uv.y + sin(time + uv.x * 20.) * .01;
  float x2 = uv.x + sin(time + uv.y * 3.) * .04;
  float y2 = uv.y + sin(time + uv.x * 15.) * .01;
  float edge = .1;
  float edge2 = edge + .002;

  vec3 shape = color * Rect(vec2(x - y * .4 + .18, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + y * .4 + .06, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x - y * .4 - .06, y + .15), vec2(.04, .3), fw);
  shape += Rect(vec2(x + y * .4 - .18, y + .15), vec2(.04, .3), fw);

  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 N(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);

  float x = uv.x + sin(time + uv.y * 10.0) * 0.04;
  float y = uv.y + sin(time + uv.x * 40.0) * 0.01;

  vec3 shape = color * Rect(vec2(x + 0.1, y + 0.15), vec2(0.04, 0.3), fw);
  shape += Rect(vec2(x - 0.1, y + 0.15), vec2(0.04, 0.3), fw);
  shape += Rect(vec2(x + y * 0.68, y + 0.15), vec2(0.04, 0.3), fw);

  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
vec3 O(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.);

  float x = uv.x + sin(time + uv.y * 7.) * .04;
  float y = uv.y + sin(time + uv.x * 20.) * .01;
  float x2 = uv.x + sin(time + uv.y * 3.) * .04;
  float y2 = uv.y + sin(time + uv.x * 15.) * .01;

  vec3 shape = color * smoothstep(.142, .14, length(vec2(x, y * .8)));
  shape -= smoothstep(.112, .11, length(vec2(x2, y2 * .7)));

  color = mix(color, lColor, clamp(shape, 0., 1.));
  return color;
}
void main() {

  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= .5;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x) * 4.;
  float fx = dFdx(uv.x);
  float fy = dFdx(uv.y);

  vec3 color = vec3(1.);

  float time = u_time * .3;

  float scale = 7.;
  float sS = scale / 16.;
  vec3 shape = vec3(1.);

  uv.y -= .5;

  shape *= A(vec2(uv.x * scale, uv.y * scale + sS), time, fw);
  shape *= B(vec2(uv.x * scale, uv.y * scale + sS * 2.), time, fw);
  shape *= C(vec2(uv.x * scale, uv.y * scale + sS * 3.), time, fw);
  shape *= D(vec2(uv.x * scale, uv.y * scale + sS * 4.), time, fw);
  shape *= E(vec2(uv.x * scale, uv.y * scale + sS * 5.), time, fw);
  shape *= F(vec2(uv.x * scale, uv.y * scale + sS * 6.), time, fw);
  shape *= G(vec2(uv.x * scale, uv.y * scale + sS * 7.), time, fw);
  shape *= H(vec2(uv.x * scale, uv.y * scale + sS * 8.), time, fw);
  shape *= I(vec2(uv.x * scale, uv.y * scale + sS * 9.), time, fw);
  shape *= J(vec2(uv.x * scale, uv.y * scale + sS * 10.), time, fw);
  shape *= K(vec2(uv.x * scale, uv.y * scale + sS * 11.), time, fw);
  shape *= L(vec2(uv.x * scale, uv.y * scale + sS * 12.), time, fw);
  shape *= M(vec2(uv.x * scale, uv.y * scale + sS * 13.), time, fw);
  shape *= N(vec2(uv.x * scale, uv.y * scale + sS * 14.), time, fw);
  shape *= O(vec2(uv.x * scale, uv.y * scale + sS * 15.), time, fw);

  color = mix(color, bgColor, shape);

  gl_FragColor = vec4(color, 1.);
}