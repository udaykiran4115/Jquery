$(document).ready(function(){
    var myFacebookToken = 'EAACEdEose0cBALrroBOXpntw7kIwqeAD72QNwZAH1dexcl9cPkbxRPTy6lRS80Do4dDAXiFz4LFR4psO2VURQuyj8xp4JuGBcYtfDq0j1w5aJi11mM1eMF30lO2fXZB0zoGJ1RNrmXM56YBYfnZCVEseZAaPelbtO3OM7IGnwYRgaDqZA9sTfueZCCbhw4rdLuAfypPm7uXQZDZD'
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

        }//end argument list 

        );// end ajax call 

    }// end get facebook info

    function getAbout(){
        console.log("IN Get about ")
        $.ajax('https://graph.facebook.com/me?fields=id,name,about,address,birthday,education,gender,hometown,context,languages,location&access_token='+myFacebookToken,{
            success : function(response){
                $('#aboutData').append("<h2>" + response.name + "</h2>" + "<h4>BOD:" + response.birthday + "\n</h4>"); 
               // console.log('type : '+ instanceof(response.languages))
                var lang = [];
                if(response.education instanceof Array){
                    var school=[]
                    $.each(response.education, function(key, value){
                        school.push(value.school.name)
                    })
                    $('#aboutData').append('<h4> Compeletd 10 Board in : '+ school[0])
                    $('#aboutData').append('<h4> Compeletd 12 BOard in : '+ school[1] + '<h4> <h4> Gender : '+response.gender+'</h4>')
                }else{
                    console.log("IN education else ")
                }

                if(response.languages instanceof Array){
                    $.each(response.languages, function(key, value){
                        lang.push(value.name)
                    })

                    $('#aboutData').append('<h4> Languages Known in lang : '+ lang + '<h4> <h4> HomeTown : '+response.hometown.name+'</h4>')
                    
                }else{
                    console.log('Not an Array')
                }
            }
        });
    }

    $("#facebookBtn").on('click',getFacebookInfo)

    $('#aboutBtn').on('click',getAbout)
});