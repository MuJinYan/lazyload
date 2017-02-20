/**
 * Created by Administrator on 2017/2/20.
 */

;(function (win,doc) {
    function Lazyload() {
        this.init();
    }
    Lazyload.prototype = {
        init : function () {
            var _this = this,
                items = this.getItems();
            //console.log(items);
            this.monitor(items);
            win.onscroll=function(){
                _this.monitor(items);
            }
        },
        getItems : function () {
            return doc.querySelectorAll('.items');
        },
        monitor : function (items) {
            var len = items.length;
            var _this = this;
            for (var i=0;i<len;i++){
                var item=items[i];
                _this.isSee(item);
            }
        },
        isSee : function (item) {
            var itemTop=item.offsetTop;
            var winH=win.innerHeight;
            var scrolltop=doc.body.scrollTop;
            if(winH+scrolltop>itemTop&&!this.hasActive(item)){
                item.className+=' active';
                this.getImage(item);
            }
        },
        hasActive:function(item){
            var clsname=item.className;
            var re=/active/g;
            return re.test(clsname)?true:false;
        },
        getImage : function (item) {
            var childens=item.childNodes;
            var len=childens.length;
            var src='';
            var _this=this;
            for(var i=0;i<len;i++){
                if(childens[i].nodeName.toLowerCase()==='img'){
                    src=childens[i].getAttributeNode('data-src').nodeValue;
                    _this.toggleImgSrc(childens[i],src);
                }
            }
        },
        toggleImgSrc:function(imgNode,url){
            imgNode.setAttribute('src',url);
        }
    };
    win.Lazyload = Lazyload;
})(window,document);

new Lazyload();
