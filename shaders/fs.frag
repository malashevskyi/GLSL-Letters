#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

// vec3 bgColor = vec3(0.05, 0.22, 0.47);
// vec3 lColor = vec3(0.62, 0.68, 0.79);
// vec3 bgColor = vec3(0.12, 0.404, 0.651);
// vec3 lColor = vec3(0.45, 0.76, 0.95);
vec3 bgColor = vec3(0.18);
vec3 lColor = vec3(1.0, 0.44, 0.15);
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

#define S(a, b, c) smoothstep(a, b, c);

vec3 A(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float edge = 0.2;
  float edge2 = edge + fw * 2.0;
  float x = uv.x + sin(time + uv.y * 5.0) * 0.025;
  float y = uv.y + sin(time) * 0.02;
  float trslSin = sin(time) * 0.03;

  vec3 shape;
  shape = color * S(edge, edge2, max(abs(x * 2.0) + y, abs(y)));

  shape += S(edge2, edge, max(abs(x * 3.0 + trslSin) + y * 1.5, abs(y)));
  shape -=
      S(edge2, edge, max(abs(x * (2.4 + trslSin * 10.0)), abs(uv.y * 15.0)));

  color = mix(color, lColor, clamp(1.0 - shape, 0.0, 1.0));
  return color;
}

vec3 B(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);

  float x = uv.x + sin(time + uv.y * 5.0) * 0.025;
  float y = uv.y + sin(time) * 0.01;
  float trslSin = sin(time) * 0.03;

  vec3 shapeO;
  shapeO = color * S(0.08 - fw, 0.08 + fw, length(vec2(x * 0.7, y - 0.065)));
  shapeO *= S(0.1 - fw, 0.1 + fw, length(vec2(x * 0.65, uv.y + 0.1)));
  shapeO += S(-0.04 + fw, -0.04 - fw, max(x, uv.y - 0.2));

  vec3 shapeI;
  shapeI = color * S(0.065 - fw, 0.065 + fw, length(vec2(x * 0.8, y - 0.07)));
  shapeI *= S(0.08 - fw, 0.08 + fw, length(vec2(x * 0.75, y + 0.1)));
  shapeI += S(-0.02 + fw, -0.018 - fw, max(x, y - 0.2));
  shapeI = clamp(shapeI, 0., 1.);

  vec3 shape = clamp((1.0 - shapeO) * shapeI, 0.0, 1.0);
  color = mix(color, lColor, shape);
  return color;
}
vec3 C(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);

  float x = uv.x + sin(time + uv.y * 10.0) * 0.04;
  float y = uv.y + sin(time + uv.x * 2.0) * 0.01;

  vec3 shape;
  shape = color * S(0.13 + fw, 0.13 - fw, length(vec2(x, y * 0.8)));
  shape *= S(0.11 - fw, 0.11 + fw, length(vec2(x, uv.y * 0.8)));

  shape -= S(0.15 + fw, 0.15 - fw, max(abs(x - 0.11) + abs(y), abs(uv.y)));
  shape = clamp(shape, 0., 1.);

  color = mix(color, lColor, shape);

  return color;
}
vec3 D(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 10.0) * 0.04;
  float y = uv.y + sin(time + uv.x * 2.0) * 0.01;

  vec3 shape = color * (1.0 - smoothstep(0.1 - fw, 0.1 + fw,
                                         length(vec2(x * 0.55, y * 0.8))));
  shape *= smoothstep(0.08 - fw, 0.08 + fw, length(vec2(x * 0.6, uv.y * 0.8)));

  shape *= smoothstep(0.1 - fw, 0.1 + fw, max(x + 0.13, y - 0.2));
  shape += Rect(vec2(x + 0.0299, y + 0.124), vec2(.02, .235), fw);

  color = mix(color, lColor, clamp(shape, 0.0, 1.0));

  return color;
}
vec3 E(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 10.0) * 0.04;
  float y = uv.y + sin(time + uv.x * 40.0) * 0.01;

  vec3 shape = color * Rect(vec2(x + 0.04, y + 0.15), vec2(0.04, 0.3), fw);
  shape += Rect(vec2(x + 0.04, y + 0.15), vec2(0.19, 0.04), fw);
  shape += Rect(vec2(x + 0.04, y - 0.15), vec2(0.19, 0.04), fw);
  shape += Rect(vec2(x + 0.04, y), vec2(0.19, 0.04), fw);

  color = mix(color, lColor, clamp(shape, 0.0, 1.0));

  return color;
}
vec3 F(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 10.0) * 0.04;
  float y = uv.y + sin(time + uv.x * 40.0) * 0.01;

  vec3 shape = color * Rect(vec2(x + 0.04, y + 0.15), vec2(0.04, 0.3), fw);
  shape += Rect(vec2(x + 0.04, y - 0.15), vec2(0.19, 0.04), fw);
  shape += Rect(vec2(x + 0.04, y), vec2(0.19, 0.04), fw);

  color = mix(color, lColor, clamp(shape, 0.0, 1.0));

  return color;
}
vec3 G(vec2 uv, float time, float fw) {
  vec3 color = vec3(1.0);
  float x = uv.x + sin(time + uv.y * 7.0) * 0.04;
  float y = uv.y + sin(time + uv.x * 20.0) * 0.01;
  float x2 = uv.x + sin(time + uv.y * 3.0) * 0.04;
  float y2 = uv.y + sin(time + uv.x * 15.0) * 0.01;
  float edge = 0.1;
  float edge2 = edge + 0.002;

  vec3 shape = color * smoothstep(0.1 + fw, 0.1 - fw, length(vec2(x, y * 0.8)));
  shape -= smoothstep(0.07 + fw, 0.07 - fw, length(vec2(x2, y2 * 0.7)));
  shape += Rect(vec2(x + 0.02, y + 0.04), vec2(0.1, 0.03), fw);
  shape = clamp(shape, 0.0, 1.0);
  shape -= Rect(vec2(x + 0.03, y + 0.012), vec2(0.2, 0.08), fw);
  color = mix(color, lColor, clamp(shape, 0.0, 1.0));
  return color;
}
void main() {

  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x) * 4.0;
  float fx = dFdx(uv.x);
  float fy = dFdx(uv.y);

  vec3 color = vec3(1.0);

  float time = u_time * 0.3;

  float scale = 4.0;
  float sS = scale / 8.0;
  vec3 shape = vec3(1.0);

  uv.y -= 0.5;

  shape *= A(vec2(uv.x * scale, uv.y * scale + sS), time, fw);
  shape *= B(vec2(uv.x * scale, uv.y * scale + sS * 2.0), time, fw);
  shape *= C(vec2(uv.x * scale, uv.y * scale + sS * 3.0), time, fw);
  shape *= D(vec2(uv.x * scale, uv.y * scale + sS * 4.0), time, fw);
  shape *= E(vec2(uv.x * scale, uv.y * scale + sS * 5.0), time, fw);
  shape *= F(vec2(uv.x * scale, uv.y * scale + sS * 6.0), time, fw);
  shape *= G(vec2(uv.x * scale, uv.y * scale + sS * 7.0), time, fw);

  color = mix(color, bgColor, shape);

  gl_FragColor = vec4(color, 1.0);
}