(this.webpackJsonpsongbinator=this.webpackJsonpsongbinator||[]).push([[0],{26:function(t,e,a){t.exports=a(67)},31:function(t,e,a){},32:function(t,e,a){},34:function(t,e,a){},66:function(t,e,a){},67:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),r=a(23),i=a.n(r),c=(a(31),a(3)),o=a(4),l=a(6),u=a(5),m=a(7),h=a(24),d=a.n(h),g=(a(32),a(33),a(34),a(8)),p=function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(o.a)(e,[{key:"redirect",value:function(){var t=["https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=",window.location.href,"successLoginDone&scope=playlist-modify-public playlist-modify-private&response_type=code"];window.location.href=t.join("")}},{key:"render",value:function(){var t=this;return g.a.initialize("G-T08XVM656Z"),g.a.pageview("/"),s.createElement("div",null,s.createElement("div",{id:"comeTop"},s.createElement("h1",{className:"title"},"Songbinator"),s.createElement("h2",{className:"subtitle"},"Problem finding a playlist that satisfies the musical taste of you and all your friends?",s.createElement("br",null),"Give us some artists and we will create you a personalised playlist that everyone will like!")),s.createElement("div",{id:"comeDown"},s.createElement("button",{className:"button is-large is-success",onClick:function(){return t.redirect()}},"Login"),s.createElement("br",null),s.createElement("br",null),s.createElement("h2",{className:"subtitle"},"Login with your Spotify account")))}}]),e}(s.Component),v=a(10),f=a.n(v),b=a(13),y=a(11),k=a(9),E=a.n(k),_=a(25),S=a.n(_),w=(a(66),function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(l.a)(this,Object(u.a)(e).call(this,t))).renderSuggestion=function(t){return s.createElement("div",null,t.name)},a.onChange=function(t){a.setState({artist:t.target.value})},a.onSuggestionsFetchRequested=function(t){a.getSuggestions(t)},a.onChangePlaylist=function(t){a.setState({playlistName:t.target.value})},a.state={artist:"",tracks_state:{tracks:[]},loader:!1,artist_list:[],suggested_artists:[],playlistName:"",progress:0},a.removeArtist=a.removeArtist.bind(Object(y.a)(a)),a}return Object(m.a)(e,t),Object(o.a)(e,[{key:"removeArtist",value:function(t){var e=this.state.artist_list;e.splice(t,1),this.setState({artist_list:e})}},{key:"getSuggestions",value:function(){var t=Object(b.a)(f.a.mark((function t(e){var a,s;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={suggested_artists:[]},s=[],t.next=4,E.a.get("/getSuggestedArtists?name="+e.value);case 4:a=t.sent,s=a.data.suggested_artists,this.setState({suggested_artists:s});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"createPlaylist",value:function(){var t=Object(b.a)(f.a.mark((function t(){var e,a,s,n,r,i,c,o,l,u,m,h,d,g,p,v,b,y,k,_,S,w;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e={related_artists:[]},a={tracks:[]},s=[],n={tracks:[]},r=[],this.setState({loader:!0}),t.prev=6,i=!0,c=!1,o=void 0,t.prev=10,l=this.state.artist_list[Symbol.iterator]();case 12:if(i=(u=l.next()).done){t.next=21;break}return m=u.value,t.next=16,E.a.get("/getSimilarArtists?name="+m.name+"&artists="+this.state.artist_list.length);case 16:e=t.sent,r=r.concat(e.data.related_artists);case 18:i=!0,t.next=12;break;case 21:t.next=27;break;case 23:t.prev=23,t.t0=t.catch(10),c=!0,o=t.t0;case 27:t.prev=27,t.prev=28,i||null==l.return||l.return();case 30:if(t.prev=30,!c){t.next=33;break}throw o;case 33:return t.finish(30);case 34:return t.finish(27);case 35:h=r.reduce((function(t,e){return t.some((function(t){return t.name===e.name}))||t.push(e),t}),[]),d=0,g=!0,p=!1,v=void 0,t.prev=40,b=h[Symbol.iterator]();case 42:if(g=(y=b.next()).done){t.next=54;break}return k=y.value,t.next=46,E.a.get("/getTracks?name="+k.name);case 46:a=t.sent,_=Math.floor(d/h.length*100*.9),d+=1,this.setState({progress:_}),s=s.concat(a.data.tracks);case 51:g=!0,t.next=42;break;case 54:t.next=60;break;case 56:t.prev=56,t.t1=t.catch(40),p=!0,v=t.t1;case 60:t.prev=60,t.prev=61,g||null==b.return||b.return();case 63:if(t.prev=63,!p){t.next=66;break}throw v;case 66:return t.finish(63);case 67:return t.finish(60);case 68:return s&&(n.tracks=s),this.setState({tracks_state:n}),t.next=72,E.a.get("/createPlaylist?name="+this.state.playlistName);case 72:return S=t.sent,w={tracks:this.state.tracks_state,playlist:S.data.playlist_id},t.next=76,E.a.post("/addTracks",w);case 76:this.setState({loader:!1}),t.next=81;break;case 79:t.prev=79,t.t2=t.catch(6);case 81:case"end":return t.stop()}}),t,this,[[6,79],[10,23,27,35],[28,,30,34],[40,56,60,68],[61,,63,67]])})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=function(){var e=!1;t.state.suggested_artists.forEach((function(a){a.name===t.state.artist&&(e=!0)}));var a=!1;t.state.artist_list.forEach((function(e){e.name===t.state.artist&&(a=!0)}));var s=!e||a||t.state.artist_list.length>15;return console.log("AAAAAAAAAAAAAA"),console.log(e),console.log(a),console.log(s),console.log(t.state.suggested_artists),console.log(t.state.artist),s}(),a=function(e){var a=t.state.artist_list;(void 0===a.find((function(t){return t.name===e}))||0===a.length)&&(a=a.concat({name:e}),t.setState({artist_list:a})),t.setState({artist:""}),t.setState({suggested_artists:[]})},n=0===this.state.artist_list.length||""===this.state.playlistName,r=!1===this.state.loader&&0!==this.state.tracks_state.tracks.length,i={placeholder:"Type artist",value:this.state.artist,onChange:this.onChange,onKeyDown:function(s){"Enter"!==s.key||e||a(t.state.artist)}};return s.createElement("div",null,this.state.loader?s.createElement("h2",{className:"subtitle"},"Loading... ",this.state.progress,"%"):s.createElement("div",null,this.state.loader||r?s.createElement("h2",{className:"subtitle"},' Playlist created! Search for "',this.state.playlistName,'" in your Spotify App. ',s.createElement("br",null),"Thank you!"):s.createElement("div",{className:"mainComponent"},s.createElement("div",{className:"box mainBox"},s.createElement("div",{className:"inputBox"},s.createElement("div",{className:"menuInput"},s.createElement(S.a,{suggestions:this.state.suggested_artists,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested,getSuggestionValue:function(t){return t.name},renderSuggestion:this.renderSuggestion,onSuggestionSelected:function(e){t.setState({artist:e.target.innerText}),a(e.target.innerText)},inputProps:i})),s.createElement("div",{className:"menuButtons"},s.createElement("button",{className:"button",disabled:e,onClick:function(){return a(t.state.artist)}},"Add"),s.createElement("button",{className:"button",disabled:n,onClick:function(){return t.createPlaylist()}},"Create playlist"))),this.state.artist_list.length>0&&s.createElement("input",{className:"input",type:"text",onChange:this.onChangePlaylist,value:this.state.playlistName,placeholder:"Playlist name"})),this.state.tracks_state.tracks&&this.state.tracks_state.tracks.map((function(t){return s.createElement("p",null,t.track_name)})),s.createElement("div",{className:"artistContainer"},0===this.state.artist_list.length&&s.createElement("div",{className:"artistText"}," Type artist "),this.state.artist_list&&this.state.artist_list.map((function(e,a){return s.createElement("div",{className:"box artistComponent",id:"boxEffect",key:a},s.createElement("div",{className:"selectedArtist"},s.createElement("p",null,e.name),s.createElement("button",{className:"button XButton",onClick:function(){return t.removeArtist(a)}},"X")))}))))))}}]),e}(s.Component));g.a.initialize("UA-156008572-1");var x=function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){var t=void 0!==d.a.get("spotify_code");return g.a.pageview(window.location.pathname+window.location.search),n.a.createElement("div",{className:"App"},t?n.a.createElement(w,null):n.a.createElement(p,null))}}]),e}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[26,1,2]]]);