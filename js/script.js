$(document).ready(function () {

    // getting all orders
    $.ajax({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/posts`,

        dataType: "json",
    })
        .done(function (posts) {
            $.map(posts, function (post, index) {
                $(".container").append(
                    `<div class="single-order">
                    <h2>${post.title}</h2><p>${post.body}</p>
          <button class="delete" itemId=${post.id}>Delete Order</button>
          <button class="update" itemId=${post.id}>Update Order</button>
          </div>`
                );
            });
        })
        .fail(function () {
            console.log("Something Went Wrong");
        });

    // make order
    $(".form").submit(function (e) {
        e.preventDefault();
        let singleOrder = {
            name: $(".name").val(),
            order: $(".order").val(),
        };
        console.log(singleOrder);
        $.ajax({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",

            data: singleOrder,

        }).done(function (data) {
            console.log(data);
        });
    });

    $(".container").delegate(".delete", "click", function () {
        let $div = $(this).closest(".single-order");
        $.ajax({
            method: "DELETE",
            url:
                "https://jsonplaceholder.typicode.com/posts/" + $(this).attr("itemId"),
        }).done(function () {
            $div.fadeOut(300, function () {
                $div.remove();
            });
        });
    });

    $(".container").delegate(".update", "click", function () {
        $.ajax({
            method: "GET",
            url:
                "https://jsonplaceholder.typicode.com/posts/" + $(this).attr("itemId"),
            dataType: "json",
        })
            .done(function (post) {
                console.log(post);
                console.log(post.id);
                $(".single-order, .form").hide();
                $(".container").append(`
          <form action="" class="update-form">
             <label for="name">Name:</label><br>
             <input type="text" class="update-name" value=${post.title}><br>
            <label for="order">Order:</label><br>
             <input type="text" class="update-order" value=${post.body}><br><br>
             <input type="text" class="update-id" value=${post.id}><br><br>
             <button class="update-button" itemId=${post.id}>Update</button>
         </form>
          `);

                $(".update-form").submit(function (e) {
                    e.preventDefault();

                    let updateId = $(".update-id").val();
                    console.log(updateId);

                    let singleUpdateOrder = {
                        name: $(".update-name").val(),
                        order: $(".update-order").val(),
                    };
                    console.log(singleUpdateOrder);

                    $.ajax({
                        method: "PUT",
                        url:
                            "https://jsonplaceholder.typicode.com/posts/" + updateId,
                        data: singleUpdateOrder,
                    }).done(function (data) {
                        console.log(data);
                        $(".single-order, .form").show();
                        $('.update-form').hide()
                    })
                        .fail(function () {
                            console.log("Something Went Wrong");
                        });


                });
            })
            .fail(function () {
                console.log("Something Went Wrong");
            });
    });
});
