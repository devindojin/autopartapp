<template>
    <div class="row justify-content-center align-self-center">
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                            <h5>Basic Plan</h5>
                            <h6>FREE</h6>
                        </div>
                        <div class="card-body">
                            <div class="planupgradebtn text-center my-3">
                                <a
                                    :href="route_name['cancel_charges']"
                                    @click.prevent="cancelCharges"
                                    :class="acive_plan['charge'] ? notActive['class'] : active['class']"
                                >{{ acive_plan['charge'] ? notActive['text'] : active['text'] }}</a>
                            </div>
                            <div class="plan-info">
                                <ul>
                                    <li>Single Popup</li>
                                    <li>Mobile responsive</li>
                                    <li>Customizable popup</li>
                                    <li>Zero coding</li>
                                    <li>FREE customer support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                            <h5>{{ plan[0]['name'] }}</h5>
                            <h6>${{ plan[0]['price'] }}/month</h6>
                        </div>
                        <div class="card-body">
                            <div class="planupgradebtn text-center my-3">
                                <a
                                    :href="route_name['custome_billing'] + '/1'"
                                    @click.prevent="billing"
                                    :class="acive_plan['charge'] ? active['class'] : notActive['class']"
                                >{{ acive_plan['charge'] ? active['text'] : notActive['text'] }}</a>
                            </div>
                            <div class="plan-info">
                                <ul>
                                    <li>All Basic Plan features +</li>
                                    <li>Country based popup</li>
                                    <li>Multiple popups</li>
                                    <li>Show popup on specific page or collection</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>import axios from "axios";

export default {
    beforeMount() {
        // axios.get(this.route_name.get_billing_data+'?shop='+this.shop)
        // .then(response => {
        //     this.plan = response.data.plan;
        // });

        this.getPlanData();
        this.getBillingData();
    },
    mounted() {
        this.$emit('pagetitlechange', this.page_title);


    },
    data: function () {
        return {
            page_title: "Plan",
            plan: [
                { name: 'test 1' }
            ],
            route_name: this.$popup_data['route_name'],
            shop: this.$popup_data['shop'],
            acive_plan: {
                'check': false,
                'object': ''
            },
            active: {
                "class": { 'btn': true, 'btn-secondary': true, 'disabled': true },
                "text": 'Activated',
            },
            notActive: {
                "class": { 'btn': true, 'btn-primary': true },
                "text": 'Choose this Plan'
            }
        }
    },
    methods: {
        billing(elt) {
            let data_obj = { params: { 'shop': this.shop } };
            axios.get(elt.target.href, data_obj).then(res => {
                window.top.location.href = res.data.url
            })
        },
        cancelCharges(elt) {
            let data_obj = { params: { 'shop': this.shop } };
            axios.get(elt.target.href, data_obj).then(res => {
                if (res.status == 200) {
                    res = res.data;
                    if (res.status == "OK") {
                        // this.$emit('message' ,res.message);
                        this.$popup_data.message(res.message);
                        this.getBillingData();
                    } else {
                        // this.$emit('message' ,res.message);
                        this.$popup_data.message(res.message);
                    }
                } else {
                    // this.$emit('message' ,'Something went wrong!' ,false);
                    this.$popup_data.message('Something went wrong!', false);
                }
            })
        },
        getBillingData() {
            axios.get(this.route_name.get_billing_data + '?shop=' + this.shop)
                .then(response => {
                    this.acive_plan = response.data.acive_plan;
                    this.$popup_data.active_plane = response.data.acive_plan;
                    popup_data.active_plane = response.data.acive_plan;
                });
        },
        getPlanData() {
            axios.get(this.route_name.get_plan_data + '?shop=' + this.shop)
                .then(response => {
                    this.plan = response.data.plan;
                });
        }

    },
}
</script>
