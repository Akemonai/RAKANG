<template>
  <div>
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
          <v-overlay :value="isupload">
        <v-progress-circular
        indeterminate
         size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
    <v-container>
      <v-row>
        <v-col class="pad0" cols="12" md="4" sm="12">
          <!-- class="name-picture" -->
          <v-row>
            <v-card-text class="border-cardtext">
              <v-col class="name-pic-pro" cols="12" md="12" sm="12">
                <div class="edit-profile"></div>
                <center>
                  <div
                    v-if="
                      selected == 'โปรไฟล์' ||
                        selected == 'ประวัติการบริจาค' ||
                        selected == 'บุ๊คมาค'
                    "
                    class="image-profile"
                  >
                    <img :src="Profile.image" />
                  </div>
                </center>

                <center>
                  <div v-if="selected == 'แก้ไขโปรไฟล์'" class="image-profile">
                    <!-- <div class="font-z">แก้ไขรูปภาพ</div> -->
                    <div @click="chooseImage" class="icon-edit"><i class="fa fa-pencil" aria-hidden="true"></i></div>
                    
                    <center>
                      
                      <v-div
                        class="base-image-input"
                        :style="{ 'background-image': `url(${imageData})` }"
                        @click="chooseImage"
                      >
                        <span v-if="!imageData" class="placeholder"
                          >Choose an Image</span
                        >
                        <input
                          class="file-input"
                          id="file-input"
                          ref="fileInput"
                          type="file"
                          @input="onSelectFile"
                        />
                      </v-div>
                    </center>
                  </div>
                 </center>
                <hr />
                <div class="name">
                  <center>
                    <div class="name-profile">
                      {{ Profile.firstname }} {{ Profile.lastname }}
                    </div>
                    <div>
                      <span class="sub-head">แต้มบุญ:</span> {{ Profile.point }}
                    </div>
                  </center>
                  <div class="btn-cpass">
                    <v-btn
                      class="e-profile"
                      v-if="
                        selected == 'โปรไฟล์' ||
                          selected == 'ประวัติการบริจาค' ||
                          selected == 'บุ๊คมาค'
                      "
                      @click="onChange('แก้ไขโปรไฟล์')"
                      color="secondary"
                      >แก้ไขโปรไฟล์</v-btn
                    >
                    <br />
                    <v-btn @click.stop="dialog_ChangePassword = true"
                      >เปลี่ยนรหัสผ่าน</v-btn
                    >
                    <ChangePassword
                      :visible="dialog_ChangePassword"
                      @close="dialog_ChangePassword = false"
                    />
                  </div>
                </div>
              </v-col>
              <hr class="hr-hide" />
            </v-card-text>
          </v-row>
        </v-col>
        <v-col cols="12" md="8" sm="12" v-if="selected == 'แก้ไขโปรไฟล์'">
          <v-card>
            <v-toolbar flat color="#cfd6ea" dark> </v-toolbar>
            <v-container>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="EditProfile"
              >
                <v-container>
                  <h6 class="head-profile">
                    Edit Profile
                  </h6>

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">ชื่อ</p>
                      <v-text-field
                        single-line
                        solo
                        onkeypress="return event.charCode != 32"
                        v-model="editfirstname"
                        :rules="firstnameRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">นามสกุล</p>
                      <v-text-field
                        single-line
                        solo
                        onkeypress="return event.charCode != 32"
                        v-model="editlastname"
                        :rules="lastnameRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">วัน/เดือน/ปีเกิด</p>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            single-line
                            solo
                            v-model="Profile.birthdate"
                            prepend-icon="mdi-calendar"
                            :rules="dateRules"
                            readonly
                            required
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="Profile.birthdate"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600">เบอร์โทรติดต่อ</p>
                      <v-text-field
                        single-line
                        solo
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        v-model="Profile.phone"
                        :rules="phoneRules"
                        required
                      ></v-text-field>
                    </div>

                    <v-row>
                      <v-col cols="3"></v-col>
                      <v-col cols="3">
                        <v-btn
                          type="submit"
                          style="margin:1%; text-align:center;"
                          @click="onChange('โปรไฟล์')"
                          color="error"
                          dark
                          >Cancel</v-btn
                        >
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          :disabled="!valid"
                          type="submit"
                          style="margin:1% text-align:center;"
                          color="primary"
                          @click="validate"
                        >
                          Edit
                        </v-btn>
                      </v-col>
                      <v-col cols="3"></v-col>
                    </v-row>
                  </div>
                </v-container>
              </v-form>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" sm="12" v-else>
          <v-card>
            <v-toolbar flat color="#cfd6ea" dark> </v-toolbar>
            <v-tabs>
              <v-tab>
                โปรไฟล์
              </v-tab>
              <v-tab>
                ประวัติการบริจาค
              </v-tab>
              <v-tab>
               ประวัติการแลกของ
              </v-tab>
              <v-tab>
                หลักธรรมที่บันทึก
              </v-tab>
              <!-- โปรไฟล์  -->
              <v-tab-item>
                <v-card flat>
                <v-container>
                  <div class="head-profile">โปรไฟล์ของฉัน</div>
                  <center>
                    <img
                      class="img-rank"
                      :src="
                        'http://localhost:8080/image/rank/' +
                          Profile.Rank +
                          '.png'
                      "
                    />
                  </center>

                  <hr />

                  <div class="row">
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600 sub-head">อีเมลสำหรับล็อกอิน</p>
                      <h6 class="text-muted f-w-400">
                        {{ Profile.email }}
                      </h6>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600 sub-head">เบอร์โทรติดต่อ</p>
                      <h6 class="text-muted f-w-400">
                        {{ Profile.phone }}
                      </h6>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600 sub-head">วัน/เดือน/ปีเกิด</p>
                      <h6 class="text-muted f-w-400">
                        {{ Profile.birthdate }}
                      </h6>
                    </div>
                    <div class="col-sm-6">
                      <p class="m-b-10 f-w-600 sub-head">แต้มสะสม</p>
                      <h6 class="text-muted f-w-400">
                        {{ Profile.point }}
                      </h6>
                    </div>
                  </div>
                </v-container>
                </v-card>
              </v-tab-item>
              <!-- โปรไฟล์ -->
              <!-- ประวัติการบริจาค  -->
              <v-tab-item>
                <v-card flat>
                  <v-container>
                    <div class="head-profile">ประวัติการบริจาค</div>
                    <v-card>
                      <v-data-table
                        :headers="headers"
                        :items="filteredList"
                        :items-per-page="pagination.rowsPerPage"
                        hide-default-footer
                        class="elevation-1"
                      ></v-data-table>
                      <v-pagination
                        circle
                        :total-visible="7"
                        v-model="pagination.page"
                        :length="pages"
                      ></v-pagination>
                    </v-card>
                  </v-container>
                </v-card>
              </v-tab-item>
              <!-- ประวัติการบริจาค  -->
              <!-- ประวัติการแลกของ  -->
              <v-tab-item>
                <v-card flat >
                  <v-container>
                    <div class="head-profile">ประวัติการแลกของ</div>
                    <v-card>
                      <v-data-table
                        :headers="headers2"
                        :items="filteredList1"
                        :items-per-page="pagination1.rowsPerPage"
                        hide-default-footer
                        class="elevation-1"
                      ></v-data-table>
                      <v-pagination
                        circle
                        :total-visible="7"
                        v-model="pagination1.page"
                        :length="pages1"
                      ></v-pagination>
                    </v-card>
                  </v-container>
                </v-card>
              </v-tab-item>
              <!-- ประวัติการแลกของ  -->
              <!-- หลักธรรมที่บันทึก  -->
              <v-tab-item>
                <v-card flat
                  ><v-container>
                    <div class="block latestPostBlock">
                      <v-container>
                        <div class="head-profile">หลักธรรมที่บันทึก</div>
                         <div class="no-data" v-if="Bookmarks.length == 0"><h1>"ไม่มีหลักธรรมที่บันทึก"</h1></div>
                        <v-row>
                          <v-col
                            v-for="Bookmark in Bookmarks"
                            :key="Bookmark.id"
                            cols="12"
                            md="4"
                          >
                            <v-card
                              class="doctrine-card"
                              max-width="344"
                              outlined
                              @click="ViewDoctrine(Bookmark._id)"
                            >
                              <v-img
                                class="mx-auto"
                                :src="Bookmark.image"
                              ></v-img>
                              <v-list-item three-line>
                                <v-list-item-content>
                                  <div class="overline mb-4">
                                    {{ Bookmark.categories }}
                                  </div>
                                  <v-list-item-title class="headline mb-1">
                                    {{ Bookmark.title }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle
                                    v-html="Bookmark.content"
                                    >{{
                                      Bookmark.content
                                    }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-pagination
                          v-if="Bookmarks.length > 0"
                          circle
                          :total-visible="7"
                          v-model="pagination.page"
                          :length="pages"
                        ></v-pagination>
                      </v-container>
                    </div>
                  </v-container>
                </v-card>
              </v-tab-item>
              <!-- หลักธรรมที่บันทึก  -->
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChangePassword from "@/components/profile/changePassword";
const Navbar = () => import("@/components/navbar/navbar");
import moment from "moment";
// import a from '../../../public/image/outline_add_photo_alternate_black_24dp.png'
const id = window.localStorage.getItem("user_id");
import swal from "sweetalert2";
export default {
  name: "test",

  components: {
    ChangePassword,
    Navbar,
  },
  data() {
    return {
      items: ["โปรไฟล์", "ประวัติการบริจาค", "บุ๊คมาค"],
      selected: "โปรไฟล์",
      Bookmarks: [],
      dialog_ChangePassword: false,
      Log: [],
      ExchangeLog:[],
      Profile: {},
      imageData: null,
      isloading: true,
      isupload:false,
      valid: false,
      dataEdit: {
        image: null,
        imagepath: "",
        newimage: null,
        oldimage: "",
      },
      editfirstname:"",
      editlastname:"",

      emailRules: [
        (v) => !!v || "Email is required!",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length >= 6 || "Name must be more than 6 characters",
        (v) => v.length <= 12 || "Name must be less than 12 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Name must be more than 6 characters",
        (v) => v.length <= 12 || "Name must be less than 12 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required!",
        (v) => v.length <= 50 || "Name must be less than 50 characters",
      ],
      firstnameRules: [
        (v) => !!v || "Firstname is required!",
        (v) => v.length <= 50 || "Firstname must be less than 50 characters",
      ],
      lastnameRules: [
        (v) => !!v || "Lastname is required!",
        (v) => v.length <= 50 || "lastname must be less than 50 characters",
      ],
      dateRules: [(v) => !!v || "Birthdate is required!"],
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => v.length == 10 || "Phone must be 10 numbers",
      ],
      pagination:{
                data: null,
                rowsPerPage: 10,
                page: 1,
            },
      pagination1:{
                data: [],
                rowsPerPage: 10,
                page: 1,
            },
            totalNumberOfItems: this.$store.getters.banana.length,
            headers: [
                {
                    text: 'ชื่อแคมเปญ',
                    sortable: false,
                    value: 'CampaignName'
                },
                { text: 'จำนวนเงิน', value: 'amount' },
                { text: 'วัน-เดือน-ปี', value: 'date' }
                
            ],
            headers2: [
                { text: 'ชื่อของรางวัล', sortable: false,  value: 'item.name'},
                { text: 'วัน-เดือน-ปี', value: 'date' },
                { text: 'สถานะ',sortable: false, value: 'status' },
                { text: 'trackings-id', value: 'trackings_id' },
                
            ]
      }


    },
    mounted: async function mounted(){
      const token = window.localStorage.getItem("user_token");
      const id = window.localStorage.getItem("user_id");
      if (token) {
      try {
        this.forceRerender();
      } catch (err) {
        console.log(err);
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
      }
    }
    console.log(id);
    await this.$http
      .get("/exchangeitem/GetUserExchangeLog/" + id)
      .then((res) => {
        this.ExchangeLog = res.data;
        console.log(this.ExchangeLog);
        this.pagination1.data = this.ExchangeLog.exchangelog;
        console.log(this.pagination1.data)

      })
      .catch(function(err) {
        console.log(err);
      });
    await this.$http
      .get("/user/" + id)
      .then((res) => {
        this.Profile = res.data;
        this.editfirstname = this.Profile.firstname,
        this.editlastname = this.Profile.lastname,
        this.dataEdit.oldimage = res.data.image;
        this.imageData = res.data.image;

        console.log("get user data");
        console.log(this.Profile);
        console.log(this.Profile.exchangelog[0]._id)
      })
      .catch(function(err) {
        console.log(err);
      });
    await this.$http
      .get("donatelog/donateloguser/" + id)
      .then((res) => {
        console.log("get log");
        this.pagination.data = res.data.donatelog;
        this.isloading = false;
        var i = 0;
        for (this.pagination.data[i]; ; i++) {
          this.pagination.data[i].date = moment(
            this.pagination.data[i].date
          ).format(" DD-MM-YYYY HH:mm A");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    await this.$http
      .get("/doctrine/ShowFavDoctrine/" + id)
      .then((res) => {
        this.Bookmarks = res.data.favdoctrinelist;
        console.log("get user Bookmark");
        console.log(this.Bookmarks);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    onChange(value) {
      this.selected = value;
      console.log(this.selected);
    },
    ViewDoctrine(doctrineid) {
      this.$router.push({
        name: "UserDetailDoctrine",
        params: { id: doctrineid },
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      this.dataEdit.newimage = event.target.files[0];
      console.log(this.dataEdit.newimage);
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    async EditProfile() {
      try {
        var formData = new FormData();
        formData.append("firstname", this.editfirstname);
        formData.append("lastname", this.editlastname);
        formData.append("birthdate", this.Profile.birthdate);
        formData.append("phone", this.Profile.phone);

        if (this.dataEdit.newimage == null) {
          formData.append("imagepath", this.Profile.image);
          formData.append("oldimage", this.Profile.image);
        } else {
          formData.append("image", this.dataEdit.newimage);
          formData.append("imagepath", this.dataEdit.newimage.name);
          formData.append("oldimage", this.dataEdit.oldimage);
        }
        swal
          .fire({
            title: "Do you want to save the changes?",
            icon: "question",
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            showCancelButton: true,
            confirmButtonText: `Save`,
          })
          .then((result) => {
            
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.isupload = true
              this.$http.put("/user/" + id + "/editProfile", formData, )
              .then(() => {
                this.isupload = false
                        // this.$router.push("/profile");
                        location.reload();
                        swal.fire(
                          "Saved!",
                          "Edit your profile Was successful.",
                          "success"
                        );
              console.log("success");
                    })
                    .catch(function(err){
                        console.log(err)
                    });
            }
          });
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal.fire("Error", error.data.message, "error");
          console.log("success");
          this.selected = "โปรไฟล์";
        } else {
          swal.fire("Error", error.data.err.message, "error");
          console.log("error");
          this.selected = "โปรไฟล์";
        }
      }
    },
  },

  computed: {
    pages() {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.pagination.data.length / this.pagination.rowsPerPage)
        : 0;
    },
    pages1() {
      return this.pagination1.rowsPerPage
        ? Math.ceil(this.pagination1.data.length / this.pagination1.rowsPerPage)
        : 0;
    },
    filteredList() {
      var firstIndex;
      if (this.pagination.page == 1) {
        firstIndex = 0;
      } else {
        firstIndex = (this.pagination.page - 1) * this.pagination.rowsPerPage;
      }
      console.log(firstIndex + " firstIndex");
      var showData = this.pagination.data.slice(
        firstIndex,
        firstIndex + this.pagination.rowsPerPage
      );
      console.log(showData);
      return showData;
    },
     filteredList1() {
      var firstIndex;
      if (this.pagination1.page == 1) {
        firstIndex = 0;
      } else {
        firstIndex = (this.pagination1.page - 1) * this.pagination1.rowsPerPage;
      }
      console.log(firstIndex + " firstIndex");
      console.log(this.pagination1.data)
      var showData = this.pagination1.data.slice(firstIndex, firstIndex+this.pagination1.rowsPerPage)
      console.log(showData);
      return showData;
    },
  },
};
</script>

<style scoped>
.font-z{
  font-size: 20px;
  /* margin: 10px; */
}
.icon-edit{
  position: relative;
  cursor: pointer;
  
}
.icon-edit > i{
 position: absolute;
  top: 120px;
  right: -170px;
  height: 35px;
  width: 35px;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  line-height: 35px;
  border-radius: 50%;
}
.icon-edit > i:hover{
 background-color: rgb(153, 153, 153);
}
.no-data{
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-data > h1{
  color: #8d8d91;
  
}
.doctrine-card:hover {
  transition: 0.5s ease;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.25);
}
.e-profile {
  margin-bottom: 10px;
}
hr {
  border-top: 1px solid black;
}
.border-cardtext {
  background-color: #efefef;
  border: #cfd6ea solid 4px;
  border-radius: 10px;
}
/* .pad0{
  padding: 0;
}
.container{
  padding: 0;
}
.row{
  padding: 0;
} */
.rows {
  background-color: #e5e5e5;
}
.name-profile {
  text-align: center;
  justify-content: center;
  font-size: 32px;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 20px;
}
.sub-head {
  font-size: 20px;
  font-weight: bold;
}
.head-profile {
  font-size: 30px;
  font-weight: bold;
}
.sub-profile {
  font-size: 14px;
}
/* previewsimage */
.base-image-input {
  display: block;
  width: 300px;
  height: 300px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  clip-path: circle();
}

.placeholder {
  clip-path: circle();
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 30px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}

.img-profile {
  margin: 20px auto;
  width: 300px;
  height: 200px;
}
.img-profile img {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* .hover-setting:hover {
  color: rgb(190, 160, 60);
  cursor: pointer;
} */
.head-details {
  text-align: center;
  font-size: 32px;
  font-weight: 300;
  margin: 2%;
}
.edit-profile {
  position: absolute;
  right: 0;
  top: 0;
}
.btn-cpass {
  margin: 20px auto;
  text-align: center;
}
.image-profile {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 300px;
  width: 300px;
}
.edit-pic {
  padding: 20px;
  background-color: #c0c5c1;
  position: absolute;
  left: 65%;
  top: 5%;
}
.edit-pic:hover {
  background-color: rgb(230, 230, 154);
}

.img-rank {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 40%;
  width: 40%;
}

.image-profile img {
  clip-path: circle();
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.name-picture {
  background-color: cornflowerblue;
  align-items: center;
  justify-content: center;
  border: black solid 0.8px;
  padding: 50px 50px;
  /* height: 80vh;  */
}

.name-pic-pro {
  /* border: black solid 0.8px; */
}
.select-head {
  /* margin-top: 3% ; */
  /* border: black solid 0.8px ; */
}
.setting-proflie {
  display: none;
  margin-top: 3%;
  /* border: black solid 0.8px; */
}
.details-profile {
  /* border: black solid 0.8px; */
  height: 80vh;
  /* padding: 12px; */
}
.table-profile {
  height: 80vh;
}
.bookmark-profile {
  height: 80vh;
  overflow-y: scroll;
}

/* ประวัติการบริจาค */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table thead {
  background-color: #ee2828;
}
.table thead tr th {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.35px;
  color: #ffffff;
  opacity: 1;
  padding: 12px;
  vertical-align: top;
  border: 1px solid #dee2e685;
}
.table tbody tr td {
  font-size: 14px;
  letter-spacing: 0.35px;
  font-weight: normal;
  color: #f1f1f1;
  background-color: #3c3f44;
  padding: 8px;
  text-align: left;
  border: 1px solid #dee2e685;
}
.mx-auto {
  height: 200px;
}
@media (max-width: 768px) {
  .details-profile {
    max-height: auto;
  }
  .hr-hide {
    display: none;
  }
  .setting-proflie2 {
    display: none;
  }
  .setting-proflie {
    display: block;
    margin-top: 3%;
  }
  .table thead {
    display: none;
  }
  .table,
  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }
  .table tr {
    margin-bottom: 15px;
  }
  .table tbody tr td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  .table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
  }
}
/* ประวัติการบริจาค */
</style>
