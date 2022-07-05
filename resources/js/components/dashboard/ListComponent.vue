<template>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>Name</th>
				<th>Logic</th>
				<th>Status</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(popup_val, popup_key) in popup_data" :key="popup_key">
				<td>{{ popup_val.general_name }}</td>
				<td>

					
					<p v-if="popup_val.general_all_pages_status">
						<b>Pages: </b>All pages
					</p>
					<p v-else>
						<b v-show="popup_val.general_collections.data.length > 0 && popup_val.general_collections.status">Collections: </b>{{ popup_val.general_collections.data.join(', ') }}<br>
						<b v-show="popup_val.general_pages.data.length > 0 && popup_val.general_pages.status">Pages: </b>{{ popup_val.general_pages.data.join(', ') }}
					</p>
					<p v-show="popup_val.general_country_codes.data.length > 0 && popup_val.general_country_codes.status"><b>Country code: </b>{{ popup_val.general_country_codes.data.join(', ') }}</p>
				</td>
				<td>
					<!-- <input
						type="checkbox"
						name="my-checkbox"
						data-bootstrap-switch
						data-off-color="danger"
						data-on-color="success"
						:checked="popup_val.status"
					/> -->

					<switch-component v-model='popup_val.status' :id="popup_val.id"></switch-component>
				</td>
				<td>
					<a class="btn btn-success btn-sm" href="#" @click="editPopup(popup_val.id)">Edit</a>
					<a class="btn btn-danger btn-sm" href="#" @click="deletePopup(popup_val.id, $event)">Delete</a>
				</td>
			</tr>
			
			
		</tbody>
	</table>
</template>
<script>
import axios from 'axios';




let switch_component = Vue.component('switch-component', {
  	props: ['value', 'id'],
  	inheritAttrs: false,
  	template: `
	    <input
        type='checkbox'
        v-bind='$attrs'
        :checked='value'
		data-off-color="danger"
		data-on-color="success"
        @change='$emit("input", $event.target.checked)'>
	`,
	mounted() {
		let vm = this;
		$(vm.$el).bootstrapSwitch().on('switchChange.bootstrapSwitch', function(e) {
			// console.log(e.target.checked);
			// console.log(vm.id);
			// console.log(vm.value);
			// console.log(vm.$popup_data.route('update_popup_status')+'/'+vm.id);
			axios.post(vm.$popup_data.route('update_popup_status')+'/'+vm.id, {'id':vm.id, 'status':e.target.checked}).then(res => {
				if(res.data.status == "OK") {
					vm.$popup_data.message(res.data.message);
				}
			});
		});
	}
});





export default {
	beforeMount() {
		this.listFetch().then(function() {
			//$("input[data-bootstrap-switch]").bootstrapSwitch();
		});
	},
	// mounted() {
		// console.log('ListComponent');
		// console.log($("input[data-bootstrap-switch]"));
		
	// },
	data() {
		return {
			popup_data: []
		}
	},
	methods: {
		listFetch: async function () {
			let data = new Object;
			data.user_id = this.$popup_data.shop_id;
			return await axios.post(this.$popup_data.route('list_popup'), data).then(res => {
				this.popup_data = res.data.popup_data;
				this.$emit('checkContentAccessable', this.popup_data);
			});
		},
		editPopup: function (id) {
			this.$emit('editPopup', id);
		},
		deletePopup: function(id, event) {
			
			
			axios.delete(this.$popup_data.route('delete_popup')+'/'+id, {'_method':'DELETE','id':id}).then(res => {
				if(res.data.status == "OK") {
					this.$popup_data.message(res.data.message);
					// event.srcElement.closest('tr').remove();
					this.listFetch();
				}
			});
		}
	},
	components: {
		"switch-component": switch_component
	}
}
</script>