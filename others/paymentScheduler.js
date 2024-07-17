const cron = require("node-cron");
const Student = require("../models/Student");
const Member = require("../models/member");

const jobs = {};

const scheduleJob = (studentId, delay) => {
  const job = cron.schedule(`*/1 * * * * *`, async () => {
    try {
      const student = await Student.findById(studentId);
      if (student && student.status.status === "enrollment") {
        const secondsSinceEnrollment =
          (new Date() - new Date(student.enrollmentStartDate)) / 1000; // milliseconds to seconds

        if (secondsSinceEnrollment >= 15) {
          const currentStudent = await Student.findById(studentId);
          if (currentStudent.status.status === "enrollment") {
            //find member and calculate money
            let money = 300;
            const member = await Member.findOne({ email: student.createdBy });
            if (!member) console.log("member not found");
            //if enrolled student count is greater than 4
            if (member.enrolledStudents.length >= 4) {
              money = 400;
            }
            //if enrolled student count is greater than 15
            if (member.enrolledStudents.length >= 15) {
              money = 500;
            }

            // Change student payment status with amount
            await Student.findByIdAndUpdate(studentId, {
              paymentStatus: money,
            });

            // Add enrollment data to the member
            await Member.findOneAndUpdate(
              { email: student.createdBy },
              { $push: { enrolledStudents: student._id } }
            );

            console.log(
              `Enrollment added to member:${member.firstName} ${member.lastName} <-> payment status updated for student: ${student.firstName} ${student.lastName} <-> amount: ${money}`
            );

            // Stop the job and delete it
            job.stop();
            delete jobs[studentId];
          }
        }
      }
    } catch (error) {
      console.error("Error processing scheduled job:", error);

      // Stop the job and delete it on error
      job.stop();
      delete jobs[studentId];
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
