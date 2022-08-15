const _ = require("lodash");
const util = require("util");

const startingData = [
    { name: "TV", price: 300, date: "2018-10-10" },
    { name: "laptop", price: 600, date: "2018-10-12" },
    { name: "PC", price: 800, date: "2018-09-05" },
    { name: "owen", price: 300 },
    { name: "Camera", price: 500, date: "2018-03-03" },
    { name: "Fridge", price: 1000, date: "2018-12-11" },
    { name: "table", price: 150, date: "2018-12-10" },
    { name: "Sofa", price: 400, date: "2018-12-10" },
    { name: "chair", date: "2018-09-10" },
    { name: "Window", price: 300, date: "2018-05-05" },
];

// v1
const isValidEntry = (entry) => !!entry.name && !!entry.price && !!entry.date;
const filterInvalid = (arr) => arr.filter((el) => isValidEntry(el));

const groupByDate = (arr) => _.groupBy(arr, "date");

const capitalizeName = (str) => {
    if (typeof str === "string") {
        return str.replace(/^\w/, (c) => c.toUpperCase());
    } else {
        return "";
    }
};

// {key: value} => "value"
const formatEntry = (entry) =>
    `${capitalizeName(entry.name)} - $${entry.price}`;

const testSubject = {
    "2018-12-10": [
        { name: "table", price: 150, date: "2018-12-10" },
        { name: "Sofa", price: 400, date: "2018-12-10" },
    ],
    "2018-05-05": [{ name: "Window", price: 300, date: "2018-05-05" }],
};

const groupMapper = (group) => {
    return _.map(group, (entries, key) => {
        return { [key]: _.map(entries, formatEntry) };
    });
};

const process = _.flow(filterInvalid, groupByDate, groupMapper);

/////////////////////

function main() {
    const result = process(startingData);

    console.table(result);
}

main();
