// ResepAnyar -- backend.js
log.info('Hello from backend bootstrap.');
var http = require('blaast/simple-http');
var rssparser = require('htmlparser');
var _ = require('underscore');
var sys = require('sys');

var debug = true;
var url = 'http://resepmasakanmu.com/feed';


app.message(function(client, action, data) {
    if (action === 'getdata') {
        var handler = new rssparser.RssHandler(function(error, dom) {
            if (error) {
                console.log(error);
            }
            else {
                if (debug) {
                    sys.puts('Raw data : ' + sys.inspect(dom, false, null));
                }
                _.each(dom.items, function(param) {
                    console.log('Title : ' + param.title);
                    console.log('Link : ' + param.link);
                    console.log('Pubdate : ' + param.pubDate);
                    client.msg('setdata', {text : {
                        title_ : param.title,
                        link_ : param.link,
                        pubdate_ : param.pubDate
                    }
                    });


                });
            }

        });
        var parser = new rssparser.Parser(handler);
        http.get(url, {
            ok:function(data) {
                parser.parseComplete(data);
            },
            error:function(err) {
                console.log('Error : ' + err);
            }

        });
    }
});


