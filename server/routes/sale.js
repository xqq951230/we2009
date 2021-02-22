const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");


router.get("/HOSPA", (req, res) => {
	let doctorId = req.query.doctor_id;
	let sql = `SELECT
    ddys_doctor.doctor_id,
    ddys_doctor.nickname,
    ddys_doctor.avatar,
    ddys_doctor.office_id,
    ddys_doctor.level,
    ddys_doctor.hospital_id,
    ddys_doctor.description,
    ddys_doctor.direction,
    ddys_doctor.experience_1,
    ddys_doctor.experience_2,
    ddys_doctor.experience_3,
    ddys_doctor.respond,
    ddys_doctor.ask_price,
    ddys_doctor.answer,
    ddys_doctor.prescription,
    ddys_hospital.hospital_id,
    ddys_hospital.hospitalname,
    ddys_hospital.hospitallevel,
    ddys_hospital.longitude,
    ddys_hospital.latitude,
    ddys_hospital.address,
    ddys_hospital.description,
    ddys_hospital.phone,
    ddys_hospital.city_id,
    ddys_office.office_name
    FROM
    ddys_doctor
    INNER JOIN ddys_hospital ON ddys_doctor.hospital_id = ddys_hospital.hospital_id
    INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
    WHERE
    ddys_doctor.doctor_id = ?`;
    sqlConnect(sql, [doctorId]).then(result=>{
        res.send(result[0]);
    })

});

//请求科室
router.get("/office", (req, res) => {
    let sql = "select * from ddys_office";
    sqlConnect(sql).then(result=>{
        res.send(result);
    })

});
//请求医生信息
router.get("/doctor", (req, res) => {
	let officeId = req.query.office_id;
	let sql = `SELECT
        ddys_hospital.hospitalname,
        ddys_doctor.nickname,
        ddys_doctor.avatar,
        ddys_doctor.doctor_id,
        ddys_doctor.office_id,
        ddys_doctor.level,
        ddys_doctor.hospital_id,
        ddys_doctor.description,
        ddys_doctor.direction,
        ddys_doctor.experience_1,
        ddys_doctor.experience_2,
        ddys_doctor.experience_3,
        ddys_doctor.respond,
        ddys_doctor.ask_price,
        ddys_doctor.answer,
        ddys_doctor.prescription,
        ddys_office.office_id
      FROM
        ddys_office
      INNER JOIN ddys_doctor ON ddys_office.office_id = ddys_doctor.office_id
      INNER JOIN ddys_hospital ON ddys_doctor.hospital_id = ddys_hospital.hospital_id
      WHERE
        ddys_office.office_id =?`;
        sqlConnect(sql, [officeId]).then(result=>{
            res.send(result)
        })

});

//请求医院信息
router.get("/sale/hospital", (req, res) => {
	let sql = `SELECT
        ddys_hospital.hospitalname,
        ddys_doctor.nickname,
        ddys_doctor.avatar,
        ddys_doctor.doctor_id,
        ddys_doctor.office_id,
        ddys_doctor.level,
        ddys_doctor.hospital_id,
        ddys_doctor.description,
        ddys_doctor.direction,
        ddys_doctor.experience_1,
        ddys_doctor.experience_2,
        ddys_doctor.experience_3,
        ddys_doctor.respond,
        ddys_doctor.ask_price,
        ddys_doctor.answer,
        ddys_doctor.prescription,
        ddys_doctor.star,
        ddys_office.office_id
      FROM
        ddys_office
      INNER JOIN ddys_doctor ON ddys_office.office_id = ddys_doctor.office_id
      INNER JOIN ddys_hospital ON ddys_doctor.hospital_id = ddys_hospital.hospital_id
      WHERE
        ddys_office.office_id = 1`;
        sqlConnect(sql).then(result=>{
            res.send(result)
        })

});

module.exports = router;