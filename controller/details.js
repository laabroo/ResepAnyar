var _ = require('common/util');
var ImageView = require('ui').ImageView;
var TextView = require('ui').TextView;
var app = this;

_.extend(exports, {
    ':load': function() {
        var self = this;
        self.clear();
    },

    ':state': function(data) {
        console.log('Thumbnail : ' + data.thumbnail);
        var self = this;
        var temp = this;
        var desc = this;

        self.clear();
        temp.clear();
        self.add('title', new TextView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content',
                'font-weight': 'bold',
                'background-color': '#00BFFF'

            }
        }));
        self.add('thumbnail', new ImageView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content',
                mode: 'centered',
                'background-color': 'white'
            }
        }));

        temp.add('link', new TextView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content'

            }
        }));
        desc.add('description', new TextView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content'

            }
        }));
        console.log('Details Title : ' + data._title);
        console.log('Details Pubdate : ' + data._pubdate);
        self.get('title').label(data._title);
        temp.get('link').label(data._link);
        desc.get('description').label(data._description);
    },


    ':keypress': function(key) {
        console.log('Key press: ' + key);

        if (this.index === undefined) {
            if (this.size() > 0) {
                this.focusItem(1);
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
            //this.get(0)[':keypress'](key);
            this.get(this.index).emit('activate');
        } else if (key === 'back') {
            console.log('back');
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
        console.log(index);
        this.scrollTo(index);
    }



});