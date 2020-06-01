Live Demo: https://rule-editor-dashboard.topherwenceslaus.now.sh/

# Tech Stack
- React Hooks
- React Context
- Typescript

# Types 

Rule is divided into Primary and secondary conditions along with the meta data.

For Example: This rule `If monthly rental amount > $1000 and customer age < 21` will be divided as:

- Primary Condition: `rental amount > $1000`
- Base Operator: `AND`
- Secondary Condition: `customer age < 21`

```
interface Rule {
  name: string;
  id: string;
  key: string;
  createdAt: string;
  modifiedAt: string;
  priority: string;
  primary: Condition[];
  secondary?: SecondaryCondition[];
}

interface Condition {
  id: string;
  name: string;
  operator: string;
  dataType: string;
  value: number | string | Date;
}

interface SecondaryCondition extends Condition {
  baseOperator: string;
}
```

# Response Data

Response data is will structured in the following format.

```
{
   "key":"96c5e6a4-d847-4b24-82e4-ac02d6d8b0b6",
   "id":"d4a7a07b-ac46-4e37-8efe-23b3dc1d0367",
   "priority":"high",
   "name":"monthly rental",
   "createdAt":"Mon Jun 01 2020",
   "modifiedAt":"Mon Jun 01 2020",
   "primary":[
      {
         "name":"monthly rental",
         "operator":"GREATER_THAN",
         "value":"1000",
         "id":"3ecde1c1-d8be-4be7-8765-e7b62d00248d",
         "dataType":"string"
      }
   ],
   "secondary":[
      {
         "name":"customer age",
         "operator":"LESSER_THAN",
         "value":"21",
         "id":"53ac4650-5259-4e2d-8c48-cc36a64ba26b",
         "dataType":"string",
         "baseOperator":"and"
      }
   ]
}
```

Server URL:  https://my-json-server.typicode.com/topherwenceslaus/mock-server/rules/
