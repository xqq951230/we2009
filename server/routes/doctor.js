const express = require("express");
const app = express();
const router = express.Router();
const sqlConnect = require("./public");


// 关注医生
router.post('/gotofollow', (req, res)=>{
    let doctorid = req.body.doctorid;
    let userid = req.body.userid;
    let sql = `INSERT INTO ddys_follow (doctor_id, user_id) VALUES (?, ?)`
    sqlConnect(sql, [doctorid, userid]).then(value=>{
        res.send({ code: 0, message: "关注成功！" })
    }).catch((reason) => res.send({ code: 1, message: `${reason}` }));
})

// 取消关注医生
router.post('/canclefollow', (req, res)=>{
    let doctorid = req.body.doctorid;
    let userid = req.body.userid;
    let sql = `DELETE FROM ddys_follow WHERE doctor_id = ? AND user_id = ?`
    sqlConnect(sql, [doctorid, userid]).then(value=>{
        res.send({ code: 0, message: "取消关注成功！" })
    }).catch((reason) => res.send({ code: 1, message: `${reason}` }));
})


// 查询用户是否关注该医生
router.get('/queryisfollowed', (req, res)=>{
    let doctorid = req.query.doctorid;
    let userid = req.query.userid;
    let sql = `SELECT count(1) num FROM ddys_follow WHERE doctor_id = ? AND user_id = ?`
    sqlConnect(sql, [doctorid, userid]).then(value=>{
        res.send({ code: 0, message: "查询成功", data: value[0] })
    }).catch((reason) => res.send({ code: 1, message: `${reason}` }));
})


// 获取医生信息
router.get("/ask/getdoctormsg", (req, res) => {
	let doctorid = req.query.doctorid;
	let sql = `SELECT 
        doctor.nickname,
        doctor.avatar,
        doctor.ask_price price,
        office.office_name officename,
        hospital.hospitalname
    FROM ddys_doctor doctor
    INNER JOIN ddys_hospital hospital ON hospital.hospital_id = doctor.hospital_id
    INNER JOIN ddys_office office ON office.office_id = doctor.office_id
    WHERE doctor.doctor_id = ?;`;
	sqlConnect(sql, [doctorid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value[0] });
			} else {
				res.send({ code: 1, message: "没有该医生！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

module.exports = router;