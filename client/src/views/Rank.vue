<template>
  <div class="Rank">
    <div>
      <Navbar></Navbar>
    </div>
    <br /><br /><br /><br />
    <v-overlay :value="isloading">
      <v-progress-circular
      indeterminate
        size="100"
        width="7"
        color="green"
      ></v-progress-circular>
    </v-overlay>
    <v-container>
      <!-- tablist -->
      <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">
            ตารางอันดับ
          </h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab>
            Beginner
            <img src="../../public/image/rank/rank-beginner.png" alt="Beginner">
          </v-tab>
          <v-tab>
            Bronze
            <img src="../../public/image/rank/rank-bronze.png" alt="Bronze">
          </v-tab>
          <v-tab>
            Silver
            <img src="../../public/image/rank/rank-silver.png" alt="Silver">
          </v-tab>
          <v-tab>
            Gold
            <img src="../../public/image/rank/rank-gold.png" alt="Gold">
          </v-tab>
          <v-tab>
            Platinum
            <img src="../../public/image/rank/rank-platinum.png" alt="Platinum">
          </v-tab>
          <v-tab>
            Diamond
            <img src="../../public/image/rank/rank-diamond.png" alt="Diamond">
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in head" :key="item">
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="filteredList"
                :search="search"
              >
                <template filteredList.fullname="{ User }"
                  >{{ filteredList.firstname }}
                  {{ filteredList.lastname }}</template
                >
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
    <br /><br /><br /><br /><br />
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
const Footer = () => import("@/components/navbar/footer");
const Navbar = () => import("@/components/navbar/navbar");
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      User: [],
      search: "",
      tab: 0,
      isloading: true,

      headers: [
        { text: "ลำดับ", value: "Rank" },
        { text: "ชื่อผู้บริจาค", value: "firstname" },
        { text: "Point", value: "point" },
      ],

      head: ["Beginner", "Bronze", "Silver", "Gold", "Platinum", "Diamond"],
    };
  },
  mounted: async function mounted() {
    await this.$http
      .get("/user/RankList")
      .then((res) => {
        this.User = res.data;
        this.isloading = false;
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
    await this.onbeforeunload();
  },
  computed: {
    filteredList() {
      console.log(this.tab);
      var newlist = this.User.filter((user) => {
        var result = user.Rank.toLowerCase().includes(
          this.head[this.tab].toLowerCase()
        );
        console.log("kuy");
        return result;
      });
      return newlist;
    },
  },
  methods: {
    onbeforeunload() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
  img {
  width: 50px;
  height: 30px;
}
</style>