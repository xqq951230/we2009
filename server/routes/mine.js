const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");
const md5 = require("js-md5");

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



// 注册
router.post("/register", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let querySql = "SELECT * FROM ddys_user WHERE username = ?";
	let insertSql = 'INSERT INTO ddys_user ( nickname, username, password, avatar) VALUES (?, ?, ?, "default-avatar.png")';

	sqlConnect(querySql, [username])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 1, message: "username exits" });
			} else {
				return sqlConnect(insertSql, [`用户${username}`, username, md5(password)]);
			}
		})
		.then((value) => {
			if (value.affectedRows == 1) {
				res.send({ code: 0, message: "注册成功！" });
			} else {
				res.send({ code: 1, message: "注册失败！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 登录
router.post("/login", (req, res) => {
	let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
	let sql = "SELECT * FROM ddys_user WHERE username = ?";
	sqlConnect(sql, [username])
		.then((value) => {
			if (value.length == 0) {
				res.send({ code: 1, message: "用户名不存在" });
			} else if (value[0].password == md5(password)) {
				let { nickname, user_id, username, avatar } = value[0];
				res.send({
					code: 0,
					message: "登录成功！",
					data: { nickname, user_id, username, avatar },
				});
			} else {
				res.send({ code: 1, message: "密码错误！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取问诊订单数量信息
router.get("/getordernum", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT count(1) num
        FROM ddys_order orders
        WHERE orders.user_id = ?;`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value[0] });
			} else {
				res.send({ code: 1, message: "没有查到相关订单！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取订单列表信息
router.get("/getorderlist", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT 
        orders.order_id,
        orders.create_at committime,
        orders.type,
        doctor.nickname,
        doctor.avatar imgurl,
        symptom.description
        FROM ddys_order orders
        INNER JOIN ddys_doctor doctor ON doctor.doctor_id = orders.doctor_id
        INNER JOIN ddys_symptom symptom ON symptom.symptom_id = orders.symptom_id
        WHERE orders.user_id = ?
        ORDER BY orders.order_id DESC;`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有查到相关订单！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取关注数量
router.get("/getfollownum", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT count(1) num
        FROM ddys_follow follow
        WHERE follow.user_id = ?;`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value[0] });
			} else {
				res.send({ code: 1, message: "没有查到相关订单！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取关注医生相关信息
router.get("/getfollowdoctor", (req, res) => {
	let id = req.query.doctorid;
	let sql = `select *
        from ddys_doctor d
        inner join ddys_hospital h on d.hospital_id = h.hospital_id
        inner join ddys_office o on d.office_id = o.office_id
        where d.doctor_id=?`;
	sqlConnect(sql, [id]).then((value) => {
		if (value.length == 0) {
			res.send({ code: 1, message: "没有查到相关信息" });
		} else {
			res.send({ code: 0, message: "ok", data: value });
		}
	});
});

// 获取关注医生id
router.get("/getfollowid", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT doctor_id doctorid
        FROM ddys_follow follow
        WHERE follow.user_id = ?;`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有查到相关订单！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取收藏文章数量
router.get("/getstarnum", (req, res) => {
	let userid = req.query.userid;
	let sql = `SELECT count(1) num
        FROM ddys_star star
        WHERE star.user_id = ?;`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value[0] });
			} else {
				res.send({ code: 1, message: "没有查到相关订单！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取收藏文章id及标题等信息
router.get("/getmystars", (req, res) => {
	let userid = req.query.userid;
    let sql = `SELECT article.article_id articleid,
        article.subject,
        article.description,
        article.img
        FROM ddys_star star
        INNER JOIN ddys_article article ON article.article_id = star.article_id
        WHERE star.user_id = ?;`;
	sqlConnect(sql, [userid])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功！", data: value });
			} else {
				res.send({ code: 1, message: "没有查到收藏文章！" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 修改昵称
router.post("/mine/modifynickname", (req, res) => {
	let userid = req.body.userid;
	let nickname = req.body.nickname;
	let sql = `UPDATE ddys_user SET nickname = ? WHERE user_id = ?`;
	sqlConnect(sql, [nickname, userid])
		.then((value) => {
			return sqlConnect("SELECT * FROM ddys_user WHERE user_id = ?", [userid]);
		})
		.then((value) => {
			let { nickname, user_id, username, avatar } = value[0];
			res.send({ code: 0, message: "修改成功！", data: { nickname, user_id, username, avatar } });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 修改头像
router.post("/mine/modifyavatar", uploadTools.array("uploadFile"), (req, res) => {
	let body = req.body;
	// let desc = req.body.desc;
	let files = req.files;
	let userid = body.userid;
	let imgStr = files[0].filename;
	let sql = "UPDATE ddys_user SET avatar = ? WHERE user_id = ?";

	sqlConnect(sql, [imgStr, userid])
		.then((value) => {
			res.send({ code: 0, message: "添加成功！", data: imgStr });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});


module.exports = router;