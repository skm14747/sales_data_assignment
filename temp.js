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
  console.log("Total Sales of the Store : ", totalSalesOfStore(organisedData));
  console.log("Month wise sale : ");
  printMonthWiseFormatData(getMonthWiseSales(organisedData));
  console.log("Most popular item: ");
  printMonthWiseFormatData(getMostPopularItem(organisedData));
  console.log("monthWiseMostSoldItem: ");
  monthWiseMostSoldItem(organisedData);
  // console.log(salesSummaryforMostPopularItem(organisedData));
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
  // printMonthWiseFormatData(monthlySales);
};

const getMostPopularItem = data => {
  const quantityWiseItem = {};
  data.forEach(element => {
    if (!quantityWiseItem[element.date.getMonth()]) {
      quantityWiseItem[element.date.getMonth()] = {};
      quantityWiseItem[element.date.getMonth()][element.SKU] = parseInt(
        element.quantity
      );
    } else {
      if (!quantityWiseItem[element.date.getMonth()][element.SKU]) {
        quantityWiseItem[element.date.getMonth()][element.SKU] = parseInt(
          element.quantity
        );
      } else {
        quantityWiseItem[element.date.getMonth()][element.SKU] =
          quantityWiseItem[element.date.getMonth()][element.SKU] +
          parseInt(element.quantity);
      }
    }
  });
  for (key in Object.keys(quantityWiseItem)) {
    quantityWiseItem[key] = getMaxKey(quantityWiseItem[key]);
  }
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
  for (key in Object.keys(monthlySoldProduct)) {
    monthlySoldProduct[key] = getMaxKey(monthlySoldProduct[key]);
  }
  // return printMonthWiseData(monthlySoldProduct);
  printMonthWiseFormatData(monthlySoldProduct);
};

const getMaxKey = data => {
  return Object.keys(data).reduce((a, b) => (data[a] > data[b] ? a : b));
};

const getMonthWiseFormatData = data => {
  const monthWiseFormat = {};
  for (key in Object.keys(data)) {
    switch (key) {
      case "0":
        monthWiseFormat["January"] = data[key];
        break;
      case "1":
        monthWiseFormat["February"] = data[key];
        break;
      case "2":
        monthWiseFormat["March"] = data[key];
        break;

      default:
        break;
    }
  }
  return monthWiseFormat;
};

const printMonthWiseFormatData = data => {
  for (key in Object.keys(data)) {
    switch (key) {
      case "0":
        console.log("January : ", data[key]);
        break;
      case "1":
        console.log("February : ", data[key]);
        break;
      case "2":
        console.log("March : ", data[key]);
        break;

      default:
        break;
    }
  }
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
        count: 0
      };
    } else {
      if (min[element.date.getMonth()][element.SKU] > element.quantity) {
        min[element.date.getMonth()][element.SKU] = element.quantity;
      }
      if (max[element.date.getMonth()][element.SKU] < element.quantity) {
        max[element.date.getMonth()][element.SKU] = element.quantity;
      }
    }
  });

  return { min, max };
};
