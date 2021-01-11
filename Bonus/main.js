// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una 
// decina di dischi musicali. 
// Servendoci di Vue JS stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.
// Chiamata: https://flynn.boolean.careers/exercises/api/array/music
// Layout base:
// https://bitbucket.org/booleancareers/ex-dischi-musicali-layout

let app = new Vue({
    el: '#root',
    data: {
        error: false,
        errorMessage: '',
        albums: [],
        genres:['Pop', 'Rock', 'Metal', 'Jazz', 'All'],
        visible: '',
        direction: 'left',
        filterAlbums: [],
    },
    methods:{
        appear: function(){
            if(this.visible === 'active'){
                //reset
                this.visible = '';
                this.direction= 'left';
            }
            else{
                this.visible = 'active';
                this.direction= 'right';
            }
        },
        filter: function(genre){
            this.filterAlbums = this.albums.filter(element => {
                if(genre === 'All'){
                    return element;
                }
                else{
                    return element.genre === genre;
                }
            });
            //console.log(filterAlbums);
        }

    },
    mounted(){
        axios
        .get('https://flynn.boolean.careers/exercises/api/array/music')
        .then(response => {
            console.log(response.data.response);
            const albums = response.data.response;
            this.albums = albums;
            this.filterAlbums = albums;
        })
        .catch(error => {
            //console.log(error);
            const errorCode = error.response.status;
            const errorText = error.response.statusText;
            this.error = true;
            this.errorMessage = `Error ${errorCode} Page ${errorText}`
        })
    },
});