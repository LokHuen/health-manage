<template>
	<div id="inpurField">
		<div class="field">
			  <i :class="iconClass()" v-if="icon"  @click="handleIconClick"></i>
			<input 
			:type="type"
			:placeholder="placeholder"
			 :disabled="disabled"
			 :readonly="readonly"
			 :class="inputClasses()"
			 :value="currentValue"
			 :number="number"
			 @keyup.enter="handleEnter"
			 @focus="handleFocus"
			 @blur="handleBlur"
			@change="handleChange"
			 @input="handleInput"
			>
		</div>
	</div>
</template>

<script>
	const prefixCls = 'xs-input';
	export default {
		props:{
			 type: {
			   type: String,
			    default: 'text'
			},
			 size: {
			    validator (value) {
			        return ['small', 'large', 'default'].indexOf(value)>-1
			    },
			    default () {
			        return 'default'
			    }
			},
			value: {
			    type: [String, Number],
			    default: ''
			},
			 number: {
			    type: Boolean,
			    default: false
			},
			 placeholder: {
			    type: String,
			    default: ''
			},
			 disabled: {
			    type: Boolean,
			    default: false
			},
			/* 图标名称 */
			 icon: String,
			  readonly: {
			     type: Boolean,
			     default: false
			 },
		},
		data() {
			return {
				currentValue: this.value,
				
			};
		},
		methods:{
			 inputClasses () {
			    return [
			        `${prefixCls}`,
			        {
			            [`${prefixCls}-${this.size}`]: !!this.size,//大小
						
			        }
			    ];
			},
			iconClass(){
				const icon='ivu-icon';
				 return [
					 `${icon}`,
				    {
				        [`${icon}-${this.icon}`]: !!this.icon,//大小
						 [`${prefixCls}-${'icon'}`]: !!this.icon,//大小
				    }
				];
			},
			oneOf(value, validList){
				 for (let i = 0; i < validList.length; i++) {
				    if (value === validList[i]) {
				        return true;
				    }
				}
				return false;
			},
			handleIconClick (event) {
			    this.$emit('on-click', event);
				
			},
			 handleKeyup (event) {
			    this.$emit('on-keyup', event);
			},
			 handleFocus (event) {
			    this.$emit('on-focus', event);
			},
			handleBlur (event) {
			    this.$emit('on-blur', event);
			},
			 handleChange (event) {
			    this.$emit('on-input-change', event);
			},
			 handleInput (event) {			
			    let value = event.target.value;
				//将用户输入转化为number
			    if (this.number && value !== '') value = Number.isNaN(Number(value)) ? value : Number(value);
			    this.$emit('input', value);
			    this.setCurrentValue(value);
			    this.$emit('on-change', event);
			},
			setCurrentValue (value) {
			    if (value === this.currentValue) return;
			    this.currentValue = value;
			},
			
		},
		 watch: {
		    value (val) {
		        this.setCurrentValue(val);
		    }
		},
	}
</script>

<style scoped="scoped" lang="stylus">
	#inpurField{
		width: 100%;
		height: auto;
		.field{
			position: relative;
			width: 100%;
			height: 2rem;
			// background: red;
			.xs-input-icon{
				position: absolute;
				right: 3%;
				display: inline-block;
				height: 3rem;
				top: 26%;
				font-size: 1.2rem;
				
				z-index: 1000;
			}
			
			.xs-input{
				display: inline-block;
				width: 100%;
				height: 1.7rem;
				line-height: 1.7rem;
				padding: 2px 5px;
				font-size: 0.5rem;
				border: 1px solid #dcdee2;
				border-radius: 4px;
				color: #515a6e;
				background-color: #fff;
				background-image: none;
				position: relative;
				cursor: text;
				-webkit-transition: border .2s ease-in-out, background .2s ease-in-out, -webkit-box-shadow .2s ease-in-out;
				transition: border .2s ease-in-out, background .2s ease-in-out, -webkit-box-shadow .2s ease-in-out;
				transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
				transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out, -webkit-box-shadow .2s ease-in-out
			}
			.xs-input:hover {
				border-color: #2A3EEE
			}
			.xs-input:focus {
				border-color: #2A3EEE;
				outline: 0;
				-webkit-box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
				box-shadow: 0 0 0 2px rgba(45, 140, 240, .2)
			}
			.xs-input-small{
				width: 70%;
			}
			.xs-input-default{
				width: 100%;
			}
			.xs-input-large{
				width: 85%;
			}
			
		}
	}
</style>
