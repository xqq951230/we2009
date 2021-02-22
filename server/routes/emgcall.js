
const express = require("express");
const app = express();
const router = express.Router();
const sqlConnect = require("./public");


const uuid = require("uuid");

const multer = require("multer");
const obj = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "upload");
	},
	filename: function(req, file, cb) {
		cb(null, uuid.v1() + file.originalname.slice(file.originalname.indexOf(".")));
	},
});

const uploadTools = multer({
	storage: obj,
});

// 添加症状
router.post("/addsymptomimg", uploadTools.array("uploadFile"), (req, res) => {
	let body = req.body;
	// let desc = req.body.desc;
	let files = req.files;
	let userid = body.userid;
	let desc = body.desc;
	let caeateTime = body.create_at;
	let imgs = files.map((item) => {
		return item.filename;
	});
	let imgStr = imgs.join(",");

	let sql = "INSERT INTO ddys_symptom (description, images, user_id, create_at) VALUES (?, ?, ?, ?)";

	sqlConnect(sql, [desc, imgStr, userid, caeateTime])
		.then((value) => {
            return sqlConnect(`SELECT symptom_id FROM ddys_symptom
                WHERE user_id = ?
                ORDER BY symptom_id DESC
                LIMIT 1;`, [userid])
			
        })
        .then(value=>{
            res.send({ code: 0, message: "添加成功！", data: value[0] });
        })
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取用户最新提交的症状

router.get("/getsymptom", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT * FROM ddys_symptom WHERE user_id = ? ORDER BY create_at DESC LIMIT 1`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "获取成功！", data: value[0] });
			} else {
				res.send({ code: 1, message: `暂无症状信息！` });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取用户绑定的患者信息
router.get("/getpatient", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT * FROM ddys_patient WHERE user_id = ?`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有相关记录！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 添加患者信息
router.post("/addpatient", (req, res) => {
	let userMsg = req.body;
	let sql = `INSERT INTO ddys_patient (
        nickname,
        sex,
        brithday,
        weight,
        allergy,
        allergy_desc,
        history,
        history_desc,
        liver,
        kidney,
        inoculation,
        user_id,
        age
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	sqlConnect(sql, [
		userMsg.nickname,
		userMsg.sex,
		userMsg.birthday,
		userMsg.weight,
		userMsg.allergy,
		userMsg.allergy_desc,
		userMsg.history,
		userMsg.history_desc,
		userMsg.liver,
		userMsg.kidney,
		userMsg.inoculation,
		userMsg.user_id,
		userMsg.age,
	])
		.then((value) => {
			return sqlConnect(
				`SELECT patient_id FROM ddys_patient WHERE user_id = ?`,
				[userMsg.user_id]
			);
		})
		.then((value) => {
			let id = value[value.length - 1].patient_id;
			res.send({ code: 0, message: "保存成功！", data: id });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 添加电话急诊订单
router.post("/addorder", (req, res) => {
	let params = req.body;
	let sql = `INSERT INTO ddys_order ( user_id, patient_id, office_id, create_at, price, type, symptom_id, doctor_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
	sqlConnect(sql, [params.userid, params.patientid, params.officeid, params.createtime, params.price, params.type, params.symid, params.doctorid])
		.then((value) => {
			res.send({ code: 0, message: "下单成功！" });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

module.exports = router;