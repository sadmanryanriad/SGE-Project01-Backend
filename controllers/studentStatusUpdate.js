const Student = require("../models/Student");

const studentStatusUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const newStatus = req.body.status;
    const allowedStatuses = ["pending", "status-1", "status-2", "status-3"];

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    //check the current document first for status comparison
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json("not student found");
    }
    //check if the new status is same as the current status
    if (student.status === newStatus) {
      return res.status(400).json("New status is same as the current status");
    }

    //update the current status and push new status into statusHistory
    const filter = { _id: id };
    const update = { status: newStatus, $push: { statusHistory: newStatus } };
    const options = { new: true };

    const result = await Student.findOneAndUpdate(filter, update, options);

    res.status(200).json({
      message: "status updated successfully",
      status: result.status,
      statusHistory: result.statusHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = studentStatusUpdate;
