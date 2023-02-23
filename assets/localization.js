
function get_zip_location(zipcode){
  		
  		var data_res = '';
  		jQuery.ajax({
             type: 'GET',
             dataType: "json",
             crossDomain: true,
             url: 'https://api.responsival.net/cookiedo/cookiedo_shipping_calendar/class.php?zip='+zipcode,
             success: function(result){
              data_res = result;
             }
        });
  
  
 
  	return data_res;
  
   
}


var result = get_zip_location('00683');
