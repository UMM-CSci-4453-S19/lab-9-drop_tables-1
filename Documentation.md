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
The current logged in user exists here. The JSON returned states the current logged in user as well as the user ID. The JSON looks like this:
```JSON
[{
id: 44,
username: "oBaMa"
}]
```
# Click
Click adds the clicked button item to the transactions list. The click collects the: button_id, label, invID, price, user, userid, timestamp) select x.button_id, x.label, x.invID, x.price, y.username, and y.id. If this has been collected and the item has been added to the transactions list, this response is displayed: "Successfully added button to transactions"
# AddPrevious
AddPrevious does the same thing as Click, but adds the clicked button item to the till_items list. This list is used as a record of every item that has been purchased so far. As with Click, button_id, label, invID, price, user, userid, timestamp) select x.button_id, x.label, x.invID, x.price, y.username, and y.id is collected. Once put into the till_items list, "Successfully added to previous transactions" is displayed.
# ClickUser
ClickUser?id= adds a user to the currentuser list. If the user has been added, "Successfully added user" is returned.
# DeleteClick
DeleteClick removes the item that the delete button was clicked for from the transactions list. If the item has been Successfully removed, "Successfully deleted" is returned.
# Void
Void truncates all of the items in the transactions list. If the items have been Successfully removed, "Successfully void" is returned
# RemoveUsers
RemoveUsers truncates the currentuser list. If all of the users have been removed, "Successfully removed users" is returned
# Total
Total returns the total cost of all of the items in the transactions list. The total is returned as a string.
# getReceipt
getReceipt returns a dialog box that contains all of the transactions list items. The receipt contains each item, the number of the item bought, cost per item, and total cost for the item. The JSON looks like this:
```JSON
[{
Item: "bananas",
Number Bought: 2,
Cost per Item: 1,
Total for item: 2
},
{
Item: "hamburgers",
Number Bought: 3,
Cost per Item: 80,
Total for item: 240
},
{
Item: "hotdogs",
Number Bought: 1,
Cost per Item: 2,
Total for item: 2
}]
```
