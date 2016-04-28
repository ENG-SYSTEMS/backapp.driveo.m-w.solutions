/**
 * Pinch Zoom Image for Sencha Touch 2
 * 
 * requieres the Transform.js file for the transformation of canvas
 *
 * @author Sang Oh <swoh77@gmail.com>
 * 
 * This source is orignated from Zooming via HTML5 Canvas Context and restructured into sencha touch.
 * Origin : http://phrogz.net/tmp/canvas_zoom_to_cursor.html
 *          author Gavin Kistner < mailto:!@phrogz.net >
 * 
 */

Ext.define('backapp.utils.ScrollZoomImage', {
	extend:'Ext.Container',
	xtype:'scrollzoomimage',
	config:{
		src:null,			// source of image to draw
		styleHtmlContent:true,
		layout:'fit',
		html:'<div class="wrapper"><div><img src="resources/images/ordo-test.jpg" /></div></div>',
	},

	/********private variable****/
	lastX:0,
	lastY:0,
	image:null,
	canvas:null,	
	ctx:null,
	srcWidth:null,
	srcHeight:null,
	destWidth:null,
	destHeight:null,	
	ratioWidth:null,
	ratioHeight:null,
	canvasWidth:null,
	canvasHeight:null,
	isScaled:false,
	/*********************/
	
	/**
	 * [applySrc setter for image ]
	 * @param  {string} value [source of image] 
	 */		
	 applySrc:function(value) {
		/*if (value != null && value != "") {
			var img = this.getImage();
			img.src = value;
		}
		return value;*/
        Ext.DomQuery.select("img", this.element.dom)[0].src = value;

        console.log('applySrc');
        myScroll = new IScroll(Ext.DomQuery.select(".wrapper", this.element.dom)[0], {
            zoom: true,
            mouseWheel: true,
            tap: true,
            scrollX: true,
            scrollY: true,
            scrollbars: true,
            wheelAction: 'zoom',
            zoomMax: 4,
            bindToWrapper: true
        });

    },
	/**
	 * [getImage create and get image buffer]
	 */		
	 getImage:function() {
		if (this.image == null) {
			this.image = new Image();
			
			this.image.onload = (function(m){ 
			    return function(){
			        m.onLoadImage();
			    }
			})(this);
			this.image.onerror=this.onErrorImage;
			this.image.onabor=this.onAbortImage;
		}
		
		return this.image;
	},
	/**
	 * [resetCanvas initialize the canvas size and transformation]
	 */		
	 resetCanvas:function() {
		/*if (this.canvas != null) {
			this.isScaled = false;
			this.zoomValue=0;
			this.ctx.reset();
			this.canvas.width = this.element.getWidth();
			this.canvas.height = this.element.getHeight();
				
			this.lastX=this.canvasWidth/2;
			this.lastY=this.canvasHeight/2;	
		}*/
	},
	/**
	 * [redraw redraw image after reset the transformation of canvas]
	 */		
	 redraw:function() {
		/*this.resetCanvas();
		this.draw();*/
	},
	/**
	 * [draw draw image on the canvas size with resized from original.]
	 */	
	draw:function (){
	},
	/**
	 * [onLoadImage image load hadler to draw it on the canvas]
	 */	
	onLoadImage:function() {
        console.log('onLoadImage');
	},
	onErrorImage:function() {
	},
	onAbortImage:function() {
	},
	/**
	 * [initCanvas image load hadler to draw it on the canvas]
	 */		
	 initCanvas:function() {
		this.canvas = Ext.DomQuery.select("canvas", this.element.dom)[0];
		this.ctx = this.canvas.getContext('2d');
		this.trackTransforms(this.ctx);
		this.canvas.addEventListener('mousewheel',	
					(function(m){ 
					    return function(evt){
					        m.handleScroll(evt);
					    }
					})(this),
					false);
		this.resetCanvas();	
	}
});
