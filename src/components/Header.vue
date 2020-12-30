<template>
	<header>
		<div class="container">
		<nav>
			<ol>
				<router-link tag="li" to="/">
					<button>Order Details</button>
				</router-link>
				<router-link tag="li" to="/sellers">
					<button>Sellers</button>
				</router-link>

			
			</ol>

		</nav>

		
		</div>
</header>
</template>
<style lang="scss">
.container{
	max-width: 1140px;
	margin:0 auto;
	.row{
		margin:0 auto;
		text-align:center;
	}
}

	header{
 display: flex;
    background: rgba(0,0,0,.3);
    padding: 2em;
    color:#fff;
    margin:0 auto;
        box-shadow: 0 1px 4px rgb(0 0 0 / 30%), 0 0 20px rgba(0, 0, 0, 0.1) inset;
    ol, ul, li{
    	list-style:none;
    	    display: flex;
    	    margin:0;
    	    padding:0
    }

	}
</style>