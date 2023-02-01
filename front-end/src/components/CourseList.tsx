import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


interface Course {
  name: string;
  section: string;
  location: string;
  room_num: string;
}

interface CourseList{
  course_list: Course[];
}

class CourseList {
  constructor(props: Course[] ) {
    // props should be user id or user name, search the database to query
    // the course list. Update later once we have database.
    this.course_list = props;
  }

  getCourses() :JSX.Element[] {
    try {
      let blocks = []
      for (let i = 0; i < this.course_list.length; i++) {
        let course = this.course_list[i];
        let name = course.name;
        let section = course.section;
        let location = course.location;
        let room_num = course.room_num;
        // structure of the following block might need reformat
        // TODO: Go to and remove button function should be defined
        let block = <div>
          <p>{name}</p>
          <p>{"section: " + section + ", location:" + location + ", room_num: " + room_num}</p>
        <button>Go to</button>
        <button>remove</button>
        </div>

        blocks.push(block);
      }
      return blocks;
    } catch (e) {
      alert("There was an error contacting the server.")
      console.log(e);
    }
    return [];
  }

  // TODO: add add course function
  render() {
    <React.StrictMode>
      <h3>Course List</h3>
      <div>
        {this.getCourses()}
      </div>
    <button>add course</button>
    </React.StrictMode>
  }
}

export default CourseList;