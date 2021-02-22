const express = require("express");
const app = express();
const router = express.Router();
const sqlConnect = require("./public");

// 查询用户是否收藏该文章
router.get('/queryisstared', (req, res)=>{
    let articleid = req.query.articleid;
    let userid = req.query.userid;
    let sql = `SELECT count(1) num FROM ddys_star WHERE article_id = ? AND user_id = ?`
    sqlConnect(sql, [articleid, userid]).then(value=>{
        res.send({ code: 0, message: "查询成功", data: value[0] })
    }).catch((reason) => res.send({ code: 1, message: `${reason}` }));
})

// 收藏文章
router.post('/gotostar', (req, res)=>{
    let articleid = req.body.articleid;
    let userid = req.body.userid;
    let sql = `INSERT INTO ddys_star (article_id, user_id) VALUES (?, ?)`
    sqlConnect(sql, [articleid, userid]).then(value=>{
        res.send({ code: 0, message: "收藏成功！" })
    }).catch((reason) => res.send({ code: 1, message: `${reason}` }));
})

// 取消收藏文章
router.post('/canclestar', (req, res)=>{
    let articleid = req.body.articleid;
    let userid = req.body.userid;
    let sql = `DELETE FROM ddys_star WHERE article_id = ? AND user_id = ?`
    sqlConnect(sql, [articleid, userid]).then(value=>{
        res.send({ code: 0, message: "取消收藏成功！" })
    }).catch((reason) => res.send({ code: 1, message: `${reason}` }));
})

