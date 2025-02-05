import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default [
      {
            input: 'src/index.ts',
            output: [
                  {
                        file: 'dist/index.esm.js',
                        format: 'esm',
                        sourcemap: true
                  },
                  {
                        file: 'dist/index.cjs',
                        format: 'cjs',
                        sourcemap: true
                  }
            ],
            plugins: [typescript()]
      },
      {
            input: 'dist/dts/index.d.ts',
            output: [{
                  file: 'dist/index.d.ts',
                  format: 'es',
                  sourcemap: true
            }],
            plugins: [dts()]
      }
];