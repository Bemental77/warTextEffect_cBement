;(function($, window, undefined) {





    //Constructor function definition for our new QTRotator object
    $.AccordianMenu = function (options, element) {

        this.$menuDiv = $(element);
        this._init(options);
    };

    //Set up default options
    $.AccordianMenu.defaults = {
        speed: 250,
        easing: 'ease',
        defaultItem: 0,
        menuWidth: '415px',
        sliceWidth: '90px'

    };

    //Create methods for new object
    $.AccordianMenu.prototype = {
        _init: function (options) {


            //this refers to $.AccordianMenu
            this.options = $.extend($.AccordianMenu.defaults, options);

            //creating jquery objects for tags
            //Unsure if these children tags are proper
            this.$menu = this.$menuDiv.children("ul"); //$("#subMenu > ul")
            this.$menuItems = this.$menu.children("li"); //$("#subMenu > ul > li")
            this.$imgWrapper = this.$menuItems.children("a");
            this.$menuItemsPreview = this.$imgWrapper.children('.menuPreview');
            this.totalItems = this.$menuItems.length;
            this.currentIndex = -1;



            //call clickHandler and openItem
            this._clickHandler();
            this._openItem(this.options.defaultItem);



        },
        _validCurrent: function () {

            return(this.currentIndex >= 0 && this.currentIndex < this.totalItems);

        },
        _openItem: function (openedIndex) {

            this.$imgWrapper.eq(openedIndex).click();
        },
        _clickHandler: function () {
            self = this;
            this.$imgWrapper.click(function (e) {
                $parentLI = $(this).parent();
                clickedIndex = $parentLI.index();
                if (self.currentIndex === clickedIndex){
                    self._slideItem($parentLI, false, 1500, 'easeOutQuint',true);
                    self.currentIndex = -1;


                } else {
                   if(self._validCurrent()){
                       self._slideItem(self.$menuItems.eq(self.currentIndex), false, 1500, 'easeOutQuint',true)
                   }
                   self._slideItem($parentLI, true, 250, 'jswing');

                    self.currentIndex = clickedIndex;
                }
                e.preventDefault();
            })

        },
        _slideItem: function ($panelSlice, state, speed, easing, allClosed) {
            var $colorImage = $panelSlice.find(".menuImage"); //$panelSlice is a jquery object containing the li tag we want to open or close. -based on state
            if (state){
                //opening li
                var bwOption = {
                    width: this.options.menuWidth
                }
                var colorOption = {
                    left: '0px'
                }


                } else {
                //closing li
                var bwOption = {
                    width: this.options.sliceWidth
                }
                var colorOption = {
                    left: this.options.menuWidth
                }
            }

                if (state){
                    this.$menuItemsPreview.stop();
                    this.$menuItemsPreview.animate({
                        opacity: .1,
                        duration: 1000
                    })
                } else if (allClosed) {
                    this.$menuItemsPreview.stop();
                    this.$menuItemsPreview.animate({
                        opacity: 1,
                        duration: 1500
                    })

                }

            $panelSlice.stop().animate(bwOption,speed,easing,allClosed);

            $colorImage.stop().animate(colorOption,speed,easing,allClosed);;


            if (state){
                $colorImage.animate({
                    opacity: 1,
                    duration: 2000
                })
            } else if (state === false){
                $colorImage.css({
                    opacity: .2
                })
            }

        }

    };

    $.fn.accordianMenu = function (options) {



        if (typeof options === 'string') {

            // not as common, leave off code for now...

        }
        else {  // options !== 'string', usually meaning it is an object

            // here, this refers the jQuery object that was used
            // to call this plugin method ($('#quoteRotator'))
            this.each(function() {

                //here, inside of each() function, this refers to div#quoteRotator
                var instance = $.data(this, 'accordianMenu');

                if (instance) {
                    instance._init();
                }
                else {

                    instance = $.data(this, 'accordianMenu', new $.AccordianMenu(options, this));

                }

            });

        }

        return this; // make our plugin method chainable

    };





})(jQuery, window);