//jkbk页面挂载后请求所有健康类别 url: /jkbk  get,返回{code:0,message:"success",data:result}
router.get('/jkbk',(req,res)=>{
    let sql='select * from ddys_category'
    sqlConnect(sql).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
//jk页面挂载后拿全部文章数据 /jk get 返回{code:0,message:"success",data:result}
router.get('/articleAll',(req,res)=>{
    let id=req.query.id
    let sql=`SELECT *FROM ddys_article RIGHT JOIN ddys_category_title ON ddys_article.category_title_id = ddys_category_title.id WHERE ddys_category_title.category_id = ?`
    sqlConnect(sql,[id]).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
//jk页面挂载后接受url地址栏参数并发送请求获取导航名称 /jk get 返回{code:0,message:"success",data:result}
router.get('/jk',(req,res)=>{
    let id=req.query.id
    let sql=`SELECT
    ddys_category.name,
    ddys_category_title.id,
    ddys_category_title.title_content
    FROM ddys_category RIGHT JOIN ddys_category_title ON ddys_category.category_id = ddys_category_title.category_id WHERE ddys_category_title.category_id = ?`
    sqlConnect(sql,[id]).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
//jk页面挂载后根据地址栏参数请求后台获取相关疾病 /relatedDiseases get返回{code:0,message:"success",data:result}
router.get('/relatedDiseases',(req,res)=>{
    let id=req.query.id
    let page=req.query.page
    let val=15
    let pageval=(page-1)*val
    let sql=`SELECT ddys_disease.disease_id,ddys_disease.name, ddys_office.office_id FROM
  ddys_office RIGHT JOIN ddys_disease ON ddys_office.office_id = ddys_disease.office_id WHERE ddys_office.category_id =? LIMIT ?,?`
    sqlConnect(sql,[id,pageval,val]).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
//Article页面挂载后拿到文章id 请求文章详情 /articleData  get 返回{code:0,message:"success",data:result}
router.get('/articleData',(req,res)=>{
    let id=req.query.id
    let sql=`SELECT content, subject FROM ddys_article WHERE article_id=?`
    sqlConnect(sql,[id]).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
//head页面筛选请求医生信息 /doctoritem post 返回{code:0,message:"success",data:result}
router.post('/doctoritem',(req,res)=>{
    let arry=Object.values(req.body)
    let sql=""
    if(arry.length==2){
        sql=`SELECT
        ddys_hospital.hospitalname,
        ddys_hospital.hospitallevel,
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
        ddys_office.office_name
        FROM
        ddys_hospital
        INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
        INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
        WHERE
        ddys_office.office_id = ? AND ddys_doctor.level = ?`
    }else if(arry.length==3){
        sql=`SELECT
        ddys_hospital.hospitalname,
        ddys_hospital.hospitallevel,
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
        ddys_office.office_name
        FROM
        ddys_hospital
        INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
        INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
        WHERE
        ddys_office.office_id = ? AND  ddys_doctor.ask_price >= ? AND ddys_doctor.ask_price <=?`
    }else{
        sql=`SELECT
        ddys_hospital.hospitalname,
        ddys_hospital.hospitallevel,
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
        ddys_office.office_name
        FROM
        ddys_hospital
        INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
        INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
        WHERE
        ddys_office.office_id = ? AND ddys_doctor.ask_price >= ? AND ddys_doctor.ask_price <=? AND ddys_doctor.level = ?`
    }
    sqlConnect(sql,arry).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
  //head页面综合排序请求医生信息 /doctoritemDESC post 返回{code:0,message:"success",data:result}
  router.post('/doctoritemDESC',(req,res)=>{
    let value=req.body.value
    let officeID=req.body.officeID
    let sql=""
    if(value==0){
        sql=`SELECT
        ddys_hospital.hospitalname,
        ddys_hospital.hospitallevel,
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
        ddys_office.office_name
        FROM
        ddys_hospital
        INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
        INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
        WHERE
        ddys_office.office_id = ?`
    }else if(value=="ask_price_ASC"){
        sql=`SELECT
        ddys_hospital.hospitalname,
        ddys_hospital.hospitallevel,
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
        ddys_office.office_name
        FROM
        ddys_hospital
        INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
        INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
        WHERE
        ddys_office.office_id = ? ORDER BY ddys_doctor.${value.slice(0,-4)}`
    }else{
        sql=`SELECT
        ddys_hospital.hospitalname,
        ddys_hospital.hospitallevel,
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
        ddys_office.office_name
        FROM
        ddys_hospital
        INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
        INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
        WHERE
        ddys_office.office_id = ? ORDER BY ddys_doctor.${value} DESC`
    }
    sqlConnect(sql,[officeID]).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
  //head页面用地区筛选符合条件的医生 /cityclick post 返回{code:0,message:"success",data:result}
  router.post("/cityclick",(req,res)=>{
    let arry=Object.values(req.body)
    let sql=`SELECT
    ddys_hospital.hospitalname,
    ddys_hospital.hospitallevel,
    ddys_office.office_name,
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
    ddys_doctor.prescription
    FROM
    ddys_doctor
    INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
    INNER JOIN ddys_hospital ON ddys_doctor.hospital_id = ddys_hospital.hospital_id
    WHERE
    ddys_office.office_id = ? AND
    ddys_hospital.city_id = ?`
    sqlConnect(sql,arry).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
  
  //head页面挂载后获取所有科室/officeAll get  返回{code:0,message:"success",data:result}
  router.get('/officeAll',(req,res)=>{
    let sql='select * from ddys_office'
    sqlConnect(sql).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })
  //head页头根据科室筛选所有医生信息 /officeItem post 返回{code:0,message:"success",data:result}
  router.post('/officeItem',(req,res)=>{
    let id=req.body.officeItem
    let sql=`SELECT
    ddys_hospital.hospitalname,
    ddys_hospital.hospitallevel,
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
    ddys_office.office_name
    FROM
    ddys_hospital
    INNER JOIN ddys_doctor ON ddys_hospital.hospital_id = ddys_doctor.hospital_id
    INNER JOIN ddys_office ON ddys_doctor.office_id = ddys_office.office_id
    WHERE
    ddys_office.office_id = ?`
    sqlConnect(sql,[id]).then(valve=>{
        res.send({code:0,message:"success",data:valve});
    })
  })

  module.exports = router;