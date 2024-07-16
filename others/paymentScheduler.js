const cron = require("node-cron");
const Student = require("../models/Student");
const Member = require("../models/member");

const jobs = {};

const scheduleJob = (studentId, delay) => {
  const job = cron.schedule(`*/1 * * * * *`, async () => {
    const student = await Student.findById(studentId);
    if (student && student.status.status === "enrollment") {
      const secondsSinceEnrollment =
        (new Date() - new Date(student.enrollmentStartDate)) / 1000; //milliseconds to seconds
      // console.log(secondsSinceEnrollment);
      if (secondsSinceEnrollment >= 15) {
        // 15 seconds for testing
        const currentStudent = await Student.findById(studentId);
        if (currentStudent.status.status === "enrollment") {
          await Student.findByIdAndUpdate(studentId, {
            paymentStatus: "to be paid",
          });
        }
        job.stop();
        delete jobs[studentId];
        //add enrollment data to the member
        const rr = await Member.findOneAndUpdate(
          { email: student.createdBy },
          { $push: { enrolledStudents: student._id } }
        );
        console.log("enrollment added to member");
      }
    }
  });

  jobs[studentId] = job;
  job.start();
};

const cancelJob = (studentId) => {
  if (jobs[studentId]) {
    jobs[studentId].stop();
    delete jobs[studentId];
  }
};

module.exports = { scheduleJob, cancelJob };
