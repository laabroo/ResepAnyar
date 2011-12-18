var _ = require('common/util');
var ui = require('ui');
var TextView = ui.TextView;
var VLayout = require('ui').VLayout;
var Control = require('ui').Control;
var Panels = require('ui/panels').Panels;
//Container
var HLayout = ui.HLayout;
var CellLayout = ui.CellLayout;


_.extend(exports, {
    ':load': function() {
        console.log('View was loaded');
        var view = this;
        var title = new TextView({
            label: 'Resepmasakanmu.com',
            style: {
                color: '#FFD700',
                'font-size': 'normal',
                width : 'fill-parent',
                'font-weight': 'bold',
                border: '0 0 4 0',
                align: 'center'
            }
        });
        var parent = new VLayout({
            style: {
                width: 'fill-parent'
            }
        });
        parent.add(title);
        view.add('title', parent);

        app.on('connected', function() {
            app.msg('getdata', {text: ''});
            app.on('message', function(action, data) {
                if (action === 'setdata') {
                    var i = 1;
                    var temp;
                    console.log('Title : ' + data.text.title_);
                    console.log('Pubdate : ' + data.text.pubdate_);
                    console.log('Link : ' + data.text.link_);
                    var dataArray = [data.text.title_];
                    dataArray.forEach(function(item) {
                        if (i % 2 === 0) {
                            temp = new TextView({
                                label: item,
                                color: 'black',
                                width: 'fill-parent',
                                'background-color': '#ffffff'
                            });
                            temp.on('blur', function() {
                                this.style({
                                    'color': 'black',
                                    'background-color': '#ffffff',
                                    'font-weight': 'normal'
                                });
                            });
                        } else {
                            temp = new TextView({
                                label: item,
                                style: {
                                    color: 'black',
                                    width: 'fill-parent',
                                    'background-color': '#FDF5E6'
                                }
                            });
                            temp.on('blur', function() {
                                this.style({
                                    'color': 'black',
                                    'background-color': '#FDF5E6',
                                    'font-weight': 'normal'
                                });
                            });
                        }
                        temp.on('activate', function() {
                            app.setContent('details', {
                                _title: data.text.title_,
                                _link: data.text.link_,
                                _pubdate: data.text.pubdate_,
                                _description : data.text.description_
                            });
                        });
                        temp.on('focus', function() {
                            this.style({
                                'color': 'blue',
                                'background-color': '#EEE8AA',
                                'font-weight': 'bold'
                            });
                        });
                        view.add(item, temp);

                        i++;
                    });
                    view.focusItem(0);

                }
            });
        });
    },
    ':keypress': function(key) {
        console.log('Key press: ' + key);
        if (this.index === undefined) {
            if (this.size() >= 0) {
                this.focusItem(0);
            }
        } else if (key === 'up' || key === 'down') {
            var next = this.index + (key === 'up' ? -1 : 1);

            if (next < 1) {
                next = 1;
            } else if (next > (this.size() - 1)) {
                next = this.size() - 1;
            }

            if (this.index === next) {
                return;
            }

            this.focusItem(next);
        } else if (key === 'fire') {
            this.get(this.index).emit('activate');
        }
    },

    focusItem: function(index) {
        if (this.index !== undefined) {
            this.get(this.index).emit('blur');
        }
        this.index = index;
        this.get(index).emit('focus');
        if (index === 1) {
            this.scrollTop(0);
        }
        console.log('Index : ' + index);
        this.scrollTo(index);
    }
});
