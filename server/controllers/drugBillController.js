var DrugBill = require("../models/DrugBill");
var BillMedicine = require("../models/BillMedicine");
var BookedService = require("../models/BookedService");
const { default: mongoose } = require("mongoose");

const getPresciptionByServiceId = async (req, res) => {
  try {
    const preId =  req.params.id;

    // check id có thuộc về duy nhất 1 booked service không?
    const belongBService = await BookedService.findOne({drugbill_id: preId});

    if(!belongBService) return res.status(404).json("Đơn thuốc không thuộc về lịch khám nào!")

    const medicines = await BillMedicine.find({
      drugbill_id: mongoose.Types.ObjectId(preId),
    }, {_id: 0, __v: 0, drugbill_id:0}).populate('medicine_id', 'name type');

    const bill = await DrugBill.findById(preId, {updatedAt: 0});

    if (bill.length) return res.status(404).json("ko có");
    res.status(200).json({...bill._doc, medicines});
  } catch (err) {
    res.status(500).json(err);
  }
};

// create new dug bill and many billmedicine documents
const addDrugBill = async (req, res) => {
  const { bill_medicines, disease, note, re_exam_date, bookedserviceid } =
    req.body;

  // check đủ req.body
  if (!bill_medicines.length || !disease || !note || !bookedserviceid) {
    return res
      .status(400)
      .json("Vui lòng điền đầy đủ thông tin trước khi tạo!");
  }
  // check params đúng doctor, đúng patient

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

module.exports = { getPresciptionByServiceId, addDrugBill };
