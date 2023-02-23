$(document).on("click",'#storePickupApp .pickadate' ,function() {
      //var work = $(this).val();
      console.log('ok');
  });
  
  document.getElementById("pickupDatePicker").addEventListener('click',function ()
    {
     alert("hello");
     //validation code to see State field is mandatory.  
    }  ); 
  
 function remove_product($this,$this_btn){
    
    jQuery($this_btn).html('Please wait ...');
    jQuery($this_btn).attr('disabled', true);
    
    //var size_li = jQuery('.'+$this).size();
    //console.log(size_li);
  
    var products = {};
    
    jQuery('.'+$this).each(function(){
      

      var product_id = jQuery(this).find('.product_id').val();
      products[product_id] = 0;
      
    });

    jQuery.post('/cart/update.js', {updates: products})
    //jQuery.post('/cart/update.js', {updates: {ids}});
    jQuery('.'+$this).hide();
    
    setTimeout(function(){
      window.location.href = "/cart";
    }, 2000);
    
  }
  
  function product_deliveryType(container, $this){
  	jQuery('#'+container).show().siblings('.product_deliveryType').hide();
    jQuery('.delivery_type_tabs li a').removeClass('active');
    jQuery($this).addClass('active');
  }
  
  jQuery('#cart_update').click(function(){
  	document.getElementById('validate').value ='';
  });
  
  jQuery('#cart_checkout').click(function(){
  	//document.getElementById('validate').value = '';
  });
  
 var shipping_items = jQuery('table tr[data-shipping-item=true]').length;

  if(shipping_items > 0){
    jQuery('body').find('#validate').val('1');
  	//jQuery('#shipping_devlivery_container').show();
  }else{
    jQuery('body').find('#validate').val('');
  	//jQuery('#shipping_devlivery_container').hide();
  }
  
  
 
  
  function validateForm() {
    var date_zipcode = document.getElementById('date_zipcode').value;
    var delivery_date = document.getElementById('date').value;
    var update = document.getElementById('validate').value;
    var pickup_time = jQuery('.pickadate').val();
	
	//var results = get_zip_location(date_zipcode);
	if (update != "" && pickup_time == "") {
        if (date_zipcode == "" ) {
            alert("Please enter your zip code");
            return false;
        }

        if(delivery_date == ""){
            alert("Please enter your Delivery date");
            return false;
        }
    }
}
  


/******************************************************************************/

jQuery(document).ready( function($) {

jQuery(function() {
   
   
    var dateTime = new Date(new Date().setDate(new Date().getDate() + 1));
    var pickup_hours = dateTime.getHours();
    if(pickup_hours == 0){
      pickup_hours = 1;
    }
    var pickup_mintus = dateTime.getMinutes();

    var min_time = '10:00:00';
	
    if(pickup_hours > 12){
      var dateTime = new Date(new Date().setDate(new Date().getDate() + 2));
    }else if( pickup_hours > 10 && pickup_hours < 21 ){

      //var min_time = ''+dateTime.getHours()+':'+pickup_mintus+'';
    }
    
    var data_type = $('#pick-up-time').attr('data-type');
    if(data_type == 'enable'){
      alert("Hey this specific product is not available for pick up. If you'd like to pick your order up in store, please remove that item from your cart.");
      return false;
    }
 
    $('#pick-up-time').datetimepicker({
        minDate: dateTime,
        step: 15,
        ampm: true,
		Default: false,
        format: 'm-d-Y g:i A',
        formatTime:'h:i a',
        minTime: min_time, 
        maxTime:'21:00:00',
        defaultDate: dateTime,
        beforeShowDay: function(date) {
          //return [(date.getDay() != 1)];
          setCookie('ppkcookie','pickup',7);
          $('#pickupDate, #date_zipcode, #shippingType, #shippingState, #date').val('');
           if ( date.getDay() == 0 || date.getDay() == 1 ){      
				return [false, ''];
			}
			return [true, ''];
        }
    });
    
    
    
  });
});
