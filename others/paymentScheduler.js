const cron = require("node-cron");
const Student = require("../models/Student");

const jobs = {};

// const scheduleJob = (studentId, delay) => {
//     const job = cron.schedule(`*/1 * * * *`, async () => {
//       const student = await Student.findById(studentId);
//       if (student && student.status.status === "enrollment") {
//         const daysSinceEnrollment = (new Date() - new Date(student.enrollmentStartDate)) / (1000 * 60 * 60 * 24); //milliseconds to days
//         if (daysSinceEnrollment >= 90) {
//           await Student.findByIdAndUpdate(studentId, { paymentStatus: "paid" });
//           job.stop();
//           delete jobs[studentId];
//         }
//       }
//     });

//     jobs[studentId] = job;
//     job.start();
//   };

const scheduleJob = (studentId, delay) => {
  const job = cron.schedule(`*/1 * * * * *`, async () => {
    const student = await Student.findById(studentId);
    if (student && student.status.status === "enrollment") {
      const secondsSinceEnrollment =
        (new Date() - new Date(student.enrollmentStartDate)) / 1000; //milliseconds to seconds
      if (secondsSinceEnrollment >= 15) {
        // 15 seconds for testing
        await Student.findByIdAndUpdate(studentId, { paymentStatus: "paid" });
        job.stop();
        delete jobs[studentId];
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