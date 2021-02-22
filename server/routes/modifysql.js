const express = require("express");
const router = express.Router();
const sqlConnect = require("./public");

// // 批量更改数据库接口
// router.get('/settime', (req, res)=>{
//     let sql = 'UPDATE ddys_user SET username = ?, avatar = ? WHERE user_id = ?;'
//     let arr = []
//     for(var i = 1; i<174; i++){
//         arr[i] = i + 1;
//     }
//     let promises = arr.map((item,index)=>{
//         let userid = 18700000000 + parseInt(Math.random()*99999999) + ''

//         let avatar = item + '.jpg'

//         // num = String(num)
//         // console.log(num)
//         return sqlConnect(sql, [userid, avatar, item])
//     })
//     Promise.all(promises)
//     .then(value=>{
//         console.log(value)
//     })
// })

module.exports = router;