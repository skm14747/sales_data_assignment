const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function getStuff() {
  return readFile("./sales-data.txt", "utf-8");
}

getStuff().then(data => {
  let organisedData = data
    .split("\n")
    .map(data => {
      return data.split(",");
    })
    .slice(1)
    .map(data => {
      return {
        date: new Date(data[0]),
        SKU: data[1],
        unitPrice: data[2],
        quantity: data[3],
        totalSales: data[4].trim()
      };
    });
  // console.log("Total Sales of the Store : ", totalSalesOfStore(organisedData));
  // console.log("Month wise sale : ", getMonthWiseSales(organisedData));
  // console.log("Most popular item: ", getMostPopularItem(organisedData));
  // console.log("monthWiseMostSoldItem: ", monthWiseMostSoldItem(organisedData));
  console.log(salesSummaryforMostPopularItem(organisedData));
});

const totalSalesOfStore = data => {
  let sum = 0;
  data.forEach(element => {
    if (element.totalSales) sum = sum + parseInt(element.totalSales);
  });
  return sum;
};

const getMonthWiseSales = data => {
  const monthlySales = {};
  data.forEach(element => {
    if (!monthlySales[element.date.getMonth()])
      monthlySales[element.date.getMonth()] = parseInt(element.totalSales);
    else
      monthlySales[element.date.getMonth()] =
        monthlySales[element.date.getMonth()] + parseInt(element.totalSales);
  });
  return monthlySales;
};

const getMostPopularItem = data => {
  const quantityWiseItem = {};
  data.forEach(element => {
    if (!quantityWiseItem[element.SKU])
      quantityWiseItem[element.SKU] = parseInt(element.quantity);
    else
      quantityWiseItem[element.SKU] =
        quantityWiseItem[element.SKU] + parseInt(element.quantity);
  });
  return quantityWiseItem;
};

const monthWiseMostSoldItem = data => {
  const monthlySoldProduct = {};
  data.forEach(element => {
    if (!monthlySoldProduct[element.date.getMonth()]) {
      monthlySoldProduct[element.date.getMonth()] = {};
      monthlySoldProduct[element.date.getMonth()][element.SKU] = parseInt(
        element.totalSales
      );
    } else {
      if (!monthlySoldProduct[element.date.getMonth()][element.SKU]) {
        monthlySoldProduct[element.date.getMonth()][element.SKU] = parseInt(
          element.totalSales
        );
      } else {
        monthlySoldProduct[element.date.getMonth()][element.SKU] =
          monthlySoldProduct[element.date.getMonth()][element.SKU] +
          parseInt(element.totalSales);
      }
    }
  });
  return monthlySoldProduct;
};

const salesSummaryforMostPopularItem = data => {
  const mostPopularItems = getMostPopularItem(data);
  const min = {};
  const max = {};
  const avg = {};

  

  data.forEach(element => {
    if (
      !min[element.date.getMonth()] ||
      !max[element.date.getMonth()] ||
      !avg[element.date.getMonth()]
    ) {
      min[element.date.getMonth()] = {
        [element.SKU]: element.quantity
      };
      max[element.date.getMonth()] = {
        [element.SKU]: element.quantity
      };
      avg[element.date.getMonth()] = {
        [element.SKU]: element.quantity,
        count : 0
      };
    }
    else{
      if(min[element.date.getMonth()][element.SKU]>element.)
    }
  });

  return min;
};
