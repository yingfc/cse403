# CSE403 Software Engineering

## Project: DubMap

#### This DubMap project will be an all-in-one campus map platform for UW that would allow for easy navigation between classes, access to on-campus dining information, and bookings/reservations to the UW buildings and facilities on campus.

##### Major features

- Map with clickable buildings, with navigation systems that can lead students to travel through different buildings.
- Adapt list of available buildings to reserve rooms into the user’s choice of their major
- Reservation availability of each room of buildings synchronous to the UW Library system, with the description of each room, such as maximum people allowed and facilities included.
- For the room reservation system, find out whether students are allowed in the specific building. If not, suggest rooms with availability and permission.
- Based on the location provided by the user, search and display a list of dining places information sorted by distance.

##### Stretch goals

- Linked with MyUW, and automatically generate routine among each classroom per day, without human intervention.
- Try to suggest and lead students to an appropriate study place during the spare time between lectures, according to routine, time, and facility requirements, saving time for finding spots.
- Optimize facilities usage in general by integrating classrooms on the map with the
associates class code. For example, the user would be able to search for building with
class code, and the user would be able to get a list of classes in the building.
- Have a centralized platform through which the users can explore their options of room reservation through campus

---

### How to Run DubMap

#### Backend SparkJava Server
- git pull
- load the entire project in IntelliJ
- set up project SDK in *File > Project Structure > Project*, choose JDK 11 and apply
- go to *backend/local.properties* and add the password of db there, plz ask @Yingfan (Eric) Chen for the password
- go to *build.gradle* or gradle sidebar on the right of IDEA UI to reload the project (it will take some time to download all the dependences for the first time)
- go to *back-end/src/SparkJavaDemo*, run it
- when you see logs saying **Server - Started**, go to **localhost:4567/hello**, and try out all the endpoints

#### Frontend Server
- to configure the front end, you’ll have to create a .env file at the root directory of the front-end.
```
REACT_APP_UW_LIBRARY_RESERVATION_LINK=https://cal.lib.uw.edu/?_gl=1*1qhpnb6*_ga*MTU2MjcyMzAwNC4xNTc4NTI3Mjk2*_ga_63X2ZQHK8P*MTY3NDgzNzQ1NS4zLjAuMTY3NDgzNzQ1NS4wLjAuMA..

REACT_APP_GOOGLE_API=<YOUR GOOGLE API KEY>

REACT_APP_DUBMAP_SERVER=http://localhost:4567/
```
- to launch our frontend, please navigate to the root directory of the front-end and run `npm i` and then `npm run start`.
---

### Tool sets
This frontend of this project will be implemented with React and TypeScript and the backend will use SparkJava with Java. The database is hosted on Google Cloud Platform.

### Repository layout
```
📦 cse403
 ┣ 📂 .github.workflow (CI related setting)
 ┣ 📂 back-end
 ┃ ┗ 📂 test
 ┃ ┃ ┗ 📂 navigation (route navigation related test)
 ┃ ┗ 📂 src
 ┃   ┗ 📂 db (keeps track of the databases of available rooms and reserved rooms and assign students their reserved rooms)
 ┃   ┗ 📂 building (class for building endpoint)
 ┃   ┗ 📂 navigation (classToBuilding demo file)
 ┃   ┗ 📂 response (Spark response)
 ┃   ┗ 📜 MySqlDemo.java (demo file to fetch data from database)
 ┃   ┗ 📜 SparkJavaDemo.java (backend SparkJava server file)
 ┣ 📂 font-end
 ┃ ┗ 📂 src
 ┃   ┗ 📂 components (contains different components of the webpage, subject to further segmentation later on)
 ┃   ┗ 📂 config (map settings)
 ┃   ┗ 📂 tests (map settings)
 ┣ 📂 reports (weekly reports on progress/reflection)
 ┃ ┗ 📜 Week3Report.md
 ┃ ┗ 📜 Week4Report.md
 ┃ ┗ 📜 Week5Report.md
 ┃ ┗ 📜 Week6Report.md
 ┃ ┗ 📜 Week7Report.md
 ┗ 📜 README.md
```
---
### Use Cases
Ready for Beta Release (Feb 14th)
- **Route navigation**: User can now enter course information (e.g. CSE 403 A) in the search bar and the map will show the navigation path from user's current location to the target building where the class is held.
- **Room reservation**: User can now hover over to the building/library that are available for reservation, and a info window will show up with clickable link for the user to be redirected to the UW reservation system for room booking.

Work in Progress
- **Dining options**: User should be able to click a "show nearby dining options" button to see a list of currently opening restaurants around campus. And upon clicking the specific restaurant, it will show the navigation path to the dining/cafe on the map.