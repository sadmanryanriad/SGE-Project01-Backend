const Student = require("../models/Student");
const allowedStatuses = require("../others/statuses");
const canUploadStatuses = require("../others/canUploadStatuses");
const { scheduleJob, cancelJob } = require("../others/paymentScheduler");
const sendEmail = require("../others/sendEmail");
const Member = require("../models/member");

const studentStatusUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, comment } = req.body;
    const newStatus = {
      status,
      comment: comment || "",
      createdAt: new Date(),
    };

    if (!allowedStatuses.includes(newStatus.status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json("student not found");
    }

    if (student.status.status === newStatus.status) {
      return res.status(400).json("New status is same as the current status");
    }

    let newCanUpload = false;
    if (canUploadStatuses.includes(newStatus.status)) {
      newCanUpload = true;
    }

    const filter = { _id: id };
    const update = {
      status: newStatus,
      $push: { statusHistory: newStatus },
      canUpload: newCanUpload,
    };

    //enrollment starts the timer and adds the enrollment id to the members property enrolledStudents when finished
    //otherwise change the paymentStatus to pending and remove enrollment id from the members property enrolledStudents
    if (newStatus.status === "enrollment") {
      update.enrollmentStartDate = new Date();
      scheduleJob(id);
    } else {
      update.paymentStatus = "pending";
      cancelJob(id);

      // Remove student ID from the enrolledStudents array in Member
      const member = await Member.findOne({ email: student.createdBy });
      if (member) {
        const updatedEnrolledStudents = member.enrolledStudents.filter(
          (enrolledId) => enrolledId.toString() !== student._id.toString()
        );
        await Member.findByIdAndUpdate(
          member._id,
          { enrolledStudents: updatedEnrolledStudents },
          { new: true }
        );
      }
    }

    if (newStatus.status === "dropout") {
      update.paymentStatus = "cancelled";
      cancelJob(id);
    }

    const options = { new: true };
    const result = await Student.findOneAndUpdate(filter, update, options);

    res.status(200).json({
      message: "status updated successfully",
      status: result.status,
      canUpload: result.canUpload,
      statusHistory: result.statusHistory,
    });
    // Send email notifications asynchronously
    const emailSubject = `Status Update for ${student.firstName} ${student.lastName}`;
    const emailText = `Dear ${student.firstName},\n\nYour status has been updated to: ${newStatus.status}.\n\nComment: ${newStatus.comment}\n\nBest regards,\nYour Team`;

    // // Email to student
    // sendEmail(student.email, emailSubject, emailText).catch(console.error);

    // // Email to member who created the student
    // sendEmail(student.createdBy, emailSubject, emailText).catch(console.error);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = studentStatusUpdate;
