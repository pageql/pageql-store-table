# [PageQL Table Store](https://pageql.dev) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pageql/pageql-store-table/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@pageql/pageql-store-table.svg?style=flat)](https://www.npmjs.com/package/@pageql/pageql-store-table) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)
PageQL Table functionality in the form of a Svelte Store

Get started by installing to an existing Svelte project
`npm install --save @pageql/pageql-store-table`

Make sure you have a GraphQL client like [Apollo](https://www.npmjs.com/package/apollo-boost) installed

Setup your `pageql.config.js` in your project's root
```
...
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({ uri: 'your-graphql-url' });

export default {
    ...,
    client,
}
```
