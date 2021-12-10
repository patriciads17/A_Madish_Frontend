<template>
    <main>
        <span class="bg"></span>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex-column align-center justify-center>
                <v-flex sm12 elevation-6>
                    <v-toolbar class="red darken-4">
                        <v-toolbar-title class="red--text">
                            <h1 class="white--text">ABOUT US</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div class="container-grid">
                                <v-img class="img" :src="image1" alt="gambar1"></v-img>
                                <div>
                                    <p>"Ma Dish merupakan perusahaan swasta yang terbentuk perorangan. Didirikan pada tanggal 9 oktober 2021 berlokasi di jalan Babarsari Yogyakarta, yang kemudian ditetapkan sebagai Rumah Makan Ma Dish sekaligus sebagai kantor pusat dan administrasinya. Pada awalnya restoran ini hanya berupa rumah makan yang diberi nama "Rumah Makan dan Buffet Ma Dish".
                                    Rumah Makan Ma Dish bergerak dibidang mengelolah dessert maupun main dish, dimana alasan untuk mendirikan rumah makan ini adalah merupakan hasil survey bahwa masih kurangnya sarana cafe terutama yang menyediakan makanan spesifik di dessert dan main dish. Dengan melihat kesempatan inilah, maka didirikanlah Rumah Makan Ma Dish pada tahun 2021. Bidang usaha ini terus berkembang hingga saat ini, dimana terdapat beberapa usaha sejenis yang dikelola oleh pihak lain."</p>
                                </div>
                            </div>

                            <div class="container-grid-reverse">
                                <div>
                                    <p>"Logo Restaurant Main Dish memiliki latar belakang berwarna merah dan disertai gambar sendok dan garpu untuk melekngkapi logo, agar terlihat menarik diberikan border di bagian tepi logo"</p>
                                </div>
                                <v-img class="img" :src="image2" alt="gambar2"></v-img>
                            </div>

                            <div class="container-grid">
                                <v-img class="img" :src="image3" alt="gambar3"></v-img>
                                <div>
                                    <p>"We love to eat, to take our time and enjoy the flavours in a series of small dishes. Our degustation gives you the chance to do exactly that. More than a succession of plates, we offer you an experience, a connection between each dish. Complete the journey with our optional matching wines."</p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>      
            </v-layout>
        </v-container>
    </main>
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

    .img{
        width: 250px;
        height: 200px;
        padding: 0;
    }
    .posisinya{
        position: absolute;
        left: 0;
        right: 0;
    }

    .container-grid{
        display: grid;
        grid-template-columns: 250px 750px;
        align-items: center;
        vertical-align: middle;
    }

    .container-grid-reverse{
        display: grid;
        grid-template-columns: 750px 250px;
        align-items: center;
        vertical-align: middle;
    }
</style>