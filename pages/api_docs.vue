<template>
  <header>
    <h1>Fraud Detection API Documentation</h1>
  </header>
  <main>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        Welcome to the Fraud Detection API documentation. This API allows you to
        predict whether a transaction is fraudulent or not.
      </p>
    </section>

    <section id="access-api">
      <h2>Access the API</h2>
      <p>To access the API, use the following URL:</p>
      <code>http://127.0.0.1:8000/fraud/predict</code>
    </section>

    <section id="request">
      <h2>Request</h2>
      <p>Send a GET request to the API with the following body:</p>
      <pre><code>{
    "step": 0,
    "amount": 1000,
    "newbalance_orig": 10000,
    "oldbalance_org": 900,
    "newbalance_dest": 20000000000000000,
    "oldbalance_dest": 2000000,
    "name_orig": "emeter",
    "type": "TRANSFER",
    "name_dest": "dayo"
}</code></pre>
    </section>

    <section id="response">
      <h2>Response</h2>
      <p>The API will return a response in the following format:</p>
      <pre><code>[
    {
        "step": 0,
        "amount": 1000,
        "newbalance_orig": 10000,
        "oldbalance_org": 900,
        "newbalance_dest": 20000000000000000,
        "oldbalance_dest": 2000000,
        "name_orig": "e",
        "type": "TRANSFER",
        "name_dest": "d",
        "step_days": 0.0,
        "step_weeks": 0.0,
        "diff_new_old_balance": 9100,
        "diff_new_old_destiny": 19999999998000000,
        "prediction": 0
    }
]</code></pre>
    </section>

    <section id="ui-interface" class="mb-15">
      <h2>UI Interface Options</h2>
      <p>The model can be accessed through:</p>
      <ul>
        <li>API usage by the company</li>
        <li>Fraud UI page checker, where you can input transaction info</li>
        <li>Transaction file upload (CSV or document)</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>&copy; 2024  Fraud Detection. All rights reserved.</p>
  </footer>
</template>

<script>
export default {};
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