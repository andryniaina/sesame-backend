export const regroupGradesByUEandSemester = (grades) => {
  let groups = Object.values(
    grades.reduce((a, c) => {
      if (a.hasOwnProperty(c.ec.ue.id + c.semester)) {
        a[c.ec.ue.id + c.semester].push(c);
      } else {
        a[c.ec.ue.id + c.semester] = [c];
      }
      return a;
    }, {})
  );

  const reduceGrades = (group) => {
    return group.reduce(
      (a, c, index) => {
        a.averageCc += parseFloat(c.cc.toString());
        a.averageCt += parseFloat(c.ct.toString());
        a.average += parseFloat(c.average.toString());
        if (index === group.length - 1) {
          a.averageCc /= parseFloat(group.length.toString());
          a.averageCt /= parseFloat(group.length.toString());
          a.average /= parseFloat(group.length.toString());
        }
        return a;
      },
      {
        ueId: group[0].ec.ue.id,
        ueName: group[0].ec.ue.name,
        semester: group[0].semester,
        averageCc: 0,
        averageCt: 0,
        average: 0,
      }
    );
  };

  groups = groups.map((group) => reduceGrades(group));
  return groups;
};


export const filterStudentsByUeAndSemesterAndClassifyThem = (
  students,
  ueId,
  semester
) => {
  console.log({students,ueId,semester})
  let structuredStudents = students
    .filter((student) => {
      let isValid = false;
      for (const average of student.averages) {
        if (average.ueId === ueId && average.semester === semester) {
          isValid = true;
          break;
        }
      }
      return isValid;
    })
    .map((student) => {
      for (const average of student.averages) {
        if (average.ueId === ueId && average.semester === semester) {
          student.ueInfo = average;
          delete student.ueInfo.ueId;
          delete student.ueInfo.ueName;
          delete student.ueInfo.semester;
          break;
        }
      }
      student = { ...student, ...student.ueInfo };
      delete student.ueInfo;
      delete student.averages;
      delete student.grades;
      return student;
    })
    .sort((a, b) => a.average - b.average)
    .map((student, index) => ({ ...student, rank: index + 1 }));
  return structuredStudents;
};