const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");

//文章详情
router.get('/yyy', (req, res) => {
    let disease_id = req.query.disease_id
    let office_id = req.query.office_id
    let sql = `select * from ddys_disease where disease_id=${disease_id}`
    let sql2 = `SELECT
            d.doctor_id,
            d.nickname,
            d.avatar,
            d.office_id,
            d.level,
            d.hospital_id,
            d.direction,
            d.respond,
            d.answer,
            d.prescription,
            h.hospitalname,
            h.hospitallevel,
            o.office_id,
            o.office_name
            FROM
            ddys_doctor AS d
            INNER JOIN ddys_hospital AS h ON d.doctor_id = h.hospital_id
            INNER JOIN ddys_office AS o ON d.office_id = o.office_id
            WHERE
            d.office_id = ?
            LIMIT 0, 1`
    sqlConnect(sql)
    .then(results=>{
        if (results.length) { // 有数据
            var disease = results[0];
            //判断是否有文章数据如果没有返回数据
            if (disease.description == null) {
                res.send({ code: 1, message: 'No Data' })
                return;
            }
            // 有数据则获取文章json字符串,并转换成json对象
            disease.description = JSON.parse(disease.description).article
            //删除暂时没用的就诊数据 
            disease.description.splice(7, 1)

            return sqlConnect(sql2, [office_id])
            .then(result2=>{
                if (result2.length) { // 医生名片有数据
                    res.send({ code: 0, message: 'OK', data: { disease, result2: result2[0] } })
                } else {// 医生名片没有有数据
                    res.send({ code: 0, message: 'OK', data: { disease, result2: 'NO Data' } })
                }
            })
        }else { // 没有数据
            res.send({ code: 1, message: 'No Data' })
        }
    })
})



//获取科室数据
router.get("/consult", (req, res) => {
    let sql = `select * from ddys_office`;
    sqlConnect(sql).then(results=>{
        if (results.length) {
			// 有数据
			res.send({ code: 0, message: "OK", data: results });
		} else {
			// 没有数据
			res.send({ code: 1, message: "No Data" });
		}
    })

});

//获取对应科室的疾病名称
router.get("/consultId", (req, res) => {
	let office_id = req.query.office_id;
    let sql = `select disease_id,name,office_id,index_name,tag_category_id from ddys_disease where office_id=?`;
    sqlConnect(sql, [office_id]).then(results=>{
        if (results.length) {
			// 有数据
			res.send({ code: 0, message: "OK", data: results });
		} else {
			// 没有数据
			res.send({ code: 1, message: "No Data" });
		}
    })

});


router.get("/disease", (req, res) => {
	let id = req.query.id;
	let sql = `select *
    from ddys_disease d 
    inner join ddys_office o on o.office_id=d.office_id
    where d.office_id=? limit 10;`;
	sqlConnect(sql, [id])
		.then((value) => {
			if (value.length) {
				res.send({ code: 0, message: "OK", data: value });
			} else {
				res.send({ code: 1, message: "NO Data" });
			}
		})
		.catch((reason) => res.send({ reason: `${reason}` }));
});

router.get("/comment", (req, res) => {
	let id = req.query.id;
	let sql = `select * from ddys_comment where doctor_id=? LIMIT 3`;
	sqlConnect(sql, [id])
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