<template>
    <form @submit.prevent="formSubmit">
        <b-tooltip
            target="tooltip-target-2"
            triggers="hover"
            placement="bottom"
        >{{ $popup_data.upgrade.message }}</b-tooltip>
        <b-tooltip
            target="tooltip-target-3"
            triggers="hover"
            placement="bottom"
        >{{ $popup_data.upgrade.message }}</b-tooltip>
        <div class="card card-primary card-outline card-outline-tabs">
            <div class="card-header p-0 border-bottom-0">
                <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            id="custom-tabs-four-general-tab"
                            data-toggle="pill"
                            href="#custom-tabs-four-general"
                            role="tab"
                            aria-controls="custom-tabs-four-general"
                            aria-selected="true"
                        >General</a>
                    </li>
                    <li class="nav-item active">
                        <a
                            class="nav-link"
                            id="custom-tabs-four-design-tab"
                            data-toggle="pill"
                            href="#custom-tabs-four-design"
                            role="tab"
                            aria-controls="custom-tabs-four-design"
                            aria-selected="false"
                        >Design</a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content" id="custom-tabs-four-tabContent">
                    <div
                        class="tab-pane fade show active"
                        id="custom-tabs-four-general"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-four-general-tab"
                    >
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="general_name">Name</label>
                                    <input
                                        type="text"
                                        name="general[name]"
                                        id="general_name"
                                        v-model="general.name"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="general_session_duration">Session Duration (in days)</label>
                                    <input
                                        type="number"
                                        name="general[session_duration]"
                                        id="general_session_duration"
                                        v-model="general.session_duration"
                                        class="form-control"
                                    />
                                    <p
                                        class="session_duration mb-0 mt-0"
                                    >*If you want to open popup every time then need to be set 0 value In new incognito page every time popup shows.</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="general_popup_delay">Popup delay (in ms)</label>
                                    <input
                                        type="number"
                                        name="general[popup_delay]"
                                        id="general_popup_delay"
                                        v-model="general.popup_delay"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group mb-0">
                                    <div class="collections-label d-flex justify-content-between">
                                        <label for="general_country_codes">Country codes</label>

                                        <div
                                            v-if="!check_content_accessable"
                                            id="tooltip-target-2"
                                            class="custom-control custom-switch"
                                        >
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                disabled
                                            />
                                            <label class="custom-control-label"></label>
                                        </div>
                                        <div v-else class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="general_country_codes_status"
                                                name="general[country_codes][status]"
                                                v-model="general.country_codes.status"
                                                @change="changeStatus('country_codes')"
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="general_country_codes_status"
                                            ></label>
                                        </div>
                                    </div>

                                    <input-tag
                                        :disabled="!check_content_accessable"
                                        :title="!check_content_accessable ? $popup_data.upgrade.message : false"
                                        v-if="general.country_codes.status"
                                        id="general_country_codes_data"
                                        name="general[country_codes][data]"
                                        v-model="general.country_codes.data"
                                    ></input-tag>
                                </div>
                                <p class="session_duration mb-0">
                                    <b>Note:</b> Use
                                    <a
                                        target="_blank"
                                        href="https://www.iban.com/country-codes"
                                    >ISO Alpha 2 Country Codes</a> separated with commas.
                                </p>
                                <p
                                    class="session_duration mb-0 mt-0"
                                >**Pop up will be shown only in countries mentioned above.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <div v-if="!check_content_accessable" id="tooltip-target-3" class="custom-control custom-switch d-inline">
                                        <input                                            
                                            :disabled="!check_content_accessable"
                                            type="checkbox"
                                            class="custom-control-input"
                                            v-model="general.all_pages_status"
                                        />
                                        <label
                                            class="custom-control-label"
                                        >Show popup on: All pages</label>
                                    </div>

                                    <div v-else class="custom-control custom-switch">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="general_all_pages"
                                            name="general[all_pages_status]"
                                            v-model="general.all_pages_status"
                                            value="true"
                                            @change="changeStatus('all_pages_status')"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="general_all_pages"
                                        >Show popup on: All pages</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!general.all_pages_status" class="row">
                            <div class="col">
                                <div class="form-group">
                                    <div class="collections-label d-flex justify-content-between">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="general_collection_status"
                                                name="general[collections][status]"
                                                v-model="general.collections.status"
                                                @change="changeStatus('collections')"
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="general_collection_status"
                                            >Change Collections Status</label>
                                            <!-- <label for="general_collections">Select Collections</label> -->
                                        </div>
                                    </div>
                                    <select-2
                                        v-if="general.collections.status"
                                        :name="'general[collections][data]'"
                                        :options="collections"
                                        :multiple="true"
                                        :value="general.collections.data"
                                        v-model="general.collections.data"
                                        data-placeholder="Select collections"
                                    ></select-2>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <div class="collections-label d-flex justify-content-between">
                                        <div class="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="general_pages_status"
                                                name="general[pages][status]"
                                                value="true"
                                                v-model="general.pages.status"
                                                @change="changeStatus('pages')"
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="general_pages_status"
                                            >Change Pages Status</label>
                                            <!-- <label for="general_pages_data">Select Pages</label> -->
                                        </div>
                                    </div>

                                    <select-2
                                        v-if="general.pages.status"
                                        :name="'general[pages][data]'"
                                        :options="pages"
                                        :multiple="true"
                                        :value="general.pages.data"
                                        v-model="general.pages.data"
                                        data-placeholder="Select pages"
                                    ></select-2>
                                </div>
                            </div>

                            <!-- <div class="col-md-6">
										<div class="form-group">
										</div>
                            </div>-->
                        </div>
                    </div>
                    <div
                        class="tab-pane fade"
                        id="custom-tabs-four-design"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-four-design-tab"
                    >
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="template-cotainer col-md-12">
                                    <div
                                        class="template-cotainer-item"
                                        v-for="(design_template_val, design_template_key) in design_templates"
                                        :key="'template_' + design_template_key"
                                    >
                                        <input
                                            type="radio"
                                            name="design[template]"
                                            :id="'design_template_' + design_template_val.slug"
                                            :value="design_template_val.slug"
                                            v-model="default_template"
                                        />
                                        <label :for="'design_template_' + design_template_val.slug">
                                            <img :src="design_template_val.src" />
                                            <p
                                                class="text-center"
                                            >{{ design_template_val.template_name }}</p>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label
                                            for="general_popup_box_background_color_opacity"
                                        >Popup Box Background Color & Opacity</label>
                                        <div
                                            class="input-group my-colorpicker2"
                                            :data-color="design.popup_box_background_color_opacity"
                                        >
                                            <input
                                                type="text"
                                                name="design[popup_box_background_color_opacity]"
                                                id="general_popup_box_background_color_opacity"
                                                class="form-control"
                                                v-model="design.popup_box_background_color_opacity"
                                            />

                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    <i
                                                        class="fas fa-square"
                                                        :style="{ color: design.popup_box_background_color_opacity }"
                                                    ></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label
                                            for="general_popup_boxcolor_opacity"
                                        >Popup Box Color & Opacity</label>
                                        <div class="input-group my-colorpicker2">
                                            <input
                                                type="text"
                                                name="design[popup_box_color_opacity]"
                                                id="general_popup_box_color_opacity"
                                                class="form-control"
                                                v-model="design.popup_box_color_opacity"
                                            />

                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    <i
                                                        class="fas fa-square"
                                                        :style="{ color: design.popup_box_color_opacity }"
                                                    ></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="design[background_design]">Select popup Image</label>
                                        <div class="custom-file">
                                            <input
                                                type="file"
                                                class="custom-file-input"
                                                id="design_background_image"
                                                name="design[background_image]"
                                                @change="changeFile($event)"
                                            />
                                            <label
                                                class="custom-file-label"
                                                for="design_background_image"
                                            >{{ design_background_image_prev_text }}</label>
                                        </div>

                                        <vue-cropper
                                            ref="cropper"
                                            :src="design.background_image"
                                            alt="Background image"
                                            class="w-100 mt-3"
                                            :minContainerHeight="300"
                                            :minContainerWidth="300"
                                            :zoomable="false"
                                            @cropend="crop"
                                        ></vue-cropper>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label
                                            for="design_popup_width"
                                        >Popup Width (in {{ design.popup_width }} %)</label>
                                        <input
                                            type="range"
                                            class="custom-range custom-range-teal"
                                            id="design_popup_width"
                                            name="design[popup_width]"
                                            v-model="design.popup_width"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="design_heading_text">Heading</label>
                                        <input
                                            type="text"
                                            name="design[heading][text]"
                                            id="design_heading_text"
                                            class="form-control"
                                            placeholder="Heading ..."
                                            v-model="design.heading.text"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-6 form-group text-center">
                                            <label for="design_heading_color">Heading Color</label>
                                            <div class="input-group my-colorpicker2">
                                                <input
                                                    type="text"
                                                    name="design[heading][color]"
                                                    id="design_heading_color"
                                                    class="form-control"
                                                    v-model="design.heading.color"
                                                />

                                                <div class="input-group-append">
                                                    <span class="input-group-text">
                                                        <i
                                                            class="fas fa-square"
                                                            :style="{ color: design.heading.color }"
                                                        ></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6 form-group text-center">
                                            <label for="design_heading_font_size">Font Size</label>

                                            <!-- <input
                                                type="hidden"
                                                name="design[heading][font_size]"
                                                id="design_heading_font_size"
                                                class="form-control"
                                                v-model="design.heading.font_size"
                                            />-->
                                            <div class="input-group mb-3">
                                                <input
                                                    type="number"
                                                    v-model="design.heading.font_size.number"
                                                    class="form-control"
                                                />
                                                <select
                                                    class="form-select"
                                                    v-model="design.heading.font_size.params"
                                                >
                                                    <option
                                                        v-for="(parameter_key, parameter_val) in parameters"
                                                        :key="parameter_key"
                                                        :value="parameter_key"
                                                    >{{ parameter_val }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="design_message">Message</label>

                                        <editor
                                            api-key="djetm123w6y8w8nnwln9s9rwkxj0fuq12pulgpq85m0l4frr"
                                            :init="editorConfig"
                                            v-model="design.message"
                                        />
                                    </div>
                                </div>

                                <div class="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="design_button_status"
                                        name="design[button][status]"
                                        value="true"
                                        v-model="design.button.status"
                                    />
                                    <label
                                        class="custom-control-label"
                                        for="design_button_status"
                                    >Change Button Status</label>
                                </div>

                                <div v-if="design.button.status">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="design_button_text">Button text</label>
                                            <input
                                                type="text"
                                                name="design[button][text]"
                                                id="design_button_text"
                                                class="form-control"
                                                v-model="design.button.text"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="design_button_action">Button action</label>
                                            <select
                                                @change="changeButtonAction"
                                                v-model="design.button.action.type"
                                                class="form-control"
                                            >
                                                <option
                                                    v-for="(button_action_val, button_action_key) in button_action"
                                                    :key="button_action_key"
                                                    :value="button_action_key"
                                                >{{ button_action_val }}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        v-if="design.button.action.type != 'close'"
                                        class="col-md-12"
                                    >
                                        <div class="form-group">
                                            <label for="design_button_text">Button action link</label>
                                            <input
                                                type="text"
                                                name="design[button][action][link]"
                                                id="design_button_action_link"
                                                class="form-control"
                                                v-model="design.button.action.link"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <label>Button color</label>
                                        <div class="row text-center">
                                            <div class="col">
                                                <div class="form-group">
                                                    <!-- <input
                                                        type="color"
                                                        name="design[button][color]"
                                                        id="design_button_color"
                                                        class="form-control"
                                                        v-model="design.button.color"
                                                    />-->

                                                    <div class="input-group my-colorpicker2">
                                                        <input
                                                            type="text"
                                                            name="design[button][color]"
                                                            id="design_button_color"
                                                            class="form-control"
                                                            v-model="design.button.color"
                                                        />

                                                        <div class="input-group-append">
                                                            <span class="input-group-text">
                                                                <i
                                                                    class="fas fa-square"
                                                                    :style="{ color: design.button.color }"
                                                                ></i>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <label for="design_button_color">color</label>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-group">
                                                    <!-- <input
                                                        type="color"
                                                        name="design[button][background_color]"
                                                        id="design_button_background_color"
                                                        class="form-control"
                                                        v-model="design.button.background_color"
                                                    />-->
                                                    <div class="input-group my-colorpicker2">
                                                        <input
                                                            type="text"
                                                            name="design[button][background_color]"
                                                            id="design_button_background_color"
                                                            class="form-control"
                                                            v-model="design.button.background_color"
                                                        />

                                                        <div class="input-group-append">
                                                            <span class="input-group-text">
                                                                <i
                                                                    class="fas fa-square"
                                                                    :style="{ color: design.button.background_color }"
                                                                ></i>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <label
                                                        for="design_button_background_color"
                                                    >background</label>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-group">
                                                    <!-- <input
                                                        type="color"
                                                        name="design[button][border_color]"
                                                        id="design_button_border_color"
                                                        class="form-control"
                                                        v-model="design.button.border_color"
                                                    />-->
                                                    <div class="input-group my-colorpicker2">
                                                        <input
                                                            type="text"
                                                            name="design[button][border_color]"
                                                            id="design_button_border_color"
                                                            class="form-control"
                                                            v-model="design.button.border_color"
                                                        />

                                                        <div class="input-group-append">
                                                            <span class="input-group-text">
                                                                <i
                                                                    class="fas fa-square"
                                                                    :style="{ color: design.button.border_color }"
                                                                ></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <label for="design_button_border_color">border</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="design_button_font_size">Button font size</label>
                                            <div class="input-group mb-3">
                                                <input
                                                    type="number"
                                                    class="form-control"
                                                    v-model="design.button.font_size.number"
                                                />
                                                <select
                                                    class="form-select"
                                                    v-model="design.button.font_size.params"
                                                >
                                                    <option
                                                        v-for="(parameter_key, parameter_val) in parameters"
                                                        :key="parameter_key"
                                                        :value="parameter_key"
                                                    >{{ parameter_val }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="design_button_padding">Button padding</label>
                                            <div class="input-group mb-3">
                                                <input
                                                    type="number"
                                                    v-model="design.button.padding.number.top"
                                                    class="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    v-model="design.button.padding.number.right"
                                                    class="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    v-model="design.button.padding.number.bottom"
                                                    class="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    v-model="design.button.padding.number.left"
                                                    class="form-control"
                                                />
                                                <select
                                                    class="form-select"
                                                    v-model="design.button.padding.params"
                                                >
                                                    <option
                                                        v-for="(parameter_key, parameter_val) in parameters"
                                                        :key="parameter_key"
                                                        :value="parameter_key"
                                                    >{{ parameter_val }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="design_button_spacing">Button spacing</label>

                                            <div class="input-group mb-3">
                                                <input
                                                    type="number"
                                                    v-model="design.button.spacing.number.top"
                                                    class="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    v-model="design.button.spacing.number.right"
                                                    class="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    v-model="design.button.spacing.number.bottom"
                                                    class="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    v-model="design.button.spacing.number.left"
                                                    class="form-control"
                                                />
                                                <select
                                                    class="form-select"
                                                    v-model="design.button.spacing.params"
                                                >
                                                    <option
                                                        v-for="(parameter_key, parameter_val) in parameters"
                                                        :key="parameter_key"
                                                        :value="parameter_key"
                                                    >{{ parameter_val }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>-->
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div id="preview">
                                    <preview-mobile-desktop :design="design">
                                        <button
                                            :class="add_button.class"
                                            @click="addPopup"
                                            type="button"
                                        >{{ add_button.text }}</button>
                                    </preview-mobile-desktop>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
.template-cotainer {
    display: flex;
}
.template-cotainer-item {
    margin: 3px;
}
.template-cotainer-item [type="radio"]:checked ~ label {
    border: 4px solid rgb(33, 33, 128);
    position: relative;
}
.template-cotainer-item [type="radio"]:checked ~ label:before {
    padding: 5px 7px;
    background-color: rgb(33, 33, 128);
    color: white;
    position: absolute;
    top: -4px;
    right: -4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f00c";
}

.template-cotainer-item [type="radio"] {
    width: 0px;
}
.template-cotainer-item label {
    /* width: 70px; */
    /* padding: 15px; */
    border: 4px solid rgb(187, 187, 187);
}
.template-cotainer-item img {
    width: 100%;
}
#preview {
    position: relative;
}

.session_duration {
    font-size: 14px;
    color: #6d7175;
}
/* .vue-input-tag-wrapper .input-tag {
    background-color: #007bff;
    border-color: #006fe6;
    color: #fff;
    padding: 1px 12px;
    margin: 4px;
    border-radius: 5px;
} */
</style>
<style>
.vue-input-tag-wrapper .input-tag .remove {
    color: #ffffff;
}
.vue-input-tag-wrapper .input-tag {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;

    background-color: #007bff;
    border-color: #006fe6;
    color: #fff;
    padding: 1px 12px;
    margin: 4px;
    border-radius: 5px;
}
</style>
<script>
import axios from "axios";
// import VueMobileSizedView from 'vue-mobile-sized-view';
import PreviewMobileDesktop from './PreviewMobileDesktop';

import Editor from '@tinymce/tinymce-vue'
import InputTag from 'vue-input-tag'

import VueCropper from 'vue-cropperjs';



import 'cropperjs/dist/cropper.css';

let select_2 = Vue.component('select-2', {
    template: `<select
                class="select2"
                v-bind:name="name"
                v-bind:multiple="multiple"
                style="width: 100%"
                v-model="value"
            >
                <option
                    v-for="(option_val, option_key) in options"
                    :value="option_val"
                    :key="'option-' + option_key"
                >{{ option_val }}</option>
            </select>`,
    props: {
        name: '',
        options: {
            Object
        },
        value: {
            Array
        },
        multiple: {
            Boolean,
            default: false

        }
    },
    //   data() {
    // return {
    //   select2data: []
    // }
    //   },
    mounted() {
        // this.formatOptions()
        // console.log('value', this.value);
        let vm = this
        let select = $(this.$el)
        select.val(this.value).trigger('change')
        select.select2().on('change', function () {
            vm.$emit('input', select.val())
        });
    },
    // beforeUpdate() {
    // console.log(this.value);
    // console.log(this.value.length);
    // let vm = this
    // let select = $(this.$el)
    // select.off().select2('destroy')
    // select.val(this.value).trigger('change')
    // select.select2().on('change', function () {
    //     vm.$emit('input', select.val())
    // });
    // },
    // methods: {
    // formatOptions() {
    //   this.select2data.push({ id: '', text: 'Select' })
    //   for (let key in this.options) {
    //     this.select2data.push({ id: key, text: this.options[key] })
    //   }
    // }
    // },
    beforeDestroy: function () {
        $(this.$el).off().select2('destroy')
    },
    beforeUnmount: function () {
        $(this.$el).off().select2('destroy')
    }
})


export default {
    props: {
        edit_data: Object,
        add_button: Object,
        check_content_accessable: Boolean
    },
    beforeMount() {
        this.addEditPreloadData();
        this.designBuild();
        this.generalBuild();
    },
    mounted() {
        let cp = $(".my-colorpicker2").colorpicker(
            {
                inline: false,
                container: true,
                format: null,
                // customClass: 'colorpicker-2x',
                // sliders: {
                //     saturation: {
                //         maxLeft: 200,
                //         maxTop: 200
                //     },
                //     hue: {
                //         maxTop: 200
                //     },
                //     alpha: {
                //         maxTop: 200
                //     }
                // }
            }
        );
        let temp_this = this;
        cp.on("colorpickerChange, colorpickerUpdate", function (event) {
            // console.log(event);
            $(event.target).find(".fa-square").css("color", event.value);

            if ($(event.target).find('[name]').attr('name') == 'design[popup_box_color_opacity]') {
                temp_this.design.popup_box_color_opacity = event.value;
            } else if ($(event.target).find('[name]').attr('name') == 'design[popup_box_background_color_opacity]') {
                temp_this.design.popup_box_background_color_opacity = event.value;
            } else if ($(event.target).find('[name]').attr('name') == 'design[heading][color]') {
                temp_this.design.heading.color = event.value;
            } else if ($(event.target).find('[name]').attr('name') == 'design[button][color]') {
                temp_this.design.button.color = event.value;
            } else if ($(event.target).find('[name]').attr('name') == 'design[button][background_color]') {
                temp_this.design.button.background_color = event.value;
            } else if ($(event.target).find('[name]').attr('name') == 'design[button][border_color]') {
                temp_this.design.button.border_color = event.value;
            }
        });
    },
    watch: {
        default_template: function (val) {
            if (this.edit_data.hasOwnProperty('design')) {
                this.design.template = val;
            } else {
                this.design = this.changeTemplate(val);
                this.$refs.cropper.replace(this.design.background_image);
            }

            if (this.design.hasOwnProperty('__ob__')) {
                this.design.__ob__.dep.notify();
            }
        }
    },
    data: function () {
        return {
            tags: ["abcd"],
            default_template: "template_1",
            collections: [],
            design: {},
            general: {},
            button_action: {
                'close': 'Close Popup',
                'open_custome_link': 'Open Custome Link',
                'open_custome_link_new_tab': 'Open Custome Link New Tab',
            },

            pages: [],
            design_templates: [
                {
                    template_name: "Template 1",
                    slug: "template_1",
                    src: this.$popup_data.asset("images/template_1.jpg"),
                    design: {
                        // template: "template_1",
                        popup_box_background_color_opacity: "#1D01B000",
                        popup_box_color_opacity: "#1D01B0",
                        background_image: this.$popup_data.asset("images/template_1.png"),
                        popup_width: "80",
                        heading: {
                            text: "Are you of legal smoking stage ?",
                            color: "#FFFFFF",
                            font_size: {
                                number: "30",
                                params: "px"
                            }
                        },
                        message: `<p><span style="color: #ecf0f1;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolores repellat dolorem laborum voluptas iste vero nostrum libero? Iusto accusantium quidem aliquid odit officiis exercitationem est ducimus nesciunt esse reprehenderit?</span></p>`,
                        button: {
                            status: true,
                            text: "Yes",
                            action: {
                                type: "close",
                                link: ""
                            },
                            color: "#fff",
                            background_color: "#1D01B0",
                            border_color: "#fff",
                            font_size: {
                                number: "17",
                                params: "px"
                            },
                            padding: {
                                number: {
                                    top: "5",
                                    right: "30",
                                    bottom: "5",
                                    left: "30"
                                },
                                params: "px"
                            },
                            spacing: {
                                number: {
                                    top: "15",
                                    right: "15",
                                    bottom: "15",
                                    left: "15"
                                },
                                params: "px"
                            }
                        }
                    }

                },
                {
                    template_name: "Template 2",
                    slug: "template_2",
                    src: this.$popup_data.asset("images/template_2.jpg"),
                    design: {
                        // template: "template_2",
                        popup_box_background_color_opacity: "#1D01B000",
                        popup_box_color_opacity: "#1D01B0",
                        background_image: this.$popup_data.asset("images/template_2.png"),
                        popup_width: "80",
                        heading: {
                            text: "Are you of legal smoking stage ?",
                            color: "#FFFFFF",
                            font_size: {
                                number: "30",
                                params: "px"
                            }
                        },
                        message: `<p><span style="color: #ecf0f1;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolores repellat dolorem laborum voluptas iste vero nostrum libero? Iusto accusantium quidem aliquid odit officiis exercitationem est ducimus nesciunt esse reprehenderit?</span></p>`,
                        button: {
                            status: true,
                            text: "Yes",
                            action: {
                                type: "close",
                                link: ""
                            },
                            color: "#fff",
                            background_color: "#1D01B0",
                            border_color: "#fff",
                            font_size: {
                                number: "17",
                                params: "px"
                            },
                            padding: {
                                number: {
                                    top: "5",
                                    right: "30",
                                    bottom: "5",
                                    left: "30"
                                },
                                params: "px"
                            },
                            spacing: {
                                number: {
                                    top: "15",
                                    right: "15",
                                    bottom: "15",
                                    left: "15"
                                },
                                params: "px"
                            }
                        }
                    }
                },
                {
                    template_name: "Template 3",
                    slug: "template_3",
                    src: this.$popup_data.asset("images/template_3.jpg"),
                    design: {
                        popup_box_background_color_opacity: "#1D01B000",
                        // template: "template_3",
                        popup_box_color_opacity: "#1D01B0",
                        background_image: this.$popup_data.asset("images/template_3.png"),
                        popup_width: "80",
                        heading: {
                            text: "Are you of legal smoking stage ?",
                            color: "#FFFFFF",
                            font_size: {
                                number: "30",
                                params: "px"
                            }
                        },
                        message: `<p><span style="color: #ecf0f1;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolores repellat dolorem laborum voluptas iste vero nostrum libero? Iusto accusantium quidem aliquid odit officiis exercitationem est ducimus nesciunt esse reprehenderit?</span></p>`,
                        button: {
                            status: true,
                            text: "Yes",
                            action: {
                                type: "close",
                                link: ""
                            },
                            color: "#fff",
                            background_color: "#1D01B0",
                            border_color: "#fff",
                            font_size: {
                                number: "17",
                                params: "px"
                            },
                            padding: {
                                number: {
                                    top: "5",
                                    right: "30",
                                    bottom: "5",
                                    left: "30"
                                },
                                params: "px"
                            },
                            spacing: {
                                number: {
                                    top: "15",
                                    right: "15",
                                    bottom: "15",
                                    left: "15"
                                },
                                params: "px"
                            }
                        }
                    }
                }
            ],
            parameters: {
                'px': 'px',
                '%': '%',
                'em': 'em'
            },
            design_background_image_prev_text: "Choose file",
            editorConfig: {

                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'code'
                ],
                toolbar: 'undo redo | formatselect | bold italic forecolor backcolor emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | source | code'
            }
        };
    },
    methods: {
        changeButtonAction() {
            if (this.design.button.action.type == 'close') {
                this.design.button.action.link = "";
            } else {
                if (!_.has(this.design.button.action, 'link') || this.design.button.action.link == null || this.design.button.action.link == "") {
                    this.design.button.action.link = "https://";
                }
            }
        },
        addPopup() {
            this.$emit('addPopup');
        },
        changeStatus(type) {
            if (this.check_content_accessable) {
                if (this.general[type].hasOwnProperty('status')) {
                    if (!this.general[type]['status']) {
                        this.general[type]["data"] = [];
                    }
                } else {
                    // console.log(this.general[type]);
                    if (this.general[type]) {
                        this.general.collections.status = false;
                        this.general.collections.data = [];
                        this.general.pages.status = false;
                        this.general.pages.data = [];
                    }
                }
            } else {
                if (this.general[type].hasOwnProperty('status')) {
                    this.general[type]['status'] = false;
                    this.general[type]['data'] = [];
                } else {
                    this.general[type] = true;
                }
                this.$popup_data.message(this.$popup_data.upgrade.message, false);
            }
        },
        generalBuild() {
            let general;
            if (this.edit_data.hasOwnProperty('general')) {
                general = this.edit_data.general
                // console.log('ffffff', general);
                // console.log('ffffff', general.collections.data);
            } else {
                general = {
                    name: "Template name",
                    all_pages_status: true,
                    session_duration: 1,
                    popup_delay: 0,
                    collections: {
                        status: false,
                        data: []
                    },
                    pages: {
                        status: false,
                        data: []
                    },
                    country_codes: {
                        status: false,
                        data: []
                    }
                };
            }

            // console.log(this.check_content_accessable);
            if (!this.check_content_accessable) {
                general = _.merge(general,
                    {
                        all_pages_status: true,
                        collections: {
                            status: false,
                            data: []
                        },
                        pages: {
                            status: false,
                            data: []
                        },
                        country_codes: {
                            status: false,
                            data: []
                        }
                    }
                );
                console.log(general);
            }
            // console.log(this.check_content_accessable);
            this.general = general;
        },
        designBuild() {
            // let temp_this = this;
            let design;
            if (this.edit_data.hasOwnProperty('design')) {
                design = this.edit_data.design;
                this.default_template = design.template;
            } else {
                design = this.changeTemplate(this.default_template);
            }
            this.design = design;
        },
        changeTemplate(template) {
            let design;
            this.design_templates.forEach(val => {
                if (val.slug == template) {
                    design = val.design;
                    design.template = template;
                }
            });
            return design;
        },
        formSubmit: function () {
            this.$emit('savePopuop', this.general, this.design);
        },
        addEditPreloadData: function () {
            // let data = new Object;
            let data_obj = { params: { shop: this.$popup_data.shop } };
            return axios
                .get(this.$popup_data.route("add_edit_preload_data"), data_obj)
                .then((res) => {
                    this.collections = res.data.collections;
                    this.pages = res.data.pages
                    // this.select2();
                });
        },
        changeFile: function (e) {
            this.design_background_image_prev_text = e.target.files[0].name;
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.design.background_image = e.target.result;
                this.$refs.cropper.replace(e.target.result);
                // this.$refs.cropper.initCrop();
            };
            reader.readAsDataURL(file);
        },
        crop(data, res) {

            this.design.background_image = data.srcElement.cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 }).toDataURL('image/jpeg');

        }
    },
    components: {
        'editor': Editor,
        "preview-mobile-desktop": PreviewMobileDesktop,
        'input-tag': InputTag,
        "select-2": select_2,
        VueCropper
    },
};
</script>
