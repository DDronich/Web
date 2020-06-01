new Vue({
    el: '#app',
    components: {
        VueGallerySlideshow
    },
    data: {
        images: [],
        index: null
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.addImage(files[0]);
        },
        addImage(file) {
            var reader = new FileReader();
            var self = this;

            reader.onload = (e) => {
                self.images.push(e.target.result);
            };
            reader.readAsDataURL(file);
        },
        removeImage: function(index) {
            this.images.splice(index, 1);
        }
    }
})