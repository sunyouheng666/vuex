<template id='employeeOfficeTree'>
	<li>
		<div :class="{bold: isFolder}" @click="toggle">
			<input type="checkbox" name="fanWei" :value="model.id" :checked="model.isChecked" @click.stop='setSelectArry'> {{model.label}}
			<span v-if="isFolder" style='font-size:18px;float:right;'>[{{open ? '-' : '+'}}]</span>
		</div>
		<ul v-show="open" v-if="isFolder">
			<employeeOfficeTree class="item" v-for="model,index in model.children" :model="model" :key="index" :selectedArray='selectedArray'>
			</employeeOfficeTree>
		</ul>
	</li>
</template>
<script>
	import Vue from 'vue'
	var EventTemp = new Vue();
	export default {
		data() {
			return {
				open: false,
				treeData: {},
			}
		},
		watch:{
			'isChecked':function(val,oldval){
			}
		},
		props: {
			model: Object,
			type: Object,
			default: {},
			selectedArray: {
				type: Array,
				default: []
			},
		},
		mounted() {

		},
		computed: {
			isFolder: function() {
				return this.model.children && this.model.children.length
			}
		},
		created: function() {

		},
		watch:{

		},
		components: {},
		methods: {
			getNode: function(nodeId, tree) {
				var self = this;
				//赋值，真假
				// tree.isChecked = true;//或者假
				if(tree.children && (tree.children.length > 0)) {
					for(var i = 0; i < tree.children.length; i++) {
						tree.children[i].isChecked = true;
					}
				}
			},
			reloadTree: function(data) {
				var nodeId = data;
				var self = this;
				self.getNode(nodeId, self.model);
			},
			toggle: function() {
				if(this.isFolder) {
					this.open = !this.open
				}
			},
			changeType: function() {
				if(!this.isFolder) {
					Vue.set(this.model, 'children', [])

					this.addChild()
					this.open = true
				}
			},
			addChild: function() {
				return;
				this.model.children.push({
					name: 'new stuff'
				})
			},
			queryId: function(moduleId) {
				var self = this;
			},
			setParentSelectArry: function(itemParent, item, status) {
				var self = this;
				if(itemParent == null) {
					return;
				}
				if(status) {
					var find = true;
					for(var i = 0; i < itemParent.children.length; i++) {
						if(!itemParent.children[i].isChecked && itemParent.children[i].id != item.id) {
							find = false;
							break;
						}
					}
					if(find) {
						self.$set(itemParent, "isChecked", status);
						self.setParentSelectArry(itemParent.parent, itemParent, status);
					}
					return;
				}
				self.$set(itemParent, "isChecked", status);
				if(itemParent.parent == null) {
					return;
				}
				self.setParentSelectArry(itemParent.parent, itemParent, status);
			},
			setChildSelectArray: function(item, status) {						// 
				var self = this;
				self.$set(item, "isChecked", status);
				if( item.children != null && item.children.length > 0 ) {
					for(var i = 0; i < item.children.length; i++) {
						self.setChildSelectArray(item.children[i], status);
					}
				}
			},
			setSelectArry: function(e) {								//行选中（取消）事件
				this.$set(this.model, "isChecked", e.target.checked);
				this.setParentSelectArry(this.model.parent, this.model, e.target.checked);
				if(this.model.children != null && this.model.children.length > 0) {
					for(var i = 0; i < this.model.children.length; i++) {
						this.setChildSelectArray(this.model.children[i], e.target.checked);
					}
				}
			},
		}
	}
</script>