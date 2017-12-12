$(document).ready(function(){
    var myFacebookToken = 'EAACEdEose0cBAGpU2ExrutqCZBTd7YJpsVH82EgAStWtqdpC1fuZCTg56ZAvBx7iKQo4sAMXrcQN3d2vJtrV3G9NTwc14a5aTgVrcTzePZBo52aTjW5ktJIPTylm1RUNSTndMsgg5k2mIIqjv08vPs2GORJZCo2GpVwMyIUodOTt877zUFLcsWSqzpN4ebEy6MKf1c8wcZBwZDZD'
    
    function getFacebookInfo(){
        $.ajax('https://graph.facebook.com/me?fields=id,name,about,address,birthday,education,gender,hometown,context,languages,location,feed{story,story_tags,full_picture,message,created_time,comments{like_count},likes{name}}&access_token='+myFacebookToken,{
            success : function(response){
                $.each(response.feed.data, function( key, value ) {
                    
                    if(value.likes !== undefined){
                        $('#feedData').append("<li> Post:" + value.story + "</li>" + "<img src=" + value.full_picture
                         + " class= img-responsive >" + "<div id='postedOn' >Posted on:" + value.created_time + "\n</div> <div id='likect'> likes "+value.likes.data.length+"</div>"); 
                    } else{
                        $('#feedData').append("<li> Post:" + value.story + "</li>" + "<img src=" + value.full_picture 
                            + " class= img-responsive >" + "<h5>Posted on:" + value.created_time + "\n</h5>"); 
                    }

                });

            }

        });//end argument list 
            console.log("calling Animation...")
            $("#aboutData").hide()
            $("#feedData").show()
            $("#home").hide()
        // end ajax call 

    }// end get facebook info

    function getAbout(){
        console.log("IN Get about ")
        $.ajax('https://graph.facebook.com/me?fields=id,name,about,address,birthday,education,gender,hometown,context,languages,location,feed{story,story_tags,full_picture,message,created_time,comments{like_count},likes{name}}&access_token='+myFacebookToken,{
            success : function(response){
                var name="<h2>" + response.name + "</h2>" + "<h4>BOD:" + response.birthday + "\n</h4>" 
               // console.log('type : '+ instanceof(response.languages))
                var lang = [];
                if(response.education instanceof Array){
                    var school=[]
                    $.each(response.education, function(key, value){
                        school.push(value.school.name)

                    })

                    var school='<h4> Compeletd 10 Board in : '+ school[0]
                    var college ='<h4> Compeletd 12 BOard in : '+ school[1] + '<h4> <h4> Gender : '+response.gender+'</h4>'
                }else{
                    console.log("IN education else ")
                }

                if(response.languages instanceof Array){
                    $.each(response.languages, function(key, value){
                        lang.push(value.name)
                    })

                    $('#aboutData').html(name + school + college +'<h4> Languages Known in lang : '+ lang + '<h4> <h4> HomeTown : '+response.hometown.name+'</h4>')
                    
                }else{
                    console.log('Not an Array')
                }
            }
        });
         console.log("calling Animation...")
            $("#aboutData").show()
            $("#feedData").hide()
            $("#home").hide()
    }

    $("#facebookBtn").on('click',getFacebookInfo)

    $('#aboutBtn').on('click',getAbout)

    $('#homebtn').on("click", function(){
        $("#aboutData").hide()
        $("#feedData").hide()
        $("#home").show()
    })
});