import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import Student from './models/studentModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchField: string = 'name'; // Default search field
  searchValue: string;
  selectedBloodGroup: string[] = [];
  selectedClass: string[] = [];
  students: Student[] = [];
  title = 'student-UI';
  limit = 10;
  offset = 0;
  startAge: number;
  endAge: number;
  selectedGender: string[] = [];
  currentPage = 1;
  totalPages = null;
  //bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  bloodGroups = [
    {
      name: 'A+',
      value: false,
    },
    {
      name: 'A-',
      value: false,
    },
    {
      name: 'B+',
      value: false,
    },
    {
      name: 'B-',
      value: false,
    },
    {
      name: 'AB+',
      value: false,
    },
    {
      name: 'AB-',
      value: false,
    },
    {
      name: 'O+',
      value: false,
    },
    {
      name: 'O-',
      value: false,
    },
  ];
  genders = [
    {
      name: 'Male',
      value: false,
    },
    {
      name: 'Female',
      value: false,
    },
  ];
  // classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  classes = [
    {
      name: '1',
      value: false,
    },
    {
      name: '2',
      value: false,
    },
    {
      name: '3',
      value: false,
    },
    {
      name: '4',
      value: false,
    },
    {
      name: '5',
      value: false,
    },
    {
      name: '6',
      value: false,
    },
    {
      name: '7',
      value: false,
    },
    {
      name: '8',
      value: false,
    },
    {
      name: '9',
      value: false,
    },
    {
      name: '10',
      value: false,
    },
    {
      name: '11',
      value: false,
    },
    {
      name: '12',
      value: false,
    },
  ];
  constructor(private studentService: StudentService) {}
  ngOnInit(): void {
    this.getStudents();
  }
  getStudents() {
    this.selectedBloodGroup = [];
    this.selectedClass = [];
    this.selectedGender = [];
    this.students = [];

    const params = {
      limit: this.limit,
      offset: this.offset,
    };
    const body = {};
    this.classes.forEach((item) => {
      if (item.value) {
        this.selectedClass.push(item.name);
      }
    });
    this.bloodGroups.forEach((item) => {
      if (item.value) {
        this.selectedBloodGroup.push(item.name);
      }
    });
    this.genders.forEach((item) => {
      if (item.value) {
        this.selectedGender.push(item.name[0]);
      }
    });
    if (this.selectedBloodGroup.length) {
      body['bloodGroup'] = this.selectedBloodGroup;
    }
    if (this.selectedGender.length) {
      body['gender'] = this.selectedGender;
    }
    if (this.selectedClass.length) {
      body['classes'] = this.selectedClass;
    }
    if (this.startAge && this.endAge) {
      body['age'] = {
        startAge: this.startAge,
        endAge: this.endAge,
      };
    }

    if (this.searchValue) {
      body['search'] = {
        key: this.searchField,
        value: this.searchValue,
      };
    }

    this.studentService
      .searchStudent(params, body)
      .subscribe((student: any) => {
        this.students = student.data;
        this.totalPages = Math.ceil(student.metadata / this.limit);
        console.log(this.students);
      });
  }

  selectClass() {
    console.log(this.classes);
  }
  clearFilters() {
    this.bloodGroups.forEach((item) => {
      item.value = false;
    });
    this.classes.forEach((item) => {
      item.value = false;
    });
    this.genders.forEach((item) => {
      item.value = false;
    });
    this.selectedClass = [];
    this.selectedGender = [];
    this.startAge = null;
    this.endAge = null;
    this.searchValue = null;
  }
  search() {
    this.offset = 0;
    this.currentPage = 1;
    this.getStudents();
  }
  loadMore(type: string) {
    if (type === 'previous') {
      this.currentPage -= 1;
      this.offset -= this.limit;
    } else if ((type = 'next')) {
      this.currentPage += 1;
      this.offset += this.limit;
    }
    this.getStudents();
  }
}
