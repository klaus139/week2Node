function classifier(input) {
  // return if input is not an array or array length is less than 1
  if (!Array.isArray(input)) {
    throw Error;
  }
  if (input.length < 1) {
    return { noOfGroups: 0 };
  }

  const newArr = [...input];

  // calculate age of students
  const modifiedArray = newArr.map((student) => ({
    name: student.name,
    age: calcAge(student.dob),
    regNo: student.regNo,
    dob: student.dob,
  }));

  // sort array by age
  const sortedArray = modifiedArray.sort(function (a, b) {
    return a.age - b.age;
  });
  

  //initialize 1st group with the first student in the sorted array
  let group = [sortedArray[0]];
  let studentGroup = [];

  // sort group by age difference and group length
  for (let i = 1; i < modifiedArray.length; i++) {
    if (sortedArray[i].age - group[0].age <= 5 && group.length <= 2) {
      group.push(modifiedArray[i]);
    } else {
      studentGroup.push(group);
      group = [];
      group.push(modifiedArray[i]);
    }
  }

  // last group
  if (group.length <=2) {
    studentGroup.push(group);
  }

  // set noOfGroups key
  let output = {};
  output.noOfGroups = studentGroup.length;

  // format groups based on output requirement
  const groupOutput = studentGroup.map(function (group) {
    return {
      members: group.map((element) => ({
        name: element.name,
        age: element.age,
        dob: element.dob,
        regNo: element.regNo,
      })),
      oldest: group[group.length - 1].age,
      sum: group.reduce((acc, el) => {
        return acc + el.age;
      }, 0),
      regNos: group.map(el => (Number(el.regNo))).sort(function(a, b) {
        return a - b
      })
    };
  });

  // set output key for each group
  groupOutput.forEach((group, idx) => {
    let currentGroup = `group${idx + 1}`;
    output = { ...output, [currentGroup]: group };
  });

  return output;
}

// function to calculate age
const calcAge = (year) => {
  const date = new Date(year);
  return new Date(2019, 0, 1).getFullYear() - new Date(year).getFullYear()
};



module.exports = classifier;