
<template>
  <div id="app">
        <div class="bg"></div>
        <app-header></app-header>

   <div class="container">
     <div class="row">


<router-view></router-view>


     </div>
   </div>
  </div>
</template>

<script>
import Header from './components/Header';
import OrderDetails from './components/OrderDetails';
import Sellers from './components/Sellers';
import Items from './components/Items';

const { required, minLength } = require('vuelidate/lib/validators');


export default {
  name: "App",
  data : function(){
      return{
        selectedComponents : 'appOrder'
      }
  },
  components : {
    appOrder : OrderDetails,
    appSellers : Sellers,
    appItems : Items,
    appHeader : Header
  }

};
</script>
<style lang="scss">
body{
      font-family: Nunito Sans,sans-serif;
}
*, *:before, *:after {
    box-sizing: inherit;
}
.bg{
  background-image: linear-gradient(to left top,#005f6a,#007873,#009069,#44a650,#8ab628);
  width:100%;
  height:100%;
  position:fixed;
  z-index: -1;
}
h2{
  color:#fff;
}
li{
  &.router-link-exact-active{
    position:relative;
    &:before, &:after{
            content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
        background-color: rgba(255,255,255,0.2);
    z-index: 1;
    transition: all 0.3s;
    }
    
  }
}
    button{
      line-height: 50px;
    height: 50px;
    text-align: center;
    width: 250px;
    margin:0 2px;
    cursor: pointer;
    color: #FFF;
    border:0;
        background: rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
    position: relative;
    &:before, &:after{
      content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
        background-color: rgba(255,255,255,0.1);
    z-index: 1;
    transition: all 0.3s;
    &:after{
          opacity: 0;
    transition: all 0.3s;
    border: 1px solid rgba(255,255,255,0.5);
    }
    }
    &:hover{
      &:before{
            opacity: 0;
    transform: scale(0.5,0.5);
      }
      &:after{
            opacity: 1;
    transform: scale(1,1);
      }
    }
    }
    .router-link-active{

    }
.form-group {
  margin-bottom: 2rem;
  .mx-datepicker{
    width:50%;
  }
  }
  .form__label, label,
  .form__label--inline {
        font-size: 1rem;
    color: #ffffff;
    margin-bottom: 1rem;
    margin-left: 0.875rem;
    margin-left: 0.875rem;
    display: block;
  }
  .form-group .form__input,
  .form-group .form__textarea {
    margin-bottom: 0;
  }
  .form__input,
  .form__textarea,
  select, input.mx-input {
   font-size: 0.875rem;
    font-weight: 300;
    color: #017a72;
    line-height: 2.375rem;
    min-height: 3rem;
    position: relative;
    border: 1px solid #E8E8E8;
    border-radius: 0;
    background: #fff;
    padding: 0 0.8125rem;
    width: 50%;
    transition: border 0.1s ease;
    box-sizing: border-box;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  }
  input.mx-input{
    width:100%;
  }
  .form-group__message,
  .error {
    font-size: 1rem;
    line-height: 1;
    display: none;
    margin-left: 14px;
    margin-top: 10px;
    margin-bottom: 0.9375rem;
  }
  .form-group--error+.form-group__message,
  .form-group--error .error {
    display: block;
    color: #fff;
  }
  .form-group--error input,
  .form-group--error textarea,
      .form-group--error select,
  .form-group--error input:focus,
  .form-group--error input:hover {
    border-color: #f79483;
  }
  .form-group--alert,
  .form-group--error {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
  }
  button:focus,
  input:focus,
  select:focus {
    outline: none;
  }
button[disabled] {
  opacity: 0.3;
  cursor: none;
}
button.close-button{
      opacity: 1;
    background: rgba(0,0,0,.4);
    width: auto;
    height: auto;
    line-height: normal;
}
@keyframes shakeError {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>


