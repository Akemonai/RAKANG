<template>
  <div class="login">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br />
    <v-overlay :value="isloading">
        <v-progress-circular
        indeterminate
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
      <v-btn style="margin-left: 5%;" @click="$router.back()"><i style="float:left;" class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></v-btn>
    <div class="head-fill"><h1>กรอกที่อยู่ในการจัดส่ง</h1></div>
    <div v-if="addressUser == null" class="container">
      <h1 class="head">ที่อยู่จัดส่ง</h1>
      <hr>
      <!-- <v-checkbox
              v-model="ex4"
              label="ใช้ที่อยู่ปัจจุบัน"
              color="success"
              value="success"
              hide-details
            ></v-checkbox> -->
        <form
         @submit.prevent="confirmAddress">
        <v-row>
          <v-col cols="12" md="6" sm="12">
              <label for="name">ชื่อ-นามสกุล</label><br>
              <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="name"
                v-model="newAddressUser.name"
                type="text"
                required
            >
          </v-col>
          <v-col cols="12" md="6" sm="12">
              <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                v-model="newAddressUser.phone"
                type="text"
                required
            >
          </v-col>
           <v-col cols="12" md="12" sm="12">
            <label for="phone">ที่อยู่</label>
            <v-textarea
              clearable
              v-model="newAddressUser.address"
              solo
              filled
              auto-grow
              clear-icon="mdi-close-circle"
              label="46 หมู่ 4 ถนน......."
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4" sm="6">
              <ThailandAutoComplete
            required
            v-model="newAddressUser.district"
            type="district"
            @select="select"
            label="แขวง/ตำบล"
            color="#42b883"
            size="default"
            placeholder="แขวง/ตำบล..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="newAddressUser.amphoe" type="amphoe" @select="select" label="เขต/อำเภอ" placeholder="เขต/อำเภอ..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="newAddressUser.province" type="province" @select="select" label="จังหวัด" color="#35495e" placeholder="จังหวัด..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="newAddressUser.zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/>
          </v-col>
         
        </v-row>
         <div class="btn"><v-btn color="success" type="submit">ยืนยันสินค้า</v-btn></div>
        </form>
    </div>

    <v-radio-group
      v-model="selectAddress"
      v-if="addressUser != null"
      mandatory
    >
    <div v-if="addressUser != null" class="container">
      <h1 class="head">ที่อยู่ปัจจุบัน</h1>
      <hr>
      <v-radio
        color="success"
        label="ใช้ที่อยู่ปัจจุบัน"
        :value="false"
      ></v-radio>
      <!-- <v-checkbox
              v-model="ex4"
              label="ใช้ที่อยู่ปัจจุบัน"
              color="success"
              value="success"
              hide-details
            ></v-checkbox> -->
        <v-row>
          <v-col cols="12" md="6" sm="12">
              <label for="name">ชื่อ-นามสกุล</label><br>
              <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                disabled
                v-model="addressUser.name"
                name="name"
                type="text"
                required
            >
          </v-col>
          <v-col cols="12" md="6" sm="12">
              <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                type="text"
                disabled
                v-model="addressUser.phone"
                required
            >
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <label for="phone">ที่อยู่</label>
            <v-textarea
              clearable
              v-model="addressUser.locationdetail"
              solo
              disabled
              filled
              auto-grow
              clear-icon="mdi-close-circle"
              label="46 หมู่ 4 ถนน......."
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <label>แขวง/ตำบล</label>
              <input
            required
            v-model="addressUser.Sub_District"
            :style="{ 'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'}"
            disabled
            type="text"
            
            placeholder="แขวง/ตำบล..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <label>เขต/อำเภอ</label>
            <input :style="{ 'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'}" required disabled v-model="addressUser.District" type="text" placeholder="เขต/อำเภอ..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <label>จังหวัด</label>
            <input :style="{ 'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'}" required disabled v-model="addressUser.province" type="text" placeholder="จังหวัด..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <label>รหัสไปรษณีย์</label>
            <input :style="{ 'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'}" required disabled v-model="addressUser.postcode" type="text" placeholder="รหัสไปรษณีย์..."/>
          </v-col>
        </v-row>
         <div class="btn"><v-btn v-if="!selectAddress" color="success" @click="confirmAddress" type="submit">ยืนยันสินค้า</v-btn></div>
    </div>

    <div v-if="addressUser != null" class="container">
      <h1 class="head">เปลี่ยนที่อยู่ในการจัดส่ง</h1>
      <hr>
      <v-radio
        color="success"
        label="ใช้ที่อยู่ใหม่"
        :value="true"
      ></v-radio>
      <!-- <v-checkbox
              v-model="ex4"
              label="ใช้ที่อยู่ใหม่"
              color="success"
              value="success"
              hide-details
            ></v-checkbox> -->
        <v-row>
          <v-col cols="12" md="6" sm="12">
              <label for="name">ชื่อ-นามสกุล</label><br>
              <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="name"
                v-model="newAddressUser.name"
                type="text"
                required
            >
          </v-col>
          <v-col cols="12" md="6" sm="12">
              <label for="phone">เบอร์โทรศัทพ์</label><br>
            <input
                :style="{
                    'border': hasFocus && currentColor !== '#f5f5f5' ? 'solid 1px ' + currentColor : 'solid 1px #d3d3d3'
                }"
                name="phone"
                v-model="newAddressUser.phone"
                type="text"
                required
            >
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <label for="phone">ที่อยู่</label>
            <v-textarea
              clearable
              v-model="newAddressUser.address"
              solo
              filled
              auto-grow
              clear-icon="mdi-close-circle"
              label="46 หมู่ 4 ถนน......."
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4" sm="6">
              <ThailandAutoComplete
            required
            v-model="newAddressUser.district"
            type="district"
            @select="select"
            label="แขวง/ตำบล"
            color="#42b883"
            size="default"
            placeholder="แขวง/ตำบล..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="newAddressUser.amphoe" type="amphoe" @select="select" label="เขต/อำเภอ" placeholder="เขต/อำเภอ..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="newAddressUser.province" type="province" @select="select" label="จังหวัด" color="#35495e" placeholder="จังหวัด..."/>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <ThailandAutoComplete required v-model="newAddressUser.zipcode" type="zipcode" @select="select" label="รหัสไปรษณีย์" color="#00a4e4" placeholder="รหัสไปรษณีย์..."/>
          </v-col>
          
        </v-row>
         <div class="btn"><v-btn v-if="selectAddress" color="success" @click="confirmAddress" type="submit">ยืนยันสินค้า</v-btn></div>
    </div>
    </v-radio-group>
    <br />
    <br />
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import("@/components/navbar/navbar");
import swal from "sweetalert2";
export default {
    components: {
        Navbar,
        Footer
    },
    data () {
        return {
            addressUser:null,
            newAddressUser:{
              name: '',
              phone: '',
              address: '',
              district: '',
              amphoe: '',
              province: '',
              zipcode: ''
            },
            selectAddress: null,
            isloading: false,
        }
    },
    methods: {
    select(address) {
      this.newAddressUser.district = address.district
      this.newAddressUser.amphoe = address.amphoe
      this.newAddressUser.province = address.province
      this.newAddressUser.zipcode = address.zipcode
    },
    select2(address) {
      this.addressUser.Sub_District = address.district
      this.addressUser.District = address.amphoe
      this.addressUser.province = address.province
      this.addressUser.postcode = address.zipcode
    },
    async confirmAddress(){
      try {
        this.isloading = true
        const formData = new URLSearchParams()
        if(this.selectAddress == true){
          if(this.newAddressUser.name == '' || this.newAddressUser.phone == '' || this.newAddressUser.district == '' || this.newAddressUser.amphoe == '' || this.newAddressUser.province == '' || this.newAddressUser.zipcode == '' || this.newAddressUser.address == ''){
            swal.fire("เกิดข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
            this.isloading = false
          } else{
            formData.append('name', this.newAddressUser.name)
            formData.append('phone', this.newAddressUser.phone)
            formData.append('locationdetail', this.newAddressUser.address)
            formData.append('Sub_District', this.newAddressUser.district)
            formData.append('District', this.newAddressUser.amphoe)
            formData.append('province', this.newAddressUser.province)
            formData.append('postcode', this.newAddressUser.zipcode)
            formData.append('savelocation', this.selectAddress)
            console.log(formData)
        swal.fire({
                title: 'คุณแน่ใจแล้วใช่ไหมว่าที่อยู่จัดส่งถูกต้อง',
                icon: 'question',
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                showCancelButton: true,
                confirmButtonText: `ใช่`,
                cancelButtonText: `ไม่ใช่`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let suscess = this.$http.post("/exchangeitem/DetailItem/"+this.$route.params.id+"/Perchase/"+this.$route.params.userID, formData);
                    console.log(suscess);
                    if (suscess) {
                        this.$router.push({ name: 'Home'})
                        swal.fire("สำเร็จ", "แลกของรางวัลเรียบร้อยแล้ว", "success");
                        console.log('success')
                    } else {
                        this.isloading = false
                        swal.fire("Error", "Something Went Wrong", "error");
                        console.log('error')
                    }
                } else { this.isloading = false }
            })
          }
        } else{
          if(this.addressUser.name == '' || this.addressUser.phone == '' || this.addressUser.locationdetail == '' || this.addressUser.Sub_District == '' || this.addressUser.District == '' || this.addressUser.province == '' || this.addressUser.postcode == ''){
            swal.fire("เกิดข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
            this.isloading = false
          } else{
            formData.append('name', this.addressUser.name)
            formData.append('phone', this.addressUser.phone)
            formData.append('locationdetail', this.addressUser.locationdetail)
            formData.append('Sub_District', this.addressUser.Sub_District)
            formData.append('District', this.addressUser.District)
            formData.append('province', this.addressUser.province)
            formData.append('postcode', this.addressUser.postcode)
            formData.append('savelocation', this.selectAddress)
            console.log(formData)
        swal.fire({
                title: 'คุณแน่ใจแล้วใช่ไหมว่าที่อยู่จัดส่งถูกต้อง',
                icon: 'question',
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                showCancelButton: true,
                confirmButtonText: `ใช่`,
                cancelButtonText: `ไม่ใช่`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let suscess = this.$http.post("/exchangeitem/DetailItem/"+this.$route.params.id+"/Perchase/"+this.$route.params.userID, formData);
                    console.log(suscess);
                    if (suscess) {
                        this.$router.push({ name: 'Home'})
                        swal.fire("สำเร็จ", "แลกของรางวัลเรียบร้อยแล้ว", "success");
                        console.log('success')
                    } else {
                        this.isloading = false
                        swal.fire("Error", "Something Went Wrong", "error");
                        console.log('error')
                    }
                } else { this.isloading = false }
            })
          }
        }
        } catch (err) {
          this.isloading = false
          let error = err.response;
          if (error.status == 409) {
              swal.fire("Error", error.data.message, "error");
              console.log('success')
          } else {
              swal.fire("Error", error.data.err.message, "error");
              console.log('error')
            }
        }
    }
  },
  mounted: async function mounted() {
    await this.$http
      .get("/user/" + this.$route.params.userID)
      .then((res) => {
        console.log(res.data)
        console.log(res.data.userlocation)
        if(res.data.userlocation.name == ''){
          this.selectAddress = true
          this.addressUser = null
        } else {
          this.selectAddress = false
          this.addressUser = res.data.userlocation
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
}
</script>

<style scoped>
.head-fill{
  display: flex;
  justify-content: center;
  align-items: center;
}
.container{
   margin-top:30px;
  display: grid;
  width: 60%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

.head{
  font-weight: 400;
  font-size: 36px;
}
.btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type=text]{
  width: 100%;
  padding: 4px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
#border-login {
  width: 500px;
  box-shadow: 5px 6px 5px #888888;
  background-color: white;
}
@media screen and (max-width: 400px) {
  #border-login {
    width: 350px;
  }
}

</style>