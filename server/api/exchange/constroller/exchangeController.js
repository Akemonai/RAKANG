const User = require("../../user/model/User");
const Exchange = require('../../Exchange/model/Exchange');
const ExchangeLog = require("../../log/model/ExchangeLog");
const { fdatasync } = require("fs");
const ExchanceLog = require("../../log/model/ExchangeLog");
const cloudinary = require("cloudinary").v2;
const { resolve } = require("path");

cloudinary.config({
    cloud_name: "koladon52",
    api_key: "413217853994171",
    api_secret: "DOHByZlRxxocIbvEmAzgnvmnv-E",

})


////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.addnewItem = async(req,res) => {
  try{   
    var file = req.files
    const add = new Exchange({
      name   : req.body.name,
      remain : req.body.remain,
      detail : req.body.detail,
      cost   : req.body.cost,
    });
    var data = await add.save()
    if(req.files){
      console.log(file)
      file.forEach(element => {
        console.log(element)
        cloudinary.uploader.upload(element.path, function(err, result){
              var add = {image : result.url, cloudinary : result.public_id}
              data.galleryimage.push(add)
              data.save()
        })
      });  
    }  
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
};


////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.ShowListItem = function(req,res){
  try{
    var result
    Exchange.find({},function(err, exchangelist){
      if(err){
        console.log(err)
      } else {
        console.log('else')
        exchangelist.sort(function(a, b){
          var dateA = new Date(a.cost), dateB = new Date(b.cost);
          return dateB - dateA;
      });
        res.json(exchangelist);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.DetailItem = function(req,res){
  try{
    Exchange.findOne({_id : req.params.id},async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.DeleteItem = function(req,res){
  try{
    Exchange.findOneAndDelete({_id : req.params.id}, async function(err, exchange){
      if(err){
        console.log(err)
      } else {

        exchange.galleryimage.forEach(element => {
          cloudinary.uploader.destroy(element.cloudinary_id);
        }); 

      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

////////////////////////////////////ยังไม่เสร็จ//////////////////////////////////
exports.EditItem = async(req,res) =>{
  try{
    var dataEdit
    var index

    if(req.file){
      if(req.body.deleteimage){

        let this_Item = await Exchange.findById(req.params.id);

        this_Item.galleryimage.forEach(element => {
          var deleteimage = req.body.deleteimage;
          deleteimage.forEach(DelImg => {
            if(element.image == DelImg.image)
            cloudinary.uploader.destroy(DelImg.cloudinary_id);
            this_Item.galleryimage.remove(element)
            this_Item.save()
          })
        })
      } 


      var  file = req.file
        dataEdit = {
          name: req.body.name,
          ramain: req.body.ramain,
          //image: req.file.filename,
          detail : req.body.detail,
          cost : req.body.cost,
        }
        var imagedata
        file.forEach(element =>{
          cloudinary.uploader.upload(element.path, function(err, result){
            imagedata = {
                image : result.url,
                cloudinary_id : result.public_id,             
            }
                dataEdit.galleryimage.push(imagedata)
          })

        })
          Exchange.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, exchange){
            if(err){
              console.log(err)
            } else {
              res.status(201).json({ exchange });
            }
          })
    } else {
      dataEdit = {
          name: req.body.name,
          ramain: req.body.ramain,
          //image: req.body.oldimage,
          detail : req.body.detail,
          cost : req.body.cost,
        }
        Exchange.findOneAndUpdate({_id : req.params.id},dataEdit,function(err, exchange){
          if(err){
            console.log(err)
          } else {
            console.log('success')
            console.log(campaign)
            console.log(dataEdit)
            res.status(201).json({ exchange });
          }
        })
    }
    
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.Purchase = function(req,res){
  try{
    console.log(req.body)
    var NumOfPurchase = req.body.Number
    const NewExchangeLog = new ExchangeLog({
      locationdetail   : req.body.locationdetail,
      District : req.body.District,
      Sub_District : req.body.Sub_District,
      province   : req.body.province,
      postcode   : req.body.postcode
    });
    ExchangeLog.create(NewExchangeLog,function(err,exlog){
        User.findOne({_id:req.params.user},function(err,user){
          Exchange.findOne({_id:req.params.id},function(err,item){
            if(user.point  <   item.cost){
              let message = "แต้มของคุณมีไม่พอ"
              return res.json(message)
            }
            if(item.remain < NumOfPurchase){
              let message = "ขออภัยสินค้าหมด"
              return res.json(message)
            }
              exlog.user = user
              exlog.item = item
              user.point = user.point-item.cost
              
              item.remain = item.remain - NumOfPurchase
              
              item.waitingorder.push(exlog)
              user.exchangelog.push(exlog)
              
              user.save()
              item.save()
              exlog.save()
              return res.json(exlog);
          })
        })
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.ShowOrder = function(req,res){
  try{
    console.log('this')
    Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        return res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.AcceptOrder = function(req,res){
  try{
    var Accepted = req.body.AcceptList;
    var test     = ['df','fdf']
    console.log(req.body.AcceptList)
    console.log(Accepted)
    console.log(test)
    Exchange.findById({_id : req.params.id}.populate({path:"waitingorder" , model : ExchangeLog}),async function(err, exchange){
    // Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        Accepted.forEach(accept => {
          exchange.waitingorder.forEach(order => {
            console.log(accept)
            console.log(order)
            if(order == accept){
              console.log('equal')
              exchange.waitingorder.status = ""
              exchange.waitingorder.remove(order)
              exchange.confirmorder.push(order)

            }
          })
        });
        exchange.save();
        res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.GetUserExchangeLog = function(req,res){
  try{
    console.log('this')
    User.findById(req.params.id).populate({path:"exchangelog" , model : ExchangeLog}).exec(async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        return res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}

exports.GetExchangeLogItem = function(req,res){
  try{
    console.log('this')
    Exchange.findById(req.params.id).populate({path:"waitingorder" , model : ExchangeLog}).populate({path:"confirmorder" , model : ExchangeLog}).exec(async function(err, exchange){
      if(err){
        console.log(err)
      } else {
        return res.json(exchange);
      }
    })
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(err)
  }
}