const Student = require("../models/Student");
const allowedStatuses = require("../others/statuses");
const canUploadStatuses = require("../others/canUploadStatuses");

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

    //check the current document first for status comparison
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json("student not found");
    }
    //check if the new status is same as the current status
    if (student.status.status === newStatus.status) {
      return res.status(400).json("New status is same as the current status");
    }
    //check if eligible for uploading files
    let newCanUpload = false;
    if (canUploadStatuses.includes(newStatus.status)) {
      newCanUpload = true;
    }

    //update the current status and push new status into statusHistory
    const filter = { _id: id };
    const update = {
      status: newStatus,
      $push: { statusHistory: newStatus },
      canUpload: newCanUpload,
    };
    const options = { new: true };

    const result = await Student.findOneAndUpdate(filter, update, options);

    res.status(200).json({
      message: "status updated successfully",
      status: result.status,
      canUpload: result.canUpload,
      statusHistory: result.statusHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = studentStatusUpdate;
