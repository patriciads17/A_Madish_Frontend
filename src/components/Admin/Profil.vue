<template>
    <v-main>
        <span class="bg"></span>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex-column align-center justify-center>
                <v-flex sm8 elevation-6>
                    <v-toolbar class="red darken-4">
                        <v-toolbar-title class="red--text">
                            <h1 class="white--text">Profil Account</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div class="container-grid">
                                <v-img class="img" :src="foto" alt="foto-profil"></v-img>
                                <div class="text-container">
                                    <v-row>
                                        <h3 class="nama-profil">Name</h3>
                                    </v-row>
                                    <v-row>
                                        <p class="desc-profil"><i class="fas fa-envelope"></i> Email</p>
                                    </v-row>
                                    <v-row>
                                        <p class="desc-profil"><i class="fas fa-phone-alt"></i> Phone Number</p>
                                    </v-row>
                                    <v-row>
                                        <p class="desc-profil"><i class="fas fa-map-marked-alt"></i> Address</p>
                                    </v-row>
                                </div>
                            </div>
                            <v-btn class="btn" color="red darken-3" dark @click="dialogEdit = true"> Edit Profil </v-btn>
                        </v-card-text>
                    </v-card>
                    <v-dialog v-model="dialogEdit" persistent max-width="600px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Update Profil</span>
                            </v-card-title>
                                
                            <v-card-text>
                                <v-container>
                                    <v-text-field
                                        v-model="user.name"
                                        label="Name">
                                    </v-text-field>
                                        
                                    <v-text-field
                                        v-model="user.email"
                                        label="Email">
                                    </v-text-field>

                                    <v-text-field
                                        v-model="user.address"
                                        label="Address">
                                    </v-text-field>
                                        
                                    <v-text-field
                                        v-model="user.phone_num"
                                        label="Phone Number">
                                    </v-text-field>
                                </v-container>
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="cancel">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="saveData">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
                        {{error_message}}
                    </v-snackbar>
                </v-flex>      
            </v-layout>
        </v-container>
    </v-main>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap');
    .red--text{
        font-family: 'Noto Serif', serif;
    }

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('https://www.highstreet.co.id/UserFiles/Image/bariuma/IKP_5792.jpg');;
        background-color: white;
        background-size: cover;
    }

    .posisinya{
        position: absolute;
        left: 0;
        right: 0;
    }

    .img{
        margin: 20px;
        width: 260px;
        height: 260px;
        border-radius: 50%;
    }

    .container-grid{
        display: grid;
        grid-template-columns: 300px 600px;
        align-items: center;
        vertical-align: middle;
    }

    .text-container{
        margin-left: 40px;
    }

    .nama-profil{
        margin-bottom: 60px;
        font-size: 45px;
    }

    .desc-profil{
        font-size: 25px;
    }

    .btn{
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
</style>

<script>
export default {
    name: "List",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            dialogEdit: false,
            user: new FormData,
            users: [],
            form: 
            {
                name: null,
                email: null,
                address: null,
                phone_num: null,
            },
            deleteId: '',
            editId: '',
            images: new FormData,
            image: null,
            imgPrev: null,
        };
    },
    methods: {
        //read data user
        readData() {
            var url = this.$api + '/show/' + localStorage.getItem('id')
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.user = response.data.data
            })
        },
        
        //ubah data user
        save() {
            let newData = {
                name: this.user.name,
                email: this.user.email,
            }
            var url = this.$api + '/update/' + localStorage.getItem('id');
            this.load = true
            this.$http.put(url, newData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.resetForm();
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },

        //ubah data user dan password
        saveData(){
            let newData = {
                name: this.user.name,
                email: this.user.email,
                address: this.user.address,
                phone_num: this.user.phone_num,
            }
            var url = this.$api + '/update/' + localStorage.getItem('id');
            this.load = true
            this.$http.put(url, newData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.resetForm();
                this.readData();
                this.dialogEdit = false;
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        
        cancel(){
            this.resetForm();
            this.dialogEdit = false;
            this.readData();
        },

        resetForm() {
            this.form = {
                name: null,
                email: null,
                address: null,
                phone_num: null,
            };
        },
    },
    
    computed: {
        formTitle() {
            return this.inputType
        },
    },
    
    mounted() {
        this.readData();
    },
};
</script>