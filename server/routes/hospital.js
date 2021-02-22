const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");

// 获得医院经纬度接口
router.get("/getlocation", (req, res) => {
	let hospitalId = req.query.hospitalid;
	let sql = `SELECT longitude, latitude, 
    hospitalname,
    address
    FROM ddys_hospital WHERE
    hospital_id = ?`;
	sqlConnect(sql, [hospitalId])
		.then((value) => {
			if (value.length > 0) {
				res.send({ code: 0, message: "查询成功", data: value[0] });
			} else {
				res.send({ code: 1, message: "没有查到数据" });
			}
		})
		.catch((reason) => res.send({ code: 1, message: `${reason}` }));
});



router.get("/hospital", (req, res) => {
	let id = req.query.id;
	let sql;
	if (!id) {
		sql = "select * from ddys_hospital";
	} else {
		sql = `select * from ddys_hospital where city_id=${id}`;
	}
	sqlConnect(sql).then((value) => {
		if (value.length == 0) {
			res.send({ code: 1, message: "error" });
		} else {
			res.send({ code: 0, message: "ok", data: value });
		}
	});
});
router.get("/details", (req, res) => {
	let id = req.query.hospital;
	let sql = `select *
        from ddys_doctor d
        inner join ddys_hospital h on d.hospital_id = h.hospital_id
        inner join ddys_office o on d.office_id = o.office_id
        where h.hospital_id=?`;
	sqlConnect(sql, [id]).then((value) => {
		if (value.length == 0) {
			res.send({ code: 1, message: "error" });
		} else {
			res.send({ code: 0, message: "ok", data: value });
		}
	});
});

router.get("/subpage", (req, res) => {
	let id = req.query.hospital;
	let sql = "select * from ddys_hospital where hospital_id = ?";
	sqlConnect(sql, [id]).then((value) => {
		if (value.length == 0) {
			res.send({ code: 1, message: "error" });
		} else {
			res.send({ code: 0, message: "ok", data: value[0] });
		}
	});
});

router.get("/addressbar", (req, res) => {
	let sql = "SELECT * FROM ddys_city city INNER JOIN ddys_province prov ON city.province_id = prov.province_id";
	let sql2 = "select * from ddys_province";
	Promise.all([sqlConnect(sql), sqlConnect(sql2)]).then((value) => {
		if (value.length == 0) {
			res.send({ code: 1, message: "error" });
		} else {
			res.send({ code: 0, message: "ok", data: value });
		}
	});
});

module.exports = router;