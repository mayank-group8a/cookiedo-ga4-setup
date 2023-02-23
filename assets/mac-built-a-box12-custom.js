jQuery(document).ready(function() {
 var count = 0;
    var limit = 4;

    var init = function() {
      // add
      jQuery('#build-a-box .product .add').click(function(e) {
        // box is full
        if (count >= limit) {
          return;
        }

        var $product = jQuery(this).parents('.product:first');

        // update
        var $qty = $product.find('.qty');
        var optionQty = parseInt($qty.html()) + 1;
        $qty.html(optionQty);
        jQuery('#bundle-option-' + $product.attr('data-option') + '-' + $product.attr('data-selection')).click();
        jQuery('#bundle-option-' + $product.attr('data-option') + '-qty-input').val(optionQty).keyup();
        count++;
        updateSummary();
      });

      // remove
      jQuery('#build-a-box .product .remove').click(function(e) {
        // box is empty
        if (count <= 0) {
          return;
        }

        var $product = jQuery(this).parents('.product:first');

        // update
        var $qty = $product.find('.qty');
        var optionQty = parseInt($qty.html()) - 1;

        // option is already empty
        if (optionQty < 0) {
          return;
        }

        $qty.html(optionQty);
        if (0 == optionQty) {
          jQuery('#bundle-option-' + $product.attr('data-option')).click();
        } else {
          jQuery('#bundle-option-' + $product.attr('data-option') + '-' + $product.attr('data-selection')).click();
          jQuery('#bundle-option-' + $product.attr('data-option') + '-qty-input').val(optionQty).keyup();
        }
        count--;
        updateSummary();
      });

      // NOTE: use of prototype to observe custom event
      //jQuery(document).observe('bundle:reload-price', function(e) {
        // update custom price display
        //if (e.memo.price > 30) {
          //jQuery('.price-box-build-a-box .price').html(formatCurrency(e.memo.price, e.memo.bundle.config.priceFormat));
       // } else {
         // jQuery('.price-box-build-a-box .price').html(formatCurrency(30, e.memo.bundle.config.priceFormat));
       // }
      // });
      // bundle.reloadPrice();
    };
    jQuery('.product-single-quantity #Quantity').on('change', function(){
        updateSummary();
    }); 

    // update summary
    var updateSummary = function() {
      // update icons
      jQuery('#build-a-box-summary .icon').removeClass('active').slice(0, count).addClass('active');
      var mainProductQty = jQuery('.product-single-quantity #Quantity').val(); console.log(mainProductQty);

      // update options text
      var optionsText = '';
      var optionsField = '';
      var optionsQTY = '';
      var productPrice = '';
      var productQuantity = '';

      jQuery('#build-a-box .product-item').each(function(i, e) {
        var $this = jQuery(this);
        var optionQty = parseInt($this.find('.qty').html());
		//console.log($this.find('.mac_sku').data('sku'));
        if (optionQty > 0) { 
          optionsText += optionQty + ' x ' + $this.find('.name').html() + ', ';
          optionsField += "<input name='properties[" + 'Product ' + $this.find('.name').html() + "]' value='" + 'Name: ' + $this.find('.name').html() + ', QTY: '+optionQty + ', SKU: '+ $this.find('.mac_sku').data('sku') + "' required='' type='text'>";
          optionsQTY += "<input type='hidden' name='id[]' class='form-control' value='"+$this.find('.variant_id').val()+"' /><input type='hidden' name='quantity[]' class='quantity-selector form-control' id='Quantity' value='"+optionQty+"'>";
        }
      });

      var cartTotalPrice = 0;
      jQuery('.cart-thumbnail li').each(function(i, e) {
        cartTotalPrice += jQuery(this).attr('data-price'); //parseFloat($(this).attr("data-price"));
      });

      productPrice = '$' + cartTotalPrice.toFixed(2);

      jQuery('#build-a-box-summary .options').html(optionsText.substr(0, optionsText.length - 2));
      jQuery('#infiniteoptions-container input').val(optionsText.substr(0, optionsText.length - 2));
      jQuery('.product-single-prices .custom_product-price .price').html(productPrice);
      jQuery('.product-list-actions .custom_product-price .price').html(productPrice);
      //jQuery('#infiniteoptions-container').append(optionsField);
      jQuery('#macarons_form').html(optionsQTY);
      // update counter
      jQuery('#build-a-box-summary .counter .count').html(count);
    };

    // init
    init();

    jQuery('#AddToCartForm #AddToCart').click(function(e) {
        if ((count < limit) && count >= 1 ) {
          alert('Please select ' + limit + ' macarons');
          return false;
        }else{
          		return true;
        	}
      });
  if ((count < limit) && count >= 1 ) {
          alert('Please select ' + limit + ' macarons');
          return false;
        }else{
          		return true;
        	}
 
});