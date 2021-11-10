<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">To Do List</h3>
        
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>

            <v-data-table 
                :headers="headers" 
                :items="todos" 
                :search="search" 
                show-expand
                item-key="note" 
                class="elevation-1" > 

                <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                    Reset
                </v-btn>
                </template>

                <template v-slot:item.priority="{ item }">
                    <v-chip
                        :color="getColor(item.priority)"
                        outlined
                    >
                        {{ item.priority }}
                    </v-chip>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small icon @click="editItem(item)" color="red"> <v-icon>mdi-pencil</v-icon> </v-btn>
                    <v-btn small icon @click="deleteItem(item)" color="green"> <v-icon>mdi-delete</v-icon> </v-btn> 
                </template>

                <template v-slot:expanded-item="{ headers, item }" >
                    <td :colspan="headers.length">
                        Note: {{ item.note }}
                    </td>
                </template>
                
            </v-data-table> 

        </v-card> 

        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-text-field
                            v-model="formTodo.task" 
                            label="Task"
                            required 
                        ></v-text-field>
                        <v-select
                            v-model="formTodo.priority" 
                            :items="['Penting', 'Biasa', 'Tidak Penting']" 
                            label="Priority"
                            required >
                        </v-select>
                        <v-textarea
                            v-model="formTodo.note" 
                            label="Note"
                            required >
                        </v-textarea>
                    </v-container> 
                </v-card-text> 
                <v-card-actions>
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="save"> Save </v-btn> 
                </v-card-actions> 
            </v-card> 
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-main> 
</template>

<script> 
export default {
    name: "List",
    data() { 
        return {
            expanded: [],
            search: null, 
            dialog: false, 
            dialogDelete: false,
            headers: [
                {
                    text: "Task",
                    align: "start", 
                    sortable: true, 
                    value: "task",
                },
                { text: "Priority", value: "priority" }, 
                { text: "Note", value: "note", align: ' d-none' }, 
                { text: "Actions", value: "actions" },
            ],
            todos: [],
            formTodo: { task: null, priority: null, note: null },
            defaultTodo: { task: null, priority: null, note: null },
            editedIndex: -1,
        };
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Form Todo' : 'Edit Todo'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    created () {
      this.initialize()
    },

    methods: { 
        initialize () {
            this.todos= [
                {
                    task: "Coding",
                    priority: "Penting", 
                    note: "Code for your life",
                },
                {
                    task: "Gaming",
                    priority: "Tidak Penting", 
                    note: "Wasting time",
                },
                {
                    task: "Masak",
                    priority: "Biasa", 
                    note: "Indomi saat coding terbaik gan",
                },
            ]
        }, 

        editItem (item) {
            this.editedIndex = this.todos.indexOf(item)
            this.formTodo = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.todos.indexOf(item)
            this.formTodo = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.todos.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.resetForm
                this.editedIndex = -1
            })
        },

        save() {

            if (this.editedIndex > -1) {
                Object.assign(this.todos[this.editedIndex], this.formTodo)
            } else {
                this.todos.push(this.formTodo)
            }
                this.cancel()
        },

        cancel() {
            this.resetForm(); 
            this.dialog = false;
            this.$nextTick(() => {
                this.resetForm();
                this.editedIndex = -1
            })
        },

        resetForm() {
            this.formTodo = { task: null, priority: null, note: null };
        },

        getColor (priority) {
            if (priority === 'Penting') return 'red'
            else if (priority === 'Tidak Penting') return 'blue'
            else if (priority === 'Biasa') return 'green'
        },

    },
};
</script>
