import { writable, get } from 'svelte/store';
import { flattenData, stringSepToNorm, setUpper } from './data-helpers.js';

import gql from "graphql-tag";

let tableData;
let tableKeys;
let tableName;

let passedUseGql;
let passedClient;
let passedQuery;
let variablesStore;

let exposedStore;

const storeTable = ({ client = window.pageql.client, usegql = true, query, variables }) => {
    exposedStore = writable({});

    passedUseGql = usegql;
    passedClient = client;
    passedQuery = query;
    variablesStore = writable(variables);
    variablesStore.subscribe(queryClient);

    return {
        data: { subscribe: exposedStore.subscribe },
        variables: variablesStore,
    };
};

const queryClient = () => {
    console.log(passedQuery);
    console.log(get(variablesStore))
    passedClient.query({ query: passedUseGql ? gql`${passedQuery}` : passedQuery, variables: get(variablesStore) }).then(({ data }) => {
        console.log("HUH");
        console.log(data);
        console.log("HUH");

        onNewTableData(data);

        exposedStore.set({
            tableName: stringSepToNorm(tableName),
            tableData,
            tableKeys,
        });
    }).catch(e => console.log(e));
}

const onNewTableData = (_data) => {
    tableData = Object.values(_data)[0].map((dataEntry) => {
        return flattenData(dataEntry).data;
    });

    if (!tableKeys) {
        tableName = Object.keys(_data)[0];
        if (tableData.length > 0) {
            tableKeys = Object.keys(tableData[0]);
        }
    }
};

export {
    storeTable,
    stringSepToNorm,
    flattenData,
    setUpper,
};
