
# HOTEL Application [Authentication]

## Overview
The Node Hotel application is built on Node.js using Express.js and MongoDB. It serves as a platform to manage staff and menu items. Key functionalities include adding, retrieving, updating, and deleting staff and menu items through dedicated endpoints:

This is just a Practice project to learn about Authentication and Tokens, Session Based VS Token Based Authentication,etc.

## ENDPOINTS
- Add Staff: POST /person - Adds a new staff member with details like name and role.
- Get All Staff: GET /person - Retrieves a list of all staff members.
- Get Staff by Role: GET /person/
- Retrieves staff based on their role (e.g., chef, waiter).
- Update Staff: PUT /person/ - Updates details of a specific staff member by ID.
- Delete Staff: DELETE /person/ - Deletes a staff member based on their ID.


- Add Menu Item: POST /menu - Adds a new menu item with details such as name and price.
- Get All Menu Items: GET /menu - Retrieves a list of all menu items.
- Get Menu Items by Taste: GET /menu/

## Note :
Under Progress, Will add JWT_authentication to CRUD Routes and new Menu Routes 