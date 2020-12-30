import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state : {
		isVisible : true,
	    name : '',
		percantage : '',
		valueGet : null,
		messageNotok : 'Oops! Something went wrong processing your request',
		messageOk : 'Everything went ok',
		selectedSellers:null,
		allSellers :[],
		checkMessage : false,
		sellerData : {
			name : null,
			percantage:null,
			type:'seller'
		},
		modalBox: {
			content : '',
			type : 'alert',
			setTimeOut : 3000,
			autoOpen : false,
			modalTypeClass : ''
		}

	},
	mutations : {
		changeVisible({commit}, val){
			this.state.isVisible = val;
		},
		postMethods({commit}, payload){
			Vue.http.post('https://clients-order-default-rtdb.firebaseio.com/'+payload.type+'.json', payload)
			.then((response) =>{
				console.log(response);
				this.state.modalBox.content = this.state.messageOk;
				this.state.modalBox.modalTypeClass = 'succes';

			 if(!this.state.checkMessage){	
			 this.commit("modalAlertBox", this.state.modalBox); 	 
				 this.state.selectedSellers = true;
				}
			}, response => {
				this.state.modalBox.content = this.state.messageNotok;
				this.state.modalBox.modalTypeClass = 'error';
				 this.commit("modalAlertBox", this.state.modalBox); 
	  		});

		},
		getMethods({commit}, url){
			Vue.http.get(url)
			.then((response) =>{
				let data = response.data;
	for(let key in data){
		if(!data[key].hasOwnProperty('contact')){
		data[key].key = key;
		  this.state.allSellers.push(data[key]);
		}}
		 })
		},
		deleteMethods({commit}, url){
			Vue.http.delete(url + this.state.selectedSellers + '.json')
			.then((response) =>{
				console.log(response);
				this.state.modalBox.title = 'This is a succes';
				this.state.modalBox.content = this.state.messageOk;
				this.state.modalBox.modalTypeClass = 'succes';
			  this.commit("modalAlertBox", this.state.modalBox); 
			}, response => {
				this.state.modalBox.title = 'Oops!';
				this.state.modalBox.content = this.state.messageNotok;
				this.state.modalBox.modalTypeClass = 'error';
				 this.commit("modalAlertBox", this.state.modalBox); 
	  		})
		},
	   saveDataSeller({commit}){
		this.state.sellerData.name = this.state.name;
		this.state.sellerData.percantage = this.state.percantage;
		
	   	//add id to our array. Because we dont have any id data from anywhere.
		this.commit("postMethods", this.state.sellerData);
	   },
	   updateSeller({commit}, payload){
	   	// get sellername input value
	   	this.state.name = payload;
	   	this.state.selectedSellers = false;
	   },
	   updatePercantage({commit}, payload){
	   	// get percantage input value
	   	this.state.percantage = payload;
	   	this.state.selectedSellers = false;

	   },
	   modalAlertBox({commit}, payload){
	   	debugger
	   	this.state.modalBox
	  const modal = new SimplyModal(payload);
      modal.open();

	   }
	}

});