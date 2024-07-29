<template>
  <header>
    <h1>Fraud Detection Checker Page</h1>
  </header>
  <main>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        Welcome to the Fraud Detection Checker Page. This Interface allows you
        to predict whether a transaction is fraudulent or not by inputing the
        desired fields.
      </p>
    </section>

    <section id="access-api">
      <h2>Interact with the Api via Ui Page</h2>
      <p>To access the API, Input Transaction Info:</p>
    </section>
    <form class="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
      <div>
        <label for="step" class="block text-gray-700">Step</label>
        <input
          type="number"
          id="step"
          name="step"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          v-model="dform.step"
        />
      </div>
      <div>
        <label for="amount" class="block text-gray-700">Amount</label>
        <input
          type="number"
          v-model="dform.amount"
          id="amount"
          name="amount"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
         
        />
        
      </div>
      <div>
        <label for="newbalance_orig" class="block text-gray-700"
          >New Balance Origin</label
        >
        <input
        v-model="dform.newbalance_orig"
          type="number"
          id="newbalance_orig"
          name="newbalance_orig"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
        
        />
      </div>
      <div>
        <label for="oldbalance_org" class="block text-gray-700"
          >Old Balance Origin</label
        >
        <input
          type="number"
          id="oldbalance_org"
           v-model="dform.oldbalance_org"
          name="oldbalance_org"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
         
        />
      </div>
      <div>
        <label for="newbalance_dest" class="block text-gray-700"
          >New Balance Destination</label
        >
        <input
          type="number"
          id="newbalance_dest"
          name="newbalance_dest"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
           v-model="dform.newbalance_dest"
        />
      </div>
      <div>
        <label for="oldbalance_dest" class="block text-gray-700"
          >Old Balance Destination</label
        >
        <input
          type="number"
          id="oldbalance_dest"
          name="oldbalance_dest"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
           v-model="dform.oldbalance_dest"
          
        />
      </div>
      <div>
        <label for="name_orig" class="block text-gray-700">Name Origin</label>
        <input
          type="text"
          id="name_orig"
          name="name_orig"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          v-model="dform.name_orig"
        />
      </div>
      <div>
        <label for="type" class="block text-gray-700">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          v-model="dform.type"
        />
      </div>
      <div>
        <label for="name_dest" class="block text-gray-700"
          >Name Destination</label
        >
        <input
          type="text"
          id="name_dest"
          name="name_dest"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          
          v-model="dform.name_dest"
        />
      </div>
      <div class="md:col-span-3 sm:col-span-1 text-center">
        <q-btn
          :loading="loading"
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
    <q-dialog v-model="dialog">
      <div class="bg-white px-6 py-10">
        Pridictions: {{ `${results.prediction ? 'Fraud Detected' : 'No Fraud Detected'}` }}
      </div>
    </q-dialog>
  </main>
  <footer>
    <p>&copy; 2024 Fraud Detection. All rights reserved.</p>
  </footer>
</template>

<script>
let nuxt 
let axios
export default {
  data: () => ({
    dform: {},
    lading: false,
    results: {},
    dialog: false
  }),
  methods: {
    async Submit() {
      try {
        this.loading = true
        const res = await axios.post('fraud/predict', this.dform)
        this.results = res.data
        this.loading = false
        ShowSnack('Prediction Ready', 'positive')
        this.dialog = true
      } catch (err) {
        this.loading = false
        console.log(err)
        ShowSnack('Error Occured!!', 'negative')
      }
    }
  },
  created() {
    nuxt = useNuxtApp()
    axios = nuxt.$UseAxios
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