/*
 * ===========================================================================
 * File: SettingsMetrics.js 
 * Author: Antonio Faienza
 * Desc: This scritp manage the functions handle the setting metrics preference of
 * the user
 * ===========================================================================
 */

$(document).ready(function () {   

    /**
     * PDR
     */
    var palettePDR = $('.palette-color-pdr');  
    var inputNumberPDR = $('.PDR-segment-value');
    
    // is a div. Therefore for access to the value, you can use the "attr" method
    var pdr_slider_string = $('#PDR-slider');
    var pdr_slider_json =  $.parseJSON(pdr_slider_string.attr('value'));  
    


    // we retrieve the value of color and threashold
    var colorPDR = [];
    var threasholdPDR = [];
    $.each(pdr_slider_json.pdr, function(k, v) {        
        if(v.color!=undefined) colorPDR.push(v.color);
        if(v.threashold!=undefined)  threasholdPDR.push(v.threashold);
    });

    sliderPDR = createMetricSlider('#PDR-slider', colorPDR, threasholdPDR, palettePDR, inputNumberPDR, intervalSegmentPDR);
    

    /**
     * Delay
     */
    var paletteDelay = $('.palette-color-delay');  
    var inputNumberDelay= $('.delay-segment-value');
    
    // is a div. Therefore for access to the value, you can use the "attr" method
    var delay_slider_string = $('#delay-slider');
    var delay_slider_json =  $.parseJSON(delay_slider_string.attr('value'));  
   
    // we retrieve the value of color and threashold
    var colorDelay = [];
    var threasholdDelay = [];
    $.each(pdr_slider_json.delay, function(k, v) {
        if(v.color!=undefined) colorDelay.push(v.color);
        if(v.threashold!=undefined)  threasholdDelay.push(v.threashold);
    });

    sliderDelay = createMetricSlider('#delay-slider', colorDelay, threasholdDelay, paletteDelay, inputNumberDelay, intervalSegmentDelay);
    /**
     * Throughput
     */
    var paletteThroughput = $('.palette-color-throughput');  
    var inputNumberThroughput= $('.throughput-segment-value');
    
    // is a div. Therefore for access to the value, you can use the "attr" method
    var throughput_slider_string = $('#throughput-slider');
    var throughput_slider_json =  $.parseJSON(throughput_slider_string.attr('value'));  
   
    // we retrieve the value of color and threashold
    var colorThroughput = [];
    var threasholdThroughput = [];
    $.each(throughput_slider_json.throughput, function(k, v) {
        if(v.color!=undefined) colorThroughput.push(v.color);
        if(v.threashold!=undefined)  threasholdThroughput.push(v.threashold);
    });

    sliderThroughput = createMetricSlider('#throughput-slider', colorThroughput, threasholdThroughput, paletteThroughput, inputNumberThroughput, intervalSegmentThroughput);

});

/**
 * This function create a slider for setting the threashold with a specifi color for 
 * each segment
 * @method createSlider
 * @param inputNumber the id of div that will contain the slider
 * @param color the array that contain the color for each segment that will be assigned
 * @param threashold the array with handle value of slider
 * @param palette the id/class of input color used for update the slider
 * @param inputNumber the id/class of input number used for update the slider value 
 * @param intervalSegment the array that contains class to added of lider for change color
 */
function createMetricSlider(inputSlider, color, threashold, palette, inputNumber, intervalSegment){      

    var slider = $(inputSlider);

    
    noUiSlider.create(slider[0], {
        start: threashold, 
        connect: [true, true, true, true],
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 3
        }),
        pips: { mode: 'count', values: 5 },
        tooltips: true
    });
  
    /**
     * Add color to segment 
     * https://refreshless.com/nouislider/examples/#section-colored-connect
     */
    var connect = slider[0].querySelectorAll('.noUi-connect');
    for (var i = 0; i < connect.length; i++) {
        connect[i].classList.add(intervalSegment[i]);
    }  
  
    for(var i = 0; i < intervalSegment.length; i++){
        $('.'+intervalSegment[i]).css("background",color[i])
    }  

    /**
     * UPDATE COLOR
     */
    palette.on('change', function (i) {  
        var index = palette.index(this);      
        $('.'+intervalSegment[index]).css("background",this.value)
    });
  
  
     /**
     * Using HTML5 input elements
     * REF: https://refreshless.com/nouislider/examples/#section-html5
     */
    slider[0].noUiSlider.on('update', function (values, handle) {

        // cycle all input number with the same class
        [].slice.call(inputNumber).forEach(function (obj, index) {
  
            if (handle == index) {
                var value = values[handle];
                obj.value = value;
            }
        });
  
    });
  
    inputNumber.on('change', function (i) {        
        var index = inputNumber.index(this);    
        if(index===0){
            slider.noUiSlider.set([this.value, null,null]);
        }else if (index === 1){
            slider.noUiSlider.set([null, this.value, null]);
        }else if(index == 2){
            slider.noUiSlider.set([null, null, this.value]);
        }        
    });   
  
    return slider;
  }


  /**
   * Update the slider for restore the original value
   * @method refreshMetricsSlider
   * @param slider the original slider
   * @param color the original color
   * @param threashold the original value of slider
   * @param intervalSegment the class attribute of slider
   */
  function refreshMetricsSlider(slider, color, threashold, intervalSegment){
    
    // restore the color
    for(var i = 0; i < intervalSegment.length; i++){
        $('.'+intervalSegment[i]).css("background",color[i])
    } 

    // restore slider value
    slider[0].noUiSlider.set(threashold);
     
  }

  