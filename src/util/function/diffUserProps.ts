/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function diffUserProps(target: any, source: unknown): unknown {
  const output = {};

  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (target[key] != source[key]) {
        output[key] = target[key];
      }
    }
  }

  return output;
}
