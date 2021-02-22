const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");

router.get("/question/doctor", (req, res) => {
    let id = req.query.id;
	let sql = `select 
    d.office_id office_id,
    d.doctor_id d_id,
    d.nickname nickname,
    d.avatar avatar,
    d.level d_level,
    d.hospital_id hospital_id,
    d.description description,
    d.direction direction,
    d.experience_1 experience_1,
    d.experience_2 experience_2,
    d.experience_3 experience_3,
    d.ask_price ask_price,
    d.respond respond,
    d.answer answer,
    d.star,
    d.prescription prescription,
    h.hospitalname hospitalname,
    o.office_name office_name
    from ddys_doctor d 
    inner join ddys_office o on d.office_id=o.office_id 
    inner join ddys_comment c on d.doctor_id=c.doctor_id
    inner join ddys_hospital h on d.hospital_id=h.hospital_id
    where d.doctor_id=? `;
	sqlConnect(sql, [id])
		.then((value) => {
			if (value.length) {
				res.send({ code: 0, message: "OK", data: value[0] });
			} else {
				res.send({ code: 1, message: "NO Data" });
			}
		})
		.catch((reason) => res.send({ reason: `${reason}` }));
});

router.get("/question/details", (req, res) => {
	let id = req.query.id;
	let sql = `select 
    d.doctor_id doctor_id,
    a.content acontent,
    a.create_at acreate_at,
    q.content qcontent,
    q.create_at qcreate_at,
    d.nickname nickname,
    d.avatar davatar,
    d.level level,
    o.office_name office_name,
    h.hospitalname hospitalname,
    d.ask_price ask_price
    from ddys_answer a
    inner join ddys_doctor d on a.doctor_id=d.doctor_id
    inner join ddys_question q on a.answer_id=q.question_id
    inner join ddys_office o on d.office_id=o.office_id
    inner join ddys_hospital h on d.hospital_id=h.hospital_id
    where a.answer_id=?
    `;
	sqlConnect(sql, [id])
		.then((value) => {
			if (value.length) {
				res.send({ code: 0, message: "OK", data: value[0] });
			} else {
				res.send({ code: 1, message: "NO Data" });
			}
		})
		.catch((reason) => res.send({ reason: `${reason}` }));
});

router.get("/question", (req, res) => {
	let sql = `select * from ddys_office `;
	sqlConnect(sql)
		.then((value) => {
			if (value.length) {
				res.send({ code: 0, message: "OK", data: value });
			} else {
				res.send({ code: 1, message: "NO Data" });
			}
		})
		.catch((reason) => res.send({ reason: `${reason}` }));
});

router.get("/uquestion", (req, res) => {
	let sql = `select * from ddys_question q
    inner join ddys_user u on u.user_id=q.user_id
    `;
	sqlConnect(sql)
		.then((value) => {
			if (value.length) {
				res.send({ code: 0, message: "OK", data: value });
			} else {
				res.send({ code: 1, message: "NO Data" });
			}
		})
		.catch((reason) => res.send({ reason: `${reason}` }));
});

module.exports = router;