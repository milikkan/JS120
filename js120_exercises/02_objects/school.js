function createStudent(name, grade) {
  return {
    name,
    grade,
    courses: [],

    info() {
      console.log(`${this.name} is a ${grade} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(code, note) {
      let course = this.courses.find(course => course.code === code);
      if (course) {
        if (course.notes) {
          course.notes = course.notes.concat('; ', note);
        } else {
          course.notes = note;
        }
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.notes) {
          console.log(`${course.name}: ${course.notes}`);
        }
      });
    },

    updateNote(code, newNote) {
      let course = this.courses.find(course => course.code === code);
      if (course) {
        course.notes = newNote;
      }
    }
  };
}

let school = {
  students: [],

  addStudent: function(name, grade) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(grade)) {
      let student = createStudent(name, grade);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent: function(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode});
  },

  addGrade: function(student, courseCode, grade) {
    let course = student.listCourses().find(course => course.code === courseCode);
    if (course) {
      course.grade = grade;
    }
  },

  getReportCard: function(student) {
    student.listCourses().forEach(course => {
      console.log(`${course.name}: ${course.grade || 'In progress'}`);
    });
  },

  courseReport: function(courseName) {
    let grades = [];
    this.students.forEach(student => {
      let course = student.listCourses()
        .find(course => course.name === courseName);
      if (course && course.grade) {
        grades.push({studentName: student.name, studentGrade: course.grade});
      }
    });
    
    if (grades.length > 0) {
      console.log(`==${courseName} Grades==`);
      grades.forEach(grade => {
        console.log(`${grade.studentName}: ${grade.studentGrade}`);
      });
      console.log('---');
      let average = (grades.reduce((sum, grade) => sum + grade.studentGrade, 0)) / grades.length;
      console.log(`Course Average: ${average}`);
    }
  }
};

// Examples of created student objects with grades; methods
// on the objects are not shown here for brevity. The
// following are only showing the properties that aren't
// methods for the three objects
let paul = school.addStudent('Paul', '3rd');
school.enrollStudent(paul, 'Math', 101);
school.enrollStudent(paul, 'Advanced Math', 102);
school.enrollStudent(paul, 'Physics', 202);
school.addGrade(paul, 101, 95);
school.addGrade(paul, 102, 90);
console.log(paul);
// {
//   name: 'paul',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }


let mary = school.addStudent('Mary', '1st');
school.enrollStudent(mary, 'Math', 101);
school.addGrade(mary, 101, 91);
console.log(mary);
// {
//   name: 'Mary',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

let kim = school.addStudent('Kim', '2nd');
school.enrollStudent(kim, 'Math', 101);
school.enrollStudent(kim, 'Advanced Math', 102);
school.addGrade(kim, 101, 93);
school.addGrade(kim, 102, 90);
console.log(kim);
// {
//   name: 'Kim',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }

school.getReportCard(paul);
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// =Math Grades=
// Paul: 95
// Mary: 91
// Kim: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// Paul: 90
// Kim: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined