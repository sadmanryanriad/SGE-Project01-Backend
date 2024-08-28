const Student = require("../models/Student");
const Member = require("../models/member");
const MCO = require("../models/MCO");
const sendEmail = require("../others/sendEmail");

const assignStudentToMCO = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { assignedTo } = req.body;

    const filter = { _id: studentId };
    const update = {
      assignedTo,
    };
    const options = { new: true };

    const result = await Student.findOneAndUpdate(filter, update, options);
    //if result is null
    if (!result) {
      return res.status(400).json("student not found");
    }

    res.status(201).json({
      message: "assigned successfully",
      result,
    });

    //send email to student and member

    //GET mco name
    let MCOname;
    const mco = await MCO.findOne({ email: assignedTo });
    if (mco) {
      MCOname = `${mco.firstName} ${mco.lastName}`;
    } else {
      console.log("Mco not found");
      MCOname = "";
    }

    // Get member email
    const member = await Member.findOne({ email: result.createdBy });
    if (!member) {
      console.log("Member not found");
      return;
    }
    const emailSubject = `Student Assigned to a MCO`;
    const emailTextStudent = `Dear ${result.firstName} ${result.lastName},\n\nYou have been assigned to an MCO: ${MCOname}.\n\n MCO email: ${assignedTo} \n\nBest regards,\nYour Team`;
    const emailTextMember = `Dear ${member.firstName} ${member.lastName},\n\nYour student ${result.firstName} ${result.lastName} has been assigned to an MCO: ${MCOname}.\n\n MCO email: ${assignedTo} \n\nBest regards,\nYour Team`;
    const emailTextMCO = `Dear ${MCOname},\n\nYou have been assigned a new student: ${result.firstName} ${result.lastName}.\n\n student email: ${result.email}\n\nPreffered University: ${result.preferredUniversity}\n\nPreffered Course: ${result.preferredCourse} \n\nBest regards,\nYour Team`;

    // Send email notifications asynchronously
    sendEmail(result.email, emailSubject, emailTextStudent).catch(
      console.error
    );
    sendEmail(member.email, emailSubject, emailTextMember).catch(console.error);
    sendEmail(mco.email, emailSubject, emailTextMCO).catch(console.error);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error ");
  }
};

module.exports = assignStudentToMCO;
