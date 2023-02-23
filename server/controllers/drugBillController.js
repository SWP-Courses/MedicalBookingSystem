var DrugBill = require("../models/DrugBill");
var BillMedicine = require("../models/BillMedicine");

const getBillByUser = async (req, res) => {
    try {
      const bills = await DrugBill.find({ customer_id: req.params.id });
      if (bills.length) return;
      res.status(200).json(bills);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create new dug bill and many billmedicine documents
  const addDrugBill = async (req, res) => {
    const {billmedicines, disease, note, re_exam_date} = req.body
  
    try {
      const newBill = await DrugBill.create({
        disease,
        note,
        doctor_id: req.params.doctorId,
        customer_id: req.params.customerId,
        re_exam_date
      });

      for (const bmedicine of billmedicines) {
        await BillMedicine.create({
            drugbill_id: newBill._id,
            medicine_id: bmedicine.medicine_id,
            quantity: bmedicine.quantity,
            dose: bmedicine.dose
        })
      }
      res.status(200).json(newBill);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  module.exports = {getBillByUser, addDrugBill}