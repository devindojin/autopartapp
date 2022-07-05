<template>
    <div>
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h3 class="card-title">{{ page_title }}</h3>
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'dashboard'}">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active">
                                {{ page_title }}
                            </li>
                        </ol>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <!-- Default box -->
                        <div class="card">
                            <div class="card-header">
                                

                                <div class="card-tools">
                                    <button
                                        type="button"
                                        class="btn btn-tool"
                                        data-card-widget="collapse"
                                        title="Collapse"
                                    >
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <router-view @pagetitlechange="pagetitlechange" @message="message" />
                            </div>
                            <!-- /.card-body -->
                            <!-- <div class="card-footer">
                Footer
                            </div>-->
                            <!-- /.card-footer-->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log('layout mounted.')
    },
    data: function () {
        return {
            page_title: ""
        }
    },
    methods: {
        pagetitlechange: function (page_title) {
            this.page_title = page_title;
            let page_obj = { title: this.page_title };
            //actions.TitleBar.create(app, page_obj);
        },
        message: function (message, success = true) {
            let obj = {
                message: message,
                duration: 3000,
            }
            if (!success) {
                obj.isError = true;
            }
            if(this.$popup_data['appbridge_enabled']) {
                var toastNotice = actions.Toast.create(app, obj);
                toastNotice.dispatch(actions.Toast.Action.SHOW);
            } else {
                // console.log(actions.Toast.Action.SHOW);
            }
        }
    },
}
</script>
