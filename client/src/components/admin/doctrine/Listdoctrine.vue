<template>
  <div class='Listdoctrine'>
    <div>
      <Navbar></Navbar>
    </div>
    <br><br>
    <v-overlay :value="isloading">
        <v-progress-circular
        indeterminate
          size="100"
          width="7"
          color="green"
        ></v-progress-circular>
      </v-overlay>
    <div id ='headaddnews'>
        <div class="text-center">
          
            <v-btn rounded color="primary" dark to = "/admin/Adddoctrine">เพิ่มหลักธรรม</v-btn>
  
            <!-- <v-btn rounded color="primary"  to = "/addnews" >Add NEWS</v-btn> -->
        </div>
    </div>
    <v-container>
      <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                 <th class="text-left">
                 
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Editor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr  @submit.prevent="editdoctrine" v-for="doctrine in doctrines"  :key="doctrine._id">
                
                <td><center><img :src="doctrine.image" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover;  margin:3%;" align="center"></center></td>
                <td>{{ doctrine.title }}</td>
                <!-- <td v-html="doctrine.content">{{ doctrine.content }}</td> -->
                <td>
                  <v-row>
                      <v-col class="ml-auto" md="12" sm="6" >
                        <div>
                          <span>
                            <v-btn style="margin-right:3%;" @click="ViewDoctrine(doctrine._id)">View</v-btn>
                          </span>
                          <span>
                            <v-btn style="margin-right:3%;" @click="EditDoctrine(doctrine._id)">Edit</v-btn>
                          </span>
                          <span>
                            <v-btn color="error" @click="DeleteDoctrine(doctrine._id)">Delete</v-btn>
                          </span>
                        </div>
                      </v-col>
                  </v-row>
                </td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
const Navbar = () => import('@/components/navbar/navbar')
import swal from "sweetalert2";
  export default {
    name : "Listdoctrine",
    data (){
      return {
        doctrines : [],
        isloading:true,
        }
    },
    components:{
      Navbar
    },
    mounted: async function mounted(){
      await this.$http.get("/doctrine/ShowListDoctrine")
      .then((res) => {
        console.log(res.data)
        this.doctrines = res.data;
        this.isloading = false
        this.doctrines.sort(function(a, b){
            return new Date(b.edittime) - new Date(a.edittime);
        });
        console.log(this.doctrines)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    methods: {
      ViewDoctrine(doctrineid){
        this.$router.push({ name: 'DetailDoctrine' , params: {id : doctrineid}})
      },
      EditDoctrine(doctrineid){
        this.$router.push({ name: 'EditDoctrine' , params: {id : doctrineid}})
      },
      Refresh(doctrineid){
        console.log('sdfsdfsddf')
        this.doctrines = this.doctrines.filter(function(c){
          return c._id !== doctrineid
        })
      },
      DeleteDoctrine(doctrineid){
        const swalWithBootstrapButtons = swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("/doctrine/DeleteDoctrine/"+doctrineid)
            console.log("delete")
            this.$router.push({ name: 'Listdoctrine'})
            this.Refresh(doctrineid)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Delete Doctrine Success.',
              'success'
            )
          } 
        })
      },
    }
    
  }

</script>

<style>
    #table{
        text-align: left;
    }
    #headaddnews{
        margin: 3%;
    }
    
</style>
