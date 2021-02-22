const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");

// 搜索文章接口
router.get("/article", (req, res) => {
	let keyword = decodeURI(req.query.keyword);
	let sql = `SELECT * FROM ddys_article WHERE subject LIKE "%${keyword}%"
    OR description LIKE "%${keyword}%"`;
	sqlConnect(sql)
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有找到相关文章！" });
			}
		})
		.catch((reason) => res.send());
});

// 搜索问题接口
router.get("/question", (req, res) => {
	let keyword = decodeURI(req.query.keyword);
	let sql = `SELECT 
    ques.question_id quesid,
    ques.content 'describe',
    ques.create_at committime,
    user.avatar imgurl,
    user.nickname nickname
    FROM ddys_question ques
    INNER JOIN ddys_user user ON ques.user_id = user.user_id
    WHERE ques.content LIKE "%${keyword}%"`;
	sqlConnect(sql)
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有找到相关问题！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 搜索医院接口
router.get("/hospital", (req, res) => {
	let keyword = decodeURI(req.query.keyword);
	let sql = `SELECT 
    hospitalname,
    hospitallevel,
    address,
    hospital_id
    FROM ddys_hospital
    WHERE hospitalname LIKE "%${keyword}%" OR address LIKE "%${keyword}%" OR description LIKE "%${keyword}%"`;
	sqlConnect(sql)
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有找到相关医院！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});


// 搜索医生接口
router.get("/doctor", (req, res) => {
	let keyword = decodeURI(req.query.keyword);
	let sql = `SELECT 
    doctor.doctor_id doctorid
    FROM ddys_doctor doctor
    INNER JOIN ddys_office office ON office.office_id = doctor.office_id
    INNER JOIN ddys_hospital hospital ON hospital.hospital_id = doctor.hospital_id
    WHERE doctor.nickname LIKE "%${keyword}%" OR doctor.description LIKE "%${keyword}%" OR doctor.direction LIKE "%${keyword}%"
    OR office.office_name LIKE "%${keyword}%" OR hospital.hospitalname LIKE "%${keyword}%"`;
	sqlConnect(sql)
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有找到相关医生！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

module.exports = router;