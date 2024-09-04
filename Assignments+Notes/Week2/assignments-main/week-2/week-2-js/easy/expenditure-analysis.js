/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let list=[];
  let catobj={};
  for(let i=0;i<transactions.length;i++){
    catobj[transactions[i].category]=(catobj[transactions[i].category]||0)+transactions[i].price;
  }
  for(let key in catobj){
    let obj={};
    if (catobj.hasOwnProperty(key)){
      obj["category"]=key;
      obj["totalSpent"]=catobj[key];
      list.push(obj);
    }
  }

  return list;
}

module.exports = calculateTotalSpentByCategory;
