
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  generates: {
    "./src/gql/types.g.ts": {
      plugins: ['typescript'],
      config: {
        enumsAsTypes: true,
      }
    },
    "src/gql": {
      documents: "src/**/*.graphql",
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.g.ts',
        baseTypesPath: 'types.g.ts',
      },
      config: {
        legacyMode: true,
        fetcher: '~/gql/fetcher#fetcher'
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
    }
  }
};

export default config;