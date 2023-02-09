# Week 6 Status Report

| Name            | NetID   |
| --------------- | ------- |
| Yigao (Alex) Li | yigaol2 |
| Chuteng Li      | chutel  |
| Fengyi Sun      | fysun   |
| Wajdi Boubakri  | wajdib  |
| Yingfan Chen    | yingfc  |

---

## Team report

### Last Week Recap

- Start developing the front end and backend of the project and have regular team meetings to track progress

### Progress and issues

- Had frontend map set up
- Had backend database tables `class` and `building` ready
- Set up GitHub Actions CI
- Fix last week's Architecture and Design write-up

### Plan for Next Week

- Keep working on frontend/backend for the beta release
- Finish all the tables set up in the central database
- Integrate backend function calls in frontend

---

## Contributions of individual team members

### Last Week Recap

**Yigao**:

- Connect to Google Map API, exhibiting the map on the page.
- Make the buildings on the Map clickable, and exhibiting the correct building content.

**Chuteng**:

- Figure out a way to integrate the map UI to our current UI
- Make the major buildings stand out so that users are prompted to click

**Fengyi**:

- Add sorting options to allow users to refine their search results

**Wajdi**:

- Start implementing the backend tables and data scraping for the backend

**Yingfan**:

- Keep working on creating tables for the central database
- Start backend API development after setting up database
- Didn't have time for Route API experiment last week, will probably try this week

### Progress and issues

**Yigao**:

- Finish the building subpage, but require to integrate with data
- Need individual building reservation link in Building file
- Begin Search bar implementation.

**Chuteng**:

- Adding map markers on the map for the buildings
- Styling the page

**Fengyi**:

- TODO

**Wajdi**:

- TODO

**Yingfan**:

- Created both `class` and `building` table to the central database
- Fix all the comments from Apollo in the living doc to address Architecture and Design related problems
- Implemented the ClassToBuilding function in the backend, and add tests
- Optimize GitHub Actions CI to integrate database related tests (work in progress), trying to let the CI dynamically get the password of GCP database.

### Plan for Next Week

**Yigao**:

- Connecting the Building subpage to the building database
- Make the Map building clickable and exhibiting the correct building content
- Finish search bar implementation

**Chuteng**:

- Investigate the route visualization API

**Fengyi**:

- TODO

**Wajdi**:

- TODO

**Yingfan**:

- Add last table `dining` to the central database
- Experiment and integrate route navigation API
