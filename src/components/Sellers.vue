<template>
  <div>
    <form class="order-details-form form-set" id="sellersForm">
      <h2>Sellers</h2>
      <div class="form-row">
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.sellerValidate.$error }"
        >
          <label class="form__label">Seller</label>
          <select v-model="sellerValidate" @change="onChange($event)">
            <option value="">Please select seller name</option>
           <option
            v-for="sellers in this.$store.state.allSellers"
            :data-id="sellers.key"
            :value='sellers.id'
          >
            {{ sellers.name }}
          </option>
          </select>

        </div>
                  <div
            class="form-group"
            :class="{ 'form-group--error': $v.percantage1.$error }"
          >
            <label class="form__label">Percantage</label>
            <input type="number" placeholder="1.0" step="0.01" min="0" max="10" id="percantage1"
              class="form__input"
               v-model.trim="$v.percantage1.$model"
              v-on:change="updateSeller($event)">
   <div class="error" v-if="!$v.percantage1.between">
            Must be between {{$v.percantage1.$params.between.min}} and
            {{$v.percantage1.$params.between.max}}
          </div>
          </div>

        <div v-if="!this.$store.state.isVisible">
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.name.$error }"
          >
            <label class="form__label">Name</label>
            <input
              class="form__input"
            v-on:change="updateSeller($event)"
 v-model.trim="$v.name.$model"
            /> 
 <div class="error" v-if="!$v.name.required">Field is required</div>

          </div>

         
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.percantage.$error }"
          >
            <label class="form__label">Percantage</label>
            <input type="number" placeholder="1.0" step="0.01" min="0" max="10" id="percantage"
              class="form__input"
               v-model.trim="$v.percantage.$model"
              v-on:change="updateSeller($event)">
   <div class="error" v-if="!$v.percantage.between">
            Must be between {{$v.percantage.$params.between.min}} and
            {{$v.percantage.$params.between.max}}
          </div>
          </div>
      
          <div
            class="form-group"
            :class="{ 'form-group--error': $v.name.$error || $v.percantage.$error }"
          >
            <button
              class="btn-send"
              id="btn-send"
              v-on:click.stop.prevent="addSellers"
              :disabled="$v.percantage.$invalid"
            >
              Add seller
            </button>
            <button v-on:click.stop.prevent="open">Close</button>
          </div>
        </div>

        <div class="form-group" v-if="this.$store.state.isVisible">
          <div class="form-submit">
             <button
              class="submit"
              v-on:click.stop.prevent="close"
            >
              +Seller
            </button>
            <button class="submit" v-on:click.stop.prevent="deleteItem">Delete</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script scoped>
const { required, minLength, between} = require('vuelidate/lib/validators');

export default {
	data(){
		return{
			sellerValidate : null,
			percantageValidate : null,

			percantage:null,
			percantage1:null,
			name: null
		}
	},
	validations : {
		sellerValidate :{
			required
		},
		name : {
			required,
                  minLength: minLength(4)
		},
		percantage : {
			required,
			between: between(0.01, 100)
		},
		percantage1 : {
			required,
			between: between(0.01, 100)
		}
	},
	created() {
		this.$store.commit('getMethods', 'https://clients-order-default-rtdb.firebaseio.com/seller.json');
	},
	methods :{
		addSellers(){
		   this.$store.commit('saveDataSeller');
		},
		close(){
			this.$store.commit('changeVisible', false)
		},
		open(){
			this.$store.commit('changeVisible', true)
		},
		deleteItem(){
		    this.$store.commit('deleteMethods', 'https://clients-order-default-rtdb.firebaseio.com/seller/');
		},
    updateSeller(event) {
    	if(event.target.id == 'percantage' ){
    		this.$store.commit('updatePercantage', event.target.value)
    	}else{
    		this.$store.commit('updateSeller', event.target.value)
    	}
      },
      onChange(event) {
      	let id = event.target.options[event.target.options.selectedIndex].getAttribute('data-id');
            this.$store.state.selectedSellers = id;
        }
	}

}
</script>
