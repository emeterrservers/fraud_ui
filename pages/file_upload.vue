<template>
  <header>
    <h1>Fraud Detection Document Upload</h1>
  </header>
  <main>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        Welcome to the Fraud Detection Document Upload Page. This Interface
        allows you to predict whether a transaction is fraudulent or not by
        uploading transaction documents.
      </p>
    </section>

    <section id="access-api">
      <h2>Interact with the Api via Ui Page</h2>
      <p>To access the API, Upload Transaction Files:</p>
    </section>
    <form class="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
      <div>
        <label for="step" class="block text-gray-700">Upload Csv,Excel</label>

        <v-file-input
          @change="CheckFile"
          v-model="fileInputImage"
          id="fileUpload"
          label="Upload File"
          prepend-icon="mdi-file"
          dense
          outline
          class="mt-3"
        >
        </v-file-input>
      </div>
      <div class="md:col-span-3 sm:col-span-1 text-center">
        <q-btn
          :loading="loading"
          :disable="!file"
          @click="Submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </q-btn>
      </div>
    </form>

    <section id="ui-interface" class="mb-15">
      <h2>UI Interface Options</h2>
      <p>The model can be accessed through:</p>
      <ul>
        <li>API usage by the company</li>
        <li>Fraud UI page checker, where you can input transaction info</li>
        <li>Transaction file upload (CSV or document)</li>
      </ul>
    </section>

    <q-dialog :maximized="true" v-model="dialog">
      <div class="bg-white px-6 py-10">
        <div class="q-pa-md">
        <q-table
          title="All Cables Plan"
          :rows="rows"
          :columns="columns"
          row-key="name"
         
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
      </div>
    </q-dialog>
  </main>
  <footer>
    <p>&copy; 2024 Fraud Detection. All rights reserved.</p>
  </footer>
</template>

<script>
let nuxt;
let axios;
export default {
  data: () => ({
    file: null,
    fileInputImage: null,
    jsonData: [],
    results: [],
    dialog: false,
    loading: false,
    filter: ''
  }),
  methods: {
    readFileAsText(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    },
    async CheckFile() {
      if (this.fileInputImage) {
        this.file = this.fileInputImage[0];
        const content = await this.readFileAsText(this.file);
        this.jsonData = csvJSON(content);
      } else {
        this.loaing = false;
        ShowSnack("Invalid File Chosen", "negative");
      }
    },

    async Submit() {
      try {
        this.loading = true;
        this.jsonData.forEach(async (v, index) => {
          try {
            const res = await axios.post("fraud/predict", v);
            const data = res.data;
            this.results.push(data.length > 0 ? data[0] : {});
           
            if (this.jsonData.length == index+1) {
              this.loading = false;
              ShowSnack("Prediction Ready", "positive");
              this.dialog = true;
            }
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        this.loading = false;
        console.log(err);
        ShowSnack("Error Occured!!", "negative");
      }
    },
  },
  created() {
    nuxt = useNuxtApp();
    axios = nuxt.$UseAxios;
  },
  computed: {
     rows() {
      return this.results.map((v) => ({ ...v }));
    },
    columns() {
      let cols = [];
      for (let key in this.results[0]) {
        cols.push({
          name: key,
          required: true,
          label: key,
          field: key,
          sortable: true,
        });
      }

      return cols;
    },
  }
};
</script>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 2em;
}

main {
  padding: 20px;

  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

code {
  background-color: #f4f4f4;
  padding: 5px;
  border-radius: 5px;
  display: block;
  margin: 10px 0;
  overflow-x: auto;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-left: 3px solid #333;
  overflow-x: auto;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  background: #333;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

footer {
  text-align: center;
  padding: 1em 0;
  background-color: #333;
  color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>