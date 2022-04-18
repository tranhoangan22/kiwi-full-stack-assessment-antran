# Added Features
## Feature description
* There are two views: DoorsList page and DoorDetail page
* DoorsList page can be accessed at the root route `/`, where a list the basic information of all doors (ID, Name, Address, and Last Sensor Communication) is displayed. Only 10 doors items will be displayed to avoid any performance issues when the number of doors scales.
* There is a "Load More" button at the end of the DoorsList page. Upon clicking on the "Load More" button, 10 more doors items will be shown. The "Load More Button" will disappear once all the doors items are displayed.
* DoorDetail Page can be accessed at `/door/<DoorID>`, or by clicking on an item on the DoorsList page. All the information about a single door is described on DoorDetail Page. There is an option to grant permission to existing users, by providing a valid user ID in the input field and click the "Grant Permission" button. The newly permitted user's name will be added to the "List of Users with Permission" item on the view. On the DoorDetail page, one can go back to the DoorsList page by clicking on the Kiwi icon on the header.

## Technologies
* The client app is built with React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
* The server app is built with NodeJS and [ExpressJS](https://expressjs.com). 
* The two applications are dockerized and added to the Dockerfile
* The services can started by running `docker-compose up --build -d`

