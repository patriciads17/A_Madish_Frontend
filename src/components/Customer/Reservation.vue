<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5"> Reservation </h3>
        
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Create </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="reservations" :search="search" > 
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small  class="mr-2" @click="editHandler(item)"> Edit </v-btn>
                    <v-btn small  @click="deleteHandler(item.id)"> Delete </v-btn> 
                </template>
            </v-data-table> 

        </v-card> 

        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title>
                    <span class="headline">{{ formTitle }} Reservation</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-text-field v-model="form.name" label="Booked By" required ></v-text-field>
                        <v-text-field type="tel" v-model="form.phone_num" label="Phone Number" required ></v-text-field>
                        <v-text-field type="number" v-model="form.num_customer" label="Amount of Customer" required ></v-text-field>
                        <v-select v-model="form.room" :items="roomTypes" label="Room" required ></v-select>
                        <v-date-picker label="Select Datetime" mode="date" v-model="form.booking_date"> </v-date-picker>
                    </v-container> 
                </v-card-text> 
                <v-card-actions>
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn> 
                </v-card-actions> 
            </v-card> 
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
          <v-card>
            <v-card-title>
                <span class="headline"> Warning! </span>
            </v-card-title>
            <v-card-text> Are you sure you want to CANCEL this reservation? </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main> 
</template>

<script> 
export default {
    name: "List",
    data() { 
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null, 
            dialog: false, 
            dialogConfirm: false,
            roomTypes: ["Smoking Area", "Non-Smoking Area"],
            headers: [
                { text: "Reservation ID", align: "start", sortable: true, value: "id_reservation",},
                { text: "Booked By", value: "name" },
                { text: "Phone Number", value: "phone_num"},
                { text: "Number of Customers", value: "num_customer" },
                { text: "Booking Date", value: "booking_date" },
                { text: "Room", value:"room"},
                { text: "Table Number", value:"num_table"},
                { text: "Actions", value: "actions" },
            ],
            reservation: new FormData,
            reservations: [],
            form:{
                name: "",
                num_customer: "",
                booking_date: "",
                phone_num: "",
                room: "",
            },
            deleteId: '',
            editId: ''
        };
    },


    methods: { 
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },

        readData() {
            var url = this.$api + '/reservation';
            this.$http.get(url, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.courses = response.data.data;
            })
        },

        save() {
            this.reservation.append('name', this.form.name); 
            this.reservation.append('num_customer', this.form.num_customer); 
            this.reservation.append('booking_date', this.form.booking_date); 
            this.reservation.append('phone_num', this.form.phone_num);  
            this.reservation.append('room', this.form.room);  

            var url = this.$api + '/reservation/' 
            this.load = true; 
            this.$http.post(url, this.reservation, { 
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message; 
                this.color = "green"; 
                this.snackbar = true; 
                this.load = true; 
                this.close(); 
                this.readData(); // baca data
                this.resetForm(); 
            }).catch(error => {
                this.error_message = error.response.data.message; 
                this.color = "red"; 
                this.snackbar = true;
                this.load = false; 
            });
        },

        update() { 
            let newData = {
              name: this.form.name,
              num_customer: this.form.num_customer,
              booking_date: this.form.booking_date,
              phone_num: this.form.phone_num,
              room : this.form.room,
            }; 
            var url = this.$api + '/reservation/' + this.editId; 
            this.load = true; 
            this.$http.put(url, newData, { 
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message; 
                this.color = 'green'; 
                this.snackbar = true; 
                this.load = false; 
                this.close(); 
                this.readData(); // baca data 
                this.resetForm();
                this.inputType = 'Tambah'; 
            }).catch(error => {
                this.error_message = error.response.data.message; 
                this.color = 'red'; 
                this.snackbar = true; 
                this.load = false;
            });
        },

        deleteData() {
            var url = this.$api + '/reservation/' + this.deleteId; 
            this.load = true; 
            this.$http.delete(url, { 
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message; 
                this.color = "green"; 
                this.snackbar = true; 
                this.load = false; 
                this.close(); 
                this.readData();
                this.resetForm();
                this.inputType = "Tambah"; 
            }).catch(error => {
                this.error_message = error.response.data.message; 
                this.color = "red"; 
                this.snackbar = true;
                this.load = false; 
            });
        },

        editHandler(item) {
            this.inputType = 'Ubah'; 
            this.editId = item.id; 
            this.form.name = item.name
            this.form.num_customer = item.num_customer;
            this.form.booking_date = item.booking_date;
            this.form.phone_num = item.phone_num;
            this.form.room = item.room;
            this.dialog = true;
        },

        deleteHandler(id) {
            this.deleteId = id; 
            this.dialogConfirm = true;
        },

        close() {
            this.dialog = false; 
            this.inputType = 'Tambah'; 
            this.dialogConfirm = false; 
            this.readData();
        },

        cancel() {
            this.resetForm(); 
            this.readData(); 
            this.dialog = false; 
            this.dialogConfirm = false; 
            this.inputType = 'Tambah';
        },

        resetForm() { 
            this.form = {
                name: "",
                num_customer: "",
                booking_date: "",
                phone_num: "",
            };
        },
    },

    computed: {
        formTitle() {
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
    },
};
</script>

