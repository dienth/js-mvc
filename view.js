function ListView(model, elements){
    this._model = model;
    this._elements = elements;
    this.listModified = new Event(this);
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);
    var _this = this;
    this._model.itemAdded.attach(function(){
        _this.rebuildList();
    });
    this._model.itemRemoved.attach(function(){
        _this.rebuildList();
    });
    this._elements.list.change(function(e){
        _this.listModified.notify({index: e.target.selectedIndex});
    });
    this._elements.addButton.click(function(){
        _this.addButtonClicked.notify();
    });
    this._elements.delButton.click(function(){
        _this.delButtonClicked.notify();
    });
}

ListView.prototype = {
    show: function(){
        this.rebuildList();
    },
    rebuildList: function(){
        var list, items, key;
        list = this._elements.list;
        list.html('');
        items = this._model.getItems();
        for(key in items){
            if(items.hasOwnProperty(key)){
                list.append($('<option>'+ items[key] +'</option>'));
            }
        }
        this._model.setSelectedIndex(-1);
    }
}
