# Documentation
Each heading refers to an API endpoint. For example, "Buttons" refers to `localhost:1337/buttons`.
# Buttons
Returns JSON data for the **item** buttons in the app.
If you are in the main transaction view, the JSON returned looks like this:
```json
[{
buttonID: 2,
left: 9,
top: 8,
width: 100,
label: "goodbye",
invID: 1
},
{
buttonID: 3,
left: 10,
top: 70,
width: 100,
label: "hotdogs",
invID: 1
},
{
buttonID: 4,
left: 110,
top: 70,
width: 100,
label: "hamburgers",
invID: 2
},
{
buttonID: 5,
left: 210,
top: 70,
width: 100,
label: "bananas",
invID: 3
},
{
buttonID: 6,
left: 10,
top: 120,
width: 100,
label: "milkduds",
invID: 4
}]
```
# User
Returns JSON data for **user** buttons at the login screen.
If you are in the login screen, the JSON data looks like this:
```JSON
[{
user: "Steve",
id: 1,
left: "300"
},
{
user: "oBaMa",
id: 44,
left: "370"
},
{
user: "drake",
id: 45,
left: "440"
}]
```
# Max
The max is a set value that determines how many items can be in a transaction. The JSON returned looks like this:
```JSON
[{
max: 18
}]
```
# Transaction
The items in the current transaction exist here. The JSON returned, if there are two hambugers, one milkduds and one hotdog, looks like this:  
```JSON
[{
buttonID: 3,
item_id: 1,
label: "hotdogs",
price: 2
},
{
buttonID: 4,
item_id: 2,
label: "hamburgers",
price: 80
},
{
buttonID: 6,
item_id: 3,
label: "milkduds",
price: 1
},
{
buttonID: 4,
item_id: 4,
label: "hamburgers",
price: 80
}]
```
# CheckIfLoggedIn
# Click
# AddPrevious
# ClickUser
# DeleteClick
# Void
# RemoveUsers
# Total
# getReceipt
