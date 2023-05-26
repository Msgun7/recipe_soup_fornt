$(document).ready(function() {
    $('#imageUploadForm').sumit(function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url: '/api/upload/',
            type: 'POST',
            data: formData,
            pro
        })
    })
}
)