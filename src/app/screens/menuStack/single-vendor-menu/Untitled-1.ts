let attr = [
    [
        {
          "key": "size",
          "value": "Large"
        },
        {
          "key": "topping",
          "value": "None"
        }
      ], 
]

attr.sort((attrA, attrB) => {
    let nameA = attrA.key.toLowerCase();
    let nameB = attrA.key.toLowerCase();
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })