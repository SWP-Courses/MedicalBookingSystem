var DrugBill = require("../models/DrugBill");
var BillMedicine = require("../models/BillMedicine");
var BookedService = require("../models/BookedService");

const getBillByUser = async (req, res) => {
  try {
    const bills = await DrugBill.aggregate([
      {
        $match: { customer_id: req.params.id },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          pipeline: [{ $project: { fullname: 1 } }],
          as: "customer",
        },
      },
    ]);
    if (bills.length) return;
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create new dug bill and many billmedicine documents
const addDrugBill = async (req, res) => {
  const { bill_medicines, disease, note, re_exam_date, bookedserviceid } =
    req.body;

  // re_exam_date sẽ gắn vào bookedservice
  try {
    const newBill = await DrugBill.create({
      disease,
      note,
      doctor_id: req.params.doctorId,
      customer_id: req.params.customerId,
      re_exam_date,
    });

    for (const bmedicine of bill_medicines) {
      await BillMedicine.create({
        drugbill_id: newBill._doc._id,
        medicine_id: bmedicine.medicine_id,
        quantity: bmedicine.quantity,
        dose: bmedicine.dose,
      });
    }
    await BookedService.findByIdAndUpdate(bookedserviceid, {
      drugbill_id: newBill._doc._id,
    });
    res.status(200).json(newBill);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getBillByUser, addDrugBill };
