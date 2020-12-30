<template>
  <div>
    <form class="order-details-form form-set" id="orderDetailsForm">
      <h2>Order Details</h2>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.datePickerValidate.$error }"
      >
        <label for="order">Order Date :</label>
        <date-picker
          @change="onDateChange($v.datePickerValidate.$model)"
          v-model="regulardate"
          valueType="format"
          placeholder='Select a date'
          v-model.trim="$v.datePickerValidate.$model"
        ></date-picker>
      </div>

      <div
        class="form-group"
        :class="{ 'form-group--error': $v.clientsValidate.$error }"
      >
        <label class="form__label">Client</label>
        <select
          name="clientName"
          id="clientName"
          @change="getClient($event)"
          v-model.trim="$v.clientsValidate.$model"
        >
          <option value="">Please select client name</option>
          <option
            v-for="clients in this.allClients"
            :key="clients.key"
            :value="clients.id"
          >
            {{ clients.clientName }}
          </option>
        </select>
        <div class="error" v-if="!$v.clientsValidate.required">
          Field is required
        </div>
      </div>

      <div
        class="form-group"
        :class="{ 'form-group--error': $v.contactsValidate.$error }"
      >
        <label class="form__label">Contact</label>
        <select
          name="contactName"
          id="contactName"
          @change="getContact($event)"
          v-model.trim="$v.contactsValidate.$model"
        >
          <option value="" selected="selected">
            Please select contact name
          </option>
          <!--<option value="1">Contact A1</option>
					<option value="2">Contact A2</option>
					<option value="3">Contact B1</option>
					<option value="4">Contact B2</option>-->
          <option
            v-for="contacts in allContacts"
            :key="contacts.key"
            :value="contacts.id"
          >
            {{ contacts.contact }}
          </option>
        </select>
        <div class="error" v-if="!$v.contactsValidate.required">
          Field is required
        </div>
      </div>
      <div class="form-group">
      	   <button
          class="delete"
          v-on:click.stop.prevent="getDatas"
        >
          Get Data
        </button>
        <button
          class="delete"
          v-on:click.stop.prevent="saveOrders"
          :disabled="$v.$invalid"
        >
          Save
        </button>
     
      </div>
    </form>
    <div class="container" v-if="!this.$store.state.isVisible">
    	      <table id="get">
  	<thead>
  	<tr>
  		<th>Client Name</th>
  		<th>Id</th>
  		<th>Key</th>
  		<th>Order Date</th>
  		<th>Type</th>
</tr>
</thead>
<tbody>
	<tr v-for="clients in this.allClients">
<td>{{clients.clientName}}</td>
<td>{{clients.id}}</td>
<td>{{clients.key}}</td>
<td>{{clients.order_date}}</td>
<td>{{clients.type}}</td>
</tr>
</tbody>
  </table>
      	      <table id="get">
  	<thead>
  	<tr>
  		<th>Contact Name</th>
  		<th>Id</th>
  		<th>Key</th>
  		<th>Type</th>
</tr>
</thead>
<tbody>
	<tr v-for="clients in this.allContacts">
<td>{{clients.contact}}</td>
<td>{{clients.id}}</td>
<td>{{clients.key}}</td>
<td>{{clients.type}}</td>
</tr>
</tbody>
  </table>
    </div>
  </div>

</template>
<script>
 import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
const { required, minLength } = require('vuelidate/lib/validators');
import Vue from 'vue';
export default {
	components: { DatePicker },
	data(){
		return{
			ordersData : {
				order_date : null,
				clint:null,
				contact:null,
				id:null,
				contactName : '',
				clientName : '',
				type:null
			},
			clientsData : {
				clientName : '',
				id : null,
				type:null,
				order_date : null
			},
			contactData : {
				contactName : '',
				id : null,
				type:null
			},
		allClients : [],
		allContacts : [],
		clientsValidate : '',
		contactsValidate : '',
		datePickerValidate : '',
		}

	},
	   created() {
	   this.allClients = [];
	Vue.http.get('https://clients-order-default-rtdb.firebaseio.com/client.json')
    .then(response => {
	let data = response.data;
	for(let key in data){
		if(!data[key].hasOwnProperty('contact')){
		data[key].key = key;
		  this.allClients.push(data[key]);
		}

		 }
	})

        },
	methods : {
		onDateChange(date){
			this.ordersData.order_date = date;
		},
		getContact(event){
			this.ordersData.contactName = event.target.options[event.target.options.selectedIndex].text;
			this.ordersData.contact = event.target.value;
		},
		getClient(event){
			this.ordersData.clientName = event.target.options[event.target.options.selectedIndex].text;
			this.ordersData.clint = event.target.value;
			this.ordersData.id = this.ordersData.clint;

			this.allContacts = [];
			if(this.ordersData.clientName && this.ordersData.clint && this.ordersData.id != "" || undefined){
				Vue.http.get('https://clients-order-default-rtdb.firebaseio.com/client/'+ event.target.value +'/contact.json')
				.then(response => {
				let data = response.data;
				for(let key in data){
				data[key].key = key;
				this.allContacts.push(data[key]);
				}
				})
			}

		},


		saveOrders(){
			this.ordersData.type = 'order';
			this.$store.commit("postMethods", this.ordersData);
			this.ordersData.type = null;

			this.clientsData = {
				clientName : this.ordersData.clientName,
				id : this.ordersData.clint,
				type:'client',
				order_date : this.ordersData.order_date

			};

			this.$store.commit("postMethods", this.clientsData);

			this.contactData = {
				contact : this.ordersData.contactName,
				id : this.ordersData.contact,
				type:this.clientsData.type+'/'+this.ordersData.clint +'/contact'
			};
			this.$store.commit("postMethods", this.contactData);



		},
		getDatas(){
			this.$store.commit("changeVisible", false);
		}
	},
	validations: {
		clientsValidate: {
			required,

	},
		contactsValidate: {
		required
	},
	datePickerValidate : {
		required
	}
}

}
</script>
<style>
	table#get{
		color:#fff;
		    display: block;
    width: 100%;
    width: -webkit-max-content;
    width: -moz-max-content;
    max-width: 100%;
    overflow: auto;
        margin: 0 auto;
	}
	table#get thead{
		background: rgba(0,0,0,.2);
	}
	table#get table tr {
    background: rgba(0,0,0,.2);
    cursor: pointer;
}

table#get td, table#get th {
    text-align: left;
    padding: 10px;
    background: rgba(0,0,0,.2);
    border-bottom: 3px solid #0d5b43;
}
</style>
