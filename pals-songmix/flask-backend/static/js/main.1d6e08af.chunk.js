(this.webpackJsonpsongbinator=this.webpackJsonpsongbinator||[]).push([[0],{26:function(t,e,a){t.exports=a(68)},31:function(t,e,a){},32:function(t,e,a){},34:function(t,e,a){},66:function(t,e,a){},68:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),r=a(22),i=a.n(r),c=(a(31),a(5)),o=a(6),u=a(8),l=a(7),d=a(9),h=a(23),g=a.n(h),m=(a(32),a(33),a(34),function(t){function e(){return Object(c.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(o.a)(e,[{key:"redirect",value:function(){window.location.href="https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=http://127.0.0.1:5000/successLoginDone&scope=playlist-modify-public playlist-modify-private playlist-read-private&response_type=code"}},{key:"render",value:function(){var t=this;return s.createElement("div",{id:"monitor"},s.createElement("h1",{className:"title"},"Songbinator"),s.createElement("h2",{className:"subtitle"},"Problems finding a playlist that satisfies the musical taste of you an all your friends?",s.createElement("br",null),"Give us some artists and we will create you a personalised playlist that everyone will like!"),s.createElement("button",{className:"button is-success",onClick:function(){return t.redirect()}},"Login"),s.createElement("br",null),s.createElement("br",null),s.createElement("h2",{className:"subtitle"},"Login with your Spotify account"))}}]),e}(s.Component)),p=a(2),f=a.n(p),v=a(10),b=a(3),k=a(4),y=a.n(k),S=a(24),_=a.n(S),E=(a(66),function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(l.a)(e).call(this,t))).onSuggestionsClearRequested=function(){a.setState({artist:""})},a.renderSuggestion=function(t){return s.createElement("div",null,t.name)},a.onChange=function(t){a.setState({artist:t.target.value})},a.onSuggestionsFetchRequested=function(t){a.getSuggestions(t)},a.onSuggestionSelected=function(t){a.setState({artist:t.target.innerText})},a.onKeyDown=function(t){"Enter"===t.key&&a.addArtist(a.state.artist)},a.state={artist:"",tracks_state:{tracks:[]},loader:!1,artist_list:[],suggested_artists:[]},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleChangeAutocomplete=a.handleChangeAutocomplete.bind(Object(b.a)(a)),a.addArtist=a.addArtist.bind(Object(b.a)(a)),a.removeArtist=a.removeArtist.bind(Object(b.a)(a)),a}return Object(d.a)(e,t),Object(o.a)(e,[{key:"handleChange",value:function(){var t=Object(v.a)(f.a.mark((function t(e){var a,s,n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={suggested_artists:[]},s=[],n=e.target.value,t.next=5,y.a.get("/getSuggestedArtists?name="+n);case 5:a=t.sent,s=a.data.suggested_artists,this.setState({artist:n}),this.setState({suggested_artists:s});case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"handleChangeNew",value:function(){var t=Object(v.a)(f.a.mark((function t(e){var a,s;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:({suggested_artists:[]}),a=[],s=e,this.setState({artist:s}),this.setState({suggested_artists:a});case 5:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"handleChangeAutocomplete",value:function(){var t=Object(v.a)(f.a.mark((function t(e){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.target.textContent,this.setState({artist:a});case 2:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"addArtist",value:function(t){var e=this.state.artist_list;e=e.concat({name:t}),this.setState({artist_list:e}),this.setState({artist:""}),this.setState({suggested_artists:[]})}},{key:"removeArtist",value:function(t){var e=this.state.artist_list;e.splice(t,1),this.setState({artist_list:e})}},{key:"getSuggestions",value:function(){var t=Object(v.a)(f.a.mark((function t(e){var a,s;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={suggested_artists:[]},s=[],t.next=4,y.a.get("/getSuggestedArtists?name="+e.value);case 4:a=t.sent,s=a.data.suggested_artists,this.setState({suggested_artists:s});case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"createPlaylist",value:function(){var t=Object(v.a)(f.a.mark((function t(){var e,a,s,n,r,i,c,o,u,l,d,h,g,m,p,v,b,k,S,_;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e={related_artists:[]},a={tracks:[]},s=[],n={tracks:[]},r=[],this.setState({loader:!0}),t.prev=6,i=!0,c=!1,o=void 0,t.prev=10,u=this.state.artist_list[Symbol.iterator]();case 12:if(i=(l=u.next()).done){t.next=21;break}return d=l.value,t.next=16,y.a.get("/getSimilarArtists?name="+d.name+"&artists="+this.state.artist_list.length);case 16:e=t.sent,r=r.concat(e.data.related_artists);case 18:i=!0,t.next=12;break;case 21:t.next=27;break;case 23:t.prev=23,t.t0=t.catch(10),c=!0,o=t.t0;case 27:t.prev=27,t.prev=28,i||null==u.return||u.return();case 30:if(t.prev=30,!c){t.next=33;break}throw o;case 33:return t.finish(30);case 34:return t.finish(27);case 35:h=r.reduce((function(t,e){return t.some((function(t){return t.name===e.name}))||t.push(e),t}),[]),g=!0,m=!1,p=void 0,t.prev=39,v=h[Symbol.iterator]();case 41:if(g=(b=v.next()).done){t.next=50;break}return k=b.value,t.next=45,y.a.get("/getTracks?name="+k.name);case 45:a=t.sent,s=s.concat(a.data.tracks);case 47:g=!0,t.next=41;break;case 50:t.next=56;break;case 52:t.prev=52,t.t1=t.catch(39),m=!0,p=t.t1;case 56:t.prev=56,t.prev=57,g||null==v.return||v.return();case 59:if(t.prev=59,!m){t.next=62;break}throw p;case 62:return t.finish(59);case 63:return t.finish(56);case 64:return s&&(n.tracks=s),this.setState({tracks_state:n}),t.next=68,y.a.get("/createPlaylist");case 68:return S=t.sent,_={tracks:this.state.tracks_state,playlist:S.data.playlist_id},t.next=72,y.a.post("/addTracks",_);case 72:this.setState({loader:!1}),t.next=77;break;case 75:t.prev=75,t.t2=t.catch(6);case 77:case"end":return t.stop()}}),t,this,[[6,75],[10,23,27,35],[28,,30,34],[39,52,56,64],[57,,59,63]])})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=!0;this.state.suggested_artists&&this.state.suggested_artists.map((function(a){a.name===t.state.artist&&""!==t.state.artist&&(e=!1)}));var a=!(this.state.artist_list.length>0),n=!1;this.state.artist_list.map((function(e){e.name===t.state.artist&&(n=!0)}));var r=!1===this.state.loader&&0!==this.state.tracks_state.tracks.length,i={placeholder:"Type artist",value:this.state.artist,onChange:this.onChange,onKeyDown:this.onKeyDown};return s.createElement("div",null,this.state.loader?s.createElement("p",null,"Loading..."):s.createElement("div",null,this.state.loader||r?s.createElement("p",null,"Playlist created!"):s.createElement("div",{className:"mainComponent"},s.createElement("div",{className:"box inputBox"},s.createElement(_.a,{suggestions:this.state.suggested_artists,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested,getSuggestionValue:function(t){return t.name},renderSuggestion:this.renderSuggestion,onSuggestionSelected:this.onSuggestionSelected,inputProps:i}),s.createElement("div",{className:"menuButtons"},s.createElement("button",{className:"button",disabled:e||n,onClick:function(){return t.addArtist(t.state.artist)}},"Add"),s.createElement("button",{className:"button",disabled:a,onClick:function(){return t.createPlaylist()}},"Create playlist"))),this.state.tracks_state.tracks&&this.state.tracks_state.tracks.map((function(t){return s.createElement("p",null,t.track_name)})),s.createElement("div",{className:"artistContainer"},0===this.state.artist_list.length&&s.createElement("div",{className:"artistText"}," Type artist "),this.state.artist_list&&this.state.artist_list.map((function(e,a){return s.createElement("div",{className:"box artistComponent",id:"boxEffect",key:a},s.createElement("div",{className:"selectedArtist"},s.createElement("p",null,e.name),s.createElement("button",{className:"button XButton",onClick:function(){return t.removeArtist(a)}},"X")))}))))))}}]),e}(s.Component)),w=a(25),x=a.n(w),j=function(t){function e(){return Object(c.a)(this,e),Object(u.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){var t=void 0!==g.a.get("spotify_code");return n.a.createElement("div",{className:"App"},t?n.a.createElement(E,null):n.a.createElement(m,null),n.a.createElement(x.a,{href:"https://github.com/ignaciovi/repo"}))}}]),e}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.1d6e08af.chunk.js.map