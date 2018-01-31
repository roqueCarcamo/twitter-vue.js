<template>
  <div id="app">
    <h3>Welcome Twitter</h3>
    <img src="./assets/logo.png">
    <form id="form">
      <h3>Register Tweest</h3>
      <p>
        <label>Content: <textarea name="content" v-model="tweestModel.content"></textarea></label>
      </p>
      <p>
       <label>Location: <input type="text" name="location" v-model="tweestModel.location"></label>
      </p>
      <p>
        <label>Author: 
        <select name="author" v-model="tweestModel.author">
          <option v-for="author in authors" :value="author._id">
            {{ author.firstname }} {{ author.lastname }}
          </option>
        </select>
        </label>
      </p>
      <button @click.prevent="create">Create</button>
    </form>
    <h3>{{ msg }}</h3>
    <hr />
    <p v-if="loading">Loading ...</p>
    <ul v-else>
      <li v-for="twees in twests" :key="twees._id">
       {{ twees.content }} -  {{ twees.location }} - {{ twees.author.firstname }} {{ twees.author.lastname }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import config from "./config.json";

export default {
  name: 'app',
  data () {
    return {
      msg: 'List of Tweest',
      loading: true,
      twests: [],
      authors: [],
      tweestModel: {
        content: '',
        location: '',
        author: ''
      }
    }
  },
  created (){
    this._loadTweest();
    this._loadUsers();
  },
  methods: {
    _loadTweest(){
      axios.get(`${config.baseURL}/tweets?limit=20`,{
        withCredentials: true
      })
      .then( response => {
        this.loading = false;
        this.twests = response.data.twests;
        console.log(this.twests);
      })
    },
    _loadUsers(){
      axios.get(`${config.baseURL}/users`,{
        withCredentials: true
      })
      .then( response => {
        this.authors = response.data.users;
      })
    },
    create(){
      let payload = "";
      Object.keys(this.tweestModel).forEach(key => {
        payload+=`${key}=${this.tweestModel[key]}&`
      });
      
      axios.post(`${config.baseURL}/tweets/?limit=20`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then( response => {
        this._loadTweest();
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
