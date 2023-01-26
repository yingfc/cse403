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

### Repository layout

### Tool sets
This frontend of this project will be implemented with React.js and the backend will use Node.js with typescript.

```
📦 cse403
 ┃
 ┣ 📂 back-end
 ┃ ┗ 📂 src
 ┃ ┃ ┗ 📂 db (keeps track of the databases of available rooms and reserved rooms and assign students their reserved rooms)
 ┃ ┃ ┃ ┗ 📜.gitkeep
 ┣ 📂 font-end
 ┃ ┗ 📂 src
 ┃ ┃ ┗ 📂 components (contains different components of the webpage, subject to further segmentation later on)
 ┃ ┃ ┃ ┗ 📜.gitkeep
 ┣ 📂 reports
 ┃ ┗ 📜 Week3Report.md
 ┗ 📜 README.md
```
