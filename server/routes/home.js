const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");

// 获取首页文章信息
router.get("/queryarticle", (req, res) => {
	// let start = parseInt(Math.random() * 500)
	sqlConnect("SELECT * FROM ddys_article LIMIT 3")
		.then((value) => {
			res.send({ code: 0, message: "查询成功！", data: value });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取首页问题分类
router.get("/querydisease", (req, res) => {
	// let start = parseInt(Math.random() * 500)
	sqlConnect("SELECT * FROM ddys_disease LIMIT 7")
		.then((value) => {
			res.send({ code: 0, message: "查询成功！", data: value });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

// 获取首页问题信息
router.get("/queryquestion", (req, res) => {
	let diseaseid = req.query.diseaseid;
	sqlConnect(
		`SELECT 
        ques.question_id quesid,
        ques.content 'describe',
        ques.create_at committime,
        user.avatar imgurl,
        user.nickname nickname
        FROM ddys_question ques
        INNER JOIN ddys_user user ON ques.user_id = user.user_id
        WHERE ques.disease_id = ?
        LIMIT 3`,
		[diseaseid]
	)
		.then((value) => {
			res.send({ code: 0, message: "查询成功！", data: value });
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});

module.exports = router;